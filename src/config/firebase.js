import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6ujZSF9QmmFC-ky3Vwx_e1WxJE35uYxo",
  authDomain: "aters-gcp.firebaseapp.com",
  projectId: "aters-gcp",
  storageBucket: "aters-gcp.appspot.com",
  messagingSenderId: "285700319859",
  appId: "1:285700319859:web:fbe6d9844e56439ab11806",
  measurementId: "G-MYX8P9CQPG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider }