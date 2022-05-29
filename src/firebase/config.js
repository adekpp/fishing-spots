import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRTLj-WkVqrpllahVtUHW3rRnbr3BpKh4",
  authDomain: "fishing-spots-141f9.firebaseapp.com",
  projectId: "fishing-spots-141f9",
  storageBucket: "fishing-spots-141f9.appspot.com",
  messagingSenderId: "1041599922833",
  appId: "1:1041599922833:web:c2bc60b4402ae49224b530",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
