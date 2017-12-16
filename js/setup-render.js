'use strict';

(function () {
  window.renderSetup = function (els, wizards) {
    var wizardsEls = getSimilarWizardsEls(els.wizardTemplate, wizards);
    while (els.setupSimilarList.hasChildNodes()) {
      els.setupSimilarList.removeChild(els.setupSimilarList.lastChild);
    }
    populateSimilarWizards(els.setupSimilarList, wizardsEls);
    els.setupSimilar.classList.remove('hidden');
  };

  function getSimilarWizardsEls(wizardTemplate, wizards) {
    var wizardsEls = [];
    var wizardEl;
    for (var i = 0; i < wizards.length; i++) {
      wizardEl = wizardTemplate.cloneNode(true);
      wizardsEls[i] = initSimilarWizardElement(wizardEl, wizards[i]);
    }
    return wizardsEls;
  }

  function populateSimilarWizards(container, wizardsEls) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsEls.length; i++) {
      fragment.appendChild(wizardsEls[i]);
    }
    container.appendChild(fragment);
  }

  function initSimilarWizardElement(wizardEl, wizard) {
    wizardEl.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardEl.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardEl.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardEl;
  }
})();
