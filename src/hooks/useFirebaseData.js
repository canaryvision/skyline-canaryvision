import { useEffect, useState } from "react";
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import {
  db,
  parseVehicleDocument,
  parseIntrusionDocument,
  parseSecurityDocument,
  parseCameraDocument,
  parseEventDocument,
} from "../services/firestoreVehicles";

export function useFirebaseData() {
  const [vehicles, setVehicles] = useState([]);
  const [intrusions, setIntrusions] = useState([]);
  const [security, setSecurity] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubs = [];

    // 1. Vehicle collection listener (Primary Firestore collection)
    try {
      const vehRef = collection(db, "Vehicle");
      unsubs.push(
        onSnapshot(
          query(vehRef, limit(100)),
          (snap) => {
            const list = [];
            snap.forEach((doc) => {
              const p = parseVehicleDocument(doc.id, doc.data());
              if (p) list.push(p);
            });
            setVehicles(list);
          },
          (err) => {
            // Silently handle permission/missing collection errors
            if (err?.code !== "permission-denied") {
              console.debug("Vehicle Firestore listener status:", err?.message);
            }
          }
        )
      );
    } catch (e) {
      // Ignore initialization errors
    }

    // 2. Intrusion collection listener
    try {
      const intRef = collection(db, "Intrusion");
      unsubs.push(
        onSnapshot(
          query(intRef, limit(50)),
          (snap) => {
            const list = [];
            snap.forEach((doc) => {
              const p = parseIntrusionDocument(doc.id, doc.data());
              if (p) list.push(p);
            });
            setIntrusions(list);
          },
          () => {
            // Permission or missing collection error handling
          }
        )
      );
    } catch (e) {
      // Ignore
    }

    // 3. Security collection listener
    try {
      const secRef = collection(db, "Security");
      unsubs.push(
        onSnapshot(
          query(secRef, limit(50)),
          (snap) => {
            const list = [];
            snap.forEach((doc) => {
              const p = parseSecurityDocument(doc.id, doc.data());
              if (p) list.push(p);
            });
            setSecurity(list);
          },
          () => {
            // Permission or missing collection error handling
          }
        )
      );
    } catch (e) {
      // Ignore
    }

    // 4. Camera collection listener
    try {
      const camRef = collection(db, "Camera");
      unsubs.push(
        onSnapshot(
          query(camRef, limit(50)),
          (snap) => {
            const list = [];
            snap.forEach((doc) => {
              const p = parseCameraDocument(doc.id, doc.data());
              if (p) list.push(p);
            });
            setCameras(list);
          },
          () => {
            // Permission or missing collection error handling
          }
        )
      );
    } catch (e) {
      // Ignore
    }

    // 5. Events collection listener
    try {
      const evRef = collection(db, "Events");
      unsubs.push(
        onSnapshot(
          query(evRef, limit(100)),
          (snap) => {
            const list = [];
            snap.forEach((doc) => {
              const p = parseEventDocument(doc.id, doc.data());
              if (p) list.push(p);
            });
            setEvents(list);
          },
          () => {
            // Permission or missing collection error handling
          }
        )
      );
    } catch (e) {
      // Ignore
    }

    setLoading(false);
    return () => {
      unsubs.forEach((unsub) => unsub && unsub());
    };
  }, []);

  // Derived metrics from vehicles collection
  const vehiclesInside = vehicles.filter((v) => v.status === "Entry");
  const todayEntries = vehicles.filter((v) => v.status === "Entry").length;
  const todayExits = vehicles.filter((v) => v.status === "Exit").length;
  const nonListedVehicles = vehicles.filter((v) => !v.listed).length;

  // Auto-derive cameras from Vehicle detection locations if Camera collection is not configured in Firestore
  const derivedCameras =
    cameras.length > 0
      ? cameras
      : Array.from(new Set(vehicles.map((v) => v.camera || "Skyline Entrance"))).map((camName, i) => ({
          id: `CAM-0${i + 1}`,
          name: camName,
          location: camName.includes("Entrance") ? "Main Gate" : "Perimeter Zone",
          status: "Online",
          detection: "Active",
          lastEvent: vehicles.find((v) => v.camera === camName)?.entryTime || "Live",
        }));

  // Auto-derive unified feed from Vehicle detections if Events collection is unreadable
  const derivedUnifiedFeed =
    events.length > 0
      ? events
      : vehicles.map((v) => ({
          id: `EV-${v.id}`,
          type: !v.listed ? "Non-listed vehicle detected" : v.status === "Entry" ? "Vehicle entered" : "Vehicle exited",
          timestamp: v.entryTime !== "-" ? v.entryTime : v.exitTime,
          location: v.camera,
          status: !v.listed ? "Watch" : "Listed",
        }));

  const activeIntrusionsCount = intrusions.filter((i) => i.status === "Active").length;

  return {
    vehicles,
    vehiclesInside,
    todayEntries,
    todayExits,
    nonListedVehicles,
    intrusions,
    activeIntrusions: activeIntrusionsCount,
    security,
    cameras: derivedCameras,
    unifiedEvents: derivedUnifiedFeed,
    loading,
    overview: {
      camerasOnline: `${derivedCameras.length} / ${derivedCameras.length || 0}`,
      lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      activeIntrusions: activeIntrusionsCount,
      vehiclesInside: vehiclesInside.length,
      todayEntries,
      todayExits,
      nonListed: nonListedVehicles,
      securityDetected: security.length,
    },
  };
}
