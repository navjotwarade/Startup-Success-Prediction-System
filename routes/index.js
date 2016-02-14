var mysql = require('./mysql');
/*
 * GET home page.
 */
var exec = require('child_process').exec;


exports.index = function(req, res){
	console.log('in runR');
	//-------------------------Create Sql Table----------------------------------
	var query="CREATE TABLE IF NOT EXISTS `sPrediction` (  `id` bigint(20) NOT NULL,  `name` varchar(20) NOT NULL,  `market` varchar(20) NOT NULL,  `region` varchar(20) NOT NULL,  `funding_rounds` bigint(20) NOT NULL,  `funding_total_usd` bigint(20) NOT NULL,   `founded_year` bigint(20) NOT NULL,   `rankpred` float(4,3) NOT NULL);" ;
    console.log(query); 
    mysql.handle_database(function(err, results) {
   if (err) {
        throw err;
   } else {
  	// res.send(results);
  	 console.log(results);
       }
   }, query);
	
	//---------------------------------------------------------------------------
	 var child = exec('Rscript ./allDir/read.R', function(error, stdout, stderr) {
		 
	       console.log('stdout: ' + stdout);
	        console.log('stderr: ' + stderr);
	        if (error !== null) {
	            console.log('exec error: ' + error);
	        }
   	
       });
	 console.log('exiting runR');
  res.render('index', { title: 'Express' });
};
/*
exports.runR = function(req, res){
	console.log('in runR');
	 var child = exec('Rscript C:/myFiles/239project/read.R', function(error, stdout, stderr) {
		 
	       console.log('stdout: ' + stdout);
	        console.log('stderr: ' + stderr);
	        if (error !== null) {
	            console.log('exec error: ' + error);
	        }
    	
        });
	 console.log('exiting runR');
	};
*/