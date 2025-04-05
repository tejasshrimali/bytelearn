import { auth, provider, signInWithPopup, signOut } from "./firebase";


//using firebase authentication , google as auth providre
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    return null;
  }
};
 
export const logout = async () => {
  await signOut(auth);
};
