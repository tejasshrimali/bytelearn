import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";


//a custom hook to handle authentication state changes
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return { user, loading };
}
