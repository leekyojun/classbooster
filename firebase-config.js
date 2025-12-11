/* firebase-config.js */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, getDoc, getDocs, setDoc, doc, 
    updateDoc, deleteDoc, query, orderBy, where, serverTimestamp, writeBatch 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
    getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getStorage, ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase 설정값 (기존 값 유지)
const firebaseConfig = {
  apiKey: "AIzaSyBw1b5Votiga8JVSB3JpD0UdH1VrdfBoO4",
  authDomain: "yoons-class-booster.firebaseapp.com",
  projectId: "yoons-class-booster",
  storageBucket: "yoons-class-booster.firebasestorage.app",
  messagingSenderId: "1019920965400",
  appId: "1:1019920965400:web:cc8a63cc5f757c2785886d",
  measurementId: "G-JM4TL6R6M2"
};

let app, db, auth, storage;

try {
    // 앱 초기화
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    console.log("✅ Firebase Services Initialized Successfully");
} catch (error) {
    console.error("❌ Firebase Initialization Error:", error);
    alert("시스템 연결 중 오류가 발생했습니다. 새로고침 해주세요.");
}

// 전역 객체 할당 (기존 레거시 코드 호환성 유지)
window.db = db;
window.auth = auth;
window.storage = storage;
window.collection = collection;
window.addDoc = addDoc;
window.setDoc = setDoc;
window.doc = doc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.getDoc = getDoc;
window.getDocs = getDocs;
window.query = query;
window.orderBy = orderBy;
window.where = where;
window.serverTimestamp = serverTimestamp;
window.writeBatch = writeBatch; // 일괄 처리를 위해 추가

// 모듈 방식 사용을 위한 Export
export { db, auth, storage, app };