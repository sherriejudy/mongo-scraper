// Pull in required dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");
var methodOverride = require("method-override");

// Requiring Comment and Article models
var Note = require("./models/Comment.js");
var Article = require("./models/Article.js");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(methodOverride("_method"));

// Database configuration with mongoose
var databaseUri = "mongodb://localhost/mongoosearticles";
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection sucessful.");
});

require("./config/htmlRoutes.js")(app);
require("./config/apiRoutes.js")(app);

// Start listening on PORT
app.listen(PORT, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mongo-Scraper app is listening on PORT: " + PORT);
  }
});
