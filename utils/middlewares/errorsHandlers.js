const { config } = require('../../config')

function logErrors(error,request,response,next){
    console.log(error.stack)
    next(error)
}

function clientErrorHandler(error,request,response,next){
    //catch errors for AJAX requests
    if(request.xhr){
        response.status(500).json({error: error.message })
    }else{
        next(error)
    }
}

function errorHandler(error,request,response,next){
    //catch errors while streaming
    if(response.headersSent){
        next(error)
    }
    if(!config.dev){
        delete error.stack
    }
    response.status(error.status || 500)
    response.render("error", {error: error})
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
}