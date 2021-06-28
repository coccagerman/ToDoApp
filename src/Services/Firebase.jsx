import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAe9pujRcCphkPtoEo4bgrP0yOnxFKOdYU",
    authDomain: "todoapp-79de2.firebaseapp.com",
    projectId: "todoapp-79de2",
    storageBucket: "todoapp-79de2.appspot.com",
    messagingSenderId: "927881405437",
    appId: "1:927881405437:web:1c95adb5ff78a152a8af94"
})

export const auth = firebase.auth()
export const database = firebase.firestore(app).collection('tasks')
