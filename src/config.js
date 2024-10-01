import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDK0AGx99kq9xrSLdQzuGPI1Hc-Xfu0DfM",
    authDomain: "expensestracks.firebaseapp.com",
    databaseURL: "https://expensestracks-default-rtdb.firebaseio.com",
    projectId: "expensestracks",
    storageBucket: "expensestracks.appspot.com",
    messagingSenderId: "120943234480",
    appId: "1:120943234480:web:6885dee10c6b51d8165a75",
    measurementId: "G-VWKMNNV66T"
}

if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase();
export {db}