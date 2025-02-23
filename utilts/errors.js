class AppError extends Error{
    constructor(){
        super();
    }

    create(statusErr,StatusTexErr,MeassageErr){
        this.status=statusErr;
        this.StatusText=StatusTexErr;
        this.message=MeassageErr;
        return this;
    }
}

module.exports=new AppError;