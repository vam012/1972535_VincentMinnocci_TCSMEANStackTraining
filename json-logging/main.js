//main file to run the logging app
//user is presented with a main menu with all of the options they can do

let rl = require('readline-sync');
let validator = require('validator');
let dataEntry  = require('./getNewDataEntries');
let clearFile = require('./clearFile');
let printFile = require('./printFile');

//global vars
let input = "";
let fileName = 'log.json';
let quitNum = "4"

function main(){
    console.log("Welcome to the JSON logger!")
    while(input != quitNum){
        getInput();
        switch (input) {
            case "1":
                debugger;
                dataEntry(fileName)
                break;
            case "2":
                debugger;
                printFile(fileName);
                break;
            case "3":
                debugger;
                clearFile(fileName);
                break;
            case quitNum:
                console.log('Quitting the JSON logger!');
                break;
            default:
                console.log('INVALID INPUT');
        }
    }
    
}
function getInput(){
    console.log("--------------------------------")
    console.log("\t-Input '1' to add new data to the log");
    console.log("\t-Input '2' to print the log file");
    console.log("\t-Input '3' to clear the log file");
    console.log(`\t-Input '${quitNum}' to quit the application`);
    input = rl.question('What would you like to do?: ');
    if(!validator.isInt(input)){
        console.log('=~=PLEASE INPUT A NUMBER!=~=');
        input = "";
    }
}

main();