import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const auth =firebase.initializeApp( {
  apiKey: "AIzaSyAt4yv77Jn5wWxmZhN5VUjyN2-2Ut6o0g0",
  authDomain: "chatify-ec5b9.firebaseapp.com",
  projectId: "chatify-ec5b9",
  storageBucket: "chatify-ec5b9.appspot.com",
  messagingSenderId: "487774047961",
  appId: "1:487774047961:web:7018f8331d103fb7ba38c8"
}).auth();