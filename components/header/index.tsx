import React from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Header() {
  const router = useRouter();
  const goTo = (path: string) => router.push(path);
  return (
    <header className={styles.header}>
      <h1 onClick={() => goTo("/")}>Vida Eletrônica</h1>
    </header>
  );
}
