import { Metadata } from "next";
import Randomizer from "./randomizer";

export const metadata: Metadata = {
  title: "Randomização",
};

export default function Page() {
  return <Randomizer />;
}
