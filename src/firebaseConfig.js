import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDKzy9X1SXsS_2ig29Ro5h6UwpNdH82QYQ",
    authDomain: "trello-clone-5e5db.firebaseapp.com",
    databaseURL: "https://trello-clone-5e5db-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "trello-clone-5e5db",
    storageBucket: "trello-clone-5e5db.appspot.com",
    messagingSenderId: "701696220572",
    appId: "1:701696220572:web:453d4765a4b2ea4c12bc59"
  };

firebase.initializeApp(config);


export default firebase;
