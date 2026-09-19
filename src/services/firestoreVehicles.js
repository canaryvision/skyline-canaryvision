import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebase";

export const db = getFirestore(app);

/**
 * Parses Firebase Firestore Vehicle collection document:
 * {
 *   datetime: "2026-09-19 17:10:19.813",
 *   frame: 2,
 *   image: null,
 *   plate_coordinates_available: false,
 *   plate_detections: [],
 *   snapshot: null,
 *   source_log: "output_video/parallel_gpu/vehicle_plate_MAIN_GATE/detections_...",
 *   source_offset: 117,
 *   unmatched_numberplates: [],
 *   vehicles: [
 *     { event: null, numberplates: [], position: "out", track_id: null, type: "car" }
 *   ]
 * }
 */
export function parseVehicleDocument(docId, data) {
  if (!data) return null;

  const datetime = data.datetime || "";
  let dateFormatted = "";
  let timeFormatted = "";

  if (datetime) {
    const spaceParts = datetime.split(" ");
    dateFormatted = spaceParts[0] || "";
    const timeSegment = spaceParts[1] || spaceParts[0];
    if (timeSegment) {
      const [h, m] = timeSegment.split(":");
      if (h !== undefined && m !== undefined) {
        const hourNum = parseInt(h, 10);
        const ampm = hourNum >= 12 ? "PM" : "AM";
        const hour12 = hourNum % 12 || 12;
        timeFormatted = `${String(hour12).padStart(2, "0")}:${m} ${ampm}`;
      } else {
        timeFormatted = timeSegment;
      }
    }
  }

  const vehicleObj = Array.isArray(data.vehicles) && data.vehicles[0] ? data.vehicles[0] : {};
  const pos = (vehicleObj.position || "").toLowerCase();
  const isExit = pos === "out" || pos === "exit";
  const status = isExit ? "Exit" : "Entry";

  // Number plate extraction
  let plate = "";
  if (Array.isArray(vehicleObj.numberplates) && vehicleObj.numberplates.length > 0) {
    const first = vehicleObj.numberplates[0];
    plate = typeof first === "string" ? first : (first.plate || first.text || "");
  }
  if (!plate && Array.isArray(data.plate_detections) && data.plate_detections.length > 0) {
    const first = data.plate_detections[0];
    plate = typeof first === "string" ? first : (first.plate || first.text || "");
  }
  if (!plate && Array.isArray(data.unmatched_numberplates) && data.unmatched_numberplates.length > 0) {
    const first = data.unmatched_numberplates[0];
    plate = typeof first === "string" ? first : (first.plate || first.text || "");
  }
  if (!plate) {
    plate = "UNREAD PLATE";
  }

  // Type resolution
  const rawType = vehicleObj.type || "car";
  const typeFormatted = rawType.toLowerCase() === "car" ? "Car" : rawType.charAt(0).toUpperCase() + rawType.slice(1);

  // Camera resolution from source_log
  let camera = "Skyline Entrance";
  const sourceLog = (data.source_log || "").toUpperCase();
  if (sourceLog.includes("MAIN_GATE") || sourceLog.includes("ENTRANCE")) {
    camera = "Skyline Entrance";
  } else if (sourceLog.includes("NORTH")) {
    camera = "North Boundary";
  } else if (sourceLog.includes("EAST")) {
    camera = "East Boundary";
  } else if (sourceLog.includes("EXIT") || sourceLog.includes("REAR")) {
    camera = "Exit Gate";
  }

  const isListed = Boolean(data.plate_coordinates_available || (plate && plate !== "UNREAD PLATE"));

  return {
    id: docId,
    plate: plate,
    vehicle: `Vehicle (${typeFormatted})`,
    type: typeFormatted,
    listed: isListed,
    status: status,
    date: dateFormatted,
    entryTime: isExit ? "-" : (timeFormatted || "N/A"),
    exitTime: isExit ? (timeFormatted || "N/A") : "-",
    duration: "Live",
    camera: camera,
    entryCamera: isExit ? "-" : camera,
    exitCamera: isExit ? camera : "-",
    snapshot: data.snapshot || data.image || null,
    frame: data.frame || 0,
    source_log: data.source_log || "",
    raw: data
  };
}

export function parseIntrusionDocument(docId, data) {
  if (!data) return null;
  return {
    id: docId,
    date: data.date || data.datetime?.split(" ")?.[0] || new Date().toISOString().split("T")[0],
    time: data.time || data.datetime?.split(" ")?.[1] || "Active",
    camera: data.camera || data.camera_name || "Perimeter Camera",
    cameraId: data.camera_id || data.cameraId || "CAM-01",
    zone: data.zone || data.location || "Boundary Zone",
    status: data.status || "Active",
    severity: data.severity || "Medium",
    snapshot: data.snapshot || data.image || null,
    raw: data,
  };
}

export function parseSecurityDocument(docId, data) {
  if (!data) return null;
  return {
    id: docId,
    person: data.person || data.guard_name || "Security Personnel",
    time: data.time || data.datetime || "Just now",
    camera: data.camera || "Main Gate",
    location: data.location || "Security Checkpoint",
    status: data.status || "Detected",
    snapshot: data.snapshot || data.image || null,
    raw: data,
  };
}

export function parseCameraDocument(docId, data) {
  if (!data) return null;
  return {
    id: docId || data.id || "CAM-01",
    name: data.name || data.camera_name || "Camera",
    location: data.location || "Main Gate",
    status: data.status || "Online",
    detection: data.detection || "Clear",
    lastEvent: data.last_event || data.lastEvent || "Just now",
  };
}

export function parseEventDocument(docId, data) {
  if (!data) return null;
  return {
    id: docId,
    type: data.type || data.event_type || "System Event",
    timestamp: data.timestamp || data.datetime || "Just now",
    location: data.location || data.camera || "Skyline Entrance",
    status: data.status || "Info",
    raw: data,
  };
}
