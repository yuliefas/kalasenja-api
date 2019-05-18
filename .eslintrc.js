module.exports = {
  extends: 'airbnb-base',
  overrides: [{
    files: ['bin/*.js', 'lib/*.js'],
    excludedFiles: '*.test.js',
    rules: {
      quotes: [2, 'single'],
    },
  }],
};
