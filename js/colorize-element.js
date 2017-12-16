'use strict';

(function () {
  function changeColorPickStrategy(colorPickStrategy) {
    window.colorizeUtils.colorizeElement = colorizeElementFactory(colorPickStrategy);
  }

  function colorizeElementFactory(colorPickStrategy) {
    return function (el, colors, changeElementStyleFn) {
      changeElementStyleFn(el, colorPickStrategy(colors));
    };
  }

  window.colorizeUtils = {
    changeColorPickStrategy: changeColorPickStrategy,
    colorizeElement: colorizeElementFactory(window.randomUtils.getRandomElement)
  };
})();
