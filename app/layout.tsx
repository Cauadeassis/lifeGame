import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s",
        default: "Vida Eletrônica",
    },
    description: "Aplicativo de jogo de vida eletrônica desenvolvido com Next.js",
    icons: {
        icon: "./favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}