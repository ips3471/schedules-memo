import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { IoMdRefresh } from 'react-icons/io';
import { HeaderProps } from '../../types/components/components';

function Header({ onRefresh }: HeaderProps) {
	const { login, logout, user } = useAuthContext();

	const handleLogin = async () => {
		if (user) {
			logout();
		} else {
			login();
		}
	};

	return (
		<nav className='w-full flex p-4 text-2xl border-b border-zinc-600 justify-between bg-zinc-900 z-50'>
			<button onClick={onRefresh} className='flex items-center gap-2'>
				<h1 className='font-bold ml-2 text-2xl'>예약</h1>
				{user && <IoMdRefresh />}
			</button>
			<button onClick={handleLogin}>
				<span className='text-sm'>{user && user.displayName + '님'}</span>
				<span className='text-xl ml-2'>{user ? '로그아웃' : '로그인'}</span>
			</button>
		</nav>
	);
}

export default Header;
