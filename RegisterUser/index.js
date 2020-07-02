const responses = require('../utils/Responses');
const auth = require('../auth/FirebaseAdminAuth');
const CustomerDao = require('../customers/CustomerDao');
const logger = require('../utils/Logger');
const customerDao = new CustomerDao('customer');

module.exports = async function (context, req) {  

    logger.logRequest(req, context);
    var body = req.body;
    if(body === undefined){
        responses.sendBadRequest("Body missing", context);
        return;
    }

    let idToken = body.idToken;
    if(idToken === undefined){
        responses.sendBadRequest("id token is missing in the request", context);
        return;
    }

    let phone = body.phone;
    if(phone === undefined){
        responses.sendBadRequest("mobile number is missing in the request", context);
        return;
    }

    if(phone.length != 10){
        responses.sendBadRequest("Invalid mobile number", context);
        return;
    }

    let fname = body.fname;
    if(fname === undefined || fname === ""){
        responses.sendBadRequest("First name is missing in the request", context);
        return;
    }

    let lname = body.lname;
    if(lname === undefined || lname === ""){
        responses.sendBadRequest("Last name is missing in the request", context);
        return;
    }

    let email = body.email;
    if(email === undefined){
        responses.sendBadRequest("Email id is missing in the request", context);
        return;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        responses.sendBadRequest("Invalid email id sent", context);
        return;
    }

    await customerDao.init();

    await auth.verifyIDToken(idToken)
        .then(function (userRecord) {
            console.log("userRecord", userRecord);
            //check for the mobile number
            if(userRecord.phone_number === '+91'+phone){
                //1. generate the customer id
                //2. Create a model and Save to DB
                console.log('Mobile number matched');
                return customerDao.createCustomer(body);
            }
            else{
                responses.sendBadRequest("Mobile number didn't match the firebase user mobile number", context)
            }
        })
        .then(function (createdUser){
            console.log(createdUser);
            responses.sendResponse(201, "User created", createdUser, context);
        })
        .catch(function (error) {
            var errorResponse = auth.getError(error);
            responses.sendErrorResponse(errorResponse.statusCode, errorResponse.message, context);
        });
};