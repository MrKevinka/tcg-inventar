import Image from 'next/image';

import { CardType } from '@/types/CardType';

import Button from '../Button/Button';

type Props = {
  card: CardType;
  modalImageIndex: number;
  setModalImageIndex: (index: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const CardModalContent = ({ card, modalImageIndex, setModalImageIndex, isLoading, setIsLoading }: Props) => {
  const { Name, Images, Img, CardNum, Rarity } = card;

  return (
    <div className="h-auto w-auto text-center">
      <h2 className="mb-2 text-xl font-bold">{Name}</h2>
      <div className="relative h-auto max-w-full">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex flex-col items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700" />
              <p className="mt-2 text-sm text-gray-600">Bild wird geladen... 🏴‍☠️</p>
            </div>
          </div>
        )}
        <Image
          src={Images?.[modalImageIndex] || Img}
          alt={Name}
          width={480}
          height={550}
          onLoad={() => setIsLoading(false)}
          className={`mx-auto h-auto max-w-full rounded shadow transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {Images && Images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {Images.map((_, index) => (
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
        <p className="mt-2 text-gray-700">ID: {CardNum.slice(1)}</p>
        <p className="text-sm text-gray-500">Typ: {card.CardType}</p>
        <p className="text-sm text-gray-500">Rarity: {Rarity}</p>
      </div>
    </div>
  );
};
