import React from "react";
import styles from "../actionButton/actionButton.module.css";

const AdvanceYearButton = ({ onClick, disabled = false }) => {
  return (
    <button
      className={`${styles.button} ${styles.advance}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Avançar para o próximo ano"
    >
      <span>+</span>
    </button>
  );
};

export default AdvanceYearButton;
