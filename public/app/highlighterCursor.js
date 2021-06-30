"use strict";

function highlightOnSelection() {
    const selection = window.getSelection();
    const selectionString = selection.toString();
    if (selectionString){
    // XY to position popup
    // Position
    const oRange = document.getSelection().getRangeAt(0); //get the text range
    console.log('res: ', oRange.getBoundingClientRect())
    const { right: posX, bottom: posY } = oRange.getBoundingClientRect();

    // Actual text
    updatePopup(selection, posX, posY)
    }

    if (selectionString) { // If there is text selected
        chrome.runtime.sendMessage({ action: 'highlight' });
    }
}

document.addEventListener('mouseup', highlightOnSelection);

const updatePopup = (selectionText, posX, posY) => {
	// check if there is a pop already
	console.log(selectionText, posX, posY)
	if (document.getElementById('popup-time-gang-gang')) {
		const popup = document.getElementById('popup-time-gang-gang')
		const highlightText = document.getElementById("popup-text")
		highlightText.innerHTML = selectionText
		// POSITION	
		popup.style.top = posY + 4 + "px";
		popup.style.left = posX + 4 + "px";
	} else {
		const popupContainer = document.createElement("div");
		popupContainer.setAttribute("id", "popup-time-gang-gang")
		popupContainer.classList.add("position-popup")
		// POSITION	
		popupContainer.style.top = posY + 4 + "px";
		popupContainer.style.left = posX + 4 + "px";

		const title = document.createElement("h3");
		title.setAttribute("id", "popup-title");
		title.innerHTML = "Popup";
		popupContainer.appendChild(title);

		const highlightText = document.createElement("p");
		highlightText.setAttribute("id", "popup-text");
		highlightText.innerHTML = selectionText;
		popupContainer.appendChild(highlightText);

		document.querySelector("body").appendChild(popupContainer);
	}
}

