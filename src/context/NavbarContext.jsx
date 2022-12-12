import { createContext, useContext } from 'react';

export const NavbarContext = createContext();

class NavbarState {
	constructor() {
		this.isVisibleExitBtn = false;
	}

	toVisibleExitBtn() {
		console.log('visible');
		this.isVisibleExitBtn = true;
	}

	toHideExitBtn() {
		console.trace('hide');
		this.isVisibleExitBtn = false;
	}
}

const navbarState = new NavbarState();

export function NavbarContextProvider({ children }) {
	return (
		<NavbarContext.Provider value={navbarState}>
			{children}
		</NavbarContext.Provider>
	);
}

export function useNavbar() {
	return useContext(NavbarContext);
}
