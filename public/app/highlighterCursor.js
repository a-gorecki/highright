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
		// POSITION	
		popup.style.top = posY - 24 + "px";
		popup.style.left = posX + 8 + "px";
	} else {
		const popupContainer = document.createElement("div");
		popupContainer.setAttribute("id", "popup-time-gang-gang")
		popupContainer.classList.add("position-popup")
		// POSITION	
		popupContainer.style.top = posY - 24 + "px";
		popupContainer.style.left = posX + 8 + "px";

        //row of buttons
        const buttons = document.createElement("div");
        buttons.setAttribute("id", "popup-time-gang-gang")

        const highlightButton = document.createElement("div");
        highlightButton.setAttribute("class", "highlighter--icon highlighter--icon-icon")
        buttons.append(highlightButton);

        const kebabButton = document.createElement("div");
        kebabButton.setAttribute("class", "highlighter--icon highlighter--icon-kebab-menu")
        buttons.append(kebabButton);

        popupContainer.append(buttons);

		document.querySelector("body").appendChild(popupContainer);
	}
}

