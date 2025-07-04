"use client";

import { useInventory } from "@/hooks/useInventory";

import cards2 from "../../../public/data/cards2.json";
import Button from "../Button/Button";

export const Collection = () => {
  const { inventory, removeCard, clearInventory } = useInventory();
  return (
    <div className="pb-20">
      <a href="#start" className="self-end">
        Zum Start ↑
      </a>
      <h2 className="mt-2 text-2xl font-semibold" id="sammlung">
        🗃️ Meine Sammlung:
      </h2>

      {inventory.length > 0 && (
        <Button
          label="🗑️ Alles entfernen"
          className="my-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          action={() => {
            const confirmed = window.confirm(
              "⚠️ Bist du sicher, dass du deine gesamte Sammlung löschen möchtest?",
            );
            if (confirmed) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              clearInventory();
            }
          }}
        />
      )}

      <ul className="ml-2 flex flex-col list-disc md:ml-28">
        {inventory.map((item) => {
          const card = cards2.find((c) => c.CardNum === item.CardNum);
          if (!card) return null;
          return (
            <li key={item.CardNum} className="flex pb-2 items-center">
              <span className="border-b">
                {`${card.Name} - ${card.CardNum.slice(1)}: ${item.quantity}x`}
              </span>
              <Button
                label={"🗑️"}
                action={() => removeCard(card.CardNum)}
                className="border-2 rounded mx-4 p-0.5"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
