import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.scss";

interface ActionButtonParameters {
  icon: string | StaticImageData;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonParameters> = ({
  icon,
  onClick,
  label,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={styles.actionButton}
      onClick={onClick}
      title={label}
      aria-label={label}
      disabled={disabled}
    >
      <Image src={icon} alt={label} width={28} height={28} priority={false} />
    </button>
  );
};

export default ActionButton;
