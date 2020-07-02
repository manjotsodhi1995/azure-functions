const appInsights = require("applicationinsights");
appInsights.setup(process.env.APP_INSIGHT_INSTRUMENT_KEY);
appInsights.start();

module.exports.logRequest = function (req, context){
    // ------------- Request --------------- //
    let request = {
        body: req.body,
        method: req.method,
        query: context.bindingData.query,
        headers: context.bindingData.headers,
        sys: context.bindingData.sys
    };
    context.log.info(request);
}

module.exports.logResponse = function (response, context){
    context.log.info(response);
}

module.exports.logErrorResponse = function (response, context){
    context.log.error(response);
}