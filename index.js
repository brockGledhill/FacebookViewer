var express = require('express');
var session = require('express-session');
var passport = require('passport');
var facebookStrategy = require('passport-facebook');

var app = express();

app.use(session({
    secret: 'shhhhh'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new facebookStrategy({
        clientID: '1322666251085253',
        clientSecret: '54f29444752c7a86ba1241476d2b0df9',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(token, refreshToken, profile, done) {
        return done(null, profile);
    }));

app.get('/auth/facebook', passport.authenticate('facebook'));


app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/me',
        failureRedirect: '/login'
    }),
    function(req, res) {
        console.log(req.session);
    });


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


app.get('/me', function(req, res) {
    res.status(200).json(req.user);
});


app.listen(3000, function() {
    console.log('I pity 3000 fools!');
});
