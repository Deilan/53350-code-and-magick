'use strict';

(function () {
  var templateEl = document.querySelector('#similar-wizard-template').content;
  var wizardTemplateEl = templateEl.querySelector('.setup-similar-item');

  var setupEl = document.querySelector('.setup');
  var setupOpenEl = document.querySelector('.setup-open');
  var setupCloseEl = setupEl.querySelector('.setup-close');
  var setupSimilarEl = setupEl.querySelector('.setup-similar');
  var setupSimilarListEl = setupEl.querySelector('.setup-similar-list');

  var setupPlayerEl = setupEl.querySelector('.setup-player');
  var setupWizardCoatEl = setupPlayerEl.querySelector('.wizard-coat');
  var setupWizardEyesEl = setupPlayerEl.querySelector('.wizard-eyes');
  var setupFireballEl = setupPlayerEl.querySelector('.setup-fireball-wrap');

  var setupUserNameEl = setupEl.querySelector('.setup-user-name');

  window.initSetupHandlers({
    root: document,
    setup: setupEl,
    setupOpen: setupOpenEl,
    setupClose: setupCloseEl,
    setupUserName: setupUserNameEl,
  });

  window.initSetupCustomization({
    setupWizardCoat: setupWizardCoatEl,
    setupWizardEyes: setupWizardEyesEl,
    setupFireball: setupFireballEl
  });

  window.initSetupValidation({
    setupUserName: setupUserNameEl
  });

  var wizards = window.getWizards();
  window.renderSetup({
    wizardTemplate: wizardTemplateEl,
    setupSimilar: setupSimilarEl,
    setupSimilarList: setupSimilarListEl,
  }, wizards);
})();
