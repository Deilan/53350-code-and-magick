'use strict';

(function () {
  window.initSetupArtifactsDraggable = function (els) {
    var cells = els.setupArtifacts.querySelectorAll('.setup-artifacts-cell');
    var dragEls = {
      cells: cells
    };
    var onDragStart = onDragStartFactory(dragEls);
    var onDragEnd = onDragEndFactory(dragEls);
    var onDrop = onDropFactory(dragEls);
    els.setupArtifactsShop.addEventListener('dragstart', onDragStart);
    els.setupArtifactsShop.addEventListener('dragend', onDragEnd);
    els.setupArtifacts.addEventListener('dragstart', onDragStart);
    els.setupArtifacts.addEventListener('dragend', onDragEnd);

    els.setupArtifacts.addEventListener('dragover', onDragOver);

    els.setupArtifacts.addEventListener('drop', onDrop);

    els.setupArtifacts.addEventListener('dragenter', onDragEnter);

    els.setupArtifacts.addEventListener('dragleave', onDragLeave);
  };

  function onDragStartFactory(els) {
    return function (evt) {
      els.draggable = evt.target;
      for (var i = 0; i < els.cells.length; i++) {
        // highlight a cell only if it's empty
        if (!els.cells[i].hasChildNodes()) {
          els.cells[i].style.outline = '2px dashed red';
        }
      }
    };
  }

  function onDragEndFactory(els) {
    return function () {
      for (var i = 0; i < els.cells.length; i++) {
        els.cells[i].style.outline = null;
      }
    };
  }

  function onDragOver(evt) {
    evt.preventDefault();
    return false;
  }

  function onDropFactory(els) {
    return function (evt) {
      evt.preventDefault();
      if (!evt.target.classList.contains('setup-artifacts-cell')) {
        return;
      }
      evt.target.style.backgroundColor = null;
      if (!evt.target.hasChildNodes()) {
        evt.target.appendChild(els.draggable.cloneNode(true));
      }
      for (var i = 0; i < els.cells.length; i++) {
        els.cells[i].style.outline = null;
      }
    };
  }

  function onDragEnter(evt) {
    evt.preventDefault();
    if (!evt.target.classList.contains('setup-artifacts-cell')) {
      return;
    }
    // highlight a cell only if it's empty
    if (!evt.target.hasChildNodes()) {
      evt.target.style.backgroundColor = 'yellow';
    }
  }

  function onDragLeave(evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = null;
  }
})();
