import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { AuthProvider } from './context/AuthContext';
import swDev from './swDev';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
);
swDev();
