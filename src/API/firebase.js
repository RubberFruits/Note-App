import firebase from 'firebase/app';
import 'firebase/auth'

const app = firebase.initializeApp({
   apiKey: 'AIzaSyA8RswvZCAak0P_-3ZSrsCabKANjWI8rbU',
   authDomain: 'note-app-react-e52b6.firebaseapp.com',
   projectId: 'note-app-react-e52b6',
   storageBucket: 'note-app-react-e52b6.appspot.com',
   messagingSenderId: '430373734501',
   appId: '1:430373734501:web:5a0a7f0b70192ed6cc1e8c'
})

export const auth = app.auth();

export const FirebaseMethods = {
   registerUser(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
   },
   login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
   },
   logOut() {
      return auth.signOut();
   }
}

export default app;