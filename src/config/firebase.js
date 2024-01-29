import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_Firebase_api_key,
    authDomain: process.env.REACT_APP_Firebase_auth_domain,
    projectId: process.env.REACT_APP_Firebase_project_id,
    storageBucket: process.env.REACT_APP_Firebase_storage_bucket,
    messagingSenderId: process.env.REACT_APP_Firebase_messaging_sender_id,
    appId: process.env.REACT_APP_Firebase_app_id,
    measurementId: process.env.REACT_APP_Firebase_measurement_id
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider }