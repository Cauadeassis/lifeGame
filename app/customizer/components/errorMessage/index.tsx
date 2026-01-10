import React from "react";
import styles from "./styles.module.css";

const ErrorMessage: React.FC = () => {
  return (
    <section className={styles.errorMessage}>
      <p
        role="alert"
        aria-live="assertive"
        className={styles.fadeOut}
      >
        Preencha todos os campos!
      </p>
    </section>
  );
};

export default ErrorMessage;
