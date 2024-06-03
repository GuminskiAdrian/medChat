import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCYzq84g2KKiIrKqrNmJhaday2FVAvS6Io",
    authDomain: "med-chatapp-f7ec9.firebaseapp.com",
    projectId: "med-chatapp-f7ec9",
    storageBucket: "med-chatapp-f7ec9.appspot.com",
    messagingSenderId: "392952560367",
    appId: "1:392952560367:web:8563e3dba94efbdf03791a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };