
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , graphDisplay=require('./routes/graphDisplay')
  , path = require('path');

var fs = require('fs');
var popup = require('window-popup').windowPopup;
var exec = require('child_process').exec;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/lbexample',function(req, res) {

    res.render('lightboxexample.ejs');
});
app.get('/', routes.index);
//app.get('/', user.runR);
app.get('/users', user.list);
app.get('/learnmore', function(req, res) {

    res.render('learnMore.ejs');
});
app.get('/getinfo', function(req, res) {

    res.render('getInfo.ejs');
});
app.get('/graph', graphDisplay.graph );

app.get('/nav',user.inSQL);     //loading csv in sql
//app.get('',user.csv1);
app.get('/csvTest',user.csv1);
app.get('/cssvTest',function(req,res){
	console.log('param1: ' + req.param('category'));
	
});   //nitesh part
app.get('/frmSQL',user.frmSQL);    // retriving from the SQL table
//app.get('/learnMore', function(req,res){});
app.get('/disp', function(req, res) {

    res.render('disp.ejs');
});
app.get('/top10',function(req, res) {

    res.render('top10.ejs');
});
/*app.get('/frmSQL',function(req, res) {

    console.log(req.param('picker'));
     console.log(req.params);
      console.log(req.body);
      console.log(req.query);

  
}); 
*/
app.listen(80);

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
