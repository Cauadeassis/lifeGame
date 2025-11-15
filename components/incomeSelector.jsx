import React from "react";
import styles from "../styles/components/incomeSelector.module.css";
import { incomes } from "../data/incomes";
export default function IncomeSelector({ gender, income, setIncome }) {
  const options = incomes[gender] || [];
  return (
    <section className={styles.incomeContainer}>
      <label className={styles.label}>Renda Inicial</label>
      <div className={styles.incomeOptions}>
        {options.map((option) => (
          <button
            key={option.id}
            className={`${styles.incomeButton} ${income === option.id ? styles.selected : ""
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
