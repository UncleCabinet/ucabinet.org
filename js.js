function ScrollTo(elementName) {
    var element = document.getElementsByClassName(elementName)

    if(element != null){
        console.log("Found element")

        element.scrollIntoView();
    }
    else{
        console.log("Could not find element")
    }
}
