/*global chrome*/

"use strict";

(() => { // Restrict the scope of the variables to this file
    const selection = window.getSelection();
    const selectionString = selection.toString();


    if (selectionString) { // If there is text selected 

        let container = selection.getRangeAt(0).commonAncestorContainer;

        // Sometimes the element will only be text. Get the parent in that case
        // TODO: Is this really necessary?
        while (!container.innerHTML) {
            container = container.parentNode;
        }

        console.log(window.location.hostname + window.location.pathname)
        console.log(document.title)

        const url = "https://" + window.location.hostname + window.location.pathname
        const title = document.title
        const highlightedText = selection.toString()

        

        chrome.storage.sync.get('color', (values) => {
            const color = values.color;

            const url = window.location.hostname + window.location.pathname
            const title = document.title
            const highlightedText = selection.toString()
            console.log(color, url, title, highlightedText)
        

            store(selection, container, window.location.hostname + window.location.pathname, color, (highlightIndex) => {
                highlight(selectionString, container, selection, color, highlightIndex);
            });
        });


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "url": url,
        "text": highlightedText,
        "title": title,
        "colour": "yellow",
        });

        console.log("payload", raw)

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://z5aoi3hs0j.execute-api.ap-southeast-2.amazonaws.com/default/insertHighlightTest", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }



})();

