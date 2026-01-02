import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const router = useRouter();
const goTo = (path: string) => router.push(path);

export const LoadingFallback = () => {
  return (
    <div>
      <section>
        <p>Carregando personagem...</p>
      </section>
    </div>
  );
};

export const NoCharacterFallback = () => {
  return (
    <div>
      <section>
        <p>Nenhum personagem encontrado.</p>
        <button type="button" onClick={() => goTo("/randomizer")}>
          Criar Personagem
        </button>
      </section>
    </div>
  );
};
