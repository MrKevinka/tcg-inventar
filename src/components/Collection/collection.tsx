'use client';

import { useInventory } from '@/hooks/useInventory';
import { copyInventoryToClipboard } from '@/utils/inventoryUtils';

import cards2 from '../../data/cards';
import { Button } from '../Button/Button';

export const Collection = () => {
  const { inventory, removeCard, clearInventory } = useInventory();
  const collectionBtn = 'my-4 rounded  px-4 py-2 text-white ';
  const totalCards = inventory.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="pb-20">
      <a href="#start" className="self-end">
        Zum Start ↑
      </a>
      <h2 className="mt-2 text-2xl font-semibold" id="sammlung">
        🗃️ Meine Sammlung:{/* 👇 Gesamtanzahl anzeigen */}
        {inventory.length > 0 && (
          <h3 className="mb-4 text-lg font-medium">
            📦 Insgesamt {totalCards} Karte{totalCards === 1 ? '' : 'n'}
          </h3>
        )}
      </h2>

      {inventory.length > 0 && (
        <div className="flex gap-2">
          <Button
            label="🗑️ Alles entfernen"
            className={`${collectionBtn} bg-red-600 hover:bg-red-700`}
            action={() => {
              const confirmed = window.confirm('⚠️ Bist du sicher, dass du deine gesamte Sammlung löschen möchtest?');
              if (confirmed) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                clearInventory();
              }
            }}
          />
          <Button
            label={'Copy to Clipboard'}
            action={copyInventoryToClipboard}
            className={`${collectionBtn} bg-green-600 hover:bg-green-700`}
          />
        </div>
      )}

      <ul className="ml-2 flex list-disc flex-col md:ml-28">
        {inventory.map(item => {
          const card = cards2.find(c => c.CardNum === item.CardNum);
          if (!card) return null;
          return (
            <li key={item.CardNum} className="flex items-center pb-2">
              <span className="border-b">{`${card.Name} - ${card.CardNum.slice(1)}: ${item.quantity}x`}</span>
              <Button label={'🗑️'} action={() => removeCard(card.CardNum)} className="mx-4 rounded border-2 p-0.5" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
