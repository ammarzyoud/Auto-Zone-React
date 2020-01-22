import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCU-nHXMeX0myfCuNIRx26A0s1mCb_xlhg",
  authDomain: "uploadimg-18f57.firebaseapp.com",
  databaseURL: "https://uploadimg-18f57.firebaseio.com",
  projectId: "uploadimg-18f57",
  storageBucket: "uploadimg-18f57.appspot.com",
  messagingSenderId: "1013937838888",
  appId: "1:1013937838888:web:026109488f89e5f527ce1d",
  measurementId: "G-Q6H4ZHH5WT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };
