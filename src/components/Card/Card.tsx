import Image from 'next/image';
import { FC } from 'react';

interface CardProps {
  name: string;
  img: string;
  cardNum: string;
}

export const Card: FC<CardProps> = ({ name, img }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={img} alt={name} width={200} height={250} />
      <h2 className="font-semibold">{name}</h2>
    </div>
  );
};
