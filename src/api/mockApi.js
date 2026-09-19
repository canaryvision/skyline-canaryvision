import { parseVehicleDocument } from "../services/firestoreVehicles";

// Pure Firebase API interface - dummy data removed
export const mockApi = {
  overview() {
    return {
      camerasOnline: "0 / 0",
      lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      activeIntrusions: 0,
      vehiclesInside: 0,
      todayEntries: 0,
      todayExits: 0,
      nonListed: 0,
      securityDetected: 0,
    };
  },
  intrusionEvents: () => [],
  vehicleHistory: () => [],
  vehiclesInside: () => [],
  securityActivity: () => [],
  unifiedEvents: () => [],
};

export { parseVehicleDocument };
