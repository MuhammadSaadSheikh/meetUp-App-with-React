import firebase, { storage } from "firebase";
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

// export const uploadPictures = files => {
//   const response = Promise.all(
//     files.map(files => {
//       const fileName = Math.floor(Math.random() * 1000000);
//       return new Promise((resolve, rejected) => {
//         storage
//           .ref()
//           .child("/images" + fileName + ".jpg")
//           .put(files)
//           .then(() => {
//             storage
//               .ref()
//               .child("images" + fileName + "jpg")
//               .getDownloadURL()
//               .then(uri => {
//                 resolve(uri);
//               });
//           });
//       });
//     })
//   );
//   return response
// };

export const logOut = ()=>{
  localStorage.removeItem('userId')
  return auth.signOut()
}


export const uploadPictures = (files) => {
  const res = Promise.all(files.map(file => {
    const fileName = Math.round(Math.random() * 1000000);
    return new Promise((resolve, reject) => {
      storage
        .ref()
        .child("/images/" + fileName + ".jpg")
        .put(file).then(() => {
          storage
            .ref()
            .child("/images/" + fileName + ".jpg")
            .getDownloadURL()
            .then(uri => {
              resolve(uri);
            });
        })
    })
  }))
  return res.then(result =>{
    console.log('result==>' , result)
  })
}