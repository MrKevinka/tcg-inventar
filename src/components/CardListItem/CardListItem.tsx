import { clsx } from 'clsx';
import React from 'react';

import { CardType } from '@/types/CardType';
import { buttonVariants } from '@/utils/buttonVariants';
import { sortCardImages } from '@/utils/sortCardImage';

import Button from '../Button/Button';
import { Card } from '../Card/Card';

interface CardListItemProps {
  card: CardType;
  openModal: (card: CardType, index: number) => void;
  addCard: (cardNum: string) => void;
  decreaseCard: (cardNum: string) => void;
}

export const CardListItem: React.FC<CardListItemProps> = ({ card, openModal, addCard, decreaseCard }) => {
  const sortedImages = sortCardImages(card.Images, card.CardNum);

  return (
    <div className="flex flex-col justify-between rounded border p-4">
      <Card
        name={card.Name}
        img={sortedImages[0] || card.Img}
        cardNum={card.CardNum}
        images={sortedImages}
        onClick={index => openModal(card, index)}
      />
      <div className="flex justify-center gap-2">
        <Button action={() => addCard(card.CardNum)} label="+1" className={clsx(buttonVariants.collection)} />
        <Button action={() => decreaseCard(card.CardNum)} label="-1" className={clsx(buttonVariants.collection)} />
      </div>
    </div>
  );
};

export default CardListItem;
