module.exports.errorMiddleware = (err , req ,res ,next)=>{
    const {statusCode , message , validation} = err
    const status_code = statusCode || 500
    res.status(statusCode).json({
        error:{
            status_code,
            message,
            validation
        }
    })
}