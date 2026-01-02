import React from "react";
import {
  Character,
  Stats,
  Gender,
} from "../../../../../backend/data/character/types.ts";

const lower = (text: string): string => text.toLowerCase();

interface PlayerMessageProps {
  player: Character;
}

interface ParentMessageProps {
  character: Character | null;
  parent: "pai" | "mãe";
}

interface StatMessageProps {
  stats: Stats;
  gender: Gender;
}

export const PlayerMessage: React.FC<PlayerMessageProps> = ({ player }) => {
  return (
    <p>
      Olá! Sou {lower(player.skinTone.label)}, {player.demonym}.
    </p>
  );
};

export const ParentMessage: React.FC<ParentMessageProps> = ({
  character,
  parent,
}) => {
  if (!character) {
    return <p>Eu não tenho {parent}.</p>;
  }
  const { stats, gender, firstName, lastName } = character;

  return (
    <p>
      {gender.possessive} {parent} se chama {firstName} {lastName}.{" "}
      {gender.pronoun} é {gender.article} {gender.identity} muito{" "}
      {statMessage({ stats, gender })}.
    </p>
    /* Meu pai se chama Roberto Carlos. Ele é um homem muito feliz.*/
    /* Minha mãe se chama Fernanda Torres. Ela é uma mulher muito inteligente.*/
  );
};

const statMessage = ({ stats, gender }: StatMessageProps): string => {
  if (stats.health >= 70) {
    return gender.pronoun === "ele" ? "vigoroso" : "vigorosa";
  }

  if (stats.mentalHealth >= 70) {
    return "feliz";
  }

  if (stats.beauty >= 70) {
    return gender.pronoun === "ele" ? "bonito" : "bonita";
  }

  if (stats.intellect >= 70) {
    return "inteligente";
  }

  return "comum";
};
