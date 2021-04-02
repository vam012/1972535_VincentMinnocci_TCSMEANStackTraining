//this code clears the json file (Defailt to log.json)
//user is sent here from main .js

let fs = require("fs");
let rl = require('readline-sync');
var clearFile = function(fileName='log.json'){
    console.log("Are you sure you want to erase the file?");
    console.log("THIS CANNOT BE UNDONE");
    //make user confirm delete
    let input = rl.question('(y/n): ').toLowerCase()
    switch (input) {
        case 'y':
            console.log(`Deleting json file ${fileName} ...`);
            //overwrite file with empty array
            fs.writeFileSync(fileName,'[]');
            break;
        case 'n':
            console.log("Returning you back to the main menu...");
            break;
        default:
            //default to leave the file
            console.log("invalid input, returning you back to the main menu and keeping the file..");
            break;
    }
    debugger;
}
module.exports = clearFile