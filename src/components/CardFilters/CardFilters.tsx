// components/Filters/CardFilters.tsx
'use client';

import React, { FC } from 'react';

import { setOptions, starterOptions } from '@/utils/filterOptions';

type Props = {
  rarityFilter: string;
  setRarityFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  setCategory: string;
  setSetCategory: (value: string) => void;
  setDetailFilter: string;
  setSetDetailFilter: (value: string) => void;
};

export const CardFilters: FC<Props> = ({
  rarityFilter,
  setRarityFilter,
  typeFilter,
  setTypeFilter,
  setCategory,
  setSetCategory,
  setDetailFilter,
  setSetDetailFilter,
}: Props) => {
  const selectStyles = 'rounded-md bg-red-100 p-2';
  return (
    <div className="flex flex-wrap gap-4">
      <select value={rarityFilter} onChange={e => setRarityFilter(e.target.value)} className={selectStyles}>
        <option value="">Alle Rarities</option>
        <option value="C">Character</option>
        <option value="R">Rare</option>
        <option value="SR">Super Rare</option>
        <option value="SEC">Secret Rare</option>
      </select>

      <select
        value={typeFilter}
        className={selectStyles}
        onChange={e => {
          const selectedType = e.target.value;
          setTypeFilter(selectedType);

          // Automatisch andere Filter zurücksetzen, wenn LEADER ausgewählt wird
          if (selectedType === 'LEADER') {
            setRarityFilter('');
          }
        }}
      >
        <option value="">Alle Types</option>
        <option value="CHARACTER">Character</option>
        <option value="LEADER">Leader</option>
        <option value="EVENT">Event</option>
        <option value="STAGE">Stage</option>
      </select>

      <select
        className={selectStyles}
        value={setCategory}
        onChange={e => {
          setSetCategory(e.target.value);
          setSetDetailFilter('');
        }}
      >
        <option value="">Alle Kategorien</option>
        <option value="SET">Booster Sets (OP)</option>
        <option value="PROMO">Promos (P)</option>
        <option value="STARTER">Starter Decks (ST)</option>
      </select>

      {(setCategory === 'SET' || setCategory === 'STARTER') && (
        <select value={setDetailFilter} onChange={e => setSetDetailFilter(e.target.value)} className={selectStyles}>
          <option value="">{setCategory === 'SET' ? 'Alle Sets' : 'Alle Starterdecks'}</option>
          {(setCategory === 'SET' ? setOptions : starterOptions).map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
