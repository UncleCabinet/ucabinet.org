function ScrollTo(elementName) {
    console.log("Element name:", elementName); // Check if elementName is correct
    var elements = document.getElementsByClassName(elementName);
    console.log("Elements found:", elements); // See if any elements are found
    if (elements.length > 0) {
        elements[0].scrollIntoView();
    } else {
        console.error("Element with the specified class not found:", elementName);
    }
}
