'use strict';

var assign  = require('xtend/mutable')
  , merge   = require('xtend')
  , curry   = require('./lib/just-curry')
  ;

var id = function(x) {return x;};

var isUndefined = function (x) {return typeof x === 'undefined'; };

var isObject = function (x) {return typeof x === 'object'; };

var isArray = function (arr) {return Object.prototype.toString.call( arr ) === '[object Array]'; };

var liftProp = curry(function (f, propName, obj) {
  return f(isObject(obj)?
      obj[propName]
    :
      undefined
  );
});

var prop = liftProp(id);

var kv = curry(function (key, value) {
  var obj = {}; obj[key] = value; return obj;
});

var mapProp = curry(function (f, propName, obj) {
  return merge(obj || {}, kv(propName, liftProp(f, propName, obj)));
});

var liftArraySelection = curry(function (f, selector, obj) {
  return f(selector.reduce(function (obj, propName) {
    return isUndefined(obj)?
        obj
      :
        prop(propName, obj)
      ;
  }, obj));
});

var selectFromArray = liftArraySelection(id);

var mapArraySelection = curry(function (f, selector, obj) {
  return (!selector.length?
      f(obj)
    :
      mapProp(mapArraySelection(f, selector.slice(1)), selector[0], obj)
    );
});

var setArraySelection = curry(function (selector, value, obj) {
  return mapArraySelection(id.bind(null, value), selector, obj);
});

var argMapper = function (f, argMapper) {
  return (function (f, mappers) {
    return function() {
      return f.apply(null, array.prototype.slice.call(arguments).map(function (arg, key) {
        return (!mappers[key]?
            arg
          :
            mappers[key](arg)
          );
      }));
    }
  })(f, Array.prototype.slice.call(arguments, 1));
}

var normalizeSelector = function (selector) {
  return (isArray(selector)?
      selector
    :
      (isUndefined(selector)?
          []
        :
          [selector]
        )
    );
}

var liftSelection = curry(function (f, selector, obj) {
  return liftArraySelection(f, normalizeSelector(selector), obj);
});

var select = liftSelection(id);

var mapSelection = curry(function (f, selector, obj) {
  return mapArraySelection(f, normalizeSelector(selector), obj);
});

var setSelection = curry(function (selector, value, obj) {
  return mapSelection(id.bind(null, value), selector, obj);
});

var hasSelection = curry(function (selector, obj) {
  return liftSelection(function (x) {
    return !isUndefined(x)
  }, selector, obj);
})

module.exports = {
  liftSelection: liftSelection,
  mapSelection: mapSelection,
  select: select,
  setSelection: setSelection,
  hasSelection: hasSelection
}