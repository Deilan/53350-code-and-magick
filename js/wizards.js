'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  window.getWizards = function (count, options) {
    count = count || WIZARDS_COUNT;
    options = options || window.wizardsOptions;
    var result = [];
    for (var i = 0; i < count; i++) {
      result[i] = generateWizard(options);
    }
    return result;
  };

  function generateWizard(options) {
    var wizard = {
      name: window.randomUtils.getRandomElement(options.firstNames) + ' ' + window.randomUtils.getRandomElement(options.lastNames),
      coatColor: window.randomUtils.getRandomElement(options.coatColors),
      eyesColor: window.randomUtils.getRandomElement(options.eyesColors),
    };
    return wizard;
  }
})();
