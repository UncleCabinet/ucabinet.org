function ScrollTo(elementName) {
    console.log("Element name:", elementName);
    var elements = document.getElementsByClassName(elementName);
    if (elements.length > 0) {
        elements[0].scrollIntoView();
    }
}
