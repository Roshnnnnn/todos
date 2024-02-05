import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDviUljX5piNjrrYVFweEKelFXjmqFMbmA",
  authDomain: "todo-bccb9.firebaseapp.com",
  projectId: "todo-bccb9",
  storageBucket: "todo-bccb9.appspot.com",
  messagingSenderId: "583246859124",
  appId: "1:583246859124:web:7f13b5fa98612e57097a21",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fireDB = getFirestore(app);

export default app;
