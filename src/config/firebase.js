import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrUEqj7W5A-fJY2MQWbDAe5g-HOP0wleM",
  authDomain: "project-aters.firebaseapp.com",
  projectId: "project-aters",
  storageBucket: "project-aters.appspot.com",
  messagingSenderId: "578052860105",
  appId: "1:578052860105:web:8aa2def63abd6024a24518",
  measurementId: "G-JB7D6HEXF2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider }