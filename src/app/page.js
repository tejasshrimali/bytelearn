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

    const cleanedJson = result.replace(/^```html\s*/, "").replace(/\s*```$/, "");
    setData(cleanedJson);
    // console.log(cleanedJson);
    //setText("");

    // setData(JSON.parse(cleanedJson));

    // if (user && result) {
    //   // const userQuizzesRef = collection(db, "users", user.uid, "quizzes");

    //   await addDoc(userQuizzesRef, {
    //     data: JSON.parse(cleanedJson),
    //     createdAt: new Date(),
    //   });
    //   console.log("Data:", data);
    //   console.log("Data saved to Firestore!");
    // } else {
    //   localStorage.setItem("quizzes", JSON.stringify(data));
    //   console.warn("User not logged in. Data not saved.");
    // }
  };

  return (
    //This is home page with header and textarea
    // and a button to generate quiz

    <div className="container">
      <Header />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your job description here , our tool will help you point out important points needed for this job! "
        className="rounded-lg app_textarea w-full h-96 p-5 mt-5"
      ></textarea>

      <div className="">
        {/* we check the length of the textare to make sure we have engouh content to generate points and quiz */}

        {/* <Link
          href={"/dashboard"}
          className="col-span-3 row-span-1  bg-blue-500 text-white rounded-lg
            shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center text-xl
            h-12 font-semibold
            md:row-span-2 md:p-0 md:h-16 "
        > */}
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center text-xl h-12 font-semibold md:row-span-2 md:p-0 md:h-16"
        >
          Generate Suggestions
        </button>
       <div dangerouslySetInnerHTML={{ __html: data }} className="rounded-lg app_textarea w-full  p-5 mt-5"></div>
        {/* </Link> */}
      </div>
    </div>
  );
}
