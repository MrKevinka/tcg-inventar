import React from "react";

interface ButtonProps {
  label: string;
  action: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ label, action, className }) => {
  return (
    <button
      onClick={action}
      className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
