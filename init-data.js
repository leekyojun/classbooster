/* init-data.js */
import { db } from "./firebase-config.js";
import { collection, getDocs, doc, writeBatch, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. 초기 사용자 데이터 (학생/교사)
const initialUsers = [
    { uid: "teacher_admin", name: "Teacher Kim", role: "teacher", email: "teacher@yoons.com", grade: null },
    { uid: "student_01", name: "김민준", role: "student", email: "minjun@yoons.com", grade: "mid_1" },
    { uid: "student_02", name: "이서연", role: "student", email: "seoyeon@yoons.com", grade: "elem_high" }
];

// 2. 주제 데이터 (Output Booster - topicDB 변환)
// 검색 쿼리 최적화를 위해 중첩 객체를 풀어 'Flat'한 문서 구조로 변경합니다.
const initialTopics = [
    // Writing Topics
    { type: "Writing", grade: "elem_low", title: "My Name", prompt: "Write your name and age using complete sentences.", hints: ["My name is...", "I am..."] },
    { type: "Writing", grade: "elem_mid", title: "My Family", prompt: "Describe your family members.", hints: ["There are...", "My father is..."] },
    { type: "Writing", grade: "mid_1", title: "My Dream Job", prompt: "What do you want to be in the future and why?", hints: ["I want to be a...", "Because I like..."] },
    // Speaking Topics
    { type: "Speaking", grade: "elem_low", title: "Self Intro", prompt: "Introduce yourself in 3 sentences.", hints: ["Hello, I am...", "I like..."] },
    { type: "Speaking", grade: "mid_1", title: "Favorite Season", prompt: "What is your favorite season?", hints: ["My favorite season is...", "I love snow..."] }
];

/**
 * DB 초기화 메인 함수
 * - 중복 실행 방지 로직 포함
 * - Batch Write를 사용하여 원자성(Atomicity) 보장
 */
export async function initializeDatabase() {
    console.log("🚀 Starting Database Initialization...");

    try {
        const batch = writeBatch(db);
        let operationCount = 0;

        // 1. Users 컬렉션 초기화
        const usersRef = collection(db, "users");
        // 이미 데이터가 있는지 확인 (중복 생성 방지)
        const userSnapshot = await getDocs(usersRef);
        
        if (userSnapshot.empty) {
            console.log("Creating Users data...");
            initialUsers.forEach(user => {
                // 커스텀 ID(uid)를 사용하여 문서 생성
                const docRef = doc(db, "users", user.uid);
                batch.set(docRef, {
                    ...user,
                    createdAt: new Date().toISOString()
                });
                operationCount++;
            });
        } else {
            console.log("ℹ️ Users collection already exists. Skipping.");
        }

        // 2. Topics 컬렉션 초기화
        const topicsRef = collection(db, "topics");
        const topicSnapshot = await getDocs(topicsRef);

        if (topicSnapshot.empty) {
            console.log("Creating Topics data...");
            initialTopics.forEach(topic => {
                // 자동 생성 ID 사용
                const docRef = doc(topicsRef); 
                batch.set(docRef, {
                    ...topic,
                    isActive: true, // 활성화 여부 플래그
                    createdAt: new Date().toISOString()
                });
                operationCount++;
            });
        } else {
            console.log("ℹ️ Topics collection already exists. Skipping.");
        }

        // 배치 커밋 실행
        if (operationCount > 0) {
            await batch.commit();
            console.log(`✅ Database Initialization Completed! (${operationCount} documents created)`);
            alert("데이터베이스 초기화가 완료되었습니다. (Users, Topics)");
        } else {
            console.log("✅ Database is already up to date.");
        }

    } catch (error) {
        console.error("❌ DB Initialization Failed:", error);
        alert(`DB 초기화 실패: ${error.message}`);
    }
}