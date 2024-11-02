async function findGameFiles(owner, repo, path = "") {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=main`; // Fetching the 'main' branch
    const folders = [];

    const response = await fetch(url);
    if (!response.ok) {
        console.error("HTTP error! Status: ", response.status)
    }
    else {
        const data = await response.json();

        for (const item of data) {
            if (item.type === "dir") {
                folders.push(item.path); // Push folder path to list
                const subfolders = await findGameFiles(owner, repo, item.path); // Recursive call for subdirectories
                folders.push(...subfolders); // Add subdirectories to list
            }
        }
    }
    
    return folders;
}

var newestVersion = -1.0
var files = [];
/*
findGameFiles("HamishMonke", "USG").then(folders => {
    newestVersion = -1.0 //Reset
    
    files = folders;

    console.log("Found versions: ", GetGameVersions());
});
*/

function GetGameVersions() {
    var versions = [];

    files.forEach(fileName => {
        var name = fileName.split('/').pop();

        if(/\d/.test(name) && name[0] == "v") {
            versions.push(fileName)

            if (newestVersion < /\d/.test(name)){
                newestVersion = /\d/.test(name)
            }

            console.log("true ", name);
        }
        else{
            console.log("false ", name);
        }
    });

    return versions;
}

function ScrollTo(elementName) {
    console.log("Scrolled to element ", elementName);
    var elements = document.getElementsByClassName(elementName);
    if (elements.length > 0) {
        elements[0].scrollIntoView();
    }
}
