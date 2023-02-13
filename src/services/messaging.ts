import { SendNotificationType, User } from './../types/models/models';
import firebaseApp from '../api/firebase';
import {
	getMessaging,
	getToken,
	onMessage,
	isSupported,
	deleteToken,
} from 'firebase/messaging';
import db from './database';
import { AuthUser } from '../context/AuthContext';

const messagingRef = getMessaging(firebaseApp);

const messaging = {
	baseURL: 'https://fcm.googleapis.com/fcm/send',
	serverKey: process.env.REACT_APP_FIREBASE_MESSAGING_SERVER_KEY,

	async requestPermission() {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			if (!isSupported()) {
				console.info('Not supported');
				return null;
			}
			console.log('get token');

			const token = this.genToken();
			return token;
		} else {
			alert('알람을 거부할 경우 새로운 스케줄 이벤트를 수신할 수 없습니다');
			return;
		}
	},

	async genToken() {
		const token = await getToken(messagingRef, {
			vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_VAPID_KEY,
		});
		console.log('generated token', token);
		return token;
	},

	async addMessageListener(callback: (title: string, body: string) => void) {
		onMessage(messagingRef, payload => {
			console.log('onMessage', payload);
			if (!payload) {
				console.error('payload not exist');
				return;
			}
			const { notification } = payload;
			callback(notification?.title || '', notification?.body || '');
		});
	},

	updateToken(user: User, token: string) {
		token && db.updateUserToken(user.uid, token);
	},

	async removeToken(user: AuthUser) {
		console.info('token removed');
		await deleteToken(messagingRef);
		db.removeUserToken(user);
	},

	async sendMessage(type: SendNotificationType, uid?: string) {
		const foundToken = await db.getUserToken(uid);
		console.log(foundToken);
		if (!foundToken) {
			throw new Error('Fund Token Failed');
		}

		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append(
			'Authorization',
			`Bearer ${process.env.REACT_APP_FIREBASE_MESSAGING_SERVER_KEY}`,
		);

		function genBodyAndFetch(body: string) {
			const raw = JSON.stringify({
				to: foundToken,
				notification: {
					title: 'Schedules-Memo',
					body,
				},
			});
			const requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
			};
			fetch(messaging.baseURL, requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));
		}

		switch (type) {
			case 'changed':
				return genBodyAndFetch('변경된 내용이 있습니다');
			case 'submitted':
				return genBodyAndFetch('새로운 스케줄이 있습니다');

			case 'head-out':
				return genBodyAndFetch('출발지로 이동중입니다');

			case 'arrived':
				return genBodyAndFetch('출발지에 도착했습니다');
		}
	},
};

export default messaging;
