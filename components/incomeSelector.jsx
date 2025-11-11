import React from "react";
import styles from "../styles/components/incomeSelector.module.css";

export default function IncomeSelector({ income, setIncome }) {
  return (
    <section className={styles.incomeContainer}>
      <label className={styles.label}>Renda Inicial</label>
      <div className={styles.incomeOptions}>
        {['poor', 'middleClass', 'rich'].map((option) => (
          <button
            key={option}
            className={`${styles.incomeButton} ${income === option ? styles.selected : ''}`}
            onClick={() => setIncome(option)}
          >
            {option === 'poor' && 'Pobre'}
            {option === 'middleClass' && 'Classe Média'}
            {option === 'rich' && 'Rico'}
          </button>
        ))}
      </div>
    </section>
  )
}
