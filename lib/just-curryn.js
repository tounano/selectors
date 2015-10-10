'use strict';

var argumentsToArray = require('./args-to-arr');

module.exports = function curryN(n, fn) {
  return (function _curryN (n, fn, args) {
    return function () {
      var _args = arguments.length? argumentsToArray(arguments) : [undefined];
      return (args.length + _args.length >= n) ?
        fn.apply(null, args.concat(_args))
        : _curryN(n, fn, args.concat(_args));
    }
  })(n, fn, []);
};