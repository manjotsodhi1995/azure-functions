const lat_long = require('./LatLong');

module.exports.address = {
    type: String,
    address: String,
    landmark: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    lat_long: [lat_long],
    lastusedtimestamp: String
}