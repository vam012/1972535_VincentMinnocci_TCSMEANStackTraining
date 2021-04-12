let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
const port = 9090;
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