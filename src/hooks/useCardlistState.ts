import { useState } from 'react';
import OnePieceCards from "../../public/OnePieceCards.json"
import { CardType } from '@/types/CardType';
import { sortCardImages } from '@/utils/sortCardImage';

const CARDS_PER_PAGE = 121;

export const useCardListState = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [setCategory, setSetCategory] = useState(''); // SET, PROMO, STARTER
  const [setDetailFilter, setSetDetailFilter] = useState(''); // z.B. 'OP01', 'ST02'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const filteredCards = OnePieceCards.filter(card => {
    const nameLower = card.Name.toLowerCase();
    const cardNumUpper = card.CardNum.toUpperCase();
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch = nameLower.includes(searchLower) || cardNumUpper.includes(searchLower.toUpperCase());

    const matchesRarity = rarityFilter ? card.Rarity === rarityFilter : true;
    const matchesType = typeFilter ? card.CardType === typeFilter : true;

    const matchesSetCategory = setCategory
      ? setCategory === 'SET'
        ? cardNumUpper.startsWith('#OP')
        : setCategory === 'PROMO'
          ? cardNumUpper.startsWith('#P')
          : setCategory === 'STARTER'
            ? cardNumUpper.startsWith('#ST')
            : true
      : true;

    const matchesSetDetail =
      setDetailFilter && setCategory ? cardNumUpper.startsWith(`#${setDetailFilter.toUpperCase()}`) : true;

    return matchesSearch && matchesRarity && matchesType && matchesSetCategory && matchesSetDetail;
  });

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
    rarityFilter,
    setRarityFilter,
    typeFilter,
    setTypeFilter,
    setCategory,
    setSetCategory,
    setDetailFilter,
    setSetDetailFilter,
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
