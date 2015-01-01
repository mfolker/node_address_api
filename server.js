//Native Node Modules
var http = require('http');
var querystring = require('querystring');
var util = require('util'); 

//Custom Modules
var addstr = require('./cust_modules/addstr_builder');
var submitter = require('./cust_modules/geocode_submitter');
 
http.createServer(function (req, res) {
// set up some routes
	switch(req.url) {
	case '/':
		if (req.method == 'POST') {
			
			console.log("[200] " + req.method + " to " + req.url);
			var address_string = '';
						
			req.on('data', function(chunk) {
			
				// These functions need binding to event emitters as JS is non blocking.
				address_string += addstr(chunk); 
				var google_data = submitter(address_string);

				google_data.on('complete', function(google_result){
					console.log(google_result); 
				});

			});

			req.on('end', function() {
				// request ended -> do something with the data

				res.writeHead(200, "OK", {'Content-Type': 'text/html'});
				// parse the received body data
				//var decodedBody = querystring.parse(fullBody);
				 
				// output the decoded data to the HTTP response
				res.write('<html><head><title>Post data</title></head><body><pre>');
				//res.write(util.inspect(fullBody));
				res.write('yo');
				res.write('</pre></body></html>');
				//console.log(fullBody);
				//console.log(address_string); 
				res.end();
			});
		} else {
			console.log("[405] " + req.method + " to " + req.url);
			res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
			res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
		} 
	break;
	default:
		res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
		res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
		console.log("[404] " + req.method + " to " + req.url);
	};
}).listen(8080); // listen on tcp port 8080 (all interfaces) 
console.log("Server listening on 8080.")