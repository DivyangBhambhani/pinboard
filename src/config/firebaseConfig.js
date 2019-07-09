import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCt9W1VoPuMm3ZNwjv2keIK0vJ-rRxOgbo",
  authDomain: "pinboard-test1.firebaseapp.com",
  databaseURL: "https://pinboard-test1.firebaseio.com",
  projectId: "pinboard-test1",
  storageBucket: "pinboard-test1.appspot.com",
  messagingSenderId: "534699993100",
  appId: "1:534699993100:web:21b89d80fbd4453c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;