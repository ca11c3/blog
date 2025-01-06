import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                contrast: "var(--text-color)",
                primary: "rgb(var(--primary-color))",
                secondary: "rgb(var(--secondary-color))",
                card: "var(--card-background)",
                "primary-text": "rgb(var(--primary-text))",
                "secondary-text": "rgb(var(--secondary-text))",
            },
        },
    },
    plugins: [],
};
export default config;
