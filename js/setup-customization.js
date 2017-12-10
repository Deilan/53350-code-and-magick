'use strict';

(function () {
  window.initSetupCustomization = function (els) {
    els.setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
    els.setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
    els.setupFireball.addEventListener('click', onSetupFireballClick);
  };

  function onSetupWizardCoatClick(evt) {
    window.randomUtils.setRandomStyleProp(evt.target, 'fill', window.wizardsOptions.coatColors);
  }

  function onSetupWizardEyesClick(evt) {
    window.randomUtils.setRandomStyleProp(evt.target, 'fill', window.wizardsOptions.eyesColors);
  }

  function onSetupFireballClick(evt) {
    window.randomUtils.setRandomStyleProp(evt.target, 'backgroundColor', window.wizardsOptions.fireballColors);
  }
})();
