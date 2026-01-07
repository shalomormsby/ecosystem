/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: 'var(--color-background)',
                    secondary: 'var(--color-background-secondary)',
                    tertiary: 'var(--color-background-tertiary)',
                },
                foreground: {
                    DEFAULT: 'var(--color-foreground)',
                    secondary: 'var(--color-text-secondary)',
                    tertiary: 'var(--color-text-muted)',
                },
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    foreground: 'var(--color-primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    foreground: 'var(--color-secondary-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    foreground: 'var(--color-accent-foreground)',
                },
                surface: 'var(--color-surface)',
                border: 'var(--color-border)',
                glass: {
                    DEFAULT: 'var(--color-glass)',
                    border: 'var(--color-glass-border)',
                }
            },
            fontFamily: {
                heading: ['var(--font-heading)'],
                body: ['var(--font-body)'],
                mono: ['var(--font-mono)'],
            }
        },
    },
    plugins: [],
};
