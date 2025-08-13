'use client';

import { useCardListState } from '@/hooks/useCardlistState';
import { useInventory } from '@/hooks/useInventory';
import { buttonVariants } from '@/utils/buttonVariants';

import Button from '../Button/Button';
import { Card } from '../Card/Card';
import { Collection } from '../Collection/Collection';
import { CardModalContent } from '../Modal/CardModalContent';
import { Modal } from '../Modal/Modal';
import { PaginationControls } from '../PaginationControls/PaginationControls';
import SearchBar from '../Search/SearchBar';

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
  } = useCardListState();

  const { addCard, decreaseCard } = useInventory();

  return (
    <div className="flex h-screen w-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="mb-6 text-3xl font-bold">One Piece Karten</h1>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} resetPage={() => setCurrentPage(1)} />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage(p => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {paginatedCards.map(card => (
            <div key={card.CardNum} className="flex flex-col justify-between rounded border p-4">
              <Card
                name={card.Name}
                img={card.Images?.[0] || card.Img}
                cardNum={card.CardNum}
                images={card.Images}
                onClick={index => openModal(card, index)}
              />
              <div className="flex justify-center gap-2">
                <Button action={() => addCard(card.CardNum)} label="+1" className={buttonVariants.collection} />
                <Button action={() => decreaseCard(card.CardNum)} label="-1" className={buttonVariants.collection} />
              </div>
            </div>
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
