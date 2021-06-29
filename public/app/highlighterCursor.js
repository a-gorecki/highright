"use strict";


function highlightOnSelection() {
    const selection = window.getSelection();
    const selectionString = selection.toString();

    if (selectionString) { // If there is text selected
        chrome.runtime.sendMessage({ action: 'highlight' });
    }
}

document.body.style.cursor = `url(${chrome.extension.getURL('cursor.png')}), auto`;
document.addEventListener('mouseup', highlightOnSelection);
