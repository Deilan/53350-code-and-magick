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

  function getDifferentRandomElement(values, value) {
    values = values.slice();
    for (var i = 0; i < values.length; i++) {
      var element = pullRandomElement(values);
      if (element !== value) {
        return element;
      }
    }
    return null;
  }

  window.randomUtils = {
    getRandomIntBetween: getRandomIntBetween,
    getRandomElement: getRandomElement,
    pullRandomElement: pullRandomElement,
    getDifferentRandomElement: getDifferentRandomElement
  };
})();
