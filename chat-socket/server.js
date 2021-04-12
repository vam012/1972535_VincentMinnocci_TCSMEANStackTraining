let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
const port = 9090;
let clientNum = 0;
let connectionList = new Array();

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
        connectionList.forEach(connection => {
            connection.emit("serverMsg",data);
        }); 
    }); 
});


http.listen(port,()=>console.log(`Server is running on port ${port}`))