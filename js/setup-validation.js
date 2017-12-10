'use strict';

(function () {
  window.initSetupValidation = function (els) {
    els.setupUserName.addEventListener('invalid', function (evt) {
      if (evt.target.validity.tooShort) {
        evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (evt.target.validity.tooLong) {
        evt.target.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (evt.target.validity.valueMissing) {
        evt.target.setCustomValidity('Имя обязательно для заполнения');
      }
    });
  };
})();
