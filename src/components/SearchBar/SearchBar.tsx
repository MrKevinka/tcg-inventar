'use client';

import React from 'react';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  resetPage: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, resetPage }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    resetPage();
  };

  return (
    <div className="mb-5 flex flex-col">
      <input
        type="text"
        placeholder="🔍 Suche nach Name oder ID..."
        value={searchTerm}
        onChange={handleChange}
        className="bg-red mb-4 rounded border px-4 py-2 md:w-1/2"
      />
      <a className="w-fit" href="#sammlung">
        Meine Sammlung ↓
      </a>
    </div>
  );
};
