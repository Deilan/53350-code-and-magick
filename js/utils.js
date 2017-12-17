'use strict';

(function () {
  window.utils = {
    getBoundedValue: getBoundedValue,
    debounce: debounce
  };

  function getBoundedValue(value, min, max) {
    if (min > max) {
      throw new Error('min ' + min + ' could not be greater than max ' + max);
    }
    if (typeof min !== 'undefined' && min !== null && value < min) {
      value = min;
    } else if (typeof max !== 'undefined' && max !== null && value > max) {
      value = max;
    }
    return value;
  }

  function debounce(func, timeout) {
    var timeoutId;
    return function () {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(func, timeout);
    };
  }
})();
