import React from "react";
import styles from "./actionButton.module.css";
import Image from "next/image";

const ActionButton = ({ icon, onClick, label }) => {
  return (
    <button className={styles.button} onClick={onClick} title={label}>
      <Image src={icon} alt={label} width={28} height={28} />
    </button>
  );
};

export default ActionButton;
