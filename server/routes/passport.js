const express = require('express');
const credentials = require('../mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
// const morgan = require('morgan'); // Logger middleware for terminal

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookCreds = require('../facebookCreds.js');
const session = require('express-session');

const router = express.Router();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'dev.michaelahn.solutions',
    user: 'michael',
    password: 'michaelAhn',
    database: 'stubbies',
    port: 3306
});

passport.use(new FacebookStrategy(facebookCreds, // First argument accepts an object for clientID, clientSecret, and callbackURL
    function (accessToken, refreshToken, profile, cb) {
        let sql = "SELECT * FROM ?? WHERE ?? = ?";
        let inserts = ['users', 'facebookID', profile.id];
        sql = mysql.format(sql, inserts);
        console.log('sql: ', sql, 'profile id is: ', profile.id);
        console.log('this is the profile info: ', profile);

        pool.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log("These are the results from fbStrategy function", results);

            if (results.length === 0) {
                let { id, emails: [{value: emailVal}], name: { givenName , familyName}, photos: [{value: photoVal}] } = profile;
                console.log('this is the profile: ', profile);

                let sql = "INSERT INTO ??(??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
                let inserts = ['users', 'facebookID', 'email', 'first_name', 'last_name', 'pictureURL',
                    id, emailVal, givenName, familyName, photoVal];
                sql = mysql.format(sql, inserts);
                console.log("This is the prepared statement", sql);

                pool.query(sql, function(err, results, fields) {
                    if (err) throw err;
                    console.log("This is the new id: ", results.insertId);
                });
            }
        });
        return cb(null, profile);
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

//Session
router.use(session({
    secret: 'ssshhhh',
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());


router.get('/', isLoggedIn,
    function(req, res) {
        // console.log('this is the req: ', req);
        // console.log('this is the res: ', res);
        // res.sendFile(path.resolve('../client', 'dist', 'index.html'));
        res.send('this is the root yo');
    }
);

router.get('/home',
    function(req, res) {
        console.log("user has logged in");
        console.log("This is the session data", req.session);

        //setting Login Status on DB
        const sess = req.session.passport.user.id;        
        let isLoggedIn = 'isLoggedIn';
        let sql = `UPDATE users SET ${isLoggedIn} = 1 WHERE facebookID = ${sess}`;
        console.log("This is the sql:", sql);

        pool.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log("isLoggedIn status updated on db");
        });

        // const sess = req.session;
        // if (sess.passport.user.id) {
        //     console.log('fb user id from session: ', sess.passport.user.id);
        //     const output = {
        //         success: true,
        //         data: sess.passport.user.id
        //     };
        //     res.end(JSON.stringify(output));
        //     console.log('this is the output from sessions: ',output);
        // }
        res.sendFile(path.resolve('..', 'client', 'dist', 'logout.html'));
    }
);

router.get('/auth/facebook',
    passport.authenticate('facebook', {
        authType: 'rerequest',
        scope: ['email', 'public_profile']
        }
    )
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/home');
    }
);

router.get('/logout',
    function(req, res){
        console.log("user has logged out");
        res.redirect('/');

        //setting Login Status on DB
        const sess = req.session.passport.user.id;        
        let isLoggedIn = 'isLoggedIn';
        let sql = `UPDATE users SET ${isLoggedIn} = 0 WHERE facebookID = ${sess}`;
        console.log("This is the sql:", sql);

        pool.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log()
        });
    }
);

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    console.log("This is the result of req.isAuthenticated()", req.isAuthenticated());
    if (req.isAuthenticated()){

        res.redirect('/home');
        return next();
    }
    // res.sendFile(path.resolve("..", "client", "dist", "index.html"));

}

module.exports = router;