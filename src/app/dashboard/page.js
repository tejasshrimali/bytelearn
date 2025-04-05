import Header from "../components/Header";
import QuizGrid from "../components/QuizGrid";

export default function DashBoard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-fit p-5 rounded-md app_header text-center font-extrabold text-2xl">Happy learning!</div>
      <QuizGrid />
    </div>
  );
}
