import { PenBoxIcon } from "lucide-react";
import Header from "../components/Header";
import QuizGrid from "../components/QuizGrid";
import Link from "next/link";

export default function DashBoard() {
  return (
    <div className="grid grid-col-8 grid-rows-8 h-screen w-full container">
      <div
        className="w-full h-fit p-5 rounded-md grid grid-col-2 grid-row-1 items-center
      app_header text-center font-extrabold text-2xl col-span-8 justify-items-start "
      >
        <Link href="/">
          <PenBoxIcon />
        </Link>
        <p className="col-span-1 col-start-2">Your contents</p>
      </div>
      <QuizGrid />
    </div>
  );
}
