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

type Provider = 'google';

const authRef = getAuth(firebaseApp);
const providers = {
	google: new GoogleAuthProvider(),
};

const auth = {
	login(provider: Provider) {
		signInWithPopup(authRef, providers[provider]).catch(console.error);
	},

	logout() {
		signOut(authRef).catch(console.error);
	},

	onUserStateChanged(onAuthChanged: NextOrObserver<User>) {
		return onAuthStateChanged(authRef, onAuthChanged);
	},
};

export default auth;
