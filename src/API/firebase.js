import firebase from 'firebase/app';
import 'firebase/auth'

const app = firebase.initializeApp({
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID
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