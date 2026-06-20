/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				magneto: {
					50: '#e8f0fe',
					100: '#c5d9f5',
					200: '#9ec0ed',
					300: '#77a7e4',
					400: '#508edc',
					500: '#2e75d3',
					600: '#1e5fba',
					700: '#174a94',
					800: '#10366e',
					900: '#0A2148',
					950: '#06132B',
				},
				surface: {
					DEFAULT: '#0B1424',
					light: '#111C30',
					lighter: '#182540',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
			},
		animation: {
			'gradient': 'gradient 8s linear infinite',
			'float': 'float 6s ease-in-out infinite',
			'fade-in': 'fade-in 0.6s ease-out',
			'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
			'twinkle': 'twinkle 3s ease-in-out infinite',
			'drift': 'drift 20s ease-in-out infinite',
		},
		keyframes: {
			gradient: {
				'0%, 100%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
			},
			float: {
				'0%, 100%': { transform: 'translateY(0px)' },
				'50%': { transform: 'translateY(-20px)' },
			},
			'fade-in': {
				'0%': { opacity: '0', transform: 'translateY(10px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
			},
			'pulse-glow': {
				'0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
				'50%': { opacity: '1', transform: 'scale(1.15)' },
			},
			'twinkle': {
				'0%, 100%': { opacity: '0.2' },
				'50%': { opacity: '0.9' },
			},
			'drift': {
				'0%, 100%': { transform: 'translate(0, 0)' },
				'50%': { transform: 'translate(15px, -10px)' },
			},
		},
		},
	},
	plugins: [],
}
