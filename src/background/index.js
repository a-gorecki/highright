/*global chrome*/

// If your extension doesn't need a background script, just leave this file empty

messageInBackground();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {
  console.log('I can run your javascript like any other code in your project');
  console.log('just do not forget, I cannot render anything ! Test Test testtsts');
}

// Add option when right-clicking
chrome.contextMenus.create({ title: "Highlight", onclick: highlightTextFromContext, contexts: ["selection"] });

// Highlight cursor 
function highlightOnSelection() {

  const selection = window.getSelection();
  const selectionString = selection.toString();

  if (selectionString) { // If there is text selected
    chrome.runtime.sendMessage({ action: 'highlight' });
  }
}

document.addEventListener('mouseup', highlightOnSelection);


// Listen to messages from content scripts
chrome.runtime.onMessage.addListener(function (request) {
  if (request.action && request.action == 'highlight') {
    highlightText();
  }
});

function highlightTextFromContext() {
  highlightText();
}

function highlightText() {
  chrome.tabs.executeScript({
    file: "app/highlight.js"
  });
  console.log("i worksse");
}

function changeColor(color) {
  chrome.storage.sync.set({ color: color });

  // Also update the context menu
  chrome.contextMenus.update(color, { checked: true });
}
