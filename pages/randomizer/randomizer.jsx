import React, { useState, useeffects } from "react";
import { useRouter } from "next/router";
import styles from "./randomizer.module.css";
import Header from "../../components/header/header.jsx";
import Head from "next/head";
import GameDifficulty from "../../components/gameDifficulty/gameDifficulty.jsx";
import ThemeToggle from "../../components/themeToggle/themeToggle.jsx";
export default function Randomizer() {
    const router = useRouter();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleRandomize = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/character/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Erro ao gerar personagem");
            }
            const newCharacter = await response.json();
            setCharacter(newCharacter);
        } catch (error) {
            console.error("Erro ao gerar personagem:", error);
            alert("Não foi possível gerar o personagem. Tente novamente.");
        } finally {
            setLoading(false);
            console.log("Personagem gerado com sucesso!");
        }
    };
    useeffects(() => {
        handleRandomize();
    }, []);
    const handleStartGame = () => {
        if (!character) {
            alert("Por favor, gere um personagem primeiro!");
            return;
        }
        localStorage.setItem("character", JSON.stringify(character));
        router.push("../game/game");
    };
    return (
        <>
            <Head>
                <title>Randomização</title>
            </Head>
            <div className={styles.body}>
                <ThemeToggle />
                <div className={styles.siteContent}>
                    <Header />
                    {loading && (
                        <div className={styles.loadingContainer}>
                            <p>Gerando personagem...</p>
                        </div>
                    )}
                    {character && !loading && (
                        <>
                            <div className={styles.characterInfo}>
                                <h1>
                                    {character.firstName} {character.lastName}
                                </h1>
                                <div className={styles.paragraphContainer}>
                                    <p>País: {character.country}</p>
                                    <p>Gênero: {character.gender.label}</p>
                                    <p>Cor de pele: {character.skinTone.label}</p>
                                    <p>Renda: {character.income.label}</p>
                                </div>
                            </div>
                            <GameDifficulty difficulty={character.difficulty} />
                        </>
                    )}
                    <h1 className={styles.h1}>Gerar novo personagem?</h1>
                    <div className={styles.buttonsContainer}>
                        <button onClick={handleRandomize} disabled={loading}>
                            {loading ? "Gerando..." : "Sim"}
                        </button>
                        <button onClick={handleStartGame} disabled={loading || !character}>
                            Não, vamos jogar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
