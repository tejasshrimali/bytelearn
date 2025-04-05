"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function QuizGrid() {
  const { user } = useAuth();
  const [datalist, setData] = useState([]);
  const [imps, setImps] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchQuiz = async () => {
      const userQuizzesRef = collection(db, "users", user.uid, "quizzes");

      // 1️⃣ Fetch the current number of documents in Firestore
      const snapShot = await getDocs(userQuizzesRef);
      const firestoreSize = snapShot.size; // Number of quizzes in Firestore

      // 2️⃣ Get cached data from localStorage
      const cachedData = localStorage.getItem(`quizzes_${user.uid}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const localSize = parsedData.datalist.length; // Number of cached quizzes

        // 3️⃣ Compare sizes: Fetch only if Firestore has more data
        if (firestoreSize <= localSize) {
          console.log("Using cached quiz data");
          setImps(parsedData.imps);
          setData(parsedData.datalist);
          return;
        }
      }

      // 4️⃣ Fetch from Firestore if no cache or new data is available
      console.log("Fetching updated quiz data from Firestore...");
      let allImps = [];
      const quiznimp = snapShot.docs.map((doc) => {
        const data = doc.data();
        if (data?.data?.imps) {
          allImps = [...allImps, ...data.data.imps];
        }
        return { id: doc.id, ...data };
      });

      // 5️⃣ Update State and Cache New Data
      setImps(allImps);
      setData(quiznimp);
      localStorage.setItem(`quizzes_${user.uid}`, JSON.stringify({ imps: allImps, datalist: quiznimp }));
    };

    fetchQuiz();
  }, [user]);
  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"];

  return (
    <div className="flex flex-col w-full text-white gap-2">
      {/* <h1 className="text-2xl font-bold">Important points :</h1>
      {imps.map((item, index) => (
        <div
          key={index}
          className="min-h-fit h-20 p-3 rounded-md gen_imp_list flex flex-row items-center justify-center gap-2"
        >
          <div className={`max-w-2.5 h-full w-5 ${colors[index % colors.length]}`}></div>
          <h2 className="text-lg font-normal h-full">{item}</h2>
        </div>
      ))} */}
      {datalist.map((item, index) => (
        <div key={index} className="">{"No Title"}</div>
      ))}
    </div>
  );
}
