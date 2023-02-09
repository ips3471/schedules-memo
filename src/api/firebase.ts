import { getMessaging } from 'firebase/messaging';
import { FirebaseOptions, initializeApp } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: '1:705989990935:web:b67f86f980ca99954dda52',
	measurementId: 'G-8NYT91LYXY',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
