let mongoose =require("mongoose");
let validator=require("validator");
const userRoles = require("../utilts/userRoles");


let userSchema= new mongoose.Schema({
    fristName:{
        required:true,
        type:String
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Field must be Validate email"]
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.USER,userRoles.MANGARE],
        dafault:userRoles.User
    },
    avatar:{
        type:String,
        default:"/uploads/OIP (10).jpeg"
    }
})

let User=mongoose.model("User",userSchema);

module.exports={User};