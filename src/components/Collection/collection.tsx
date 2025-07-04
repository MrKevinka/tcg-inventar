"use client";
import { useInventory } from "@/hooks/useInventory";

import cards2 from "../../../public/data/cards2.json";

export const Collection = () => {
  const { inventory } = useInventory();

  return (
    <div>
      <h2 className="mt-10 text-2xl font-semibold"> 🗃️ Meine Sammlung:</h2>
      <ul className="ml-2 flex list-disc md:ml-28">
        {inventory.map((item) => {
          const card = cards2.find((c) => c.CardNum === item.CardNum);
          if (!card) return null;
          return (
            <li key={item.CardNum} className="border-b pb-2">
              <span>{`${card.Name} - ${card.CardNum.slice(1)}`}</span>
              <span> : {item.quantity}x</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
