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
		howMany: 4,
		date: '22-12-02',
		place: '지리산자연휴양림',
		code: '1234',
		state: '입장',
		host: '대승',
		whoAre: [
			{ name: '대승', id: '123123a' },
			{ name: '재연', id: 'b5345' },
			{ name: '명섭', id: 'c32442' },
			{ name: '은영', id: '3454d' },
		],
		receipts: {
			self: [
				{
					id: 11,
					name: '대승',
					where: '❤',
					payment: 20000,
					category: 'self',
				},
			],
			mart: [
				{
					id: 13,
					name: '대승',
					where: '❤',
					payment: 200000,
					category: 'mart',
				},
			],
			ticket: [
				{
					id: 12,
					name: '재연',
					where: '❤',
					payment: 15000,
					category: 'ticket',
				},
			],
			car: [
				{
					id: 11,
					name: '대승',
					where: '❤',
					payment: 90000,
					category: 'car',
				},
			],
			reservation: [
				{
					id: 11,
					name: '재연',
					where: '❤',
					payment: 160000,
					category: 'reservation',
				},
			],
		},
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
