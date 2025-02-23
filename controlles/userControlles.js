let {User}=require("../models/user_model");
let {asyncRapper}=require("../middalwares/asyncRappar");
let AppError=require("../utilts/errors")


let getAllUsers=asyncRapper(async(req,res,next)=>{
    let users =await User.find({},{__v:false,password:false}); 
    res.status(200).json({status:"success",data:{users:users}});
})

let deleteUser=asyncRapper(async(req,res,next)=>{
    let id=req.params.id;
    let deleteUser=await User.findByIdAndDelete(id);
    if(!deleteUser){
        let error=AppError.create(404,"fail","Not Found User");
        return next(error);
    }
    res.status(200).json({status:"success",data:null})
})

let updateUser=asyncRapper(async(req,res,next)=>{
    let id = req.params.id;
    let updateuser=await User.findByIdAndUpdate(id,{$set:{...req.body}},{new:true})
    
    res.status(200).json({status:"success",data:{updateuser:updateuser}})
})

let getSingleUser=asyncRapper(async(req,res,next)=>{
    let id = req.params.id;
    let user=await User.findById(id)
    if(!user){
        let error=AppError.create(404,"fail","Not Found");
        return next(error);
    }
    
    res.status(200).json({status:"success",data:{user:user}})
})

module.exports={ 
    getAllUsers,
    deleteUser,
    updateUser,
    getSingleUser
}