import { useEffect, useState } from "react";
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import { db, parseVehicleDocument } from "../services/firestoreVehicles";

export function useVehicles() {
  const [history, setHistory] = useState([]);
  const [inside, setInside] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};

    try {
      const vehicleRef = collection(db, "Vehicle");
      const q = query(vehicleRef, limit(100));

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            const parsed = parseVehicleDocument(doc.id, doc.data());
            if (parsed) {
              items.push(parsed);
            }
          });

          const activeInside = items.filter((item) => item.status === "Entry");

          setHistory(items);
          setInside(activeInside);
          setLoading(false);
        },
        (err) => {
          console.warn("Firestore Vehicle listener error:", err);
          setError(err);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn("Firestore init error:", err);
      setError(err);
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  const todayEntries = history.filter((v) => v.status === "Entry").length;
  const todayExits = history.filter((v) => v.status === "Exit").length;
  const nonListedCount = history.filter((v) => !v.listed).length;
  const listedCount = history.filter((v) => v.listed).length;

  return {
    history,
    inside,
    todayEntries,
    todayExits,
    nonListedCount,
    listedCount,
    loading,
    error,
  };
}
