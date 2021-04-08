let http = require("http");             //dependencies
let url = require("url");
let fs = require("fs");
let port = 8000;                        //set up some global vars like file name and port number
let fName = "taskLog.json"
let rawData = fs.readFileSync(fName);
let dataStr = rawData.toString();
let taskArr = JSON.parse(dataStr);

let server = http.createServer((req,res)=>{
    readData();
    let urlDetails = req.url;
    let path = url.parse(urlDetails).pathname;
    let htmltext = addOpeningHTML();
    if(path != "/favicon.ico"){                                 //reroute favicon call
        let data = url.parse(urlDetails,true).query;
        var taskid = data.taskid;
        var taskIndex = taskIdIndex(taskid);
        if(path == "/store" && taskid != undefined){            //store entry
            var empid = data.empid;
            var deadline = data.deadline;
            if(taskIndex!=-1){                                  //taskid already exists
                htmltext+=addTaskEntryForm("TaskID is already in use")
            }else if(empid=="" || taskid=="" || deadline==""){  //all data not entered
                htmltext+=addTaskEntryForm("Invalid Input")
            }else{                                              //save to json file
                htmltext+=addTaskEntryForm();
                addTaskToJson({
                    "empid":empid,
                    "taskid":taskid,
                    "deadline":deadline,
                });
            }
            htmltext+=addDeleteTaskForm();
        }else if(path =="/delete" && taskid != undefined){      //delete entry
            htmltext+=addTaskEntryForm();
            if(taskIndex==-1){                                  //taskid doesnt exist
                htmltext+=addDeleteTaskForm("TaskID does not exist");
            }else{                                              //remove from jsonfile
                htmltext+=addDeleteTaskForm();
                deleteTaskFromTaskArray(taskIndex);
            }
        }else{                                                  //other path
            htmltext+=addTaskEntryForm();
            htmltext+=addDeleteTaskForm();
        }
        htmltext+=addTaskEntries();                             //add table and closing html
        htmltext+=addClosingHTML(); 
    }
    res.end(htmltext);

});
server.listen(port,()=>
    console.log(`Server running on port number ${port}`));

function readData(){
    //read data from json file
    rawData = fs.readFileSync(fName);
    dataStr = rawData.toString();
    taskArr = JSON.parse(dataStr);
}

function addTaskToJson(obj){
    //add obj to the json file
    var dbRawData = fs.readFileSync(fName);
    var dbAsString = dbRawData.toString();
    var db = JSON.parse(dbAsString);
    db.push(obj);
    fs.writeFileSync(fName,JSON.stringify(db));
    readData();
}

function deleteTaskFromTaskArray(index){
    //remove object @index from the json file
    var dbRawData = fs.readFileSync(fName);
    var dbAsString = dbRawData.toString();
    var db = JSON.parse(dbAsString);
    db.splice(index,1);
    fs.writeFileSync(fName,JSON.stringify(db));
    readData();
}

function taskIdIndex(checkId){
    //returns index of task with taskID=checkID
    //return -1 if no such task exists
    for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].taskid==checkId){return i;}
    }
    return -1;
}

function addOpeningHTML(){
    //add header html code
    return `<!DOCTYPE html>
    <html>
    <head>
        <style> 
            table,th,tr,td{
                border:1px solid black;
            }
            h1,h2,h3,h4,h5,h6,th{
                text-align: center;
                text-decoration: underline;
            }
            .err{
                color:red;
            }
            table{
                width:100%;
                text-align:center;
            }
            .left{
                border: 1px solid black;
                float:left;
                width:30%;
                margin-left:10%;
                margin-right:5%;
            }
            .right{
                border: 1px solid black;
                float:right;
                margin-right:10%;
                width:40%;
            }
        </style>
        <title>Task Planner</title>
    </head>
    <body>
        <h1>Task Planner</h1>`;
}

function addTaskEntryForm(errMsg){
    //add task entry form html code
    //if error pass through error message
    errMsg = (errMsg == undefined)? "":errMsg;
    return `<div class=left>
    <h3>Add Task</h3>
    <h4 class=err>${errMsg}</h4>
    <div>
        <form action="/store" method="GET">
            EmpId: <input type="text" name="empid"><br/>
            TaskId: <input type="text" name="taskid"><br/>
            Deadline: <input type="date" name="deadline"><br>
            <input type="submit" value="Submit"><br/>
            <input type="reset" value="Reset"><br/>
        </form>
    </div>
    <hr/>`;
}

function addDeleteTaskForm(errMsg){
    //add task deletion form html code
    //if error pass through error message
    errMsg = (errMsg == undefined)? "":errMsg;
    return `<div>
    <h3>Delete Task</h3>
    <h4 class=err>${errMsg}</h4>
    <form action="/delete" method="GET">
        TaskId: <input type="text" name="taskid"><br/>
        <input type="submit" value="Submit"><br/>
        <input type="reset" value="Reset">
    </form>
</div>
</div>
<div class=right>
<div>
    <h3>Task List</h3>
    <table>
        <thead>
            <th>EmpID</th>
            <th>TaskID</th>
            <th>Deadline</th>
        </thead>
        <tbody>`;
}

function addTaskEntries(){
    //add html for all all tasks data to table
    let retStr = ``;
    taskArr.forEach(task => {
        retStr+=`<tr>
            <td>${task.empid}</td>
            <td>${task.taskid}</td>
            <td>${task.deadline}</td>
        </tr>`
    });
    return retStr;
}


function addClosingHTML(){
    //add closing html code
    return `</tbody>
    </table>
</div>
</div>
</body>
</html>`;
}