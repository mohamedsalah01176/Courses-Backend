// const {MongoClient}=require("mongodb");

// const url="mongodb+srv://mohamedSalah011:01069615316Az@learn-node.8mzwc.mongodb.net/?retryWrites=true&w=majority&appName=learn-Node";

// const client=new MongoClient(url);




// async function main(){
//     await client.connect();
//     console.log("connect DB");

//     let DB=client.db("NodeJs");
//     let collection=DB.collection("courses");

//     // await collection.insertMany([
//     //     {
//     //         title:"HTML",
//     //         price:300
//     //     },
//     //     {
//     //         title:"CSS",
//     //         price:500
//     //     }
//     // ])

//     let data=await collection.find().toArray();
//     console.log(data);

// }

// main();


//============mongoose
require('dotenv').config();
const mongoose  = require("mongoose");
let express=require("express");
const app =express();
const {router}=require("./routes/routes");
const cors=require("cors");
let path=require("path");

const url2=process.env.URL_MONOOSE;

app.use("/uploads",express.static(path.join(__dirname,"uploads")))


//very important
app.use(express.json())

//solve problem connection between frontend and backend
app.use(cors());




app.use("/api",router);

app.all("*",(req,res,next)=>{
    return res.status(404).json({status:"error",message:"not Found API URL"});
})

//handele error by using middaleWare
app.use((error,req,res,next)=>{
    res.status(error.status ||500).json({status:error.StatusText||"error",message:error.message});
})


mongoose.connect(url2).then(()=>{
    console.log("mongoose Server");
})  

app.listen("5001",()=>{
    console.log("localHost Connected") 
})  