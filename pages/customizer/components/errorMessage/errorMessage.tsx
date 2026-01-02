import React from "react";
import styles from "./errorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  show: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, show }) => {
  if (!message) return null;

  return (
    <section className={styles.errorMessage}>
      <p
        role="alert"
        aria-live="assertive"
        className={!show ? styles.fadeOut : ""}
      >
        {message}
      </p>
    </section>
  );
};

export default ErrorMessage;
