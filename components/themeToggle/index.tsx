import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import moon from "./moon.svg";
import sun from "./sun.svg";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Image src={moon} alt="Dark mode" width={24} height={24} />
      ) : (
        <Image src={sun} alt="Light mode" width={24} height={24} />
      )}
    </button>
  );
}
