import React from "react";

interface ButtonProps {
  label: string;
  action: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, action }) => {
  return (
    <button
      onClick={action}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default Button;
