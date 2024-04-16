// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAURiwwKcRWCW33wsMeYvj7OMu0vVZWeoU",
  authDomain: "pnw-map-46b6c.firebaseapp.com",
  projectId: "pnw-map-46b6c",
  storageBucket: "pnw-map-46b6c.appspot.com",
  messagingSenderId: "1023231539362",
  appId: "1:1023231539362:web:b8393badc24d850950fffb",
  measurementId: "G-2DZFCB4MNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // Additional actions after successful login if necessary...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // Additional error handling...
    });
};

// Exporting the signOut function
const signOutUser = () => signOut(auth);
const db = getFirestore(app);

export { db, auth, signInWithGoogle, signOutUser, onAuthStateChanged };