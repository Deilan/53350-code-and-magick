'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.initSetupHandlers = function (els, onError) {
    els.setupOpen.addEventListener('click', onSetupOpenClick);
    els.setupOpen.addEventListener('keydown', onSetupOpenKeydown);

    function openSetup() {
      els.setup.classList.remove('hidden');
      // reset coordinates of setup window on every opening
      els.setup.style.top = els.setup.style.left = null;
      els.setupOpen.removeEventListener('click', onSetupOpenClick);
      els.setupOpen.removeEventListener('keydown', onSetupOpenKeydown);
      els.setupClose.addEventListener('click', onSetupCloseClick);
      els.setupClose.addEventListener('keydown', onSetupCloseKeydown);
      els.root.addEventListener('keydown', onEscKeydown);
      els.setupWizardForm.addEventListener('submit', onFormSubmit);
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
      if (evt.target === els.setupUserName) {
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

    function onFormSubmit(evt) {
      evt.preventDefault();
      var form = evt.target.closest('form');
      window.backend.save(new FormData(form), closeSetup, onError);
    }
  };
})();
