import { useState } from 'react';

import { CardType } from '@/types/CardType';
import { sortCardImages } from '@/utils/sortCardImage';

import { cards2 } from '../../public/data/cards2';

const CARDS_PER_PAGE = 121;

export const useCardListState = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const filteredCards = cards2.filter(
    card =>
      card.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.CardNum.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const paginatedCards = filteredCards.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);

  const openModal = (card: CardType, index: number) => {
    const sortedImages = sortCardImages(card.Images, card.CardNum);
    setSelectedCard({ ...card, Images: sortedImages });
    setModalImageIndex(index);
    setIsLoading(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    selectedCard,
    isModalOpen,
    modalImageIndex,
    isLoading,
    setModalImageIndex,
    setIsLoading,
    openModal,
    closeModal,
    paginatedCards,
    totalPages,
  };
};
