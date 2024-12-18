const notFound = (req,res,next)=>{
    const error = new Error(`not found - ${req.originalUrl}`);
};

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode === 200?500 : res.statusCode;
    res.status(statusCode);
    res.json({
        messgae: err.messgae,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = {notFound , errorHandler};