import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme/theme';
import ListsPresenter from './presenter/lists';
import { getLists } from './services/database';

const presenter = new ListsPresenter([]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			{/* <GlobalStyle /> */}
			<App presenter={presenter} />
		</ThemeProvider>
	</React.StrictMode>,
);
