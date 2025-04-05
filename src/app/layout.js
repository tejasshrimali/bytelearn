import { Exo_2, Roboto } from "next/font/google";
import "./globals.css";


const exodus = Exo_2({
  weight: "900",
  variable: "--font-exodus",
  subsets: ["latin"],
});

export const metadata = {
  title: "ByteLearn",
  description: "AI-Powered Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${exodus.variable}`}>{children}</body>
    </html>
  );
}
