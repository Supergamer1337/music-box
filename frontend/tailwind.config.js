const defaultTheme = require('tailwindcss/defaultTheme')

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
                primaryBg: '#37393F',
                secondaryBg: '#2F3136',
                discordBorder: 'rgba(255, 255, 255, 0.1)',
                scrollbarBg: '#2E3338'
            },
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
}
