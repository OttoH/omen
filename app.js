
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path'),
  hbs = require('hbs');

var app = express();
    //commonEngine = require("./commonRes/common");
    //flickrAPI= require('flickrnode').FlickrAPI;
/*
var flickr= new flickrAPI("002faabf8b3f84b1fd0b602cbf0cb9c2");

flickr.photos.search({tags:'omenjim'},  function(error, results) {
    console.log(results);
});
*/
// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

app.use(express.favicon(__dirname+'/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//console.log(commonEngine.getEntry(1).title);
//app.get('/', routes.index);
app.get('/', function (req, res) {

    var data = {};
    //var flickr= new flickrAPI("002faabf8b3f84b1fd0b602cbf0cb9c2", "a93cf741a20d048c");
    /*
    flickr.photos.search({tags:'dieterrams', per_page: 18},  function(error, results) {
        //console.log(results);
        data.photo = results.photo;
        data.title = commonEngine.getEntry(1).title;
        data.date = commonEngine.getEntry(1).date;
        data.desc = commonEngine.getEntry(1).desc;
        data.expo = commonEngine.getEntry(1).expo;
        data.expo_en = commonEngine.getEntry(1).expo_en;

        console.log(data);
        res.render('index', data);
    });
    */
    /*
    data.title = commonEngine.getEntry(1).title;
    data.date = commonEngine.getEntry(1).date;
    data.desc = commonEngine.getEntry(1).desc;
    data.expo = commonEngine.getEntry(1).expo;
    data.expo_en = commonEngine.getEntry(1).expo_en;
    */
    //console.log(data);
    res.render('index', data);
    /*
    data.title = commonEngine.getEntry(1).title;
    data.date = "2013 9/26 - 2013 10/4";
    console.log(data);
    res.render('index', data);
    */
});

app.get('/u', function (req, res) {
    var d = {};
    res.render('index_', d);

});
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
