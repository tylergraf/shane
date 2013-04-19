/**
 * Module dependencies
 */
// var m = require("../lib/middleware");

/**
 * Expose the api routes
 */
module.exports = function(app) {


  app.get("/", function(req, res, next) {
    res.render('index');
  });
  
};
