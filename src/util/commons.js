/* eslint-disable no-useless-escape */

/**
 * Checks if a string is a valid email address.
 * @param {String} email Email string
 */
const isValidEmail = function(email) {
  var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
};

/**
 * Checks if a string is valid.
 * @param {String} str String to validate
 */
const isValid = str => str && str !== "" && str !== null;

/**
 * Checks if an object is valid.
 * @param {Object} object Object to validate
 */
const isEmpty = object => !isValid(object) || Object.keys(object).length === 0;

/**
 * Generates a random string with a fixed length.
 * @param {Integer} length The length of the generated string
 */
const generateRandomString = function(length) {
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var index = length; index > 0; --index) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

/**
 * Generates a random positive integer with a fixed length.
 * @param {Integer} length The length of the generated integer
 */
const generateRandomNumber = function(length) {
  var chars = "0123456789";
  var result = "";
  for (var index = length; index > 0; --index) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export {
  isValidEmail,
  isValid,
  isEmpty,
  generateRandomString,
  generateRandomNumber
};
