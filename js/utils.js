'use strict';

(function () {
  window.getRandomElement = function (arr) {
    var index = Math.floor(Math.random() * (arr.length - 1));
    return arr[index];
  };

  window.setRandomStyleProp = function (target, prop, values) {
    var value = target.style[prop];
    while (value === target.style[prop]) {
      value = window.getRandomElement(values);
    }
    target.style[prop] = value;
  };
})();
