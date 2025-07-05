'use client';

import React, { MouseEvent } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Klick auf Hintergrund → Modal schließen
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    >
      <div
        className="relative w-full max-w-md rounded bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()} // Klicks im Inhalt nicht weiterreichen
      >
        <button className="absolute right-2 top-2 text-gray-500 hover:text-black" onClick={onClose}>
          ❌
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
