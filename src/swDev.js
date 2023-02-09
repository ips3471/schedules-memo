export default function swDev() {
	const swURL = `${process.env.PUBLIC_URL}/sw.js`;

	navigator.serviceWorker.register(swURL, { scope: '/' }).then(registration => {
		if (registration.installing) {
			console.log('Service worker installing');
		} else if (registration.waiting) {
			console.log('Service worker installed');
			registration.update().then(() => {
				console.log('sw check');
			});
		} else if (registration.active) {
			console.log('Service worker active');
		}
	});
}
