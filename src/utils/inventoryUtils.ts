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

export const copyInventoryToClipboard = async (): Promise<void> => {
  const text = getFormattedInventoryText();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    alert('Karten kopiert!');
  } catch (e) {
    console.error('Fehler beim Kopieren in die Zwischenablage:', e);
    alert('Kopieren fehlgeschlagen.');
  }
};
