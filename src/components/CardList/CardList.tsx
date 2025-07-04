"use client";

import { useState } from "react";

import { useInventory } from "@/hooks/useInventory";

import cards2 from "../../../public/data/cards2.json";
import Button from "../Button/Button";
import { Card } from "../Card/Card";
import { Collection } from "../Collection/Collection";

const CARDS_PER_PAGE = 121;

export const CardList = () => {
  const { addCard, decreaseCard, removeCard } = useInventory();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cards2.length / CARDS_PER_PAGE);
  const paginatedCards = cards2.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE,
  );

  //Button-Styles
  const pageBtn =
    "rounded px-4 py-2 text-white bg-purple-500 hover:bg-purple-600";
  const collectBtn =
    "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ";

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <div>
        <h1 className="mb-6 text-3xl font-bold">Meine One Piece Karten</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {paginatedCards.map((card) => (
            <div
              key={card.Name + card.CardNum}
              className="flex flex-col justify-between rounded border p-4"
            >
              <Card name={card.Name} img={card.Img} cardNum={card.CardNum} />
              <div className="flex justify-center gap-2">
                <Button
                  action={() => addCard(card.CardNum)}
                  label={"+1"}
                  className={collectBtn}
                />
                <Button
                  action={() => decreaseCard(card.CardNum)}
                  label={"-1"}
                  className={collectBtn}
                />
                <Button
                  action={() => removeCard(card.CardNum)}
                  label={"Entfernen"}
                  className={collectBtn}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="my-4 flex justify-center gap-4 items-center">
          <Button
            action={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            label="⬅️ Zurück"
            className={pageBtn}
          />

          <span>
            Seite {currentPage} von {totalPages}
          </span>
          <Button
            className={pageBtn}
            action={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            label="Weiter ➡️"
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
      <Collection />
    </div>
  );
};
