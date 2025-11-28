import React from "react";
import styles from "./skinSelector.module.css";
import { skinTones } from "../../data/skinTones";
export default function SkinSelector({ gender, skinTone, setSkinTone }) {
  const tones = skinTones[gender] || [];
  const currentIndex = tones.findIndex((tone) => tone.id === skinTone.id);
  const handleChange = (event) => {
    const index = Number(event.target.value);
    const selectedTone = tones[index];
    if (selectedTone) {
      setSkinTone({ id: selectedTone.id, label: selectedTone.label });
    }
  };
  return (
    <div className={styles.skinSelector}>
      <label htmlFor="skinTone">Cor da Pele</label>
      <div
        className={styles.colorPreview}
        style={{
          backgroundColor:
            tones[currentIndex]?.color || tones[0]?.color || "#ccc",
        }}
      />
      <input
        id="skinTone"
        type="range"
        min={0}
        max={tones.length - 1}
        step={1}
        value={currentIndex >= 0 ? currentIndex : 0}
        onChange={handleChange}
        className={styles.slider}
      />

      <div className={styles.labels}>
        {tones.map((tone, index) => (
          <span
            key={tone.id}
            className={`${styles.label} ${index === currentIndex ? styles.activeLabel : ""
              }`}
          >
            {tone.label}
          </span>
        ))}
      </div>
    </div>
  );
}
