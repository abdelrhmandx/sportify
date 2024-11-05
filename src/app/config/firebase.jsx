import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdPXhfGyTxUHiPQDc3_ToZ5vcKF3miNtc",
  authDomain: "wwew-fa4b6.firebaseapp.com",
  projectId: "wwew-fa4b6",
  storageBucket: "wwew-fa4b6.appspot.com",
  messagingSenderId: "66751097136",
  appId: "1:66751097136:web:2d89b8a4cfb72e60be40f5"
}; 

const fireApp = initializeApp(firebaseConfig);

const fireDB = getFirestore(fireApp);

export { fireApp, fireDB };
