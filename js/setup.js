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
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupEl = document.querySelector('.setup');
  var setupOpenEl = document.querySelector('.setup-open');
  var setupCloseEl = setupEl.querySelector('.setup-close');


  var setupUserNameEl = setupEl.querySelector('.setup-user-name');
  var setupUserNameInput = setupEl.querySelector('.setup-user-name');

  var setupPlayerEl = setupEl.querySelector('.setup-player');
  var setupWizardCoatEl = setupPlayerEl.querySelector('.wizard-coat');
  var setupWizardEyesEl = setupPlayerEl.querySelector('.wizard-eyes');
  var setupFireballEl = setupPlayerEl.querySelector('.setup-fireball-wrap');

  initSetupHandlers({
    root: document,
    setup: setupEl,
    setupOpen: setupOpenEl,
    setupClose: setupCloseEl
  });
  initCustomizationHandlers({
    setupWizardCoat: setupWizardCoatEl,
    setupWizardEyes: setupWizardEyesEl,
    setupFireball: setupFireballEl
  });

  function initSetupHandlers(els) {
    els.setupOpen.addEventListener('click', onSetupOpenClick);
    els.setupOpen.addEventListener('keydown', onSetupOpenKeydown);

    function openSetup() {
      els.setup.classList.remove('hidden');
      els.setupOpen.removeEventListener('click', onSetupOpenClick);
      els.setupOpen.removeEventListener('keydown', onSetupOpenKeydown);
      els.setupClose.addEventListener('click', onSetupCloseClick);
      els.setupClose.addEventListener('keydown', onSetupCloseKeydown);
      els.root.addEventListener('keydown', onEscKeydown);
    }

    function closeSetup() {
      els.setup.classList.add('hidden');
      els.setupClose.removeEventListener('click', onSetupCloseClick);
      els.setupClose.removeEventListener('keydown', onSetupCloseKeydown);
      els.setupOpen.addEventListener('click', onSetupOpenClick);
      els.setupOpen.addEventListener('keydown', onSetupOpenKeydown);
      els.root.removeEventListener('keydown', onEscKeydown);
    }

    function onSetupOpenClick() {
      openSetup();
    }

    function onSetupOpenKeydown(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openSetup();
      }
    }

    function onSetupCloseClick() {
      closeSetup();
    }

    function onEscKeydown(evt) {
      // Если фокус находится на форме ввода имени, то окно закрываться не должно
      if (evt.target === setupUserNameEl) {
        return;
      }
      if (evt.keyCode === ESC_KEYCODE) {
        closeSetup();
      }
    }

    function onSetupCloseKeydown(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closeSetup();
      }
    }
  }

  function initCustomizationHandlers(els) {
    els.setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
    els.setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
    els.setupFireball.addEventListener('click', onSetupFireballClick);

    function onSetupWizardCoatClick(evt) {
      setRandomStyleProp(evt.target, 'fill', COAT_COLORS);
    }

    function onSetupWizardEyesClick(evt) {
      setRandomStyleProp(evt.target, 'fill', EYES_COLORS);
    }

    function onSetupFireballClick(evt) {
      setRandomStyleProp(evt.target, 'backgroundColor', FIREBALL_COLORS);
    }
  }

  function setRandomStyleProp(target, prop, values) {
    var value = target.style[prop];
    while (value === target.style[prop]) {
      value = getRandomElement(values);
    }
    target.style[prop] = value;
  }

  setupUserNameInput.addEventListener('invalid', function (evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Имя обязательно для заполнения');
    }
  });

  renderSetup(getWizards(WIZARDS_COUNT, {
    firstNames: FIRST_NAMES,
    lastNames: LAST_NAMES,
    coatColors: COAT_COLORS,
    eyesColors: EYES_COLORS
  }));

  function renderSetup(wizards) {
    var fragment = prepareSimilarWizardsFragment(wizards);
    populateSimilarWizardsList(fragment);
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
