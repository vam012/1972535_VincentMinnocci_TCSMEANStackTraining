let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let obj = require("mongoose");

//mongodb setup
obj.Promise = global.Promise;           
let url = "mongodb://localhost:27017/chatlog"
const mongoOptions = {                          
    useUnifiedTopology: true ,
    useNewUrlParser:true
}
obj.connect(url,mongoOptions);                              
let db = obj.connection;                        
db.on("error",(err)=>{if(err){console.log(err)}}); 

//define course structure
let messageSchema = obj.Schema({
    clientNum:Number,
    name:String,
    message:String
});

//create model to interact with mongoDB
const messageModel = obj.model("",messageSchema,"messages");


const port = 8888;
let clientNum = 0;
let connectionList = new Array();
let removeList = new Array();

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=>{
    socket.emit("clientNum",clientNum);
    clientNum++;
    connectionList.push(socket);
    console.log(`New client with client number ${clientNum-1} connected`)
    socket.on("clientMsg",(data)=>{
        console.log(`${data.name} (CLIENT NUMBER:${data.cNum}) says "${data.msg}"`);
        messageModel.create({clientNum:data.cNum,name:data.name,message:data.msg},(err)=>{
            if(err){console.log("ERROR LOGGING TO MONGODB")}
        })
        let length = connectionList.length
        for (let i = 0; i < length; i++) {
            const connection = connectionList[i];
            if(connection.connected == false){removeList.push(i);}  //connection is dead remove
            else{connection.emit("serverMsg",data);}                //send new message
        }
        removeList.forEach(indexToRemove => {connectionList.splice(indexToRemove,1);}); //remove all dead connections
        removeList = new Array();                                                       //reset dead connections list
    }); 
});


http.listen(port,()=>console.log(`Server is running on port ${port}`))