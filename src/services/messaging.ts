import { SendNotificationType, User } from './../types/models/models';
import firebaseApp from '../api/firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import db from './database';

const messagingRef = getMessaging(firebaseApp);

const messaging = {
	baseURL: 'https://fcm.googleapis.com/fcm/send',
	serverKey: process.env.REACT_APP_FIREBASE_MESSAGING_SERVER_KEY,

	async requestPermission() {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			const token = await getToken(messagingRef, {
				vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_VAPID_KEY,
			});
			return token;
		} else {
			alert('알람을 거부할 경우 새로운 스케줄 이벤트를 수신할 수 없습니다');
			return;
		}
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
		db.updateUserToken(user.uid, token);
	},

	async sendMessage(type: SendNotificationType, uid: string) {
		if (!uid) {
			console.error('user token is not exist');
			return;
		}
		const foundToken = await db.getUserToken(uid);
		switch (type) {
			case 'changed': {
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

				fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			}
		}
	},
};

export default messaging;
