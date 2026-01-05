import { Metadata } from "next";
import Customizer from "./customizer";

export const metadata: Metadata = {
  title: "Customização",
};

export default function Page() {
  return <Customizer />;
}
