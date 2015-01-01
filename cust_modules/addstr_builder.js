function addstr_builder(post){

	var address_string = '';

	pasred = JSON.parse(post); 

	address_string += pasred.house+" "+pasred.postcode;

	return address_string;
}

module.exports = addstr_builder;