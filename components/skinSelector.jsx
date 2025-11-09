import React, { useState } from "react";
import styles from "../styles/skinSelector.module.css";

export default function SkinSelector() {
  const [skinTone, setSkinTone] = useState(1);

  const tones = [
    { id: 0, label: "Fácil", color: "#F1D6B8" },
    { id: 1, label: "Médio", color: "#C68642" },
    { id: 2, label: "Difícil", color: "#5C4033" },
  ];

  const handleChange = (event) => {
    setSkinTone(Number(event.target.value));
  };

  return (
    <div className={styles.skinSelector}>
      <label htmlFor="skinTone">Dificuldade do jogo</label>

      <div
        className={styles.colorPreview}
        style={{ backgroundColor: tones[skinTone].color }}
      />

      <input
        id="skinTone"
        type="range"
        min="0"
        max="2"
        step="1"
        value={skinTone}
        onChange={handleChange}
        className={styles.slider}
      />

      <div className={styles.labels}>
        {tones.map((tone) => (
          <span
            key={tone.id}
            className={`${styles.label} ${tone.id === skinTone ? styles.activeLabel : ""
              }`}
          >
            {tone.label}
          </span>
        ))}
      </div>
    </div>
  );
}