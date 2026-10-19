/** Brand colours live in src/index.css (:root). Change them there once, the whole site follows. */
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: c('brand'),
        'brand-dark': c('brand-dark'),
        accent: c('accent'),
        leaf: c('leaf'),
        coral: c('coral'),
        cream: c('cream'),
        ink: c('ink'),
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
