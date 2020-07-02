'use-strict'
const admin = require('firebase-admin');
var serviceAccount = require("../ihcl-fine-dining-firebase-adminsdk-b31x5-9eb945dd67.json");

module.exports.verifyIDToken = function (idToken) {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ihcl-fine-dining.firebaseio.com"
          });
    }
    return admin.auth().verifyIdToken(idToken, true);  
}

// https://firebase.google.com/docs/auth/admin/errors : 
// All the errors below are referred from the above link.
// If any new error occurs, refer the link and handle the error.
module.exports.getError = function (error) {
    let errorCode = error.code;
    if(errorCode === 'auth/id-token-expired'){
        return {
            statusCode: 401,
            message: "ID Token expired"
        }
    }
    else if(errorCode === 'auth/id-token-revoked'){
        return {
            statusCode: 401,
            message: "ID Token revoked"
        }
    }
    else if(errorCode === 'auth/invalid-credential'){
        return {
            statusCode: 401,
            message: "ID Token revoked"
        }
    }
    else if(errorCode === 'auth/invalid-id-token'){
        return {
            statusCode: 401,
            message: "Invalid id token"
        }
    }
    else if(errorCode === 'auth/invalid-phone-number'){
        return {
            statusCode: 400,
            message: "Invalid phone number"
        }
    }
    else {
        return {
            statusCode: error.code,
            message: error.message
        }
    }
}