const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBmG3BrSV-QMRkaAbkNsIys3EU26_F_18k",
  authDomain: "kiei-451-80d14.firebaseapp.com",
  projectId: "kiei-451-80d14",
  storageBucket: "kiei-451-80d14.appspot.com",
  messagingSenderId: "738741945431",
  appId: "1:738741945431:web:19242bc6e91daeaf6b0f12"
} 

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
//please update

module.exports = firebase


// async function getTodos() {
//   let querySnapshot = await debugger.collection('todos').get()
//   return querySnapshot.docs
// }