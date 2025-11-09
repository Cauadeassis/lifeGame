import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/header.module.css";

export default function Header() {
  const router = useRouter();
  const handleTitleClick = () => {
    router.push("/");
  };
  return (
    <header className={styles.header}>
      <h1 onClick={handleTitleClick} className={styles.title}>
        Vida Eletrônica
      </h1>
    </header>
  );
}