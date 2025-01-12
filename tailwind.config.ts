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
                background: "rgb(var(--background))",
                foreground: "var(--foreground)",
                contrast: "var(--text-color)",
                primary: "rgb(var(--primary-color))",
                secondary: "rgb(var(--secondary-color))",
                card: "var(--card-background)",
                "primary-text": "rgb(var(--primary-text))",
                "secondary-text": "rgb(var(--secondary-text))",
                "n-primary": "rgb(var(--n-primary))",
                "n-secondary": "rgb(var(--n-secondary))",
                "n-accent": "rgb(var(--n-accent))",
                "n-tertiary": "rgb(var(--n-tertiary))",
                "n-accent-2": "rgb(var(--n-accent-2))",
                "n-accent-yellow": "rgb(var(--n-accent-yellow))",
                "b-primary": "rgb(var(--b-primary))",
                "b-secondary": "rgb(var(--b-secondary))",
                "b-tertiary": "rgb(var(--b-tertiary))",
                "t-primary": "rgb(var(--t-primary))",
                "t-secondary": "rgb(var(--t-secondary))",
                "t-tertiary": "rgb(var(--t-tertiary))",
            },
            fontFamily: {
                "paytone-one": "var(--font-paytone-one)",
            },
        },
    },
    plugins: [],
};
export default config;
