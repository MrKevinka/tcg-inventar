export interface InventoryItem {
  CardNum: string; // Großes C, wie in deinem Hook
  quantity: number;
}

// Type Guard zur Absicherung von JSON.parse()
function isInventoryItemArray(data: unknown): data is InventoryItem[] {
  return (
    Array.isArray(data) &&
    data.every(item => {
      if (typeof item !== 'object' || item === null) {
        return false;
      }
      const obj = item as Record<string, unknown>;
      return typeof obj.CardNum === 'string' && typeof obj.quantity === 'number';
    })
  );
}

export const getFormattedInventoryText = (): string => {
  if (typeof window === 'undefined') return '';

  const stored = localStorage.getItem('inventory');
  if (!stored) return '';

  try {
    const parsed: unknown = JSON.parse(stored);

    if (!isInventoryItemArray(parsed)) {
      console.warn('Ungültige Inventardaten im localStorage');
      return '';
    }

    return parsed
      .filter(item => item.quantity > 0)
      .map(item => `${item.quantity}x${item.CardNum.replace(/^#/, '')}`) // Großes C hier!
      .join('\n');
  } catch (e) {
    console.error('Fehler beim Parsen von inventory:', e);
    return '';
  }
};

export const copyInventoryToClipboard = (): void => {
  const text = getFormattedInventoryText();
  if (!text) {
    alert('Keine Karten zum Kopieren gefunden.');
    return;
  }

  // Fallback: execCommand
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (successful) {
      alert('Karten kopiert ');
    } else {
      alert('Kopieren fehlgeschlagen.');
    }
  } catch (err) {
    alert('Kopieren fehlgeschlagen (Fehler beim Fallback).');
    console.error('Kopier-Fehler:', err);
  }
};
