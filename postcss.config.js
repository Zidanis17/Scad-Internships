// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),  // ← this must be the first plugin
    require('autoprefixer'),
    // any other PostCSS plugins…
  ]
}
