// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, where } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase 콘솔에서 복사한 설정값으로 교체하세요
const firebaseConfig = {
  apiKey: "AIzaSyBw1b5Votiga8JVSB3JpD0UdH1VrdfBoO4",
  authDomain: "yoons-class-booster.firebaseapp.com",
  projectId: "yoons-class-booster",
  storageBucket: "yoons-class-booster.firebasestorage.app",
  messagingSenderId: "1019920965400",
  appId: "1:1019920965400:web:cc8a63cc5f757c2785886d",
  measurementId: "G-JM4TL6R6M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 전역에서 사용할 수 있도록 window 객체에 할당
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.onSnapshot = onSnapshot;
window.doc = doc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.query = query;
window.orderBy = orderBy;
window.where = where;

console.log("Firebase Connected!");