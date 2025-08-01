// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMPsKEMBvve9q7lRxRVCK7lwK05VcR5jI",
  authDomain: "chi2026-d7a1b.firebaseapp.com",
  projectId: "chi2026-d7a1b",
  storageBucket: "chi2026-d7a1b.firebasestorage.app",
  messagingSenderId: "231066501325",
  appId: "1:231066501325:web:a81a7cca5f69e53a862984",
  measurementId: "G-W8XR9EHVLB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
