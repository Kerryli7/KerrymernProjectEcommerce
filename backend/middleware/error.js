const ErrorHandler = require("../utils/errorhander");


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

// wrong mongodb id err

    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid:${err.path}`;
        err = new ErrorHandler(message,400);
    }
    // mongoose duplicate key err

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }
    // wrong JWT err

    if(err.name === 'jsonWebTokenError'){
        const message = `json Web Token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }

        //  JWT Expire err

        if(err.name === 'TokenExpireError'){
            const message = `json Web Token is invalid, try again`;
            err = new ErrorHandler(message,400);
        }

    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    });
};