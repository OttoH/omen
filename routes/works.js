
/*
 * GET works listing.
 */

var commonEngine = require("../commonRes/work_common"),
	fs = require('fs'),
	async = require('async'),
	data = {},
	files = [];

exports.works = function(req, res){
	var I, L;

	data.allworks = [];
	data.allworks = commonEngine.getEntries();

	//console.log(data);
	//res.send("respond with a resource");
	res.render('works', data);
  	
};
//single work
exports.s_work = function(req, res){
	var term = req.params.title,
		data_s = {},
		I, L;

	data_s.work = [];
	data_s.work = commonEngine.getEntry(term);

	async.parallel({
		getPhoto: function (callback) {
			fs.readdir("./public/data/work/"+term, function(err, files) {
				var re_files = [];
				for (I=0, L=(files.length > 36) ? 36 : files.length; I<L; I++) {
					if (files[I] !== term+"_m") {
						re_files[I] = "../data/work/"+term+"/"+files[I];	
					}
				}

	  			callback(err, re_files);
			});	
		}

	}, function (err, result) {
		if (!result) {
			console.log(err);
		}
		data_s.cover = result.getPhoto;
		//console.log(data_s);
		//res.send("respond with a resource");
		res.render('work', data_s);
	});
  	
};