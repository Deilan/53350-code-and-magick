'use strict';

(function () {
  window.initSetupCustomization = function (els) {
    els.setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
    els.setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
    els.setupFireball.addEventListener('click', onSetupFireballClick);
  };

  function onSetupWizardCoatClick(evt) {
    window.setRandomStyleProp(evt.target, 'fill', window.wizardsOptions.coatColors);
  }

  function onSetupWizardEyesClick(evt) {
    window.setRandomStyleProp(evt.target, 'fill', window.wizardsOptions.eyesColors);
  }

  function onSetupFireballClick(evt) {
    window.setRandomStyleProp(evt.target, 'backgroundColor', window.wizardsOptions.fireballColors);
  }
})();
