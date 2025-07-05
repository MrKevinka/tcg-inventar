import Image from 'next/image';
import { FC } from 'react';

interface CardProps {
  name: string;
  img: string;
  cardNum: string;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({ name, img, onClick }) => {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center" onClick={onClick}>
      <Image src={img} alt={name} width={200} height={250} />
      <h2 className="text-center font-semibold">{name}</h2>
    </div>
  );
};
