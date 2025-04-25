import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, DataSnapshot, Database } from 'firebase/database';

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

// 환경 변수 디버깅
console.log('Firebase Configuration:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : 'missing',
  databaseURL: firebaseConfig.databaseURL || 'missing'
});

// Firebase 초기화
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Realtime Database 초기화
let database: Database;
try {
  database = getDatabase(app);
  console.log('Database initialized successfully');
  
  // 데이터베이스 연결 테스트
  const testRef = ref(database, '.info/connected');
  onValue(testRef, (snap) => {
    if (snap.val() === true) {
      console.log('Database connected');
    }
  });
} catch (error) {
  console.error('Database initialization error:', error);
  throw error;
}

export { database };

export const updateClickCount = async (character: string, count: number) => {
  try {
    console.log(`Updating ${character} clicks to:`, count);
    const characterRef = ref(database, `characters/${character}`);
    await set(characterRef, {
      clicks: count,
      lastUpdated: new Date().toISOString()
    });
    console.log(`Successfully updated ${character} clicks`);
  } catch (error) {
    console.error(`Error updating ${character} clicks:`, error);
    throw error;
  }
};

export const subscribeToClicks = (character: string, callback: (count: number) => void) => {
  console.log(`Subscribing to ${character} clicks`);
  const characterRef = ref(database, `characters/${character}`);
  
  return onValue(characterRef, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    console.log(`Received update for ${character}:`, data);
    if (data) {
      callback(data.clicks);
    } else {
      // 데이터가 없는 경우 0으로 초기화
      console.log(`No data for ${character}, initializing to 0`);
      callback(0);
    }
  }, (error) => {
    console.error(`Error subscribing to ${character} clicks:`, error);
  });
}; 