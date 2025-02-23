const mongoose=require("mongoose");


let coursesScheama=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

let Course= mongoose.model("Course",coursesScheama)

// mongoose.connect(url).then(()=>{
//     console.log("the server started");
// })

module.exports={Course};

