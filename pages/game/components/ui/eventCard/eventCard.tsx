import React, { useState } from "react";
import styles from "./eventCard.module.scss";
import {
  Event,
  Option,
  Result,
} from "../../../../../backend/data/events/types.ts";

interface EventCardParameters {
  event: Event;
  onOptionSelect: (option: Option) => void;
}

const EventCard: React.FC<EventCardParameters> = ({
  event,
  onOptionSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [title, setTitle] = useState<String>("Sem título");
  const [description, setDescription] = useState<String>("Sem descrição");

  const handleTwoOptionsClick = (option: Option): void => {
    setSelectedOption(option);
    onOptionSelect(option);
  };

  const handleMultipleOptionsChange = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const optionIndex = parseInt(changeEvent.target.value);
    const option = event.options ? event.options[optionIndex] : null;
    if (option) setSelectedOption(option);
  };

  const handleMultipleOptionsSubmit = (): void => {
    if (selectedOption) onOptionSelect(selectedOption);
  };

  const renderOptions = () => {
    if (!event.options || event.options.length === 0) {
      return null;
    }

    if (event.type === "twoOptions") {
      return (
        <div className={styles.twoOptionsContainer}>
          {event.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleTwoOptionsClick(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      );
    }

    if (event.type === "multipleOptions") {
      return (
        <div className={styles.multipleOptionsContainer}>
          <select onChange={handleMultipleOptionsChange} defaultValue="">
            <option value="" disabled>
              Escolha uma opção...
            </option>
            {event.options.map((option, index) => (
              <option key={index} value={index}>
                {option.text}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleMultipleOptionsSubmit}
            disabled={!selectedOption}
          >
            Confirmar
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.eventCard}>
      <header>
        <h2>{event.title}</h2>
      </header>

      <section className={styles.descriptionContainer}>
        <p>{event.description}</p>
      </section>
      {renderOptions()}
    </div>
  );
};

export default EventCard;
