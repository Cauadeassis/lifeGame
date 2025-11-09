import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/pages/initialPage.module.css";
import Header from "../components/header";

export default function InitialPage() {
  const [playerName, updatePlayerName] = useState("");
  const router = useRouter();

  const handlePlayerNameChange = (event) => {
    updatePlayerName(event.target.value);
  };

  const handleNavigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.main}>
        <div className={styles.buttonsContainer}>
          <button onClick={() => handleNavigateTo("/customizer")}>
            Customizar personagem
          </button>
          <button onClick={() => handleNavigateTo("/randomizer")}>
            Criar personagem aleatório
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.version}>v0.0.1 alpha</span>
      </footer>
    </div>
  );
}
