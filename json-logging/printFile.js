//this code prints out all of the elements and attributes held within a json file (Default to log.json)
//user is sent here from main.js

let fs = require("fs");

var printJsonFile = function(fileName='log.json'){
    let data = fs.readFileSync(fileName).toString();                //read current list
    const db = JSON.parse(data);                                    //get current entry list as an array
    console.log(`===============OUTPUTTING DATA IN ${fileName.toUpperCase()}===============`);
    console.log(`JSON file contains ${db.length} entries`)

    //run through all entries and their attributes
    for (let i = 0; i < db.length; i++) {
        console.log(`Entry ${i+1}:`);
        for(let key in db[i]){
            console.log(`\t${key}:\t${db[i][key]}`);
        }
        
    }
    console.log(`==================END OF DATA IN ${fileName.toUpperCase()}=================`);
    debugger;
}
module.exports = printJsonFile
