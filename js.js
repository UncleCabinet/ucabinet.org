var currentGame = "USG";
var newestVersion = -1.0;
var versions = [];
var files = [];

async function DownloadGitFiles(path) {
    const zip = new JSZip();
    const url = `https://api.github.com/repos/HamishMonke/${currentGame}/contents/${path}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch folder contents");
    }

    const files = await response.json();

    //Loop through each file and add it to the zip
    for (const file of files) {
        if (file.type === "file") { //Only process files, not folders
            const fileResponse = await fetch(file.download_url);
            const blob = await fileResponse.blob();
            const arrayBuffer = await blob.arrayBuffer();
            zip.file(file.name, arrayBuffer); //Add file to zip
        }
    }

    //Generate and download the zip file
    zip.generateAsync({ type: "blob" }).then((zipBlob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipBlob);
        link.download = `${currentGame}-${path.split('/').pop()}.zip`; //Name file
        link.click();
        URL.revokeObjectURL(link.href); //Free up memory
    });
}

var currentPage = String(window.location.pathname.split('/').pop().replace(".html", ""));
if (currentPage != "index") {
    currentGame = currentPage;
    
    console.log("current page: ", currentPage);
    
    GetGameVersions();
}

async function findGameFiles(path = "") {
    const url = `https://api.github.com/repos/HamishMonke/${currentGame}/contents/${path}?ref=main`;
    console.log(url);
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
                //const subfolders = await findGameFiles(item.path); //No need for sub folders
                //folders.push(...subfolders);
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
    if (!event.target.matches('.DropDownBTN')) {
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
    if (document.getElementById("DropDownBTN").innerText != "Getting files from github repo...") {
        var version = document.getElementById("DropDownBTN").innerText;
        
        console.log(`Downloading ${currentGame} v${version} on ${os} os`);

        DownloadGitFiles(`${version}/${os}`);
    }
}

function ScrollTo(elementName) {
    console.log("Scrolled to element ", elementName);
    var elements = document.getElementsByClassName(elementName);
    if (elements.length > 0) {
        elements[0].scrollIntoView();
    }
}
