import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyBzztCegXYhLXDEjVXSV_RqlvxIEkzg8GA",
    authDomain: "book-santa-app-a9f9a.firebaseapp.com",
    projectId: "book-santa-app-a9f9a",
    storageBucket: "book-santa-app-a9f9a.appspot.com",
    messagingSenderId: "517168707055",
    appId: "1:517168707055:web:5ad00b9dd8c9ab17f3f21a"
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore()