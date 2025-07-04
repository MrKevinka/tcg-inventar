import React from "react";

interface ButtonWithLabelProps {
  label: string;
  action: () => void;
}

const ButtonWithLabel: React.FC<ButtonWithLabelProps> = ({ label, action }) => {
  return (
    <button
      onClick={action}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default ButtonWithLabel;
