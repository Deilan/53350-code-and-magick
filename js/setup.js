'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];
  var LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  renderSetup(getWizards(WIZARDS_COUNT, {
    firstNames: FIRST_NAMES,
    lastNames: LAST_NAMES,
    coatColors: COAT_COLORS,
    eyesColors: EYES_COLORS
  }));

  function renderSetup(wizards) {
    var fragment = prepareSimilarWizardsFragment(wizards);
    populateSimilarWizardsList(fragment);
    showSetupDialog();
    showSimilarWizardsList();
  }

  function getWizards(count, options) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result[i] = getWizard(options);
    }
    return result;
  }

  function getWizard(options) {
    var wizard = {
      name: getRandomElement(options.firstNames) + ' ' + getRandomElement(options.lastNames),
      coatColor: getRandomElement(options.coatColors),
      eyesColor: getRandomElement(options.eyesColors),
    };
    return wizard;
  }

  function populateSimilarWizardsList(wizardsEl) {
    var similarListEl = document.querySelector('.setup-similar-list');
    similarListEl.appendChild(wizardsEl);
  }

  function showSetupDialog() {
    var setupEl = document.querySelector('.setup');
    setupEl.classList.remove('hidden');
  }

  function showSimilarWizardsList() {
    var setupSimilarEl = document.querySelector('.setup-similar');
    setupSimilarEl.classList.remove('hidden');
  }

  function getSimilarWizardTemplate() {
    var template =
      document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    return template;
  }

  function prepareSimilarWizardsFragment(wizards, template) {
    template = template || getSimilarWizardTemplate();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      var wizardEl = prepareSimilarWizardElement(wizards[i], template);
      fragment.appendChild(wizardEl);
    }
    return fragment;
  }

  function prepareSimilarWizardElement(wizard, template) {
    template = template || getSimilarWizardTemplate();
    var wizardEl = template.cloneNode(true);

    wizardEl.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardEl.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardEl.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardEl;
  }

  function getRandomElement(arr) {
    var index = Math.floor(Math.random() * (arr.length - 1));
    return arr[index];
  }
})();
