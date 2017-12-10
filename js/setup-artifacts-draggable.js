'use strict';

(function () {
  window.initSetupArtifactsDraggable = function (els) {
    var draggableEl;
    var cells = els.setupArtifacts.querySelectorAll('.setup-artifacts-cell');
    els.setupArtifactsShop.addEventListener('dragstart', onDragStart);
    els.setupArtifactsShop.addEventListener('dragend', onDragEnd);
    els.setupArtifacts.addEventListener('dragstart', onDragStart);
    els.setupArtifacts.addEventListener('dragend', onDragEnd);

    function onDragStart(evt) {
      draggableEl = evt.target;

      for (var i = 0; i < cells.length; i++) {
        // highlight a cell only if it's empty
        if (!cells[i].hasChildNodes()) {
          cells[i].style.outline = '2px dashed red';
        }
      }
    }

    function onDragEnd() {
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.outline = null;
      }
    }

    els.setupArtifacts.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });

    els.setupArtifacts.addEventListener('drop', function (evt) {
      evt.preventDefault();
      if (!evt.target.classList.contains('setup-artifacts-cell')) {
        return;
      }
      evt.target.style.backgroundColor = null;
      if (!evt.target.hasChildNodes()) {
        evt.target.appendChild(draggableEl.cloneNode(true));
      }
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.outline = null;
      }
    });


    els.setupArtifacts.addEventListener('dragenter', function (evt) {
      evt.preventDefault();
      if (!evt.target.classList.contains('setup-artifacts-cell')) {
        return;
      }
      // highlight a cell only if it's empty
      if (!evt.target.hasChildNodes()) {
        evt.target.style.backgroundColor = 'yellow';
      }
    });

    els.setupArtifacts.addEventListener('dragleave', function (evt) {
      evt.preventDefault();
      evt.target.style.backgroundColor = null;
    });
  };
})();
