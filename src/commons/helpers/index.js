const {
  omit,
  pick,
  uniq,
} = require('lodash');

const crypto = require('crypto');
const config = require('./../../config');

const salt = config.api.secret;

/**
 *
 * @param {Object} doc
 * @param {Array} keys
 *
 * @example removeKeysFromDoc({ x: 'x', y: 'y', z: 'z' }, ['x', 'y'])
 * @return {Array} [{z: 'z'}]
 */
const removeKeysFromDoc = (doc, keys) => {
  const objKeys = Object.keys(doc);
  const newObj = {};

  if (objKeys.length >= 1) {
    objKeys.forEach(((key) => {
      newObj[key] = doc[key];
    }));
  }

  return omit(newObj, keys);
};

/**
 *
 * @param {Object} doc
 * @param {Array} keys
 *
 * @example getKeysFromDoc({ x: 'x', y: 'y', z: 'z' }, ['x', 'y'])
 * @return {Object} {x: 'x', y: 'y'}
 */
const getKeysFromDoc = (doc, keys) => {
  const objKeys = Object.keys(doc);
  return (objKeys.length >= 1) ? pick(doc, keys) : null;
};

const iterations = 10000;

/**
 *
 * @param {String} plainText
 * Simple helper hash text
 *
 * @example hash('passw0rd')
 * @return {String} 'EvB8gNN0YGxENBRpmkTi72wrHMb/D52cFxS+BuXHDy8='
 *
 */
const hash = (plainText) => {
  const generateHash = crypto.pbkdf2Sync(plainText, salt, iterations, 32, 'sha512');

  return generateHash.toString('base64');
};


/**
 *
 * @param {String} hashPassword
 * @param {String} password
 *
 * @example comparePassword('EvB8gNN0YGxENBRpmkTi72wrHMb/D52cFxS+BuXHDy8=', 'passw0rd')
 * @return {Boolean} true
 */
const comparePassword = (hashPassword, password) => {
  const generateHash = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha512');
  return (hashPassword === generateHash.toString('base64'));
};

const objectKeys = object => Object.keys(object);

/**
 * @return {String} random
 */
const generatePassword = () => {
  const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const countLetters = letters.length;
  let pwd = '';
  for (let i = 0; i < 6; i += 1) {
    pwd += letters[Math.floor(Math.random() * countLetters)];
  }
  return pwd;
};

module.exports = {
  comparePassword,
  getKeysFromDoc,
  generatePassword,
  hash,
  objectKeys,
  removeKeysFromDoc,
  uniq,
};
