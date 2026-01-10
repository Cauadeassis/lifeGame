import React from "react";
import styles from "./styles.module.css";
import sharedStyles from "../shared.module.css";
import incomes from "../../../../backend/data/character/incomes";
import { Income, Gender } from "../../../../backend/data/character/types";

interface IncomeSelectorProps {
  gender: Gender["id"];
  income: Income;
  setIncome: (income: Income) => void;
}

export default function IncomeSelector({
  gender,
  income,
  setIncome,
}: IncomeSelectorProps) {
  const options: Income[] =
    (incomes as Record<Gender["id"], Income[]>)[gender] || [];

  return (
    <section className={sharedStyles.component}>
      <label>Renda Inicial</label>
      <div className={styles.incomeOptions}>
        {options.map((option) => (
          <button
            key={option.id}
            className={`${styles.incomeButton} ${
              income.id === option.id ? styles.selected : ""
            }`}
            onClick={() => setIncome(option)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
