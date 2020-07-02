const address = require('./Address');

var customer = {
    salutation: String,
    fname: String,
    lname: String,
    email: String,
    countrycode: String,
    phone: String,
    fcm_uid: String,
    ticno: String,
    tcpno: String,
    loyalty_point: String,
    lastzipcode: String,
    lastpaymentinstr: String,
    currency: String,
    rfm: String,
    clv: String,
    nps: String,
    createdtimestamp: String,
    addresses: [address],
}

module.exports = customer;