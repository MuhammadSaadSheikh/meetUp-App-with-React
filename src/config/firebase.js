import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./credentials";

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.FacebookAuthProvider();
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

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

//image upload method
export const uploadPictures = files => {
  const res = Promise.all(
    files.map(file => {
      const fileName = Math.round(Math.random() * 1000000);
      return new Promise((resolve, reject) => {
        storage
          .ref()
          .child("/images/" + fileName + ".jpg")
          .put(file)
          .then(() => {
            storage
              .ref()
              .child("/images/" + fileName + ".jpg")
              .getDownloadURL()
              .then(uri => {
                resolve(uri);
              });
          });
      });
    })
  );
  return res;
};

//logut method
export const logOut = () => {
  localStorage.removeItem("userId");
  return auth.signOut();
};

//meeting collection
export const getAllMeetings = userId => {
  return db
    .collection("meetings")
    .where("userId", "==", userId)
    .get();
};

export const otherUsers = ()=>{
  return db.collection('otherUser').get
}
