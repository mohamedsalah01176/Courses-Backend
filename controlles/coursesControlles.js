const {Course}=require("../models/model_Courses");
const {validationResult}=require("express-validator");

const {asyncRapper}=require("../middalwares/asyncRappar");
const AppError = require("../utilts/errors");

//find(Quaryfilter,projection,options);
//find({name:"ahmed",age:{$gre:18}},{price:false},options);

let getAllCourses=asyncRapper(async(req,res,next)=>{

    let query=req.query; 

    let limit=query.limit || 10;
    let page=query.page || 1;
    let skip= (page -1)*limit;

    const courses= await Course.find({},{__v:false}).limit(limit).skip(skip);
    res.json({status:"success",data:{courses:courses}});
}) 

let createCoure=asyncRapper(async(req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        let error=AppError.create(400,"fail",errors)
        return next(error);
        // return res.status(400).json({status:"fail",data:{errors:errors}});
    } 
    let course=new Course(req.body);
    await course.save();
    res.status(200).json({status:"success",data:{course:course}})
})

let GetSingleCourse=asyncRapper(async(req,res,next)=>{
    let course=await Course.findById(req.params.id,{__v:false});
    console.log(course)
    if(!course){
        let error=AppError.create(404,"fail","Not Found Course");
        return next(error);
        // return res.status(404).json({status:"fail",data:{course:"Not Found Course"}});
    }
    res.status(200).json({status:"success",data:{course:course}});


    // try{
    // }
    // catch(err){
    //     res.status(400).json({status:"error",message:err.message})
    // }
})

let updateCourse=asyncRapper(async(req,res,next)=>{ 
    let id =req.params.id;
    //findByIdAndUpdate() do update and return old obgject and we can use updateOne()
    // let course= await Course.updateOne({_id:id},{$set:{...req.body}})
    let course=await Course.findByIdAndUpdate(id,{$set:{...req.body}},{new:true});
    if(!course){
        let error=AppError.create(404,"fail","Not Found Course");
        return next(error);
        // return res.status(404).json({status:"fail",data:{course:"Not Found Course"}});
    }
    res.status(200).json({status:"success",data:{course:course}});
})

let deleteCourse=asyncRapper(async(req,res,next)=>{
    let id=req.params.id;
    let deleteCourse= await Course.findByIdAndDelete(id);
    if(!deleteCourse){
        let error=AppError.create(404,"fail","Not Found Course");
        return next(error);
        // return res.status(404).json({status:"fail",data:{course:"Not Found Course"}});
    }
    res.status(200).json({status:"success",data:null})
})

module.exports={
    getAllCourses,
    createCoure,
    GetSingleCourse,
    updateCourse,
    deleteCourse
}