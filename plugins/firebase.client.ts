import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {

    const firebaseConfig = {
        apiKey: "AIzaSyCghGrL2HvtR3VHOJs_oAR67d6MELcYH-k",
        authDomain: "gymratapp-fec2c.firebaseapp.com",
        projectId: "gymratapp-fec2c",
        storageBucket: "gymratapp-fec2c.firebasestorage.app",
        messagingSenderId: "1041408459002",
        appId: "1:1041408459002:web:de43782d265851ccb68943"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    return {
        provide: {
            auth,
            firestore
        }
    }
});