let jwt=require("jsonwebtoken");

let generateToken=async (payload)=>{
    let token=await jwt.sign(payload,process.env.JWT_SCRET,{expiresIn:"1d"});
    return token;
}
module.exports={
    generateToken
}