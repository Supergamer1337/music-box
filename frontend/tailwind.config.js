const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				accent: '#5B68EC',
				emptyBg: '#202225',
				primaryBg: '#37393F'
			},
			fontFamily: {
				sans: ['Roboto', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};