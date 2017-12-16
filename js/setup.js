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

  var onWizardsLoad = function (data) {
    var wizards = data.slice(0, Math.min(WIZARDS_COUNT, data.length));
    window.renderSetup({
      wizardTemplate: wizardTemplateEl,
      setupSimilar: setupSimilarEl,
      setupSimilarList: setupSimilarListEl,
    }, wizards);
  };

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }
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
  });

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
})();
