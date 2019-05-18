/**
 * docs : https://jestjs.io/docs/en/configuration#modulefileextensions-array-string
 */
module.exports = {
  verbose: true,
  moduleFileExtensions: ['js'],
  collectCoverageFrom: [
    'src/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
