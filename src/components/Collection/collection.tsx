"use client";
import Image from "next/image";

import { useInventory } from "@/hooks/useInventory";

// import cards from '../../../public/data/cards.json';
import cards2 from "../../../public/data/cards2.json";
import Button from "../Button/Button";

export const Collection = () => {
  const { inventory, addCard, decreaseCard, removeCard } = useInventory();

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <div>
        <h1 className="mb-6 text-3xl font-bold">Meine One Piece Karten</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {cards2.map((card) => (
            <div
              key={card.CardNum}
              className="flex flex-col items-center justify-center rounded border p-4"
            >
              <Image src={card.Img} alt={card.Name} width={200} height={250} />
              <h2 className="font-semibold">{card.Name}</h2>

              <div className="flex justify-between gap-2">
                <Button action={() => addCard(card.CardNum)} label={"+1"} />
                <Button
                  action={() => decreaseCard(card.CardNum)}
                  label={"-1"}
                />
                <Button
                  action={() => removeCard(card.CardNum)}
                  label={"Entfernen"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
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
    </div>
  );
};
