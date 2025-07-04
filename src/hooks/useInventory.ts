import { useEffect, useState } from 'react';

export interface InventoryItem {
  CardNum: string;
  quantity: number;
}

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('inventory');
    if (stored) {
      try {
        setInventory(JSON.parse(stored) as InventoryItem[]);
      } catch (e) {
        console.error('Fehler beim Parsen des Inventars:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  // +1 zur Menge oder hinzufügen
  const addCard = (CardNum: string, quantity: number = 1) => {
    setInventory(prev => {
      const existing = prev.find(item => item.CardNum === CardNum);
      return existing
        ? prev.map(item => (item.CardNum === CardNum ? { ...item, quantity: item.quantity + quantity } : item))
        : [...prev, { CardNum, quantity }];
    });
  };

  // Menge -1 (wenn 1 → entfernen)
  const decreaseCard = (CardNum: string) => {
    setInventory(prev =>
      prev
        .map(item => (item.CardNum === CardNum ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0),
    );
  };

  // Komplett entfernen
  const removeCard = (CardNum: string) => {
    setInventory(prev => prev.filter(item => item.CardNum !== CardNum));
  };

  return { inventory, addCard, decreaseCard, removeCard };
};
