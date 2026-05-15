import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzx3oA0p99pxOHttkrf4dzdsNwdZLagYM",
  authDomain: "react-web-mwf.firebaseapp.com",
  projectId: "react-web-mwf",
  storageBucket: "react-web-mwf.firebasestorage.app",
  messagingSenderId: "699799723842",
  appId: "1:699799723842:web:982308bc69ad3d47f972db",
  measurementId: "G-LNDC8M07HC",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore(app);
export { app };
