// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIdnJnMcaw-Sh0Ddvwn0rdJborqDlLQD8",
    authDomain: "niche-88dda.firebaseapp.com",
    projectId: "niche-88dda",
    storageBucket: "niche-88dda.firebasestorage.app",
    messagingSenderId: "184324079098",
    appId: "1:184324079098:web:55d7c135a50ad108d5f843",
    measurementId: "G-6R9FNY9M8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
