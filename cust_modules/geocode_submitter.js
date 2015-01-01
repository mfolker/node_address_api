//Geo Coder Module - Node GeoCode
var geocoderProvider = 'google'; //Setting GeoCoding Service
var httpAdapter = 'http';
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter/*, extra*/);

//Setup the event emitter
var EventEmitter = require('events').EventEmitter; 

function forward(input1){

	var e = new EventEmitter();
	geocoder.geocode(input1, function(err, res) {
	    e.emit('data', res);
	});

	return(e);
}

function backward(latitude, longitude){

	var e = new EventEmitter();

	geocoder.reverse(latitude, longitude, function(err, res) {
	    e.emit('data', res);
	});

	return(e);
}

function geocode_submitter(input){
	
	var x = new EventEmitter();

	var f = forward(input);

	f.on('data', function(result) {
		
		console.log(result);

		latitude = JSON.parse(result[0].latitude);
		longitude = JSON.parse(result[0].longitude);

		var b = backward(latitude, longitude);

		b.on('data', function(result){
			x.emit('complete', result); 
		});
	
	});

	return(x); 
}

module.exports = geocode_submitter;