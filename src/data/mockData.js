export const cameraList = [
  { id: "CAM-01", name: "Skyline Entrance", location: "Main Gate", status: "Online", detection: "Clear", lastEvent: "10:46 AM" },
  { id: "CAM-02", name: "North Boundary", location: "Boundary Wall", status: "Online", detection: "Motion Alert", lastEvent: "02:14 AM" },
  { id: "CAM-03", name: "East Boundary", location: "Service Road", status: "Online", detection: "Clear", lastEvent: "09:58 AM" },
  { id: "CAM-04", name: "Rear Boundary", location: "Garden Exit", status: "Online", detection: "Clear", lastEvent: "01:32 AM" },
];

export const intrusionEvents = [
  { id: "IN-2048", date: "2026-09-16", time: "02:14 AM", camera: "North Boundary", cameraId: "CAM-02", zone: "Boundary Wall", status: "Active", severity: "High" },
  { id: "IN-2047", date: "2026-09-16", time: "01:32 AM", camera: "Rear Boundary", cameraId: "CAM-04", zone: "Garden Exit", status: "Reviewed", severity: "Medium" },
  { id: "IN-2046", date: "2026-09-15", time: "11:48 PM", camera: "East Boundary", cameraId: "CAM-03", zone: "Service Road", status: "Resolved", severity: "Low" },
  { id: "IN-2045", date: "2026-09-15", time: "10:06 PM", camera: "Skyline Entrance", cameraId: "CAM-01", zone: "Visitor Lane", status: "Resolved", severity: "Medium" },
];

export const vehiclesInside = [
  { id: "VH-118", plate: "RJ14 CK 8271", vehicle: "Hyundai Creta", type: "SUV", listed: true, entryTime: "08:12 AM", duration: "2h 42m", status: "Inside", camera: "Skyline Entrance" },
  { id: "VH-119", plate: "RJ14 TM 6410", vehicle: "Honda Activa", type: "Two Wheeler", listed: true, entryTime: "08:44 AM", duration: "2h 10m", status: "Inside", camera: "Skyline Entrance" },
  { id: "VH-120", plate: "RJ45 AX 9024", vehicle: "Toyota Innova", type: "MPV", listed: false, entryTime: "09:18 AM", duration: "1h 36m", status: "Inside", camera: "Skyline Entrance" },
  { id: "VH-121", plate: "RJ14 DP 1102", vehicle: "Tata Nexon", type: "SUV", listed: true, entryTime: "10:21 AM", duration: "33m", status: "Inside", camera: "Basement Ramp" },
];

export const vehicleHistory = [
  { id: "VE-8801", plate: "RJ14 CK 8271", vehicle: "Hyundai Creta", listed: true, status: "Entry", entryTime: "08:12 AM", exitTime: "-", duration: "2h 42m", entryCamera: "Skyline Entrance", exitCamera: "-" },
  { id: "VE-8800", plate: "RJ45 AX 9024", vehicle: "Toyota Innova", listed: false, status: "Entry", entryTime: "09:18 AM", exitTime: "-", duration: "1h 36m", entryCamera: "Skyline Entrance", exitCamera: "-" },
  { id: "VE-8799", plate: "RJ14 MH 2933", vehicle: "Maruti Swift", listed: true, status: "Exit", entryTime: "07:22 AM", exitTime: "10:12 AM", duration: "2h 50m", entryCamera: "Skyline Entrance", exitCamera: "Exit Gate" },
  { id: "VE-8798", plate: "RJ14 NB 6188", vehicle: "Mahindra Bolero", listed: false, status: "Exit", entryTime: "06:40 AM", exitTime: "09:08 AM", duration: "2h 28m", entryCamera: "Service Gate", exitCamera: "Exit Gate" },
];

export const securityActivity = [
  { id: "SG-331", person: "Guard A", time: "10:48 AM", camera: "Skyline Entrance", location: "Main Gate", status: "Detected" },
  { id: "SG-330", person: "Guard B", time: "10:36 AM", camera: "North Boundary", location: "Boundary Patrol", status: "Detected" },
  { id: "SG-329", person: "Guard A", time: "10:05 AM", camera: "Basement Ramp", location: "Parking Level B1", status: "Detected" },
  { id: "SG-328", person: "Guard C", time: "09:42 AM", camera: "Rear Boundary", location: "Garden Exit", status: "Detected" },
];

export const unifiedEvents = [
  { id: "EV-9009", type: "Intrusion detected", timestamp: "Today 02:14 AM", location: "North Boundary / CAM-02", status: "Active" },
  { id: "EV-9008", type: "Vehicle entered", timestamp: "Today 10:21 AM", location: "Basement Ramp", status: "Listed" },
  { id: "EV-9007", type: "Security personnel detected", timestamp: "Today 10:48 AM", location: "Main Gate", status: "Verified" },
  { id: "EV-9006", type: "Non-listed vehicle detected", timestamp: "Today 09:18 AM", location: "Skyline Entrance", status: "Watch" },
  { id: "EV-9005", type: "Vehicle exited", timestamp: "Today 09:08 AM", location: "Exit Gate", status: "Closed" },
  { id: "EV-9004", type: "Intrusion detected", timestamp: "Yesterday 11:48 PM", location: "East Boundary / CAM-03", status: "Resolved" },
];
