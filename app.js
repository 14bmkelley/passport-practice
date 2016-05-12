var http             = require("http");
var express          = require("express");
var passport         = require("passport");
var facebookStrategy = require("passport-facebook").Strategy;

var app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(uid, done) {
   done(null, uid);
})

var credentials = {
   clientID: "470422093145047",
   clientSecret: "b0c4c3c1e2415750c9fa89a001c4bf7a",
   callbackURL: "http://localhost:3000/connect/facebook/callback"
};

var verifyCallback = function(accessToken, refreshToken, profile, done) {
   process.nextTick(function() {
      return done(null, profile);
   });
}

passport.use(new facebookStrategy(credentials, verifyCallback));

app.get("/connect/facebook", passport.authorize("facebook", { "scope": "email" }));

app.get("/connect/facebook/callback",
   passport.authorize("facebook", {
      "successRedirect": "/success",
      "failureRedirect": "/failure"
   })
);

http.createServer(app).listen(3000);
