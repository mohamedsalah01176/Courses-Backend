let {body}=require("express-validator");
let MiddileWareCreateCourse=function(){
    return [
        body("title").notEmpty().withMessage("The Title is required")
        .isLength({min:2}).withMessage("write title great than 2 char"),

        body("price").notEmpty().withMessage("The Price is required")
        .isLength({min:2}).withMessage("write Price great than 2 char")
    ]
}

module.exports={MiddileWareCreateCourse}