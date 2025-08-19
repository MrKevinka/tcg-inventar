import React from 'react';

interface ButtonProps {
  label: string;
  action: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, action, className, disabled }) => {
  const handleClick = () => {
    // Call action, ignore if it's async
    void action(); // <- ignoriert das Promise, wenn vorhanden
  };
  return (
    <button disabled={disabled} onClick={handleClick} className={`${className}`}>
      {label}
    </button>
  );
};
