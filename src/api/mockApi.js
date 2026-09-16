import { intrusionEvents, securityActivity, unifiedEvents, vehicleHistory, vehiclesInside } from "../data/mockData";

export const mockApi = {
  overview() {
    return {
      camerasOnline: "12 / 12",
      lastUpdated: "10:54 AM",
      activeIntrusions: intrusionEvents.filter((event) => event.status === "Active").length,
      vehiclesInside: vehiclesInside.length,
      todayEntries: 38,
      todayExits: 31,
      nonListed: vehicleHistory.filter((vehicle) => !vehicle.listed).length,
      securityDetected: 3,
    };
  },
  intrusionEvents: () => intrusionEvents,
  vehicleHistory: () => vehicleHistory,
  vehiclesInside: () => vehiclesInside,
  securityActivity: () => securityActivity,
  unifiedEvents: () => unifiedEvents,
};
