import { buttonVariants } from '@/utils/buttonVariants';

import Button from '../Button/Button';

type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
};

export const PaginationControls = ({ currentPage, totalPages, onPrev, onNext, className = '' }: Props) => {
  return (
    <div className={`my-4 flex items-center justify-center gap-4 ${className}`}>
      <Button action={onPrev} label="⬅️ Zurück" className={buttonVariants.pagination} />
      <span>
        Seite {currentPage} von {totalPages}
      </span>
      <Button
        action={onNext}
        label="Weiter ➡️"
        disabled={currentPage === totalPages}
        className={buttonVariants.pagination}
      />
    </div>
  );
};
