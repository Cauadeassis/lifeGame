"use client";

import { useRouter } from "next/navigation";

import styles from "./styles.module.css";

import Header from "../components/header";
import ThemeToggle from "../components/themeToggle";

export default function InitialPage() {
  const router = useRouter();

  return (
    <>
      <div className={styles.body}>
        <Header />
        <main>
          <ThemeToggle />
          <section>
            <button onClick={() => router.push("/customizer")}>
              Customizar personagem
            </button>
            <button onClick={() => router.push("/randomizer")}>
              Criar personagem aleatório
            </button>
          </section>
        </main>
        <footer>
          <p>v0.5.8-alpha</p>
        </footer>
      </div>
    </>
  );
}
