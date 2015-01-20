var express = require('express');
var router = express.Router();

/* GET home page. */
router.get( '/', function( request, response ) {

	var context = {};

	var db = request.db;
	var collection = db.get( 'gifferscollection' );
	collection.find( {}, {}, function ( e, docs ) {

		context.giffers = docs;

		response.render( 'index.html', context );
	});
});

module.exports = router;
