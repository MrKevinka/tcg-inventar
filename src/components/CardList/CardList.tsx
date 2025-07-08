'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useInventory } from '@/hooks/useInventory';

import cards2 from '../../../public/data/cards2.json';
import Button from '../Button/Button';
import { Card } from '../Card/Card';
import { Collection } from '../Collection/Collection';
import { Modal } from '../Modal/Modal';

const CARDS_PER_PAGE = 121;
type CardType = {
  CardNum: string;
  Name: string;
  Img: string;
  Images?: string[];
  'Card Type': string;
  Rarity: string;
};

export const CardList = () => {
  const { addCard, decreaseCard } = useInventory();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //Karten sortieren
  const sortCardImages = (images: string[] | undefined, cardNum: string): string[] => {
    if (!images) return [];

    const cleanCardNum = cardNum.replace('#', '');
    const expectedMainImage = `https://en.onepiece-cardgame.com/images/cardlist/card/${cleanCardNum}.png?250509`;

    // Wenn das erwartete Bild enthalten ist, sortieren
    if (images.includes(expectedMainImage)) {
      return [expectedMainImage, ...images.filter(img => img !== expectedMainImage)];
    }

    return images;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = (card: CardType, imageIndex: number) => {
    const sortedImages = sortCardImages(card.Images, card.CardNum);
    // Wir erstellen eine neue Karte-Objekt-Kopie mit sortierten Bildern, um sie im Modal zu nutzen:
    setSelectedCard({ ...card, Images: sortedImages });
    setModalImageIndex(imageIndex);
    setIsLoading(true);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };
  //Search
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCards = cards2.filter(
    card =>
      card.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.CardNum.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const paginatedCards = filteredCards.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);

  //Button-Styles
  const pageBtn = 'rounded px-4 py-2 text-white bg-purple-500 hover:bg-purple-600';
  const collectBtn = 'rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ';

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="mb-6 text-3xl font-bold">One Piece Karten</h1>

        <div className="my-4 flex items-center justify-center gap-4">
          <Button action={() => setCurrentPage(prev => Math.max(prev - 1, 1))} label="⬅️ Zurück" className={pageBtn} />

          <span>
            Seite {currentPage} von {totalPages}
          </span>
          <Button
            className={pageBtn}
            action={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            label="Weiter ➡️"
            disabled={currentPage === totalPages}
          />
        </div>
        <div className="mb-5 flex flex-col">
          <input
            type="text"
            placeholder="🔍 Suche nach Name oder ID..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Zurück zur ersten Seite bei neuer Suche
            }}
            className="bg-red mb-4 rounded border px-4 py-2 md:w-1/2"
          />
          <a className="w-fit" href="#sammlung">
            Meine Sammlung ↓
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {paginatedCards.map(card => {
            const sortedImages = sortCardImages(card.Images, card.CardNum);

            return (
              <div key={card.Name + card.CardNum} className="flex flex-col justify-between rounded border p-4">
                <Card
                  name={card.Name}
                  img={sortedImages[0] || card.Img}
                  cardNum={card.CardNum}
                  images={sortedImages}
                  onClick={index => openModal(card, index)} // Index richtig übergeben
                />

                <div className="flex justify-center gap-2">
                  <Button action={() => addCard(card.CardNum)} label={'+1'} className={collectBtn} />
                  <Button action={() => decreaseCard(card.CardNum)} label={'-1'} className={collectBtn} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mb-5 flex flex-col">
          <input
            type="text"
            placeholder="🔍 Suche nach Name oder ID..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Zurück zur ersten Seite bei neuer Suche
            }}
            className="bg-red mb-4 rounded border px-4 py-2 md:w-1/2"
          />
        </div>
        <div className="my-4 flex items-center justify-center gap-4">
          <Button action={() => setCurrentPage(prev => Math.max(prev - 1, 1))} label="⬅️ Zurück" className={pageBtn} />

          <span>
            Seite {currentPage} von {totalPages}
          </span>
          <Button
            className={pageBtn}
            action={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            label="Weiter ➡️"
            disabled={currentPage === totalPages}
          />
        </div>
      </div>

      {/* Modal mit Bild-Slider per Dots */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedCard && (
          <div className="h-auto w-auto text-center">
            <h2 className="mb-2 text-xl font-bold">{selectedCard.Name}</h2>

            {/* Neuer Zustand für Laden */}
            <div className="relative h-auto max-w-full">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="h-10 w-10 animate-spin text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M12 2v2m0 16v2m10-10h-2M4 12H2m16.24-7.76l-1.42 1.42M6.34 17.66l-1.42 1.42m0-13.08l1.42 1.42m11.32 11.32l1.42 1.42"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">Bild wird geladen... 🏴‍☠️</p>
                  </div>
                </div>
              )}

              <Image
                src={
                  selectedCard.Images && selectedCard.Images.length > 0
                    ? selectedCard.Images[modalImageIndex]
                    : selectedCard.Img
                }
                alt={selectedCard.Name}
                width={480}
                height={550}
                onLoad={() => setIsLoading(false)}
                className={`mx-auto h-auto max-w-full rounded shadow transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {selectedCard.Images && selectedCard.Images.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {selectedCard.Images.map((_, index) => (
                    <Button
                      key={index}
                      label=""
                      action={() => {
                        if (index !== modalImageIndex) {
                          setModalImageIndex(index);
                          setIsLoading(true);
                        }
                      }}
                      className={`h-3 w-3 rounded-full ${index === modalImageIndex ? 'bg-black' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="mb-5">
              <p className="mt-2 text-gray-700">ID: {selectedCard.CardNum.slice(1)}</p>
              <p className="text-sm text-gray-500">Typ: {selectedCard['Card Type']}</p>
              <p className="text-sm text-gray-500">Rarity: {selectedCard.Rarity}</p>
            </div>
          </div>
        )}
      </Modal>

      <Collection />
    </div>
  );
};
