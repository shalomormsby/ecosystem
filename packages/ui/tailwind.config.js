const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('./tailwind/index.js')],
    content: [join(__dirname, 'src/**/*.{ts,tsx}')],
    theme: {
        extend: {},
    },
    plugins: [],
};
