import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_geminiAPI_Key;

const ai = new GoogleGenAI({ apiKey: "AIzaSyAdK4osW5WLVyn7WgafjXmCP8wNqua0ILs" });
const para = `Soul AI is a pioneering company founded by IIT Bombay and IIM Ahmedabad alumni, with a strong founding team from IITs, NITs, and BITS. We specialize in delivering high-quality human-curated data, AI-first scaled operations services, and more. Based in Hyderabad, we are a young, fast-moving team on a mission to build AI for Good, driving innovation and positive societal impact.


We are looking for a skilled Game Developer to join our development team. You will be responsible for designing, coding, and maintaining high-quality game applications. The ideal candidate has a passion for gaming, a strong knowledge of game engines, and an ability to work in a collaborative environment.


Responsibilities:

Design, develop, and test games for different platforms.
Write clean, efficient, and maintainable code.
Work with designers and artists to implement game features.
Optimize game performance and troubleshoot technical issues.
Integrate gameplay, sound, and visual assets into the game engine.
Stay updated on industry trends and technologies.


Qualifications :

Proficiency in programming languages such as C++, C#, or Unity.
Experience with game engines like Unity or Unreal Engine.
Knowledge of physics, artificial intelligence, and game mechanics.
Experience with VR/AR development is a plus.`;

export async function generateQuiz(para) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `You are a job description analyzer, your work is to extract the skills and knowledge 
    needed for the job and help the candidate improve his resume by providing him a list of points that will be
     helpful for him to get the job.
     Here is a job description: ${para}`,
  });
  console.log( response.text);
}
generateQuiz(para);