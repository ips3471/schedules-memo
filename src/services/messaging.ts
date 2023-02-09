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
		return token;
	},

	async addMessageListener(callback: (title: string, body: string) => void) {
		onMessage(messagingRef, payload => {
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
		switch (type) {
			case 'changed':
				{
					const foundToken = await db.getUserToken(uid);
					const myHeaders = new Headers();
					myHeaders.append('Content-Type', 'application/json');
					myHeaders.append(
						'Authorization',
						`Bearer ${process.env.REACT_APP_FIREBASE_MESSAGING_SERVER_KEY}`,
					);

					const raw = JSON.stringify({
						to: foundToken,
						notification: {
							title: '승인',
							body: '변경된 스케줄이 있습니다',
						},
					});

					const requestOptions = {
						method: 'POST',
						headers: myHeaders,
						body: raw,
					};

					fetch(this.baseURL, requestOptions)
						.then(response => response.text())
						.then(result => console.log(result))
						.catch(error => console.log('error', error));
				}
				break;
			case 'submitted':
				{
					const admin = await db.getAdmin();
					const foundToken = await db.getUserToken(admin);
					console.log(foundToken);
					const myHeaders = new Headers();
					myHeaders.append('Content-Type', 'application/json');
					myHeaders.append(
						'Authorization',
						`Bearer ${process.env.REACT_APP_FIREBASE_MESSAGING_SERVER_KEY}`,
					);

					const raw = JSON.stringify({
						to: foundToken,
						notification: {
							title: '승인',
							body: '새로운 스케줄이 등록되었습니다',
						},
					});

					const requestOptions = {
						method: 'POST',
						headers: myHeaders,
						body: raw,
					};

					fetch(this.baseURL, requestOptions)
						.then(response => response.text())
						.then(result => console.log(result))
						.catch(error => console.log('error', error));
				}
				break;
		}
	},
};

export default messaging;
