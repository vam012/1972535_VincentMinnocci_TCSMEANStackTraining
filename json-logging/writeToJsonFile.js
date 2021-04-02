//this code will save data entries to a json file (Default to log.json)
//user is sent here from getNewDataEntries.js

let fs = require("fs");

var writeList = function(fileName='log.json',listOfObjs){
    //add each object to the JSON file
    listOfObjs.forEach(objElement => {
        writeSingularDataPoint(fileName,objElement);
    });
    debugger;
}
module.exports = writeList;

function writeSingularDataPoint(fileName,objAsString){
    var obj = JSON.parse(objAsString);                              //parse JSON obj
    let data = fs.readFileSync(fileName).toString();                //read current list
    const db = JSON.parse(data);                                    //get current entry list as an array
    db.push(obj);                                                   //push new obj
    fs.writeFileSync(fileName,JSON.stringify(db));                  //write to file overriding previous list
    //console.log(`Recorded file for ${obj.fName} successfully`);     //confirm its all good (commented out for final build)
    debugger;
}
