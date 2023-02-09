import {
	signInWithPopup,
	getAuth,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
} from 'firebase/auth';
import firebaseApp from '../api/firebase';
import { AuthUser } from '../context/AuthContext';
import messaging from './messaging';

type Provider = 'google';

const authRef = getAuth(firebaseApp);
const providers = {
	google: new GoogleAuthProvider(),
};

const auth = {
	login(provider: Provider) {
		signInWithPopup(authRef, providers[provider]).catch(console.error);
	},

	logout(user: AuthUser) {
		signOut(authRef).catch(console.error);
		messaging.removeToken(user);
	},

	onUserStateChanged(onAuthChanged: NextOrObserver<User>) {
		return onAuthStateChanged(authRef, onAuthChanged);
	},
};

export default auth;
