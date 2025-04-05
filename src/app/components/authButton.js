"use client";

import { useState } from "react";
import { signInWithGoogle, logout } from "../lib/auth";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

export default function AuthButton() {
  const [menuOpn, setMenuOpn] = useState(false);
  const { user, loading } = useAuth();

  const handelAuth = async (action) => {
    if (action === "login") {
      await signInWithGoogle();
    } else {
      await logout();
    }
    setMenuOpn(false);
  };

  return (
    <div className="relative col-start-4 row-start-1 row-span-2 justify-self-end">
      {/* This is the main button where user can click and may choose to login or logout */}
      <div
        onClick={() => setMenuOpn(!menuOpn)}
        className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center cursor-pointer bg-gray-800 hover:bg-gray-700"
      >
        {user ? <img src={user.photoURL} className="rounded-full" /> : ""}
      </div>

      {/* A simple menu for handeling the login and logout of the user */}
      {menuOpn && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 shadow-lg rounded-lg">
          {!user ? (
            <>
              <button
                onClick={() => handelAuth("login")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Login
              </button>
              <button
                onClick={() => handelAuth("login")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <p className="px-4 py-2 text-sm text-gray-400">{user.displayName}</p>
              <button
                onClick={() => handelAuth("logout")}
                className="block w-full text-left px-4 py-2 hover:bg-red-200 text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
