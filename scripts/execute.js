const shell = require('shelljs');
shell.config.execPath = shell.which('node').toString();
const command = function(path){
    shell.exec(path);
}

module.exports = {
    command
}