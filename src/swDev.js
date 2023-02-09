export default function swDev() {
	const swURL = `${process.env.PUBLIC_URL}/sw.js`;
	const messaingSwURL = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;

	navigator.serviceWorker.register(swURL).then(res => {
		console.info('sw', res);
	});

	navigator.serviceWorker.register(messaingSwURL).then(res => {
		console.info('firebase-messaging-sw', res);
	});
}
