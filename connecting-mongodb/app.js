let app = require("express")();
let bodyParser = require("body-parser"); 
let obj = require("mongoose");

//express set up
app.use(bodyParser.urlencoded({extended:true}));

//mongodb setup
obj.Promise = global.Promise;    
let port=7777;         
let url = "mongodb://localhost:27017/courses"
const mongoOptions = {                          
    useUnifiedTopology: true ,
    useNewUrlParser:true
}
obj.connect(url,mongoOptions);                              
let db = obj.connection;                        
db.on("error",(err)=>console.log(err)); 

let courseSchema = obj.Schema({
    _id:Number,
    courseName:String,
    courseDesc:String,
    courseCost:Number
});

//used to interact with db
const Course = obj.model("",courseSchema,"courses");

let holdStr="";
getCoursesHTML();


//get calls
app.get("/",(req,res)=>{res.sendFile(__dirname+"/index.html");});                                       //home
app.get("/success",(req,res)=>{res.sendFile(__dirname+"/success.html");});                              //successful
app.get("/failure",(req,res)=>{res.sendFile(__dirname+"/failure.html");});                              //failure
app.get("/addCourse",(req,res)=>{res.sendFile(__dirname+"/addCourse.html");});                          //add
app.get("/deleteCourse",(req,res)=>{res.sendFile(__dirname+"/deleteCourse.html");});                    //delete
app.get("/updateCourse",(req,res)=>{res.sendFile(__dirname+"/updateCourse.html");});                    //update
app.get("/getCourses",(req,res)=>{
    getCoursesHTML();
    res.send(courseListHTMLStart+holdStr+courseListHTMLClose)}); //get

app.post("/addCourse",(req,res)=>{
    let courseID = eval(req.body.courseID);
    let courseName = req.body.courseName;
    let courseDesc = req.body.courseDesc;
    let courseCost = eval(req.body.courseCost);
    Course.create({'_id':courseID,'courseName':courseName,'courseDesc':courseDesc,'courseCost':courseCost},(err)=>{
        if(err){res.redirect("/failure")}
        else{res.redirect("/success")}
    });
    getCoursesHTML();
});

app.post("/deleteCourse",(req,res)=>{
    let courseID = eval(req.body.courseID);
    Course.deleteOne({'_id':courseID,},(err)=>{
        if(err){res.redirect("/failure")}
        else{res.redirect("/success")}
    });
    getCoursesHTML();
});

app.post("/updateCourse",(req,res)=>{
    let courseID = eval(req.body.courseID);
    let courseName = req.body.courseName;
    let courseDesc = req.body.courseDesc;
    let courseCost = eval(req.body.courseCost);
    Course.updateOne({'_id':courseID},{'courseName':courseName,'courseDesc':courseDesc,'courseCost':courseCost},(err,result)=>{
        if(err || result.nModified==0){res.redirect("/failure")}
        else{res.redirect("/success")}
    });
    getCoursesHTML();
});

app.listen(port,()=>{console.log(`Server is running on port ${port}`)})


async function getCoursesHTML(){
    retStr = ``;
    Course.find({},function(err,res){
        for (let i = 0; i < res.length; i++) {
            const item = res[i];
            retStr+=`<tr><td> ${item._id} </td>`
            retStr+=`<td> ${item.courseName} </td>`
            retStr+=`<td> ${item.courseDesc} </td>`
            retStr+=`<td> $${item.courseCost} </td></tr>`
        }
        holdStr = retStr;
    });
}


//HTML to make courselist page
let courseListHTMLStart = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table,th,tr,td{
            border:1px solid black;
        }
    </style>
    <title>Get Courses</title>
</head>
<body>
    <h1>Course Platform</h1>
    <a href="/">Back to home</a><br/>
    <table>
        <thead>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Course Cost</th>
        </thead>
        <tbody>`;

let courseListHTMLClose = `
        </tbody>
    </table>
</body>
</html>`;