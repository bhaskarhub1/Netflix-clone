import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBBDEtHJqiPXnJW2AXMqvaBdTpgCcPU1VQ",
  authDomain: "netflix-39ebe.firebaseapp.com",
  projectId: "netflix-39ebe",
  storageBucket: "netflix-39ebe.firebasestorage.app",
  messagingSenderId: "517260348784",
  appId: "1:517260348784:web:4e62731e467a58886053b5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  console.log("EXECUTING SIGN UP");

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log("ERROR CAUGHT: " + error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  console.log("EXECUTING SIGN IN");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // console.log("ERROR CAUGHT: " + error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signUp, logout };
