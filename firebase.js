import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDkKFWz1QRe1mH5j4cldEuqMMdS-Ijhf1Y",
    authDomain: "facebook-clone-next-f05e7.firebaseapp.com",
    projectId: "facebook-clone-next-f05e7",
    storageBucket: "facebook-clone-next-f05e7.appspot.com",
    messagingSenderId: "866550727788",
    appId: "1:866550727788:web:348ceab18f06c05bb08449"
  };


  const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();

  const db = getFirestore();
  const storage = getStorage();

  export {
  app,
  db,
  storage
};

