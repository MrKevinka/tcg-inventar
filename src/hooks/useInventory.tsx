"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface InventoryItem {
  CardNum: string;
  quantity: number;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addCard: (CardNum: string, quantity?: number) => void;
  decreaseCard: (CardNum: string) => void;
  removeCard: (CardNum: string) => void;
  clearInventory: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined,
);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("inventory");
    if (stored) {
      try {
        const parsedUnknown: unknown = JSON.parse(stored);
        const parsed = parsedUnknown as InventoryItem[];
        setInventory(parsed);
      } catch (e) {
        console.error("Fehler beim Parsen des Inventars:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  //Karte hinzufügen
  const addCard = (CardNum: string, quantity: number = 1) => {
    setInventory((prev) => {
      const existing = prev.find((item) => item.CardNum === CardNum);
      if (existing) {
        return prev.map((item) =>
          item.CardNum === CardNum
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prev, { CardNum, quantity }];
      }
    });
  };

  //Karte verringern
  const decreaseCard = (CardNum: string) => {
    setInventory((prev) =>
      prev
        .map((item) =>
          item.CardNum === CardNum
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  //Karte entfernen
  const removeCard = (CardNum: string) => {
    setInventory((prev) => prev.filter((item) => item.CardNum !== CardNum));
  };

  //ALLE Karten entfernen
  const clearInventory = () => {
    setInventory([]);
  };
  return (
    <InventoryContext.Provider
      value={{ inventory, addCard, decreaseCard, removeCard, clearInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "useInventory muss innerhalb von <InventoryProvider> verwendet werden.",
    );
  }
  return context;
};
