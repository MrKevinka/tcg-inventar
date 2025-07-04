"use client";

import { useInventory } from "@/hooks/useInventory";

// import cards from '../../../public/data/cards.json';
import cards2 from "../../../public/data/cards2.json";
import Button from "../Button/Button";
import { Card } from "../Card/Card";
import { Collection } from "../Collection/Collection";

export const CardList = () => {
  const { addCard, decreaseCard, removeCard } = useInventory();

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <div>
        <h1 className="mb-6 text-3xl font-bold">Meine One Piece Karten</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {cards2.map((card) => (
            <div
              key={card.Name + card.CardNum}
              className="flex flex-col justify-between rounded border p-4"
            >
              <Card name={card.Name} img={card.Img} cardNum={card.CardNum} />
              <div className="flex justify-center gap-2">
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
      <Collection />
    </div>
  );
};
