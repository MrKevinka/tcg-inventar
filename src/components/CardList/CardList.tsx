'use client';

import { useCardListState } from '@/hooks/useCardlistState';
import { useInventory } from '@/hooks/useInventory';

import { CardFilters } from '../CardFilters/CardFilters';
import { CardListItem } from '../CardListItem/CardListItem';
import { CardModalContent } from '../Modal/CardModalContent';
import { Modal } from '../Modal/Modal';
import { PaginationControls } from '../PaginationControls/PaginationControls';
import { SearchBar } from '../SearchBar/SearchBar';
import { Collection } from '../Collection/Collection';

export const CardList = () => {
  const {
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
    rarityFilter,
    setRarityFilter,
    typeFilter,
    setTypeFilter,
    setCategory,
    setSetCategory,
    setDetailFilter,
    setSetDetailFilter,
  } = useCardListState();

  const { addCard, decreaseCard } = useInventory();

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="mb-6 text-3xl font-bold">One Piece Karten</h1>
        <CardFilters
          rarityFilter={rarityFilter}
          setRarityFilter={setRarityFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          setCategory={setCategory}
          setSetCategory={setSetCategory}
          setDetailFilter={setDetailFilter}
          setSetDetailFilter={setSetDetailFilter}
        />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} resetPage={() => setCurrentPage(1)} />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {paginatedCards.map(card => (
            <CardListItem
              key={card.CardNum}
              card={card}
              openModal={openModal}
              addCard={addCard}
              decreaseCard={decreaseCard}
            />
          ))}
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedCard && (
          <CardModalContent
            card={selectedCard}
            modalImageIndex={modalImageIndex}
            setModalImageIndex={setModalImageIndex}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </Modal>

      <Collection />
    </div>
  );
};
