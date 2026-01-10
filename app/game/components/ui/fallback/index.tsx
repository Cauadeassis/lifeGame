import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const router = useRouter();

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
        <button type="button" onClick={() => router.push("/randomizer")}>
          Criar Personagem
        </button>
      </section>
    </div>
  );
};
