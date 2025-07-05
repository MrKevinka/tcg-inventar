export interface InventoryItem {
  CardNum: string;
  quantity: number;
}

function isInventoryItemArray(data: unknown): data is InventoryItem[] {
  return (
    Array.isArray(data) &&
    data.every(
      item =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Record<string, unknown>).CardNum === 'string' &&
        typeof (item as Record<string, unknown>).quantity === 'number',
    )
  );
}

export const getFormattedInventoryText = (): string => {
  if (typeof window === 'undefined') return '';

  const stored = localStorage.getItem('inventory');
  if (!stored) return '';

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!isInventoryItemArray(parsed)) {
      console.warn('[Inventory] Ungültige Daten im localStorage.');
      return '';
    }

    return parsed
      .filter(({ quantity }) => quantity > 0)
      .map(({ quantity, CardNum }) => `${quantity}x${CardNum.replace(/^#/, '')}`)
      .join('\n');
  } catch (e) {
    console.error('[Inventory] Fehler beim Parsen:', e);
    return '';
  }
};

// Hilfsfunktion zum Erstellen & Einfügen eines Textareas
function createHiddenTextarea(value: string): HTMLTextAreaElement {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.readOnly = true;
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  return textarea;
}

export const copyInventoryToClipboard = (): void => {
  const text = getFormattedInventoryText();
  if (!text) {
    alert('Keine Karten zum Kopieren gefunden.');
    return;
  }

  try {
    const textarea = createHiddenTextarea(text);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);

    alert(successful ? 'Karten kopiert!' : 'Kopieren fehlgeschlagen.');
  } catch (err) {
    alert('Kopieren fehlgeschlagen (Fallback-Fehler).');
    console.error('[Inventory] Fallback-Kopierfehler:', err);
  }
};
