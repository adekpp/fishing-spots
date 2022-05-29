import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    let ref = collection(db, collectionName);
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.empty) {
          setError("Nie ma nic do zatwierdzenia.");
          setIsPending(false);
          setDocuments(null);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setDocuments(results);
          setIsPending(false);
          setError(null);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, [collectionName]);

  return { documents, isPending, error };
};
