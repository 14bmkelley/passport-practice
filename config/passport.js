module.exports = function(passport) {
   
   var FacebookStrategy = require("passport-facebook").Strategy;
   var configAuth       = require("./auth");
   
   passport.serializeUser(function(user, done) {
      console.log("Serializing user: " + user.id);
      done(null, user);
   });
   
   passport.deserializeUser(function(uid, done) {
      console.log("Deserializing user: " + uid);
      done(null, uid);
   });
   
   var verifyCallback = function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
         console.log("If you are seeing this, that means the verify ");
         console.log("callback for facebook authentication was ");
         console.log("successful and you should save the user somewhere.");
         return done(null, profile);
      });
   };
   
   passport.use(
      new FacebookStrategy(configAuth.facebookAuth, verifyCallback)
   );
   
};
