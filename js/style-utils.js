'use strict';

(function () {
  function setStylePropValue(el, prop, value) {
    el.style[prop] = value;
  }

  function setFill(el, value) {
    setStylePropValue(el, 'fill', value);
  }

  function setBackgroundColor(el, value) {
    setStylePropValue(el, 'backgroundColor', value);
  }

  function getDifferentRandomStylePropValue(target, prop, values) {
    return window.randomUtils.getDifferentRandomElement(values, target[prop]);
  }

  function getDifferentRandomFill(target, options) {
    return getDifferentRandomStylePropValue(target, 'fill', options);
  }

  function getDifferentRandomBackgroundColor(target, options) {
    return getDifferentRandomStylePropValue(target, 'backgroundColor', options);
  }

  // function randomChangeStylePropValue(target, prop, values) {
  //   var value = window.randomUtils.getDifferentRandomElement(values, target[prop]);
  //   setStylePropValue(target, prop, value);
  // }

  // function randomChangeElementBackgroundColor(el, values) {
  //   randomChangeStylePropValue(el, 'backgroundColor', values);
  // }

  // function randomChangeElementFill(el, values) {
  //   randomChangeStylePropValue(el, 'fill', values);
  // }

  window.styleUtils = {
    setStylePropValue: setStylePropValue,
    setFill: setFill,
    setBackgroundColor: setBackgroundColor,
    // setStylePropRandomValue: randomChangeStylePropValue,
    // randomChangeElementBackgroundColor: randomChangeElementBackgroundColor,
    // randomChangeElementFill: randomChangeElementFill,
    getDifferentRandomStylePropValue: getDifferentRandomStylePropValue,
    getDifferentRandomFill: getDifferentRandomFill,
    getDifferentRandomBackgroundColor: getDifferentRandomBackgroundColor
  };
})();
