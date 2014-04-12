
/*
 * GET members listing.
 */

var commonEngine = require("../commonRes/common"),
	isMobile = require("../commonRes/isMobile");

exports.members = function(req, res){
	var data = {};
	data.members = [];
	data.members = commonEngine.getEntries();
	data.isMobile = isMobile.isCallerMobile(req);

	//console.log(data);
	//res.send("respond with a resource");
	res.render('members', data);
  	
};