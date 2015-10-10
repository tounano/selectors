'use strict';

module.exports = function argumentsToArray(args) {
  return Array.prototype.slice.call(args);
};