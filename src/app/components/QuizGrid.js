"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { getDocs, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import Link from "next/link";

export default function QuizGrid() {
  const { user } = useAuth();
  const [datalist, setData] = useState([]);
  const [imps, setImps] = useState([]);

  // ✅ Return loading state instead of nothing

  const fetchData = useCallback(async () => {
    if (!user) return;
    const userQuizzesRef = collection(db, "users", user.uid, "quizzes");
    try {
      const snapshot = await getDocs(userQuizzesRef);
      const quiznimp = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data()?.data?.title || "Untitled",
        imps: doc.data()?.data?.imps || [], // Ensure imps is always an array
      }));

      const allImps = quiznimp.flatMap((doc) => doc.imps);

      setData(quiznimp);
      setImps(allImps);

      localStorage.setItem(`quizzes_${user.uid}`, JSON.stringify({ imps: allImps, datalist: quiznimp }));
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!user) return;
    const userQuizzesRef = collection(db, "users", user.uid, "quizzes");
    //ordering the documents so that latest generated will be on to[]
    const q = query(userQuizzesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(userQuizzesRef, (snapshot) => {
      const quiznimp = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data()?.data?.title || "Untitled",
        imps: doc.data()?.data?.imps || [],
      }));

      const allImps = quiznimp.flatMap((doc) => doc.imps);

      setData(quiznimp);
      setImps(allImps);

      localStorage.setItem(`quizzes_${user.uid}`, JSON.stringify({ imps: allImps, datalist: quiznimp }));
    });

    return () => unsubscribe();
  }, [user]);

  console.log("datalist", datalist);
  // const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"];

  return (
    <>
      {datalist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2  col-span-8 container  text-white gap-2 h-fit overflow-hidden items-center">
          {/* just listing thte title of the generated content */}
          {datalist.map((item, index) => (
            <Link
              href={`/quiz/${item.id}`}
              key={index}
              className="text-semibold text-2xl gen_imp_list gr
          rounded-md flex items-center  min-h-20 p-3 w-full lg:h-fit"
            >
              <div>
                {index + 1}. {item.title}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}
