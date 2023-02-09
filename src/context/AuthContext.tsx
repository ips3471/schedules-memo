import React, {
	createContext,
	ReactNode,
	useState,
	useContext,
	useEffect,
} from 'react';
import auth from '../services/auth';
import db from '../services/database';
import { User } from '../types/models/models';

interface AuthContextValue {
	user: AuthUser | null;
	login(): void;
	logout(): void;
	updateToken(token: string): void;
}

type AuthUser = User & { isAdmin: Promise<boolean> };

interface AuthContextProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
	user: null,
	login: () => {},
	logout: () => {},
	updateToken: () => {},
});

export function AuthProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<AuthUser | null>(null);

	useEffect(() => {
		auth.onUserStateChanged(async user => {
			if (!user) return;
			const isAdmin = await db.isAdmin(user);
			const token = await db.getUserToken(user.uid);
			setUser({ ...user, isAdmin, token });
		});
	}, []);

	function login() {
		auth.login('google');
	}

	function logout() {
		auth.logout();
		setUser(null);
		// home으로 이동
	}

	function updateToken(token: string) {
		setUser(user => {
			if (user == null) {
				return null;
			}
			return { ...user, token };
		});
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, updateToken }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext)!;
}
