import { getRandomItem } from "../../models/randomizer";
import genders from "./genders.json";
import { resolveAttack } from "../models/fights";
export const elementarSchoolCards = [
    {
        type: "twoOptions",
        text: "Um famoso escritor infantil visita a escola para autografar livros. Você não sabia que ele viria hoje!",
        options: {
            firstOption: {
                text: "Entrar na fila do autógrafo.",
                /*effect: { happiness: +3, creativity: +2 }*/
            },
            secondOption: {
                text: "Assistir de longe.",
                /*effect: { happiness: +1 }*/
            },
        },
    },
    {
        type: "multipleOptions",
        text: "A professora de artes pede um trabalho sobre música. O que você escolhe?",
        options: [
            {
                text: "Pop",
                /*effect: { happiness: +3, creativity: +2 }*/
            },
            {
                text: "Rap",
                /*effect: { happiness: +1 }*/
            },
            {
                text: "Rock",
                /*effect: { happiness: +1 }*/
            },
            {
                text: "Não fazer nada",
                /*effect: { happiness: +1 }*/
            },
        ],
    },
];
export const highSchoolCards = [
    {
        type: "twoOptions",
        text: "Seu professor te pegou usando o celular na sala!",
        options: {
            firstOption: {
                text: "Nunca mais usar em sala",
                /*effect: { happiness: +3, creativity: +2 }*/
            },
            secondOption: {
                text: "Continuar usando escondido",
                /*effect: { happiness: +1 }*/
            },
        },
    },
    {
        type: "multipleOptions",
        text: "Você ouve falar sobre atividades extracurriculares. Qual esporte você quer fazer?",
        options: [
            {
                text: "Futebol",
                /*effect: { happiness: +3, creativity: +2 }*/
            },
            {
                text: "Basquete",
                /*effect: { happiness: +1 }*/
            },
            {
                text: "Vôlei",
                /*effect: { happiness: +1 }*/
            },
            {
                text: "Handball",
                /*effect: { happiness: +1 }*/
            },
            {
                text: "Não fazer nada",
                /*effect: { happiness: +1 }*/
            },
        ],
    },
];
function createBullyingCard({ id, maleText, femaleText }) {
    return {
        id,
        type: "twoOptions",
        aggressorGender: getRandomItem(genders),
        male: { text: maleText },
        female: { text: femaleText },
        options: {
            firstOption: {
                text: "Não fazer nada",
            },
            secondOption: {
                mode: "select",
                text: {
                    male: "Bater nele",
                    female: "Bater nela",
                },
                choices: {
                    male: [
                        { label: "Chute na virilha", value: "groinKick" },
                        { label: "Soco no queixo", value: "chinPunch" },
                    ],
                    female: [
                        { label: "Puxar o cabelo", value: "hairPull" },
                        { label: "Empurrar para longe", value: "push" },
                    ],
                },
                /*onSelectAttack(attackType) {
                  return resolveAttack(attackType);
                }*/
            },
        },
    };
}
export const bullyingCards = [
    createBullyingCard({
        id: "happinessBullying",
        maleText: "Um garoto disse que você é triste e sem graça.",
        femaleText: "Uma garota disse que você é triste e sem graça.",
    }),

    createBullyingCard({
        id: "appearanceBullying",
        maleText: "Um garoto zoou sua aparência na frente da turma.",
        femaleText: "Uma garota zoou sua aparência na frente da turma.",
    }),

    createBullyingCard({
        id: "intelligenceBullying",
        maleText: "Um garoto disse que você é burro.",
        femaleText: "Uma garota disse que você é burro.",
    }),
];
