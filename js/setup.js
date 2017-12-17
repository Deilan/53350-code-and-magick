'use strict';

(function () {
  var WIZARDS_COUNT = 4;

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

  var setupUserPicEl = setupEl.querySelector('.setup-user-pic');
  var uploadEl = setupEl.querySelector('.upload');

  var setupArtifactsShopEl = setupEl.querySelector('.setup-artifacts-shop');
  var setupArtifactsEl = setupEl.querySelector('.setup-artifacts');
  var setupWizardFormEl = setupEl.querySelector('.setup-wizard-form');

  window.colorizeUtils.changeColorPickStrategy(window.randomUtils.getRandomElement);

  var DEFAULT_COAT_COLOR = 'rgb(101, 137, 164)';
  var DEFAULT_EYES_COLOR = 'black';
  var DEFAULT_FIREBALL_COLOR = '#ee4830';
  window.backend.load(onWizardsLoad, onError);

  window.initSetupHandlers({
    root: document,
    setup: setupEl,
    setupOpen: setupOpenEl,
    setupClose: setupCloseEl,
    setupUserName: setupUserNameEl,
    setupWizardForm: setupWizardFormEl
  }, onError);

  window.initSetupCustomization({
    setupWizardCoat: setupWizardCoatEl,
    setupWizardEyes: setupWizardEyesEl,
    setupFireball: setupFireballEl
  }, getCustomizationChangedHandler());

  window.initSetupValidation({
    setupUserName: setupUserNameEl
  });

  // temp workaround: file input intercepts clicks so drag&drop become unavailable
  uploadEl.removeChild(uploadEl.querySelector('input[type=file]'));
  window.initSetupDialogDraggable({
    setup: setupEl,
    setupUserPic: setupUserPicEl,
    upload: uploadEl
  });

  window.initSetupArtifactsDraggable({
    setupArtifactsShop: setupArtifactsShopEl,
    setupArtifacts: setupArtifactsEl
  });

  function getProtagonistWizard() {
    return {
      colorCoat: setupWizardCoatEl.style.fill || DEFAULT_COAT_COLOR,
      colorEyes: setupWizardEyesEl.style.fill || DEFAULT_EYES_COLOR,
      colorFireball: setupFireballEl.style.backgroundColor || DEFAULT_FIREBALL_COLOR,
    };
  }

  function onWizardsLoad(data) {
    var protagonistWizard = getProtagonistWizard();
    data.forEach(function (wizard) {
      wizard.similarity = calculateWizardSimilarity(wizard, protagonistWizard);
    });
    data.sort(function (a, b) {
      return b.similarity - a.similarity;
    });
    var wizards = data.slice(0, Math.min(WIZARDS_COUNT, data.length));
    window.renderSimilarWizards({
      wizardTemplate: wizardTemplateEl,
      setupSimilar: setupSimilarEl,
      setupSimilarList: setupSimilarListEl,
    }, wizards);
  }

  function calculateWizardSimilarity(firstWizard, secondWizard) {
    var similarity = 0;
    if (firstWizard.colorCoat === secondWizard.colorCoat) {
      similarity += 4;
    }
    if (firstWizard.colorEyes === secondWizard.colorEyes) {
      similarity += 2;
    }
    if (firstWizard.colorFireball === secondWizard.colorFireball) {
      similarity += 1;
    }
    return similarity;
  }

  function getCustomizationChangedHandler() {
    return window.utils.debounce(function () {
      window.backend.load(onWizardsLoad, onError);
    }, 500);
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = 30 + 'px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }
})();
