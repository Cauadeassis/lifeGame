import React, { MouseEvent } from "react";
import styles from "../actionButton/styles.module.css";

interface AdvanceYearButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AdvanceYearButton: React.FC<AdvanceYearButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onClick();
  };

  return (
    <button
      type="button"
      className={styles.actionButton}
      onClick={handleClick}
      disabled={disabled}
      aria-label="Avançar para o próximo ano"
      title="Avançar ano"
    >
      <span aria-hidden="true">+</span>
    </button>
  );
};

export default AdvanceYearButton;
