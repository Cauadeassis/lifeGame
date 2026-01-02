import {
  getWord,
  getRandomItem,
  getRandomDamage,
} from "../../services/utilities.ts";
import { BodyPart, GenderId, Gender, Relevance } from "../character/types.ts";
import { WordsDictionary } from "../dictionary/types.ts";

import rawArticles from "../dictionary/articles.json" with { type: "json" };
import rawPossessives from "../dictionary/possessives.json" with { type: "json" };
import rawMeleeAttacks from "./melee.json" with { type: "json" };
import rawWeaponAttacks from "./weapons.json" with { type: "json" };

const articles = rawArticles satisfies WordsDictionary;
const possessives = rawPossessives satisfies WordsDictionary;

type Impact = "light" | "medium" | "high";
type DamageType = "impact" | "perfuration";
type Modifiers = Partial<Record<string, number>>;
interface Messages {
  active: Record<Impact, string[]>;
  passive: Record<Impact, string[]>;
}
interface AttackData {
  name: string;
  damageType: DamageType;
  messages: Messages;
  modifiers: Modifiers;
}
type Attack = Record<string, AttackData>;
const meleeAttacks = rawMeleeAttacks as Attack;
const weaponAttacks = rawWeaponAttacks as Attack;

export type MeleeAttackName = keyof typeof meleeAttacks;
export type WeaponAttackName = keyof typeof weaponAttacks;
export type AttackName = MeleeAttackName | WeaponAttackName;

const meleeAttackNames = Object.keys(meleeAttacks) as MeleeAttackName[];
const weaponAttackNames = Object.keys(weaponAttacks) as WeaponAttackName[];

export interface BuildAttackParameters {
  attackName: AttackName;
  rawBodyPart: BodyPart;
  gender: Gender;
}

export interface GetMessageParameters {
  attackName: AttackName;
  bodyPart: BodyPart;
  impact: Impact;
  gender: Gender;
}
interface GetPartByGenderParameters {
  gender: GenderId;
  rawBodyPart: BodyPart;
}
interface GetImpactParameters {
  damage: number;
  relevance: Relevance;
}

interface GetDamageParameters {
  bodyPart: BodyPart;
  attackName: AttackName;
}

interface CheckIfLostParameters {
  impact: Impact;
  damageType?: DamageType;
  bodyPart: BodyPart;
}

interface ClampParameters {
  value: number;
  min?: number;
  max?: number;
}

const damageByRelevance = {
  medium: [0, 10],
  high: [10, 20],
  critical: [20, 30],
} as const;

const limitsByRelevance = {
  medium: 40,
  high: 80,
  critical: 100,
} as const;

const getImpact = ({ damage, relevance }: GetImpactParameters) => {
  const ratio = damage / limitsByRelevance[relevance];
  if (ratio <= 0.33) return "light";
  if (ratio <= 0.66) return "medium";
  return "high";
};

const clamp = ({ value, min = 0, max = 100 }: ClampParameters): number =>
  Math.max(min, Math.min(max, value));

const getDamage = ({ bodyPart, attackName }: GetDamageParameters) => {
  const [min, max] = damageByRelevance[bodyPart.relevance];
  let rawDamage = getRandomDamage(min, max);
  const getMultiplier = meleeAttacks[attackName].modifiers[bodyPart.id];
  const multiplier = getMultiplier ?? 1;
  rawDamage = Math.floor(rawDamage * multiplier);
  return clamp({
    value: rawDamage,
    max: limitsByRelevance[bodyPart.relevance],
  });
};

const checkIfLost = ({
  impact,
  bodyPart,
  damageType = "impact",
}: CheckIfLostParameters): boolean => {
  if (bodyPart.canBeLost && impact === "high" && damageType === "perfuration") {
    return true;
  }
  return false;
};

const getPartByGender = ({
  gender,
  rawBodyPart,
}: GetPartByGenderParameters): BodyPart => {
  const bodyPart = { ...rawBodyPart };
  if (bodyPart.id === "groin") {
    if (gender === "male") {
      return Math.random() < 0.5
        ? {
            ...bodyPart,
            name: "pênis",
            grammaticalGender: "male",
            canBeLost: true,
          }
        : {
            ...bodyPart,
            name: "testículos",
            grammaticalGender: "male",
            canBeLost: true,
            quantity: "plural",
          };
    }
    return { ...bodyPart, name: "vagina", grammaticalGender: "female" };
  }
  if (bodyPart.id === "chest" && gender === "female") {
    return {
      ...bodyPart,
      name: "seios",
      grammaticalGender: "male",
      quantity: "plural",
      canBeLost: true,
      relevance: "medium",
      beauty: 30,
    };
  }

  return bodyPart;
};

const getMessage = ({
  attackName,
  bodyPart,
  impact,
  gender,
}: GetMessageParameters) => {
  const article = getWord({
    file: articles,
    category: "defined",
    grammaticalGender: bodyPart.grammaticalGender,
    quantity: bodyPart.quantity,
  });

  const possessive = getWord({
    file: possessives,
    category: "secondPerson",
    grammaticalGender: bodyPart.grammaticalGender,
    quantity: bodyPart.quantity,
  });

  const rawMessage = getRandomItem(
    meleeAttacks[attackName].messages["active"][impact],
  );
  return rawMessage
    .replace("{article}", article)
    .replace("{pronoun}", gender.pronoun)
    .replace("{bodyPart}", bodyPart.name)
    .replace("{possessive}", possessive);
};

const buildAttack = ({
  attackName,
  rawBodyPart,
  gender,
}: BuildAttackParameters) => {
  const bodyPart = getPartByGender({ gender: gender.id, rawBodyPart });
  const damage = getDamage({ bodyPart, attackName });
  const impact = getImpact({ damage, relevance: bodyPart.relevance });
  const message = getMessage({ impact, attackName, bodyPart, gender });
  const lost = checkIfLost({ impact, bodyPart });
  return { damage, message, lost };
};
