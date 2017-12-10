'use strict';

(function () {
  function getRandomIntBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(arr) {
    var index = Math.floor(Math.random() * (arr.length - 1));
    return arr[index];
  }

  function pullRandomElement(arr) {
    var index = getRandomIntBetween(0, arr.length - 1);
    return arr.splice(index, 1)[0];
  }

  function setRandomStyleProp(target, prop, values) {
    values = values.slice();
    for (var i = 0; i < values.length; i++) {
      var value = pullRandomElement(values);
      if (value !== target.style[prop]) {
        break;
      }
    }
    target.style[prop] = value;
  }

  window.randomUtils = {
    getRandomIntBetween: getRandomIntBetween,
    getRandomElement: getRandomElement,
    pullRandomElement: pullRandomElement,
    setRandomStyleProp: setRandomStyleProp
  };
})();
