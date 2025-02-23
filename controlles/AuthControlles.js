const { User } = require("../models/user_model");
let {asyncRapper}=require("../middalwares/asyncRappar");
let AppError=require("../utilts/errors");
let bcrypt= require("bcrypt");
let jwt=require("jsonwebtoken");
const { generateToken } = require("../utilts/GenerateToken");



let rigister=asyncRapper(async(req,res,next)=>{
    let {fristName,lastName,email,password,role}=req.body;
    let user=await User.findOne({email: email});
    //from multer labirary
    let avatar=req.file.path;
    if(user){
        let error=AppError.create(400,"fail","the user aready found");
        return next(error);
    }

    let bcryptPassword=await bcrypt.hash(password,8);

    let newUser=new User({
        fristName,
        lastName,
        email,
        password:bcryptPassword,
        role:role,
        avatar:avatar
    });
    let token=await generateToken({email:newUser.email,id:newUser._id,role:role});
    newUser.token=token;
    await newUser.save();
    res.status(200).json({status:200,data:{token:newUser.token}}); 
})

let login=asyncRapper(async(req,res,next)=>{
    let {email,password}=req.body;
    if(!email){
        let error=AppError.create(400,"fail","the email is require");
        return next(error);
    }
    if(!password){
        let error=AppError.create(400,"fail","the password is require");
        return next(error);
    }

    let user=await User.findOne({email:email});
    console.log(user);
    
    let checkPassword=await bcrypt.compare(password,user.password);
    console.log(checkPassword);
    if(!checkPassword){
        let error=AppError.create(400,"fail","password incorrect");
        return next(error);
    }
    let token=await generateToken({email:user.email,id:user._id,role:user.role});
    res.status(200).json({status:"success",data:{token:token}});
})
module.exports={
    rigister,
    login
}