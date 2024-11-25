import {initializeApp} from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

// Retrieve the API key from the environment variables
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};

// Initialize the app
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

// Provider configuration function
const configureGoogleAuthProvider = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
    });
    return provider;
};

// Initialize Firebase Auth 
const provider = configureGoogleAuthProvider();
const auth = getAuth();

// Function to sign in with Google
const signInWithGoogle = () => signInWithPopup(auth, provider);

export {auth, signInWithGoogle};
