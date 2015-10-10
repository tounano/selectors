'use strict';

var curryN = require('./just-curryn');

module.exports = function curry(fn) {
  return curryN(fn.length, fn);
};