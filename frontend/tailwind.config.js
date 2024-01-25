/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"primary-100": "#00A9FF",
				"primary-50": "#CDF5FD",
				secondary: "#D0D4CA",
				light: "#FFF6F6",
				dark: "#0F0F0F",
			},
		},
	},
	plugins: [],
};
