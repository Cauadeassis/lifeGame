import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

import heart from "../../icons/Heart.svg";
import smile from "../../icons/Smile.svg";
import sparkles from "../../icons/Sparkles.svg";
import brain from "../../icons/Brain.svg";

const icons = { heart, smile, sparkles, brain };

interface StatBarParameters {
  value: number;
  icon: "heart" | "smile" | "sparkles" | "brain";
  label: string;
}

const StatBar = ({
   value, 
   icon, 
   label 
}: StatBarParameters) => {
  const percentage = Math.min(value, 100);

  const getColor = () => {
    if (value >= 70) return "#10b981";
    if (value >= 40) return "#f59e0b";
    if (value < 40) return "var(--red)";
  };

  const iconSrc = icons[icon];

  return (
    <div className={styles.StatBar}>
      <header>
        <div>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={label}
              className={styles.icon}
              width={24}
              height={24}
            />
          )}
          <span>{label}</span>
        </div>
        <span>{value}</span>
      </header>

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
