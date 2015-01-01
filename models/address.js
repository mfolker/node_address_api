var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
	latitude: Number,
    longitude: Number,
    country: String,
    city: String,
    state: String,
    stateCode: String,
    zipcode: String,
    streetName: String,
    streetNumber: String,
    countryCode: String

});





