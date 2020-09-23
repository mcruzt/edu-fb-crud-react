import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDK5qfS1RA8nbIjYwqW8bASYDkKocANCJ0",
    authDomain: "fb-crud-react-2a12b.firebaseapp.com",
    databaseURL: "https://fb-crud-react-2a12b.firebaseio.com",
    projectId: "fb-crud-react-2a12b",
    storageBucket: "fb-crud-react-2a12b.appspot.com",
    messagingSenderId: "296081807616",
    appId: "1:296081807616:web:4eed9c1b93d793b1ac3be5"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
