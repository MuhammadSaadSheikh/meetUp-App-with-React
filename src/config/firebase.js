import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./credentials";

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
const auth = firebase.auth();

export const fbLogin = userId => {
  return auth.signInWithPopup(provider);
};

export const getUser = userId => {
  return db
    .collection("appUsers")
    .doc(userId)
    .get();
};

export const setUser = (userId, playload) => {
  return db
    .collection("appUsers")
    .doc(userId)
    .set(playload, { merge: true });
};
