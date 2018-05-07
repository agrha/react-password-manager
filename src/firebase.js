import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyDh7qxba-1AwGZKENuovifeMa35pPtmajg",
  authDomain: "react-password-manager-17593.firebaseapp.com",
  databaseURL: "https://react-password-manager-17593.firebaseio.com",
  projectId: "react-password-manager-17593",
  storageBucket: "react-password-manager-17593.appspot.com",
  messagingSenderId: "1013910230085"
};
const app = firebase.initializeApp(config);

const db = app.database()
const password = db.ref('user-password')
const user = db.ref('user')
const fire = {password, user}
export default fire
