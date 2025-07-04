import Image from "next/image";
import { FC } from "react";

interface CardProps {
  name: string;
  img: string;
  cardNum: string;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({ name, img, onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <Image src={img} alt={name} width={200} height={250} />
      <h2 className="font-semibold text-center">{name}</h2>
    </div>
  );
};
