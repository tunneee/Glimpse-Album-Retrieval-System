// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBuKwrzupSAGH73ynECRqZwr8uNdrGQztk",
  authDomain: "demoglimpse.firebaseapp.com",
  projectId: "demoglimpse",
  storageBucket: "demoglimpse.appspot.com",
  messagingSenderId: "949695537835",
  appId: "1:949695537835:web:699b1c94ed1d62671dcdee",
  measurementId: "G-QL7H1BW42W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app)
