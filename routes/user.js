
/*
 * GET users listing.
 */

var commonEngine = require("../commonRes/common"),
	isMobile = require("../commonRes/isMobile");

exports.list = function(req, res){
	//data.isMobile = isMobile.isCallerMobile(req);
  	res.send("respond with a resource");
};