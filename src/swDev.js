export default function swDev() {
	const swURL = `${process.env.PUBLIC_URL}/sw.js`;

	navigator.serviceWorker.register(swURL).then(res => {
		if (res.installing) {
			console.log('Service worker installing');
		} else if (res.waiting) {
			console.log('Service worker installed');
		} else if (res.active) {
			console.log('Service worker active');
		}
	});
}

/* 
navigator.serviceWorker.register('sw.js').then(function(reg) {
 if(reg.installing) {
        console.log('Service worker installing');
    } else if(reg.waiting) {
        console.log('Service worker installed');
    } else if(reg.active) {
        console.log('Service worker active');
    }
 // Include below mentioned validations
}
*/
