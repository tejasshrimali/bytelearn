"use client";
import { signInWithGoogle } from "../lib/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={signInWithGoogle} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md">
        Sign in with Google
      </button>
    </div>
  );
}
