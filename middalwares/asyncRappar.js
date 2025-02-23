let asyncRapper=(fu)=>{
    return (req,res,next)=>{
        fu(req,res,next).catch((err)=>next(err))
    }
} 

module.exports={
    asyncRapper
} 