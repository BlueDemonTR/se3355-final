/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    './src/**/*.{js,jsx,ts,tsx}', // The path to your React components/files
],
theme: {
    data: {
        activated: 'status~="active"'
    },
    extend: {
        colors: {
            'primary': '#540863',
            'secondary': '#92487A',
            'tertiary': '#E49BA6',
            'four': '#FFD3D5',
            'effect': '#FF8B53',
            'normal': '#FDE68A',
            'spell': '#FDE68A',
            'ritual': '#9DB5CC',
            'link': '#006ead',
            'fusion': '#A086B7',
            'trap': '#BC5A84',
            'synchro': '#CCCCCC',
            'token': '#828e85',
            'xyz': '#000000',
            'low-scale': '#F00000',
            'high-scale': '#323299',
            'button-disabled': '#E2E0E0',
            'button-normal': '#FFFFFF',
            'button-hover': '#4FD9FF',
            'button-active': '#2CA6FF',
        },
        aspectRatio: {
            card: '813/1185'
        },
        spacing: {
            half: '50%',
            header: '64px',
            content: 'calc(100vh - 64px)'
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
            }
        },
        animation: {
            fadeIn: 'fadeIn 0.3s linear'
        },
        boxShadow: {
            'big-inner': '20px 20px 50px 10px rgba(0,0,0,0.2) inset',
        }
    },
},
plugins: [],
};