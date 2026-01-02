import { useRouter } from "next/router";
import Head from "next/head";

import styles from "../styles/pages/initialPage.module.css";

import Header from "../components/header/header.jsx";
import ThemeToggle from "../components/themeToggle/themeToggle.jsx";

export default function InitialPage() {
  const router = useRouter();
  const goTo = (path: string) => router.push(path);

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon.png"
        />
        <title>Página Inicial</title>
      </Head>
      <div className={styles.body}>
        <Header />
        <main>
          <ThemeToggle />
          <section>
            <button onClick={() => goTo("/customizer/customizer")}>
              Customizar personagem
            </button>
            <button onClick={() => goTo("/randomizer/randomizer")}>
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
