import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--f-body" });

export const metadata = {
  title: "Sopian Tsauri, Front-end Developer",
  description: "Portofolio Sopian Tsauri. Mahasiswa Informatika yang lagi lari jauh di dunia front-end.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
