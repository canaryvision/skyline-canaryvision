// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDGSiRlXH1RKQA5tjJbA7dXaOESpHvlDng",
//   authDomain: "canaryvision-poc.firebaseapp.com",
//   projectId: "canaryvision-poc",
//   storageBucket: "canaryvision-poc.firebasestorage.app",
//   messagingSenderId: "524348843270",
//   appId: "1:524348843270:web:ae0ca7f7931d9a1c1cea87",
//   measurementId: "G-HT1RQQ66N6"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDHH-LOBv8-oti3o3CjxU_vW1k_p-3ytxI",
  authDomain: "canary-vision.firebaseapp.com",
  projectId: "canary-vision",
  storageBucket: "canary-vision.firebasestorage.app",
  messagingSenderId: "162385397655",
  appId: "1:162385397655:web:dff4c7442f8eb4d5cd26d2",
  measurementId: "G-JVE6E5JJX3"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics safely
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
