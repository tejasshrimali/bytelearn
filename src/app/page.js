"use client";
import { useState } from "react";
import Header from "./components/Header";
import { generateQuiz } from "./actions/generateQuiz";
import { db } from "./lib/firebase";
import { useAuth } from "./hooks/useAuth";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import Link from "next/link";

// import Textarea from "./components/Textarea";

export default function Home() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const { user, loading } = useAuth();

  const handleGenerate = async () => {
    if (!text.trim()) return;
    const result = await generateQuiz(text);
    const cleanedJson = result.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    console.log(cleanedJson);

    setData(JSON.parse(cleanedJson));
    console.log("Data:", data);
    if (user) {
      const userQuizzesRef = collection(db, "users", user.uid, "quizzes");

      await addDoc(userQuizzesRef, {
        data,
        createdAt: new Date(),
      });
      console.log("Data saved to Firestore!");
    } else {
      localStorage.setItem("quizzes", JSON.stringify(data));
      console.warn("User not logged in. Data not saved.");
    }
  };

  return (
    //This is home page with header and textarea
    // and a button to generate quiz
    <div
      className="container grid grid-cols-3 grid-rows-9 
    gap-3 bytelearn-container p-1 w-full md:grid-rows-15 h-screen"
    >
      <Header />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="paste your paragram here"
        className="rounded-lg app_textarea p-5
      col-span-3 row-span-6 row-start-2 resize-none md:row-span-8 outline-none"
      ></textarea>
      <div
        className="grid md:grid-cols-5 md:grid-rows-1 col-span-3 row-span-1
     md:gap-10 md:row-span-2 grid-cols-3 "
      >
        {text.length > 150 ? (
          <Link
            href={"/dashboard"}
            className="col-span-3 row-start-8 row-span-1  bg-blue-500 text-white rounded-lg
      shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center text-xl
      h-12 font-semibold
     md:row-span-2 md:p-0 md:h-16 "
          >
            <button onClick={handleGenerate}>Generate Quiz</button>
          </Link>
        ) : (
          <button
            onClick={handleGenerate}
            className="col-span-3 row-start-8 row-span-1  bg-blue-950 text-white rounded-lg
          shadow-md transition duration-200 flex items-center justify-center text-xl
          h-12 font-semibold
         md:row-span-2 md:p-0 md:h-16 "
          >
            Generate Quiz
          </button>
        )}
      </div>
    </div>
  );
}
