import React from 'react';
import firebase from "firebase/compat";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB1HocTaAv7Qnz6JQ10UnGFuh1Dnw9XDz4",
    authDomain: "viatores-chat.firebaseapp.com",
    projectId: "viatores-chat",
    storageBucket: "viatores-chat.appspot.com",
    messagingSenderId: "637634051866",
    appId: "1:637634051866:web:fe4fadbd1a3970ed13b6a3",
    measurementId: "G-1HB28KXCL7"
})


const db = firebaseApp.firestore()

export {db};

