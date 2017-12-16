'use strict';

(function () {
  window.initSetupCustomization = function (els) {
    els.setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
    els.setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
    els.setupFireball.addEventListener('click', onSetupFireballClick);
  };

  function onSetupWizardCoatClick(evt) {
    window.colorizeUtils.colorizeElement(evt.target, window.wizardsOptions.coatColors, window.styleUtils.setFill);
  }

  function onSetupWizardEyesClick(evt) {
    window.colorizeUtils.colorizeElement(evt.target, window.wizardsOptions.eyesColors, window.styleUtils.setFill);
  }

  function onSetupFireballClick(evt) {
    window.colorizeUtils.colorizeElement(evt.target, window.wizardsOptions.fireballColors, window.styleUtils.setBackgroundColor);
  }
})();
