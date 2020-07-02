const logger = require('./Logger');

module.exports.sendResponse = function (statusCode, message, body, context){
    let response = {
        statusCode: statusCode,
        message: message,
        body: body,
    }
    logger.logResponse(response, context);
    context.res.status(statusCode).json(response);
}

module.exports.sendErrorResponse = function (statusCode, message, context){
    let response = {
        statusCode: statusCode,
        message: message
    }
    logger.logResponse(response, context);
    context.res.status(statusCode).json(response);
}

module.exports.sendUnAuthorized = function (message, context){
    let response = {
        statusCode: 401,
        message: message
    }
    logger.logErrorResponse(response, context);
    context.res.status(401).json(response);
}

module.exports.sendBadRequest = function (message, context){
    let response = {
        statusCode: 400,
        message: message
    }
    logger.logErrorResponse(response, context);
    context.res.status(400).json(response);
}

module.exports.sendNotFoundError = function (message, context){
    let response = {
        statusCode: 404,
        message: message
    }
    logger.logErrorResponse(response, context);
    context.res.status(404).json(response);
}

