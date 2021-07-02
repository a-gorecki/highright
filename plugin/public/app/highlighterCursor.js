"use strict";

var finalSelection = null;

function highlightOnSelection() {
    const selection = window.getSelection();
    const selectionString = selection.toString();
    if (selection.anchorNode){
        finalSelection = selection;
    }

    const scrollY = document.scrollingElement.scrollTop;
    const scrollX = document.scrollingElement.scrollLeft;

    if (selectionString){
        // XY to position popup
        // Position
        const oRange = document.getSelection().getRangeAt(0); //get the text range
        console.log('res: ', oRange.getBoundingClientRect())
        const { right: posX, bottom: posBot, top: posTop } = oRange.getBoundingClientRect();
        const posY = (posBot+posTop)/2
        // Actual text
        updatePopup(selection, posX + scrollX, posY + scrollY)
    } else {
        updatePopup(selectionString, 0,0)
    }

    // if (selectionString) { // If there is text selected
    //     chrome.runtime.sendMessage({ action: 'highlight' });
    // }
}

document.addEventListener('mouseup', highlightOnSelection);

//Popup Menu
const updatePopup = (selectionText, posX, posY) => {
	// check if there is a pop already
    if(selectionText.toString()){

        if (document.getElementById('popup-time-gang-gang')) {
            const popup = document.getElementById('popup-time-gang-gang')
            // POSITION	
            popup.style.top = posY + "px";
            popup.style.left = posX + 16 + "px";

            //updateLocation
            // const highlightButton = document.getElementById('highlight')
            // highlightButton.setAttribute("bottom", posY + 12 + "px")
            // highlightButton.setAttribute("left", popup.style.left)
            // toggleKebabMenu(highlightButton);
            
        } else {
            const popupContainer = document.createElement("div");
            popupContainer.setAttribute("id", "popup-time-gang-gang")
            popupContainer.classList.add("position-popup")
            // POSITION	
            popupContainer.style.top = posY - 24 + "px";
            popupContainer.style.left = posX + 8 + "px";

            //row of buttons
            const buttons = document.createElement("div");
            buttons.setAttribute("id", "buttons")

            const highlightButton = document.createElement("div");
            highlightButton.setAttribute("id", "highlight")
            highlightButton.setAttribute("class", "highlight-button-background")
            highlightButton.setAttribute("bottom", posY + 12 + "px")
            highlightButton.setAttribute("left", popupContainer.style.left)
            highlightButton.addEventListener('mousedown', toggleColorMenu)
            const highlightIcon = document.createElement("div")
            highlightIcon.setAttribute("class", "highlighter--icon highlighter--icon--delete")
            highlightButton.appendChild(highlightIcon)
            buttons.append(highlightButton);

            // const kebabButton = document.createElement("div");
            // kebabButton.setAttribute("id", "kebab")
            // kebabButton.setAttribute("class", "highlighter--icon highlighter--icon-kebab-menu")
            // kebabButton.setAttribute("bottom", posY + 12 + "px")
            // kebabButton.setAttribute("left", posX + 48 + "px")
            // kebabButton.addEventListener('mousedown', toggleKebabMenu)
            // buttons.append(kebabButton)

            popupContainer.append(buttons)

            document.querySelector("body").appendChild(popupContainer);
        }} else {
            if(document.getElementById('popup-time-gang-gang')){
            document.querySelector("body").removeChild(document.getElementById('popup-time-gang-gang'));
        }
    }
}

//Color Menu
function toggleColorMenu() {   
    console.log("hi");
    const selection = window.getSelection();
    const selectionString = selection.toString();

    if (selectionString) { // If there is text selected
        chrome.runtime.sendMessage({ action: 'highlight' });
    }
}

//Kebab Menu
function toggleKebabMenu() {
    console.log('Getting kebab')
    const highlightButton = document.getElementById('highlight');
    console.log(highlightButton)
    
    // if(highlightButton){
    //     const posX = highlightButton.getAttribute("left")
    //     const posY = highlightButton.getAttribute("bottom")
    
    //     // if (document.getElementById('popup-kebab-options')) {
    //     //     // CLOSE DROPDOWN
	// 	//     document.querySelector("body").removeChild(document.getElementById('popup-kebab-options'));
    
    //     } else {
    //         const kebabOptions = document.createElement("div");
    //         kebabOptions.setAttribute("id", "popup-kebab-options")
    //         kebabOptions.classList.add("kebab-options")
    //         // POSITION	
    //         kebabOptions.style.top = posY;
    //         kebabOptions.style.left = posX;

    //         // Tag title
    //         const tagTitle = document.createElement("p")
    //         tagTitle.setAttribute("class", "kebab-titles")
    //         tagTitle.innerHTML = "Categorise with tags:"
    //         kebabOptions.appendChild(tagTitle)

    //         // Tag Input
    //         const tagInput = document.createElement("input")
    //         tagInput.addEventListener("keypress", function(e){
    //             if(e.which === 13)//code number for enter key
    //               updateTag(e.target.value);//run function with value
    //           });
    //         kebabOptions.appendChild(tagInput)

    //         // // Tag Row 
    //         // const tagRow = document.createElement("div")
    //         // kebabOptions.appendChild(tagRow)

    //         // Comment Title
    //         const commentTitle = document.createElement("p")
    //         commentTitle.setAttribute("class", "kebab-titles")
    //         commentTitle.innerHTML = "Add a comment:"
    //         kebabOptions.appendChild(commentTitle)

    //         // Comment Input
    //         const commentInput = document.createElement("input")
    //         commentInput.addEventListener("keypress", function(e){
    //             if(e.which === 13)//code number for enter key
    //               updateComment(e.target.value);//run function with value
    //           });
    //         kebabOptions.appendChild(commentInput)


    //         // // Comment Row 
    //         // const commentRow = document.createElement("div")
    //         // kebabOptions.appendChild(commentRow)

    //         // Colors Row
    //         const colors = ["#FDFFA8", "#CBF9E5", "#FFB2B2", "#A9DEFC", "#C4C4C4"];
            
    //         const colorRow = document.createElement("div");
    //         colorRow.setAttribute("class", "color-row")
    //         for (let i = 0; i < colors.length; i++) {
    //             const circle = document.createElement("span");
    //             circle.setAttribute("class", "dot")
    //             circle.style.backgroundColor = colors[i]
    //             colorRow.append(circle);
    //         }
    //         kebabOptions.appendChild(colorRow)

    //         // Delete Button
    //         const deleteButton = document.createElement("div");
    //         deleteButton.setAttribute("class", "highlighter--icon highlighter--icon-delete");
    //         deleteButton.addEventListener('click', onDeleteBtnClicked);
    //         kebabOptions.appendChild(deleteButton)
            
    //         document.querySelector("body").appendChild(kebabOptions);
    //     }
    
    
}

function updateTag(tag){
    console.log("updating tag")
    console.log(tag)
}

function updateComment(comment){
    console.log("updating comment")
    console.log(comment)
}

function highlightText(selection){
    //const selection = window.getSelection();
    const selectionString = selection.toString();
    console.log(selection)

    if (selectionString) { // If there is text selected 

        let container = selection.getRangeAt(0).commonAncestorContainer;

        // Sometimes the element will only be text. Get the parent in that case
        // TODO: Is this really necessary?
        while (!container.innerHTML) {
            container = container.parentNode;
        }

        chrome.storage.sync.get('color', (values) => {
            const color = values.color;

            store(selection, container, window.location.hostname + window.location.pathname, color, (highlightIndex) => {
                highlight(selectionString, container, selection, color, highlightIndex);
            });
        });
    }
}

