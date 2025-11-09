import React from "react";
import styles from "../styles/game.module.css";


export default function Game() {
  const stats = {
    altura: { value: 1.68, maxValue: 100 },
    Beleza: { value: 9, maxValue: 100 },
    peso: { value: 57, maxValue: 100 },
    piru: { value: 19, maxValue: 100 },
  };

  const statKeys = Object.keys(stats);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <div className={styles.playerInfo}>
          <div className={styles.playerAvatar}></div>
          <h2 className={styles.playerName}>Ramell Seaman</h2>
          <span className={styles.playerStatus}>Infant</span>
        </div>


        <div className={styles.playerBalance}>
          <span className={styles.money}>$0</span>
        </div>
      </header>

      <section className={styles.messagesContainer}>
        <h3 className={styles.ageMessage}>Age: 0 years</h3>
        <p className={styles.textMessage}>bioText-test</p>
      </section>

      <section className={styles.actionsContainer}>
        <button className={styles.actionButton}>Activities</button>
        <button className={styles.actionButton}>Assets</button>
        <button className={styles.actionButton}>Age Up</button>
        <button className={styles.actionButton}>Relationships</button>
      </section>

      <section className={styles.statsContainer}>
        {statKeys.map((key) => (
          <div className={styles.singleStat} key={key}>
            {key[0].toUpperCase() + key.slice(1)}:{" "}
            <span className={styles.singleStatSpan}>{stats[key].value}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
