
var mysql = require('mysql');

/*Added 11/23*/

function getConnection(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'navjot',
		database : 'my_db',
		multipleStatements: true
	});
	return connection;
}

function handle_database(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection=getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}	
exports.handle_database=handle_database;

