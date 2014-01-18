
/*
 * GET members listing.
 */

var commonEngine = require("../commonRes/common");

exports.members = function(req, res){
	var data = {};
	data.members = [];
	data.members = commonEngine.getEntries();

	//console.log(data);
	//res.send("respond with a resource");
	res.render('members', data);
  	
};