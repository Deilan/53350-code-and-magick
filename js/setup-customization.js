'use strict';

(function () {
  window.initSetupCustomization = function (els, callback) {
    var onCoatClick = onCoatClickFactory(callback);
    var onEyesClick = onEyesClickFactory(callback);
    var onFireballClick = onFireballClickFactory(callback);
    els.setupWizardCoat.addEventListener('click', onCoatClick);
    els.setupWizardEyes.addEventListener('click', onEyesClick);
    els.setupFireball.addEventListener('click', onFireballClick);
  };

  function onCoatClickFactory(callback) {
    return function (evt) {
      window.colorizeUtils.colorizeElement(evt.target, window.wizardsOptions.coatColors, window.styleUtils.setFill);
      if (typeof callback !== 'undefined' && callback !== null) {
        callback();
      }
    };
  }

  function onEyesClickFactory(callback) {
    return function (evt) {
      window.colorizeUtils.colorizeElement(evt.target, window.wizardsOptions.eyesColors, window.styleUtils.setFill);
      if (typeof callback !== 'undefined' && callback !== null) {
        callback();
      }
    };
  }

  function onFireballClickFactory(callback) {
    return function (evt) {
      window.colorizeUtils.colorizeElement(evt.target, window.wizardsOptions.fireballColors, window.styleUtils.setBackgroundColor);
      if (typeof callback !== 'undefined' && callback !== null) {
        callback();
      }
    };
  }
})();
