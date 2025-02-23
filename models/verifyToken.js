const jwt=require("jsonwebtoken");
let AppError=require("../utilts/errors");
function verifyToken(req,res,next){
    const authHeader=req.headers["Authorization"] || req.headers["authorization"];
    if(!authHeader){
        let error=AppError.create(401,"error","token is required");
        next(error);
    }
    let token=authHeader.split(" ")[1];
    try{
        let currentUser=jwt.verify(token,process.env.JWT_SCRET);
        req.currentUser=currentUser;
        next();
    }catch(err){
        let error=AppError.create(401,"error",err.message);
        next(error);
    }
} 

module.exports=verifyToken; 