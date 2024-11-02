function ScrollTo(elementName) {
    var element = document.getElementsByClassName(elementName)[0];
    if (element) {
        element.scrollIntoView();
    }
}
