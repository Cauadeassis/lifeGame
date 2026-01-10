import styles from "./shared.module.css";

interface NameInputProps {
  playerName: string;
  setPlayerName: (name: string) => void;
}

export default function NameInput({
  playerName,
  setPlayerName,
}: NameInputProps) {
  return (
    <>
      <section className={styles.component}>
        <label htmlFor="playerName">Nome Completo</label>
        <input
          id="playerName"
          type="text"
          placeholder="Digite seu nome completo"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={50}
        />
      </section>
    </>
  );
}
