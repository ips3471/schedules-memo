/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			padding: {
				appBody: '0.9rem',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
