var express = require('express');
//var passport = require('passport');
//var p = require('./authentication')(passport);

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});


/*
router.use(function(req, res, next) {
	
	console.log("CHECK ALL");
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
	
	//console.log(req);
	
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
 if (token) {
  }else{
	  
	  // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    	  
	  
  }


  
});
*/

module.exports = router;