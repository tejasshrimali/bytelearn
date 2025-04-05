import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_geminiAPI_Key;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
//const para = `Artificial Intelligence (AI) enables machines to learn from data, recognize patterns, and make decisions. It is used in various fields like healthcare, finance, and education.`;
export async function generateQuiz(para) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: `You are a teacher who accepts the paragraphs given by students , your role is to only and only extract immportant points under json key imp, 
    and generate the question and answers for the same inside an array having qna as key , the array is of objects having question and answer as keys.
    Just inlcude the {"imps": [], "qna": []} in the output.
    Also do not include anything other than the json ouput.
    Do not include any explanation or anything else.
    can you please not inlcude the json word in the output.

    Paragraph:
    ${para}`,
  });
  return response.text;
}
