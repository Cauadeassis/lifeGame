import React from "react";
import styles from "./incomeSelector.module.css";
import incomes from "../../../backend/data/incomes";
export default function IncomeSelector({ gender, income, setIncome }) {
  const options = incomes[gender] || [];
  return (
    <section className={styles.incomeContainer}>
      <label className={styles.label}>Renda Inicial</label>
      <div className={styles.incomeOptions}>
        {options.map((option) => (
          <button
            key={option.id}
            className={`${styles.incomeButton} ${
              income.id === option.id ? styles.selected : ""
            }`}
            onClick={() => setIncome({ id: option.id, label: option.label })}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
