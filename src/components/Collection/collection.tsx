"use client";
import { useInventory } from "@/hooks/useInventory";

import cards2 from "../../../public/data/cards2.json";

export const Collection = () => {
  const { inventory } = useInventory();

  return (
    <div className="pb-20">
      <h2 className="mt-10 text-2xl font-semibold"> 🗃️ Meine Sammlung:</h2>
      <ul className="ml-2 flex flex-col list-disc md:ml-28">
        {inventory.map((item) => {
          const card = cards2.find((c) => c.CardNum === item.CardNum);
          if (!card) return null;
          return (
            <li key={item.CardNum} className="pb-2">
              <span className="border-b">{`${card.Name} - ${card.CardNum.slice(1)}: ${item.quantity}x`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
