"use client";
import { useState } from "react";
import Header from "./components/Header";
import { generateQuiz } from "./actions/generateQuiz";
import { db } from "./lib/firebase";
import { useAuth } from "./hooks/useAuth";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import Link from "next/link";

import { signInWithGoogle, logout } from "./lib/auth";

export default function Home() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const { user, loading } = useAuth();
  const handelAuth = async (action) => {
    if (action === "login") {
      await signInWithGoogle();
    } else {
      await logout();
    }
  };
  const handleGenerate = async () => {
    if (!text.trim()) return;
    const result = await generateQuiz(text);
    const cleanedJson = result.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    console.log(cleanedJson);
    setText("");

    setData(JSON.parse(cleanedJson));

    if (user && result) {
      const userQuizzesRef = collection(db, "users", user.uid, "quizzes");

      await addDoc(userQuizzesRef, {
        data: JSON.parse(cleanedJson),
        createdAt: new Date(),
      });
      console.log("Data:", data);
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
        placeholder="Paste your paragraph here , our tool will help you extract important 
        points and generate quiz! Make sure the paragraph is more than 150 characters"
        className="rounded-lg app_textarea p-5
      col-span-3 row-span-6 row-start-2 resize-none md:row-span-8 outline-none"
      ></textarea>

      {user ? (
        <div
          className="grid md:grid-cols-5 md:grid-rows-1 col-span-3 row-span-1
        md:gap-10 md:row-span-2 grid-cols-3 grid-rows-2 row-start-8 gap-12"
        >
          {/* we check the length of the textare to make sure we have engouh content to generate points and quiz */}
          {text.length > 150 ? (
            <Link
              href={"/dashboard"}
              className="col-span-3 row-span-1  bg-blue-500 text-white rounded-lg
            shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center text-xl
            h-12 font-semibold
            md:row-span-2 md:p-0 md:h-16 "
            >
              <button onClick={handleGenerate}>Generate Quiz </button>
            </Link>
          ) : (
            <button
              className="col-span-3  row-span-1  bg-blue-950 text-white rounded-lg
            shadow-md transition duration-200 flex items-center justify-center text-xl
            h-12 font-semibold
            md:row-span-2 md:p-0 md:h-16 "
            >
              Generate Quiz ({text.length}/150)
            </button>
          )}

          {/* users can check their dashboard from here ,it cotains previous notes */}
          <Link
            href={"/dashboard"}
            className="col-span-3  row-span-1  bg-blue-500 text-white rounded-lg
           shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center text-xl
           h-12 font-semibold
           md:row-span-2 md:p-0 md:h-16 "
          >
            <button>Check Dashboard</button>
          </Link>
        </div>
      ) : (
        <button
          onClick={() => handelAuth("login")}
          className="col-span-3  row-span-1  bg-blue-950 text-white rounded-lg
       shadow-md transition duration-200 flex items-center justify-center text-xl
       h-12 font-semibold
       md:row-span-2 md:p-0 md:h-16 "
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
