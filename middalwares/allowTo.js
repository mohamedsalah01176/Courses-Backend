let AppError=require("../utilts/errors");
module.exports=(...roles)=>{
    return (req,res,next)=>{
        console.log(req);
        if(!roles.includes(req.currentUser.role)){
            let error=AppError.create(401,"error","this operation not available");
            return next(error);
        }
        next()
    }
}