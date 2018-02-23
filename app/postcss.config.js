
module.exports = {
  plugins: {
    'postcss-import': {},
    'precss': {}, // contains plugins for Sass-like features, like variables, nesting, and mixins.
    'autoprefixer': {browsers: ['> 5%', 'ie 9']}  // adds vendor prefixes, using data from Can I Use
  }
}
