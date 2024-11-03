var currentGame = ""
var newestVersion = -1.0;
var versions = [];
var files = [];

var currentPage = window.location.pathname.split('/').pop().replace('.html', '');
if (currentPage != "index") {
    currentGame = currentPage;

    GetGameVersions();
}

async function findGameFiles(path = "") {
    const url = `https://api.github.com/repos/HamishMonke/${currentGame}/contents/${path}?ref=main`;
    const folders = [];

    const response = await fetch(url);
    if (!response.ok) {
        console.error("HTTP error! Status: ", response.status)
    }
    else {
        const data = await response.json();

        for (const item of data) {
            if (item.type === "dir") {
                folders.push(item.path);
                const subfolders = await findGameFiles(item.path);
                folders.push(...subfolders);
            }
        }
    }
    
    return folders;
}

function GetGameVersions() {
    if (files.length == 0) {
        console.log("Getting files from github API");

        findGameFiles().then(folders => {
            newestVersion = -1.0;
            
            files = folders;

            files.forEach(fileName => {
                const match = fileName.match(/-?\d+(\.\d+)?/);
                var num = -1.0;

                if (match) {
                    num = parseFloat(match[0]);
                }
                
                if(num && fileName[0] == "v" && !fileName.includes("/")) {
                    versions.push(fileName);
        
                    if (newestVersion < num){
                        newestVersion = num;
                        document.getElementById("DropDownBTN").innerText = fileName;
                    }
                    else {
                        console.log("!newestVersion < ", num);
                    }
                }
            });
        });
    }
}

function DropDownManager() {
    var dropDown = document.getElementById("myDropdown");
    dropDown.classList.toggle("show");

    dropDown.innerHTML = "";

    versions.forEach(versionName => {
        const newVersion = document.createElement("a");
        newVersion.textContent = versionName;
        newVersion.onclick = function() {document.getElementById("DropDownBTN").innerText = versionName}

        dropDown.appendChild(newVersion);
    });
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
    }
}

function Download(os) {
    console.log(os, " ", document.getElementById("DropDownBTN").innerText);
}

function ScrollTo(elementName) {
    console.log("Scrolled to element ", elementName);
    var elements = document.getElementsByClassName(elementName);
    if (elements.length > 0) {
        elements[0].scrollIntoView();
    }
}
