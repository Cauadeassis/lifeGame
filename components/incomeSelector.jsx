import React from "react";
import styles from "../styles/components/incomeSelector.module.css";

export default function IncomeSelector({ income, setIncome }) {
  const incomeOptions = [
    { id: "poor", label: "Pobre" },
    { id: "middle", label: "Classe Média" },
    { id: "rich", label: "Rico" },
  ];
  return (
    <section className={styles.incomeContainer}>
      <label className={styles.label}>Renda Inicial</label>
      <div className={styles.incomeOptions}>
        {incomeOptions.map((option) => (
          <button
            key={option.id}
            className={`${styles.incomeButton} ${
              income === option.id ? styles.selected : ""
            }`}
            onClick={() => setIncome(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
