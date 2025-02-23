let express=require("express");
const router=express.Router();
const {MiddileWareCreateCourse}=require("../middalwares/middilWare");

const controlles=require("../controlles/coursesControlles");
let userControls=require("../controlles/userControlles");
let AuthControlles=require("../controlles/AuthControlles");
const verifyToken = require("../models/verifyToken");
const allowTo = require("../middalwares/allowTo");
let AppError = require("../utilts/errors");

let multer=require("multer");

let storageFun=multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"uploads")
    },
    filename:(req,file,cd)=>{
        let extantion=file.mimetype.split("/")[1];
        let fileNamed=`user-${Date.now()}.${extantion}`;
        cd(null,fileNamed)
    }
})
let fileFilterFun=(req,file,cd)=>{
    let typefile=file.mimetype.split("/")[0];
    if(typefile === "image"){
        cd(null,true);
    }else{
        let error =AppError.create(400,"fail","file must be image");
        cd(error,false)
    }
}
let upload=multer({
                    storage:storageFun,
                    fileFilter:fileFilterFun
                    })

router.route("/courses")
    .get(verifyToken,controlles.getAllCourses)
    .post(verifyToken,MiddileWareCreateCourse(),controlles.createCoure)

router.route("/courses/:id")
    .get(verifyToken,controlles.GetSingleCourse)
    .patch(verifyToken,controlles.updateCourse) 
    .delete(verifyToken,controlles.deleteCourse)



//===============user Routes


router.route("/users")
    .get(verifyToken,userControls.getAllUsers)


router.route("/users/:id")
    .delete(verifyToken,allowTo("admin","manger"),userControls.deleteUser)
    .patch(verifyToken,allowTo("admin","manger"),userControls.updateUser)
    .get(userControls.getSingleUser)

//==========authantication

router.post("/register",upload.single("avatar"),AuthControlles.rigister) 
router.post("/login",AuthControlles.login) 

module.exports={ 
router
}

