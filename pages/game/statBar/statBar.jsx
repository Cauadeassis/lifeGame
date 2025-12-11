import React from "react";
import Heart from "./icons/Heart";
import Smile from "./icons/Smile";
import Sparkles from "./icons/Sparkles";
import Brain from "./icons/Brain";
import styles from "./statBar.module.css";

const StatBar = ({ value, icon, label }) => {
  const percentage = Math.min(value, 100);

  const getColor = () => {
    if (value >= 70) return "#10b981";
    if (value >= 40) return "#f59e0b";
    if (value < 40) return "var(--red)";
  };
  const icons = {
    heart: Heart,
    smile: Smile,
    sparkles: Sparkles,
    brain: Brain
  };

  const IconComponent = icons[icon];

  return (
    <div className={styles.StatBar}>
      <div className={styles.header}>
        <div className={styles.labelContainer}>
          {IconComponent && <IconComponent size={16} className={styles.icon} />}
          <span className={styles.label}>{label}</span>
        </div>
        <span className={styles.value}>{value}</span>
      </div>

      <div className={styles.barBackground}>
        <div
          className={styles.barFill}
          style={{
            width: `${percentage}%`,
            backgroundColor: getColor()
          }}
        >
          <div className={styles.barShine} />
        </div>
      </div>
    </div>
  );
};

export default StatBar;
