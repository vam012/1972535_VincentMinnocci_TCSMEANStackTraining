let fs = require("fs");
let obj = require("mongoose");   

let jsonData = fs.readFileSync("call_data.json");
let jsonStr = jsonData.toString();
var jsonArr = JSON.parse(jsonStr);
obj.Promise = global.Promise;             
let uri = "mongodb://localhost:27017/callrecords"
const mongoOptions = {                          
    useUnifiedTopology: true ,
    useNewUrlParser:true
}
obj.connect(uri,mongoOptions);                              
let db = obj.connection;                        
db.on("error",(err)=>console.log(err));         
db.once("open",()=>{                           
    let  callSchema = obj.Schema({
        _id:Number,
        source : String,
        destination:String,
        sourceLocation:String,
        destinationLocation:String,
        callDuration:String,
        roaming:String, 
        callCharge:String
    });

    let callModel = obj.model("",callSchema,"calls");

    for (let i = 0; i < jsonArr.length; i++) {
        const elem = jsonArr[i]
        new callModel({
            _id:elem._id,
            source : elem.source,
            destination:elem.destination,
            sourceLocation:elem.sourceLocation,
            destinationLocation:elem.destinationLocation,
            callDuration:elem.callDuration,
            roaming:elem.roaming, 
            callCharge:elem.callCharge
        }).save((err,res)=>{
            if(!err){console.log("record inserted successfully "+res)}
            else{console.log(err)}
            obj.disconnect();
        });
    }
    

})