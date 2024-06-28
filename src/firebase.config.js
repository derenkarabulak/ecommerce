import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4qPHjig8wvVblDfFQz0BvfxzP8csmne4",
  authDomain: "e-comm-688c1.firebaseapp.com",
  projectId: "e-comm-688c1",
  storageBucket: "e-comm-688c1.appspot.com",
  messagingSenderId: "154476524256",
  appId: "1:154476524256:web:548a19b67bb566f5525685",
  measurementId: "G-Y3KQQXDDJ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
