
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
};


const db = getFirestore(app);

const addTask = async (taskMessage, userId) => {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "tasks"), {
      message: taskMessage,
      createdAt: serverTimestamp()
    });
    console.log("Task added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export { auth, signInWithGoogle, signOutUser, addTask, db };