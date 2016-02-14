//var mysql = require('mysql');
var mysql = require('./mysql');
var async = require('async');
/*
 * GET users listing.
 */
var exec = require('child_process').exec;

var csv = require('csv');

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.runR = function(req, res){
	console.log('in runR');
	 var child = exec('Rscript ./allDir/read.R', function(error, stdout, stderr) {
		 
	       console.log('stdout: ' + stdout);
	        console.log('stderr: ' + stderr);
	        if (error !== null) {
	            console.log('exec error: ' + error);
	        }
    	
        });
	 console.log('exiting runR');
	};
exports.inSQL = function(req, res){
	
/*	async.series([
	              function(callback){
	                // code a
	            	  var query="LOAD DATA LOCAL INFILE 'C:/myFiles/csvex.csv' INTO TABLE sprediction FIELDS TERMINATED BY ','  ENCLOSED BY '\"' LINES TERMINATED BY '\r\n' IGNORE 1 LINES; " ;
	        	      console.log(query); 
	        	      mysql.handle_database(function(err, results) {
	                 if (err) {
	                      throw err;
	                 } else {
	                	 res.send(results);
	                	 console.log(results);
	                     }
	             }, query);
	                callback(null, 'a')
	              },
	              function(callback){
	                // code d
	            	  
	                callback(null, 'd')
	              }],
	              // optional callback
	              function(err, results){
	                // results is ['a', 'b', 'c', 'd']
	                // final callback code
		              if(err){throw err;}
	              }
	            )
	*/

	      var query="LOAD DATA LOCAL INFILE './public/success_prob.csv' INTO TABLE sPrediction FIELDS TERMINATED BY ','  ENCLOSED BY '\"' LINES TERMINATED BY '\n' IGNORE 1 LINES; " ;
	      console.log(query); 
	      mysql.handle_database(function(err, results) {
         if (err) {
              throw err;
         } else {
        	 res.send(results);
        	 console.log(results);
             }
     }, query);
	      

	
		//  res.send("respond with a resource");
	};
	
exports.csv1 = function(req, res){
	     // name=req.body.name;
	       var  market=req.param('category');
	        var region=req.param('region');
	        var fr=req.param('totfund');
	        var ftu=req.param('fundround');
	        
	        var fyear=req.param('year');;
	        //var rpred=req.param('');;
	        
	        console.log(market+region+fr+ftu+fyear);
	        
	var data = [
	            ["market","region","funding_rounds","funding_total_usd","founded_year"],
	            [" "+market+" ",region,fr,ftu,fyear]
	          //  ['a','trim','c,"','d','e','f','g'], 
	            //['h','i','j','k','l','m','n']
	          ];
	
	 console.log("before");
     csv().from.array(data).to.path('./testData.csv');
     //res.send("response from csv1");
     console.log("after");
// Rscript
	var child = exec('Rscript ./allDir/prediction.R', function(error, stdout, stderr) {
		 
	       console.log('stdout: ' + stdout);
	        console.log('stderr: ' + stderr);
	        if (error !== null) {
	            console.log('exec error: ' + error);
	        }else{
	        	csv().from.path('./testDataResult.csv').to.array(function(data){
	        		 var result=data[1][1];
                                 result=result*100;
	        		 result=Math.round(result*100)/100;
	        	     res.render('extra',{ title: result});
	        	   });
	        	
	        } //end of else
	        
 	
     });
  
//Rscript	
/*     csv().from.path('./testDataResult.csv').to.array(function(data){
    	    console.log(data);
    	    console.log(data[0][1]);
    	    var result=data[1][1];
    	     res.render('extra',{ title: result});
    	   });
*/
};	
exports.frmSQL = function(req, res){
   var market=req.param('picker');
   console.log(req.query); 
   console.log(market);
   console.log(req.body);	
   console.log(req.params);	
   var allcompanies='';
    var query="SELECT * FROM sPrediction WHERE market=' "+market+" ' LIMIT 10; " ;
    console.log(query); 
    mysql.handle_database(function(err, results) {
   if (err) {
        throw err;
   } else {
  	 //res.send(results[0][0]);
  	 //res.send(results[0][1]);
  	 //-----------------
  	for (i = 0; i < 10; i++) { 
  	 console.log(results[i]['name']);
         allcompanies=allcompanies+(i+1)+') '+' Name: '+results[i].name +'Rank: '+results[i].rankpred+"\n";

  	//allcompanies=allcompanies+i+') '+results[i]['name']+'\n';
  	
  	}
  //	console.log(results);
  	//----------
  	 res.render('extra1',{ title: results, market:market});
  	//res.send(allcompanies);
       }
   }, query);
	  //res.send("respond with a resource");
};