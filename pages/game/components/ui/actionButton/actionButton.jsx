import React from "react";
import styles from "./actionButton.module.css";

const ActionButton = ({ icon: Icon, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <Icon size={28} />
    </button>
  );
};

export default ActionButton;
