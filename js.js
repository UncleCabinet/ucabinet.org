function ScrollTo(elementName) {
    var elements = document.getElementsByClassName(elementName);
    if (elements.length > 0) {
        elements[0].scrollIntoView();
    }
    else {
        console.error("Element with the specified class not found:", elementName);
    }
}
