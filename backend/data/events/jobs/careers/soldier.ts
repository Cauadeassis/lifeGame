import { Event } from "../../types";
import {
  getRandomItem,
  getRandomDamage,
  getWord,
} from "../../../../services/utilities";

import rawBodyParts from "../../../character/bodyParts.json";
import rawAdjectives from "../../../dictionary/adjectives.json";
import rawVerbs from "../../../dictionary/verbs.json";
import rawPossessives from "../../../dictionary/possessives.json";

import {
  Gender,
  Relevance,
  Quantity,
  BodyPart,
  GenderId,
} from "../../../character/types";
import { WordsDictionary } from "../../../dictionary/types";
const bodyParts = rawBodyParts as BodyPart[];
const adjectives = rawAdjectives as WordsDictionary;
const verbs = rawVerbs as WordsDictionary;
const possessives = rawPossessives as WordsDictionary;

interface CheckIfExplodedParameters {
  damage: number;
  injuredPart: BodyPart;
}

interface GetMessageParameters {
  lost: boolean;
  injuredPart: BodyPart;
}

const getInjuredPart = (gender: GenderId): BodyPart => {
  const base = { ...getRandomItem(bodyParts) };
  if (base.id === "groin") {
    if (gender === "male") {
      return Math.random() < 0.5
        ? { ...base, name: "pênis", grammaticalGender: "male", canBeLost: true }
        : {
            ...base,
            name: "testículos",
            grammaticalGender: "male",
            canBeLost: true,
            quantity: "plural",
          };
    }
    return { ...base, name: "vagina", grammaticalGender: "female" };
  }

  if (base.id === "chest" && gender === "female") {
    return {
      ...base,
      name: "seios",
      grammaticalGender: "male",
      quantity: "plural",
      canBeLost: true,
      relevance: "medium",
      beauty: 30,
    };
  }

  return base;
};

const damageByRelevance = {
  medium: [0, 30],
  high: [20, 50],
  critical: [30, 100],
} as const;

const limitsByRelevance = {
  medium: 15,
  high: 35,
  critical: 100,
} as const;

const getDamage = (relevance: Relevance) => {
  const [min, max] = damageByRelevance[relevance];
  return getRandomDamage(min, max);
};

const checkIfExploded = ({
  damage,
  injuredPart,
}: CheckIfExplodedParameters): boolean => {
  return damage >= limitsByRelevance[injuredPart.relevance];
};

const getMessage = ({ injuredPart, lost }: GetMessageParameters): string => {
  const possessive = getWord({
    file: possessives,
    category: "secondPerson",
    grammaticalGender: injuredPart.grammaticalGender,
    quantity: injuredPart.quantity,
  });

  const verb = getWord({
    file: verbs,
    category: "foi",
    grammaticalGender: injuredPart.grammaticalGender,
    quantity: injuredPart.quantity,
  });

  const adjective = getWord({
    file: adjectives,
    category: lost ? "explodido" : "atingido",
    grammaticalGender: injuredPart.grammaticalGender,
    quantity: injuredPart.quantity,
  });

  return `${possessive} ${injuredPart.name} ${verb} ${adjective}!`;
};

const terrestrialSituations = [
  "Você está sob fogo de sniper.",
  "Uma granada explode perto de você.",
  "Você está em combate corpo a corpo.",
  "Seu esquadrão está cercado.",
];

const marineSituations = [
  "Um navio inimigo se aproxima.",
  "Você vê algo se mexendo na água.",
  "Alguns aviões passam voando por cima. Você não sabe se são aliados ou inimigos.",
  "Uma frota de navios se aproxima!",
];

const aerialSituations = [
  "Você está sendo atacado por caças inimigos.",
  "Seu avião está perdendo altitude rapidamente.",
  "Você avista um comboio inimigo abaixo de você.",
  "Seu avião foi atingido por fogo antiaéreo!",
];
export const createCombatEvent = (gender: Gender): Event => {
  const situation = getRandomItem(terrestrialSituations);
  const injuredPart = getInjuredPart(gender["id"]);
  const damage = getDamage(injuredPart.relevance);
  const lost = checkIfExploded({ damage, injuredPart });
  const message = getMessage({ injuredPart, lost });
  console.log(message);

  return {
    title: "Combate",
    description: situation,
    options: [
      {
        text: "Atacar",
        risk: {
          chance: 0.4,
          onFail: {
            text: "Você foi atingido!",
            message: message,
            effects: {
              health: -damage,
              mentalHealth: -Math.floor(damage / 2),
            },
          },
          onSuccess: {
            text: "Missão cumprida!",
            message: "Você completou a missão sem ferimentos graves.",
            effects: {
              mentalHealth: 10,
            },
          },
        },
      },
      {
        text: "Buscar cobertura",
        effects: {
          health: -3,
          mentalHealth: -2,
        },
        message: "Você se protege e recua com segurança.",
      },
    ],
  };
};
