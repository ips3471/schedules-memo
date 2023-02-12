export default function swDev() {
	const swURL = `${process.env.PUBLIC_URL}/sw.js`;

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.getRegistration().then(function (registration) {
			if (!registration) {
				navigator.serviceWorker
					.register(swURL, { scope: '/' })
					.then(registration => {
						if (registration.installing) {
							console.log('Service worker installing');
						} else if (registration.waiting) {
							console.log('Service worker installed');
						} else if (registration.active) {
							console.log('Service worker active');
						}
					});
			} else if (registration.update) {
				console.log('there are updates in service worker');
				registration.update();
			}
		});
	}
}
