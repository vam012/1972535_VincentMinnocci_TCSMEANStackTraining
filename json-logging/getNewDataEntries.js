//This code gets data entries from the user
//users are sent here from main.js
//the list of new entries are sent to writeToJsonFile.js to be saved

let  writeList =require('./writeToJsonFile');
let rl = require('readline-sync');
let validator = require('validator');


var getNewData = function(fileName='log.json'){
    //array to send to writeFile
    let arr = new Array();
    //get input must be number
    let input = rl.question('How many users would you like to add?: ');
    while (!validator.isInt(input)){
        console.log("Please input a whole number (decimals will be rounded down)");
        input = rl.question('How many users would you like to add?: ');
    }

    //floor the number
    numToAdd = Math.floor(eval(input));

    //use absolute value
    for (let i = 0; i < Math.abs(numToAdd); i++) {
        arr.push(getDataPoint());
    }
    writeList(fileName,arr);
    debugger;
}
module.exports = getNewData;

function getDataPoint(){
    //get first name and last name
    let fName = rl.question('Please input a first name for this entry: ');
    let lName = rl.question('Please input a last name for this entry: ');

    //get and validate email
    let email = rl.question('Please input a email for this entry: ');
    while(!validator.isEmail(email)){
        console.log("Please input a valid email address (example john.smith@email.com)");
        email = rl.question('Please input a email for this entry: ');
    }

    //get and validate salary
    let sal = rl.question('Please input a salary for this entry: ');
    while(!validator.isInt(sal)){
        console.log("Please input a valid salary leaving out the currency and any delimiters (example $12,000 is input as 12000)");
        sal = rl.question('Please input a salary for this entry: ');
    }

    let dateObj = new Date();

    let time = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
    let date = `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`

    console.log('=========DATA ENTRY COMPLETE===========');

    return newObjStr = `{
        "fName":"${fName}",
        "lName":"${lName}",
        "email":"${email}",
        "sal":${sal},
        "date":"${date}",
        "time":"${time}"
    }`;
    debugger;
}