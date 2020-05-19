const fileDialog = require('file-dialog');
const fs = require('fs');
const path = require("path");

const getFileInfo = function (document) {
    fileDialog({
        accept: ['text/x-shellscript', 'application/x-bat']
    }).then(file => {
        document.getElementById('script-filename').innerHTML = file[0].name;
        document.getElementById('script-path').innerHTML = file[0].path;
        document.getElementById('script-description').value = "Script Description";
        document.getElementById('script-name').value = "Script Name";
        document.getElementById('file-info-area').style = "";
    })
}

const registerFile = async function(document){
    let fileInfo = {};
    fileInfo.name = document.getElementById('script-name').value;
    fileInfo.path = document.getElementById('script-path').innerHTML;
    fileInfo.fileName = document.getElementById('script-filename').innerHTML;
    fileInfo.description = document.getElementById('script-description').value;

    //write this new info to the init.json
    let oldJSON = fs.readFileSync(path.resolve(__dirname,"../init/init.json"));
    if(oldJSON != ""){
        oldJSON = JSON.parse(oldJSON);
    }
    else{
        oldJSON = {};
    }
    

    let count = 0;
    Object.keys(oldJSON).forEach(key =>{
        count++;
    });

    let newJSON = oldJSON;
    newJSON[`script${count}`] = fileInfo;

    fs.writeFileSync(path.resolve(__dirname,"../init/init.json"), JSON.stringify(newJSON));
    document.getElementById('file-info-area').style = "display: none;";
    
}

module.exports = {
    getFileInfo,
    registerFile
}