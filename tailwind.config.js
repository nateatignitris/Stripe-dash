/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                stripe: {
                    purple: '#8B5CF6',
                    bg: '#F7F9FC',
                    text: '#1A1F36',
                    secondary: '#697386',
                    border: '#E3E8EE'
                }
            },
            fontFamily: {
                stripe: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
