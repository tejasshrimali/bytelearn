import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_geminiAPI_Key;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
//const para = `Artificial Intelligence (AI) enables machines to learn from data, recognize patterns, and make decisions. It is used in various fields like healthcare, finance, and education.`;
export async function generateQuiz(para) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `You are a job description analyzer, your work is to extract the skills and knowledge 
    needed for the job and help the candidate improve his resume by providing him a list of points that will be
     helpful for him to get the job.you give the output in html OrderedList and unorderList format,Dont output anything else that the points.
     Here is a job description: ${para}`,
  });
  return response.text;
}
