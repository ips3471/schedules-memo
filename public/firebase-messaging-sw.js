importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
	'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyD6vZZQW7cPXX4PP9xJJbJ8Jz4ob907Rmo',
	authDomain: 'business-card-maker-32eb0.firebaseapp.com',
	databaseURL: 'https://business-card-maker-32eb0-default-rtdb.firebaseio.com',
	projectId: 'business-card-maker-32eb0',
	messagingSenderId: '705989990935',
	appId: '1:705989990935:web:b67f86f980ca99954dda52',
	measurementId: 'G-8NYT91LYXY',
});

const messaging = firebase.messaging(firebaseApp);

messaging.onBackgroundMessage(payload => {
	console.log(
		'[firebase-messaging-sw.js] Received background message ',
		payload,
	);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: payload.notification.image,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
