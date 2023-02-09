import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import messaging from '../../services/messaging';

function Header() {
	const { login, logout, user } = useAuthContext();

	const handleLogin = () => {
		if (user) {
			logout();
			messaging.removeToken();
		} else {
			login();
		}
	};

	return (
		<nav className='w-full flex p-4 text-2xl border-b border-zinc-600 justify-between bg-zinc-900 z-50'>
			<h1 className='font-bold ml-2 text-2xl'>예약</h1>
			<button onClick={handleLogin} className='text-xl'>
				{user ? '로그아웃' : '로그인'}
			</button>
		</nav>
	);
}

export default Header;
