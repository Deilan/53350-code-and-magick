'use strict';

(function () {
  window.utils = {
    getBoundedValue: getBoundedValue
  };

  function getBoundedValue(value, min, max) {
    if (min > max) {
      return null;
    }
    if (typeof min !== 'undefined' && min !== null && value < min) {
      value = min;
    } else if (typeof max !== 'undefined' && max !== null && value > max) {
      value = max;
    }
    return value;
  }
})();
