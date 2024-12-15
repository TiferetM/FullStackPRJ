// fireBaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// הגדרת הקונפיגורציה של Firebase
const firebaseConfig = {
  apiKey: "your-api-key", // הכנס את המפתח שלך כאן
  authDomain: "your-auth-domain", // הכנס את הדומיין שלך כאן
  projectId: "your-project-id", // הכנס את מזהה הפרוייקט שלך כאן
  storageBucket: "your-storage-bucket", // הכנס את ה-bucket שלך כאן
  messagingSenderId: "your-messaging-sender-id", // הכנס את מזהה השולח שלך כאן
  appId: "your-app-id", // הכנס את מזהה האפליקציה שלך כאן
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);

// קבלת שירות ה-Storage
const storage = getStorage(app);

export { storage };
