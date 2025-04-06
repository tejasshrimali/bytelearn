"use client";
import { useState } from "react";

export default function Flashcard({ question, answer, text }) {
  const [flipped, setFlipped] = useState(false);
  const colors = [
    "bg-[#73DA18]",
    "bg-[#FF5733]",
    "bg-[#33A1FF]",
    "bg-[#DA18D6]",
    "bg-[#FFD700]",
    "bg-[#18DAC8]",
    "bg-[#FF33A6]",
    "bg-[#33FF57]",
    "bg-[#FF8C00]",
    "bg-[#6A0DAD]",
    "bg-[#2E8B57]",
    "bg-[#FF4500]",
  ];
  return (
    <div className="relative  perspective-1000 rounded-md h-[60vh] p-5 " onClick={() => setFlipped(!flipped)}>
      <p>{text}</p>
      <div
        className={`relative w-full flex transition-transform duration-500 transform 
            min-h-[50vh] p-5 rounded-md  items-center justify-center text-center
             ${colors[Math.floor(Math.random() * colors.length)]} ${flipped ? "rotate-y-180" : ""}`}
      >
        <div className="flex h-full flex-col">
          {flipped ? (
            <div className={`abosulte rotate-y-180 font-bold text-2xl `}>{answer}</div>
          ) : (
            <div className="font-bold text-2xl">{question}</div>
          )}
          <br />
          {flipped ? <></> : <h1 className="align-baseline font-semibold text-gray-600">Tap to reveal answer</h1>}
        </div>
      </div>
    </div>
  );
}
