export const incomeIds = [
  { id: "poor" },
  { id: "middle" },
  { id: "rich" },
] as const;

export type GenderId = "male" | "female";
export type IncomeId = typeof incomeIds[number]["id"];

export const incomeLabels = {
  pt: {
    male: {
      poor: "Pobre",
      middle: "Classe Média",
      rich: "Rico",
    },
    female: {
      poor: "Pobre",
      middle: "Classe Média",
      rich: "Rica",
    },
  },
} as const;

export type Language = keyof typeof incomeLabels;

interface GetIncomeLabelProps {
  incomeId: IncomeId;
  gender: GenderId;
  language?: Language;
}

function getIncomeLabel({ 
  incomeId, 
  gender,
   language = "pt"}: GetIncomeLabelProps) {
  return incomeLabels[language][gender][incomeId];
}