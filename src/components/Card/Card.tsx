'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import Button from '../Button/Button';

interface CardProps {
  name: string;
  img: string;
  cardNum: string;
  onClick?: (index: number) => void;
  images?: string[];
}

export const Card: FC<CardProps> = ({ name, img, onClick, images = [img] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageClick = () => {
    if (onClick) onClick(currentIndex);
  };

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setIsLoading(true); // Bild wird neu geladen
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative">
        {isLoading && (
          <div className='bg-opacity-80" absolute inset-0 z-10 flex items-center justify-center bg-white'>
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
        )}
        <Image
          src={images[currentIndex]}
          alt={name}
          width={200}
          height={250}
          onClick={handleImageClick}
          onLoad={() => setIsLoading(false)}
          className={`cursor-pointer rounded shadow-md transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      <h2 className="text-center font-semibold">{name}</h2>

      <div className="mt-2 flex gap-2">
        {images.length > 1 &&
          images.map((_, index) => (
            <Button
              key={index}
              label=""
              action={() => handleDotClick(index)}
              className={`mb-2 h-3 w-3 rounded-full ${index === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
            />
          ))}
      </div>
    </div>
  );
};
