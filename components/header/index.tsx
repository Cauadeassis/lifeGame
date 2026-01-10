import React from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <h1 onClick={() => router.push("/")}>Vida Eletrônica</h1>
    </header>
  );
}
