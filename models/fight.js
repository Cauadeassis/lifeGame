function getRandomDamage(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function resolveAttack(attackType) {
  const damage = getRandomDamage();
  const attack = attackMessages[attackType];
  return {
    damage,
    message: attack.messages[damage],
    attackName: attack.name
  };
}
export const attackMessages = {
  groinKick: {
    name: "Chute na virilha",
    messages: {
      0: "Você errou completamente!",
      1: "Seu pé acertou a perna dele",
      2: "Você acertou de leve, mas não fez muita diferença",
      3: "Um chute fraco, ele só deu um passo para trás",
      4: "Você acertou, mas não foi muito forte",
      5: "O chute pegou em cheio, ele se contorceu um pouco",
      6: "Um bom chute! Ele curvou o corpo instintivamente",
      7: "O chute doeu visivelmente! Ele cambaleou",
      8: "Um chute poderoso! Ele caiu de joelhos",
      9: "Quase desmaiou com o impacto!",
      10: "CRÍICO! Ele foi castrado com o chute"
    }
  },

  chinPunch: {
    name: "Soco no queixo",
    messages: {
      0: "Você errou completamente!",
      1: "Você só roçou o queixo dele.",
      2: "Um soco fraco, quase não moveu a cabeça dele.",
      3: "Você acertou um soco leve no queixo.",
      4: "Um soco mediano, fez a cabeça dele balançar.",
      5: "Bom soco! Ele deu um passo para trás.",
      6: "Acertou bem! Ele levou a mão ao rosto.",
      7: "O soco foi forte! Ele ficou tonto.",
      8: "Um soco excelente! Ele caiu no chão",
      9: "O golpe abriu o queixo dele!",
      10: "CRÍTICO! Seu soco o mandou pro hospital"
    }
  },

  hairPull: {
    name: "Puxar o cabelo",
    messages: {
      0: "Você errou até de puxar o cabelo… como isso aconteceu?",
      1: "Seu puxão mal pegou em alguns fios.",
      2: "Você puxou um pouco, ela reclamou, mas nada demais.",
      3: "Um puxão fraco, ela só ficou irritada.",
      4: "Um puxão moderado, ela gritou baixinho.",
      5: "Você puxou forte o suficiente pra ela se afastar.",
      6: "O puxão doeu! Ela se desequilibrou.",
      7: "Você puxou com força! Ela reclamou alto.",
      8: "Um puxão fortíssimo! Ela quase caiu pra frente.",
      9: "O puxão arrancou alguns fios, ela está desesperada!",
      10: "CRÍTICO! Você deixou ela careca!"
    }
  },

  push: {
    name: "Empurrar para longe",
    messages: {
      0: "Você tentou empurrar, mas escorregou e falhou miseravelmente.",
      1: "Seu empurrão mal saiu do lugar.",
      2: "Você encostou, mas mal moveu ela",
      3: "Empurrão fraco, ela te olhou feio.",
      4: "Empurrão moderado, ela deu um passo para trás.",
      5: "Bom empurrão! Eal perdeu um pouco do equilíbrio.",
      6: "Empurrão forte! Ela balançou bastante.",
      7: "Um empurrão poderoso! Ela teve que se segurar.",
      8: "Você empurrou com tudo! Ela caiu sentada.",
      9: "Empurrão brutal! Ela deslizou pelo chão.",
      10: "CRÍTICO! Você a lançou longe como se fosse uma boneca."
    }
  }
};