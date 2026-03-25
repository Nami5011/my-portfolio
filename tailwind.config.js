import plugin from 'tailwindcss/plugin';

module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('ja', 'html[lang="ja"] &');
    }),
  ],
};
