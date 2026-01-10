import { getWord, getRandomItem, getRandomDamage } from "./utilities";

import { BodyPart, GenderId, Gender, Relevance } from "../data/character/types";
import { WordsDictionary } from "../data/dictionary/types";
import { Attack, DamageType, Impact } from "../data/attacks/types";

import rawArticles from "../data/dictionary/articles.json";
import rawPossessives from "../data/dictionary/possessives.json";
import rawMeleeAttacks from "../data/attacks/melee.json";
import rawWeaponAttacks from "../data/attacks/weapons.json";

const articles = rawArticles satisfies WordsDictionary;
const possessives = rawPossessives satisfies WordsDictionary;

const meleeAttacks = rawMeleeAttacks as Attack;
const weaponAttacks = rawWeaponAttacks as Attack;

export type MeleeAttackName = keyof typeof meleeAttacks;
export type WeaponAttackName = keyof typeof weaponAttacks;
export type AttackName = MeleeAttackName | WeaponAttackName;

export interface BuildAttackProps {
  attackName: AttackName;
  rawBodyPart: BodyPart;
  gender: Gender;
}

interface GetImpactProps {
  damage: number;
  relevance: Relevance;
}

interface GetDamageProps {
  bodyPart: BodyPart;
  attackName: AttackName;
}

interface CheckIfLostProps {
  impact: Impact;
  damageType?: DamageType;
  bodyPart: BodyPart;
}

interface ClampProps {
  value: number;
  min?: number;
  max?: number;
}

class AttackService {
  private static readonly damageByRelevance = {
    medium: [0, 10],
    high: [10, 20],
    critical: [20, 30],
  } as const;

  private static readonly limitsByRelevance = {
    medium: 40,
    high: 80,
    critical: 100,
  } as const;

  public buildAttack({
    attackName,
    rawBodyPart,
    gender,
  }: BuildAttackProps) {
    const bodyPart = this.getPartByGender({
      gender: gender.id,
      rawBodyPart,
    });

    const damage = this.getDamage({ bodyPart, attackName });
    const impact = this.getImpact({
      damage,
      relevance: bodyPart.relevance,
    });

    const message = this.getMessage({
      attackName,
      bodyPart,
      impact,
      gender,
    });

    const lost = this.checkIfLost({ impact, bodyPart });

    return { damage, message, lost };
  }

  private getImpact({ damage, relevance }: GetImpactProps): Impact {
    const ratio = damage / AttackService.limitsByRelevance[relevance];

    if (ratio <= 0.33) return "light";
    if (ratio <= 0.66) return "medium";
    return "high";
  }

  private clamp({ value, min = 0, max = 100 }: ClampProps): number {
    return Math.max(min, Math.min(max, value));
  }

  private getDamage({ bodyPart, attackName }: GetDamageProps): number {
    const [min, max] = AttackService.damageByRelevance[bodyPart.relevance];

    let damage = getRandomDamage(min, max);

    const multiplier = meleeAttacks[attackName].modifiers[bodyPart.id] ?? 1;

    damage = Math.floor(damage * multiplier);

    return this.clamp({
      value: damage,
      max: AttackService.limitsByRelevance[bodyPart.relevance],
    });
  }

  private checkIfLost({
    impact,
    bodyPart,
    damageType = "impact",
  }: CheckIfLostProps): boolean {
    return (
      bodyPart.canBeLost && impact === "high" && damageType === "perfuration"
    );
  }

  private getPartByGender({
    gender,
    rawBodyPart,
  }: {
    gender: GenderId;
    rawBodyPart: BodyPart;
  }): BodyPart {
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
              quantity: "plural",
              canBeLost: true,
            };
      }

      return {
        ...bodyPart,
        name: "vagina",
        grammaticalGender: "female",
      };
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
  }

  private getMessage({
    attackName,
    bodyPart,
    impact,
    gender,
  }: {
    attackName: AttackName;
    bodyPart: BodyPart;
    impact: Impact;
    gender: Gender;
  }): string {
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
      meleeAttacks[attackName].messages.active[impact],
    );

    return rawMessage
      .replace("{article}", article)
      .replace("{pronoun}", gender.pronoun)
      .replace("{bodyPart}", bodyPart.name)
      .replace("{possessive}", possessive);
  }
}
export default AttackService;
