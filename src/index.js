import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import { theme } from './styles/theme/theme';
import ListsPresenter from './presenter/lists';

const presenter = new ListsPresenter([
	{
		id: '1',
		title: '지리산',
		howMany: 6,
		date: 221202,
		location: '지리산자연휴양림',
		code: '1234',
		state: '완료',
	},
	{
		id: '2',
		title: '설악산',
		howMany: 6,
		date: 230103,
		location: '설악산자연휴양림',
		code: '1234',
		state: '입장',
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<App presenter={presenter} />
		</ThemeProvider>
	</React.StrictMode>,
);
