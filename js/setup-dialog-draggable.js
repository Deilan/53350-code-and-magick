'use strict';

(function () {
  window.initSetupDialogDraggable = function (els) {
    els.upload.addEventListener('mousedown', onMouseDown);

    function onMouseDown(evt) {
      evt.preventDefault();

      var initialCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: initialCoords.x - moveEvt.clientX,
          y: initialCoords.y - moveEvt.clientY
        };

        initialCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        var targetCoords = getTargetCoords(shift);
        els.setup.style.left = targetCoords.x + 'px';
        els.setup.style.top = targetCoords.y + 'px';
      }

      function getTargetCoords(shift) {
        var setupRect = els.setup.getBoundingClientRect();
        var setupParentRect = els.setup.parentElement.getBoundingClientRect();
        var targetCoords = {
          x: els.setup.offsetLeft - shift.x,
          y: els.setup.offsetTop - shift.y
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

      function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
  };
})();
