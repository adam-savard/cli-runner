const fs = require('fs');
const path = require("path");
const execute = require('./execute');

const prepScripts = function(document){
    let scriptArea = document.getElementById('script-start-area');
    scriptArea.innerHTML = "";

    let scriptsToLoad = fs.readFileSync(path.resolve(__dirname,"../init/init.json"));

    if(scriptsToLoad == ""){
        scriptsToLoad = {};
    }
    else{
        scriptsToLoad = JSON.parse(scriptsToLoad);
    }

    Object.keys(scriptsToLoad).forEach(script =>{
        let field = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerHTML = scriptsToLoad[script].fileName;
        field.appendChild(legend);
        let row = document.createElement("div");
        row.className = "field-row";
        let button = document.createElement("button");
        button.innerHTML = scriptsToLoad[script].name;
        button.onclick = execute.command.bind(null, scriptsToLoad[script].path);
        let description = document.createElement("span");
        description.innerHTML = scriptsToLoad[script].description;
        row.appendChild(button);
        row.appendChild(description);
        field.appendChild(row);
        scriptArea.appendChild(field);
    });
}

module.exports = {
    prepScripts
}