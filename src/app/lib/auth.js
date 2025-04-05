import { auth, provider, signInWithPopup, signOut } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // Returns user info
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    return null;
  }
};

export const logout = async () => {
  await signOut(auth);
};
