import { Gender } from "../../../backend/data/character/types";
import styles from "./shared.module.css";

interface GenderSelectorProps {
  gender: Gender;
  handleGenderChange: (value: string) => void;
}

export default function GenderSelector({
  gender,
  handleGenderChange,
}: GenderSelectorProps) {
  return (
    <>
      <section className={styles.component}>
        <label htmlFor="gender">Gênero</label>
        <select
          id="gender"
          value={gender.id}
          onChange={(event) => handleGenderChange(event.target.value)}
        >
          <option value="">Selecione...</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </select>
      </section>
    </>
  );
}
