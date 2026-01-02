import React, { ChangeEvent } from "react";

import styles from "./skinSelector.module.scss";
import sharedStyles from "./shared.module.css";
import skinTonesData from "../../../../backend/data/character/skinTones.json" with { type: "json" };
import { Gender, SkinTone } from "../../../../backend/data/character/types.ts";

interface SkinSelectorParameters {
  gender: Gender["id"];
  skinTone: SkinTone;
  setSkinTone: (skinTone: SkinTone) => void;
}

type SkinTonesData = Record<Gender["id"], SkinTone[]>;

export default function SkinSelector({
  gender,
  skinTone,
  setSkinTone,
}: SkinSelectorParameters) {
  const skinTones = skinTonesData as SkinTonesData;
  const tones: SkinTone[] = skinTones[gender] || [];
  const currentIndex = tones.findIndex((tone) => tone.id === skinTone.id);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const index = Number(event.target.value);
    const selectedTone = tones[index];
    if (selectedTone) setSkinTone(selectedTone);
  };

  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;

  return (
    <section className={`${styles.skinSelector} ${sharedStyles.component}`}>
      <label htmlFor="skinTone">Cor da Pele</label>
      <div
        className={styles.colorPreview}
        style={{
          backgroundColor: tones[safeCurrentIndex]?.color || "#ccc",
        }}
        aria-label={`Cor selecionada: ${tones[safeCurrentIndex]?.label || "Nenhuma"}`}
      />
      <input
        id="skinTone"
        type="range"
        min={0}
        max={Math.max(0, tones.length - 1)}
        step={1}
        value={safeCurrentIndex}
        onChange={handleChange}
        className={styles.slider}
        aria-valuetext={tones[safeCurrentIndex]?.label}
      />

      <div className={styles.labelContainer}>
        {tones.map((tone, index) => (
          <span
            key={tone.id}
            className={index === safeCurrentIndex ? styles.activeLabel : ""}
          >
            {tone.label}
          </span>
        ))}
      </div>
    </section>
  );
}
