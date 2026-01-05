import { Metadata } from "next";
import Game from "./game";

export const metadata: Metadata = {
  title: "Jogo",
};

export default function Page() {
  return <Game />;
}
