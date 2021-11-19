import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWKMeGbamLJfmcdehDP0Nv5O8f3JngvmY",
  authDomain: "cooking-master-app.firebaseapp.com",
  projectId: "cooking-master-app",
  storageBucket: "cooking-master-app.appspot.com",
  messagingSenderId: "294830556278",
  appId: "1:294830556278:web:397b487824d6f278028b57",
};

//init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
