import countries from "../../../backend/data/character/countries.json" ;
type CountryCode = keyof typeof countries;
import styles from "./shared.module.css";

interface CountrySelectorParameters {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
}

export default function countrySelector({
  country,
  setCountry,
}: CountrySelectorParameters) {
  const lower = (text: string) => text.toLowerCase();
  return (
    <>
      <section className={styles.component}>
        <label htmlFor="country">País de Origem</label>
        <select
          id="country"
          value={country}
          onChange={(event) => {
            const value = event.target.value as CountryCode;
            setCountry(value);
          }}
        >
          <option value="">Selecione...</option>

          {Object.entries(countries).map(([countryCode, countryData]) => (
            <option key={countryCode} value={countryCode}>
              <img
                src={`https://flagcdn.com/w40/${lower(countryCode)}.png`}
                alt={`Bandeira do ${countryData.name}`}
              />
              {countryData.name}
            </option>
          ))}
        </select>
      </section>
    </>
  );
}
