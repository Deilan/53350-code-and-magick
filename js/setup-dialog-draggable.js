'use strict';

(function () {
  window.initSetupDialogDraggable = function (els) {
    var dragEnv = {
      els: els,
      initialCoords: null,
      shift: null
    };
    var onMouseDown = onMouseDownFactory(dragEnv);
    els.upload.addEventListener('mousedown', onMouseDown);
  };

  function onMouseDownFactory(dragEnv) {
    return function (evt) {
      evt.preventDefault();

      dragEnv.initialCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = onMouseMoveFactory(dragEnv);
      var onMouseUp = onMouseUpFactory(onMouseMove);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  }

  function onMouseMoveFactory(dragEnv) {
    return function (evt) {
      evt.preventDefault();

      dragEnv.shift = {
        x: dragEnv.initialCoords.x - evt.clientX,
        y: dragEnv.initialCoords.y - evt.clientY
      };

      dragEnv.initialCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var targetCoords = getTargetCoords(dragEnv);
      dragEnv.els.setup.style.left = targetCoords.x + 'px';
      dragEnv.els.setup.style.top = targetCoords.y + 'px';
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

  function getTargetCoords(dragEnv) {
    var setupRect = dragEnv.els.setup.getBoundingClientRect();
    var setupParentRect = dragEnv.els.setup.parentElement.getBoundingClientRect();
    var targetCoords = {
      x: dragEnv.els.setup.offsetLeft - dragEnv.shift.x,
      y: dragEnv.els.setup.offsetTop - dragEnv.shift.y
    };
    // fix coordinates if they're out of bounds
    if (targetCoords.x < setupRect.width / 2) {
      targetCoords.x = setupRect.width / 2;
    } else if (targetCoords.x + setupRect.width / 2 > setupParentRect.width) {
      targetCoords.x = setupParentRect.width - setupRect.width / 2;
    }

    if (targetCoords.y < setupParentRect.y) {
      targetCoords.y = setupParentRect.y;
    } // allow getting out of bound at the bottom
    return targetCoords;
  }
})();
