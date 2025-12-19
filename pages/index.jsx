import { useRouter } from "next/router";
import styles from "../styles/pages/initialPage.module.css";
import Header from "../components/header/header.jsx";
import Head from "next/head";
import ThemeToggle from "../components/themeToggle/themeToggle.jsx";
export default function InitialPage() {
  const router = useRouter();
  const handleNavigateTo = (path) => {
    router.push(path);
  };
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
        <main className={styles.main}>
          <ThemeToggle />
          <div className={styles.buttonsContainer}>
            <button onClick={() => handleNavigateTo("/customizer/customizer")}>
              Customizar personagem
            </button>
            <button onClick={() => handleNavigateTo("/randomizer/randomizer")}>
              Criar personagem aleatório
            </button>
          </div>
        </main>
        <footer className={styles.footer}>
          <span className={styles.version}>v0.5.8-alpha</span>
        </footer>
      </div>
    </>
  );
}
