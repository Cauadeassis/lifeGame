import React from "react";
import styles from "../styles/components/skinSelector.module.css";

const tones = [
  { id: "white", label: "Branco", color: "#F1D6B8" },
  { id: "middleTone", label: "Moreno", color: "#C68642" },
  { id: "black", label: "Negro", color: "#5C4033" },
];

export default function SkinSelector({ skinTone, setSkinTone }) {
  const handleChange = (event) => {
    const index = Number(event.target.value);
    setSkinTone(tones[index].id);
  };
  const currentIndex = tones.findIndex(tone => tone.id === skinTone);
  return (
    <div className={styles.skinSelector}>
      <label htmlFor="skinTone">Cor da Pele</label>
      <div
        className={styles.colorPreview}
        style={{ backgroundColor: tones[currentIndex]?.color || tones[0].color }}
      />
      <input
        id="skinTone"
        type="range"
        min={0}
        max={tones.length - 1}
        step={1}
        value={currentIndex}
        onChange={handleChange}
        className={styles.slider}
      />
      <div className={styles.labels}>
        {tones.map((tone, index) => (
          <span
            key={tone.id}
            className={`${styles.label} ${index === currentIndex ? styles.activeLabel : ""}`}
          >
            {tone.label}
          </span>
        ))}
      </div>
    </div>
  );
}
