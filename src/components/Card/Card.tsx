'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import Button from '../Button/Button';

interface CardProps {
  name: string;
  img: string;
  cardNum: string;
  onClick?: (index: number) => void; // onClick mit Index
  images?: string[];
}

export const Card: FC<CardProps> = ({ name, img, onClick, images = [img] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = () => {
    if (onClick) onClick(currentIndex);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index); // Nur Bild wechseln, kein Modal öffnen
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={images[currentIndex]}
        alt={name}
        width={200}
        height={250}
        className="cursor-pointer rounded shadow-md"
        onClick={handleImageClick} // Modal öffnen nur beim Bild-Klick
      />
      <h2 className="text-center font-semibold">{name}</h2>
      <div className="mt-2 flex gap-2">
        {images.length > 1 &&
          images.map((_, index) => (
            <Button
              key={index}
              label=""
              action={() => handleDotClick(index)} // Nur Bild wechseln
              className={`mb-2 h-3 w-3 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
            />
          ))}
      </div>
    </div>
  );
};
