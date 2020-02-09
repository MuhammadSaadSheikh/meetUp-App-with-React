import firebase from 'firebase'
import 'firebase/firestore'
import {firebaseConfig} from './credentials'

firebase.initializeApp(firebaseConfig);

const povider = firebase.auth.FacebookAuthProvider()
const db = firebase.firestore()
const auth = firebase.auth()

export const fbLogin =()=>{
    return auth.signInWithPopup(provider)
}

export const getUser = userId =>{
    return db.collection('users').doc(userId).get()
}

export const setUser = ((userId, playlod)=>{
    return db.collection('users').doc(userId).set(playlod, {merge : true})
})