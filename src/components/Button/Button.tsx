import React from "react";

interface ButtonProps {
  label: string;
  action: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  action,
  className,
  disabled,
}) => {
  return (
    <button disabled={disabled} onClick={action} className={`${className}`}>
      {label}
    </button>
  );
};

export default Button;
