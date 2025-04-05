import Header from "./components/Header";
import Textarea from "./components/Textarea";
export default function Home() {
  return (
    <div className="container grid grid-cols-3 grid-rows-10 gap-10 bytelearn-container p-1 w-full h-screen ">
      <Header />
      <Textarea />
      <button
        className="col-span-3 row-start-8 row-span-1 p-2 py-6 bg-blue-500 text-white rounded-lg
      shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center text-xl"
      >
        Generate Quiz
      </button>
    </div>
  );
}
