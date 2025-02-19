import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArUl_faIBSw15Lg4_NLuJWkqfZxW4dSKo",
    authDomain: "bluestock-48d75.firebaseapp.com",
    projectId: "bluestock-48d75",
    storageBucket: "bluestock-48d75.firebasestorage.app",
    messagingSenderId: "141703934973",
    appId: "1:141703934973:web:0cd2dfd601878bc3f79f94"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
