'use strict';

(function () {
  window.initSetupDialogDraggable = function (els) {
    var dragContext = {
      els: els,
      initialCoords: null,
      shift: null
    };
    var onMouseDown = onMouseDownFactory(dragContext);
    els.upload.addEventListener('mousedown', onMouseDown);
  };

  function onMouseDownFactory(dragContext) {
    return function (evt) {
      evt.preventDefault();

      dragContext.initialCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = onMouseMoveFactory(dragContext);
      var onMouseUp = onMouseUpFactory(onMouseMove);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  }

  function onMouseMoveFactory(dragContext) {
    return function (evt) {
      evt.preventDefault();

      dragContext.shift = {
        x: dragContext.initialCoords.x - evt.clientX,
        y: dragContext.initialCoords.y - evt.clientY
      };

      dragContext.initialCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var targetCoords = getTargetCoords(dragContext);
      dragContext.els.setup.style.left = targetCoords.x + 'px';
      dragContext.els.setup.style.top = targetCoords.y + 'px';
    };
  }

  function onMouseUpFactory(onMouseMove) {
    var onMouseUp = function (evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    return onMouseUp;
  }

  function getTargetCoords(dragContext) {
    var setupRect = dragContext.els.setup.getBoundingClientRect();
    var setupParentRect = dragContext.els.setup.parentElement.getBoundingClientRect();
    var targetCoords = {
      x: window.utils.getBoundedValue(dragContext.els.setup.offsetLeft - dragContext.shift.x, setupRect.width / 2, setupParentRect.width - setupRect.width / 2),
      y: window.utils.getBoundedValue(dragContext.els.setup.offsetTop - dragContext.shift.y, setupParentRect.y)
    };
    return targetCoords;
  }
})();
