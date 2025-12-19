import React from "react";
import Image from "next/image";
import styles from "./statBar.module.css";

import heart from "../../icons/Heart.svg";
import smile from "../../icons/Smile.svg";
import sparkles from "../../icons/Sparkles.svg";
import brain from "../../icons/Brain.svg";

const icons = {
  heart,
  smile,
  sparkles,
  brain,
};

const StatBar = ({ value, icon, label }) => {
  const percentage = Math.min(value, 100);

  const getColor = () => {
    if (value >= 70) return "#10b981";
    if (value >= 40) return "#f59e0b";
    if (value < 40) return "var(--red)";
  };

  const iconSrc = icons[icon];

  return (
    <div className={styles.StatBar}>
      <div className={styles.header}>
        <div className={styles.labelContainer}>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={label}
              className={styles.icon}
              width={24}
              height={24}
            />
          )}
          <span className={styles.label}>{label}</span>
        </div>
        <span className={styles.value}>{value}</span>
      </div>

      <div className={styles.barBackground}>
        <div
          className={styles.barFill}
          style={{
            width: `${percentage}%`,
            backgroundColor: getColor(),
          }}
        >
          <div className={styles.barShine} />
        </div>
      </div>
    </div>
  );
};

export default StatBar;
