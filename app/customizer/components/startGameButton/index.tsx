import React from "react";
import styles from "./styles.module.scss";
import sharedStyles from "../shared.module.css"

interface StartGameButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  text = "Vamos jogar",
}) => {
  return (
    <section className={sharedStyles.component}>
      <button
        type="button"
        className={styles.startGameButton}
        onClick={onClick}
        disabled={disabled || loading}
        aria-busy={loading}
      >
        {loading ? "Iniciando..." : text}
      </button>
    </section>
  );
};

export default StartGameButton;
