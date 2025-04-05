import { Exo_2, Roboto } from "next/font/google";
import "./globals.css";

//use a exo_2 font
const exodus = Exo_2({
  weight: ["400", "500", "600", "700", "800", "900"],
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
      <body className={`${exodus.variable}  grid place-items-center min-h-screen`}>{children}</body>
    </html>
  );
}
