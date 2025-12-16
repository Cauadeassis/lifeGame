import { useState, useeffects } from "react";
import styles from "./themeToggle.module.css";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("dark");
    useeffects(() => {
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                        cx="12"
                        cy="12"
                        r="5"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <line
                        x1="12"
                        y1="1"
                        x2="12"
                        y2="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="12"
                        y1="21"
                        x2="12"
                        y2="23"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="4.22"
                        y1="4.22"
                        x2="5.64"
                        y2="5.64"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="18.36"
                        y1="18.36"
                        x2="19.78"
                        y2="19.78"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="1"
                        y1="12"
                        x2="3"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="21"
                        y1="12"
                        x2="23"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="4.22"
                        y1="19.78"
                        x2="5.64"
                        y2="18.36"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <line
                        x1="18.36"
                        y1="5.64"
                        x2="19.78"
                        y2="4.22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        </button>
    );
}
