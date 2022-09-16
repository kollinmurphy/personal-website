/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				'pulse': 'pulse 4s ease-in-out infinite',
			},
			keyframes: {
				pulse: {
					'0%, 100%': { "background-position-y": "0%" },
					'50%': { "background-position-y": "80%" },
				},
			},
			colors: {
				primary: '#4f39fa',
				secondary: '#da62c4',
			},
		},
	},
	plugins: [],
}
