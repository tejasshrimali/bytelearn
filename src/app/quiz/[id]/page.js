"use client";

import Flashcard from "@/app/components/flashCards";
import { useAuth } from "@/app/hooks/useAuth";
import { db } from "@/app/lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContentPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const [rev_mode, setMode] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        //getting the specifc doc with the id , (ran into issue because was fetching from collection kek)
        const docRef = doc(db, "users", user.uid, "quizzes", id);
        const quizSnap = await getDoc(docRef);

        if (quizSnap.exists()) {
          setData(quizSnap.data());
        } else {
          console.error("Quiz not found");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);
  console.log(data);
  const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"];
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Quiz not found</div>;

  return (
    <>
      {/* this lists imps extracted from the para*/}
      {rev_mode ? (
        <div className="flex flex-col w-full text-white container items-center pb-20 justify-center ">
          <div
            className="fixed top-0 z-10  h-fit p-5 rounded-md grid grid-col-2 grid-row-1 items-center
      app_header text-center font-extrabold text-2xl col-span-1 justify-items-start container w-full"
          >
            <Link href="/dashboard">
              <LayoutGrid />
            </Link>
            <p className="col-span-1 col-start-2">Happy Learning</p>
          </div>
          <div className="relative grid grid-col-3 grid-rows-3 mt-20">
            {data?.data?.qna.map((item, index) => (
              <Flashcard
                question={item.question}
                answer={item.answer}
                key={index}
                text={`card ${index + 1} of ${data?.data?.qna.length} `}
              />
            ))}
          </div>
          <div
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full
       flex flex-col items-center app_header p-5 container rounded-md"
          >
            <button
              onClick={() => setMode(false)}
              className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md shadow-md w-3/4"
            >
              Revise
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full text-white gap-2 pb-16 container  ">
            <div
              className="w-full h-fit p-5 rounded-md grid grid-col-2 grid-row-1 items-center
      app_header text-center font-extrabold text-2xl col-span-1 justify-items-start"
            >
              <Link href="/dashboard">
                <LayoutGrid />
              </Link>
              <p className="col-span-1 col-start-2">Happy Learning</p>
            </div>
            <h1 className="text-2xl font-bold">Important Points :</h1>

            {data?.data?.imps.map((item, index) => (
              <div key={index} className="min-h-fit h-20 p-3 rounded-md gen_imp_list flex flex-row items-center gap-2">
                <div className={`max-w-2.5 h-full w-5 ${colors[index % colors.length]} justify-start`}></div>
                <h2 className="text-lg font-normal h-full">{item}</h2>
              </div>
            ))}

            {/* This takes user to revison page where flashcards are there*/}
            <div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full
              flex flex-col items-center app_header p-5 container  rounded-md"
            >
              <button
                onClick={() => setMode(true)}
                className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 
                rounded-md shadow-md w-3/4"
              >
                Take Revision
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
