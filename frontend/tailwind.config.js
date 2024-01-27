/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"primary-100": "#00A9FF",
				"primary-75": "#89CFF3",
				"primary-50": "#A0E9FF",
				"primary-25": "#CDF5FD",
				secondary: "#D0D4CA",
				light: "#FFF6F6",
				dark: "#0F0F0F",
				"dark-50": "#757575",
			},
		},
	},
	plugins: [],
};
