'use strict';

(function () {
  window.getRandomIntBetween = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.getRandomElement = function (arr) {
    var index = Math.floor(Math.random() * (arr.length - 1));
    return arr[index];
  };

  window.pullRandomElement = function (arr) {
    var index = window.getRandomIntBetween(0, arr.length - 1);
    return arr.splice(index, 1)[0];
  };

  window.setRandomStyleProp = function (target, prop, values) {
    values = values.slice();
    for (var i = 0; i < values.length; i++) {
      var value = window.pullRandomElement(values);
      if (value !== target.style[prop]) {
        break;
      }
    }
    target.style[prop] = value;
  };
})();
