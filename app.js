
/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts');


var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options',{layout: 'layout'});
  app.use(express.favicon());
  app.use(expressLayouts);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));

});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});



var controllers_path = __dirname + '/controllers'
  , controller_files = fs.readdirSync(controllers_path)
controller_files.forEach(function (file) {
  require(controllers_path+'/'+file)(app)
})


// Start server

app.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
