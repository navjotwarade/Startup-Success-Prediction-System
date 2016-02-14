var fs = require('fs');
var popup = require('window-popup').windowPopup;


exports.graph = function(req, res){
  //res.render('graphDisplayView.ejs');
  //---------------------------------------------------
  
  fs.readFile('C:/myFiles/239project/ab.jpg', function (err, data) {
  	  if (err) throw err;
  	res.writeHead(200, {'Content-Type': 'text/html'});

  	res.write('<html><body><img src="data:image/jpeg;base64,')
    res.write(new Buffer(data).toString('base64'));
    res.write('" width="50%" height="50%" /></body></html>');  
    
  //  popup(500, 500, 'http://www.google.com', 'Google');
  	});
  
  //------------------------------------------------------
};