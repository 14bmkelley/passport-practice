var http             = require("http");
var express          = require("express");
var passport         = require("passport");
var facebookStrategy = require("passport-facebook").Strategy;
var passportConfig   = require("./config/passport");

var app = express();

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.get("/connect/facebook",
   passport.authenticate("facebook", {
      "scope": [ "public_profile", "publish_actions" ]
   })
);

app.get("/connect/facebook/callback",
   passport.authenticate("facebook", {
      "successRedirect": "/success",
      "failureRedirect": "/failure"
   })
);

app.get("/success", function(request, response) {
   response.end("This is the successful authentication page.");
});

app.get("/failure", function(request, response) {
   response.end("This is the failed authentication page.");
});

app.use(function(request, response, done) {
   response.redirect("/failure");
});

http.createServer(app).listen(3000);
