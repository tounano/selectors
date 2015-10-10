'use strict';

var selectors   = require('../selectors')
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