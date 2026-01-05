export type Impact = "light" | "medium" | "high";
export type DamageType = "impact" | "perfuration";
export type Modifiers = Partial<Record<string, number>>;
export interface Messages {
  active: Record<Impact, string[]>;
  passive: Record<Impact, string[]>;
}
export interface AttackData {
  name: string;
  damageType: DamageType;
  messages: Messages;
  modifiers: Modifiers;
}
export type Attack = Record<string, AttackData>;
