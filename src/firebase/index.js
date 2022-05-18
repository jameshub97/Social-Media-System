import { initializeApp } from "firebase/app";
import { getAuth,setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDVkQdpGsqKXM7r9a6lpGimTxCfMmsjfh4",
  authDomain: "auth-develop-4b87a.firebaseapp.com",
  databaseURL: "https://auth-develop-4b87a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auth-develop-4b87a",
  storageBucket: "auth-develop-4b87a.appspot.com",
  messagingSenderId: "989534190282",
  appId: "1:989534190282:web:e9d82e73a1c68588591233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence)




export {db, auth}

// store.dispatch("loadProfileData")