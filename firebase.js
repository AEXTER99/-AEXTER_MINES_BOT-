const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc } = require("firebase/firestore");

let db;

function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "FAKE_KEY",
        authDomain: "example.firebaseapp.com",
        projectId: "example",
        storageBucket: "example.appspot.com",
        messagingSenderId: "123456",
        appId: "1:123456:web:example"
    };
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}

async function getMemory() {
    if (!db) return [];
    const snapshot = await getDocs(collection(db, "memory"));
    return snapshot.docs.map(doc => doc.data());
}

function saveMemory(entry) {
    if (!db) return;
    return addDoc(collection(db, "memory"), entry);
}

module.exports = { initializeFirebase, getMemory, saveMemory };