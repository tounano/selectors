# Selectors

Immutable JSON selectors.

A small lib that help manipulating JSON objects in an immutable way.

## Example

```js
'use strict';

var selectors   = require('selectors')
  , lift        = selectors.liftSelection
  , map         = selectors.mapSelection
  , select      = selectors.select
  , has         = selectors.hasSelection
  , set         = selectors.setSelection
  ;


var obj = {
  a: {
    b: 100
  }
}

// Has with a path selector
console.log("Has obj.a.b?", has(['a','b'], obj))
// Result: Has obj.a.b? true

// Has with a prop selector
console.log("Has obj.Z?", has('A', obj));
// Has obj.Z? false

// Select with a path selector
console.log("obj.a.b: ", select(['a', 'b'], obj));
// obj.a.b:  100

// Select with a prop selector
console.log("obj.a: ", select('a', obj));
// obj.a:  { b: 100 }

// Set a new selected property
var immutable = set(['a','c'], "I am new", obj);
console.log("New:", immutable, "Old:", obj);
// New: { a: { b: 100, c: 'I am new' } } Old: { a: { b: 100 } }

// Create a new object
console.log("New object: ", set(['x', 'y', 'z'], "I was just created", {}));
// New object:  { x: { y: { z: 'I was just created' } } }

// Create a new object from `undefined`
console.log("From undefined: ", set(['create', 'from', 'undefined'], "CHECK")());
// From undefined:  { create: { from: { undefined: 'CHECK' } } }

// Lift example
function add(x, y) {return x+y;}
var addTen = add.bind(null, 10);
console.log('obj.a.b + 10:', lift(addTen, ['a', 'b'], obj))
// obj.a.b + 10: 110

// Curried lift
function mul(x, y) {return x*y;}
var mulSelectionByEleven = lift(mul.bind(null, 11));
console.log('obj.a.b * 11:', mulSelectionByEleven(['a', 'b'], obj))
// obj.a.b * 11: 1100

// Curried map example
var incrementSelection = map(add.bind(null,1));
var incremented = incrementSelection(['a', 'b'], obj);
console.log('Original:', obj, 'Incremented:',incremented);
// Original: { a: { b: 100 } } Incremented: { a: { b: 101 } }
```

## methods

```js
var selectors = require('selectors');
```

All methods are auto curried and can be composed to new functions.

**Common Attributes:**

  * `selector` - Several variations might apply
    * `string` - Selects the property
    * `array` - Selects a path
    * `Undefined|[]` - Selects the whole object
  * `obj` - The JSON object to select from. It could be an empty object as well as `Undefined`. When it's undefined
    it will simply create a new object.

### hasSelection(selector, obj)

Returns `false` if the selector is undefined.

### select(selector, obj)

Returns the value of the selection.

### setSelection(selector, value, obj)

Sets a new `value` for the selection.

Returns a new object with updated value.

### liftSelection(f, selector, obj)

`f` - a function with the signature of `f(x)`.

Lifts/Injects the value of the selection into `f`.

Returns the value of `f(x)`.

### mapSelection(f, selector, obj);

`f` - a function with a signature of `f(x)`.

Maps the value of the selection with `f`.

Returns a new object with the value of `f(x)` at the selection.

## install

With [npm](http://npmjs.org) do:

```
npm install selectors
```

## license

MIT