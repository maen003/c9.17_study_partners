const express = require('express');
const credentials = require('./config/mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Logger middleware for terminal
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const { USERNAME, PASSWORD } = require('./config/nodemailerConfig.js');

const app = express();

// const routes = require('./routes/index');
// app.use('/', routes);
// const passportRoutes = require('./routes/passport');
// const dbtest = require('./routes/index');
// app.use('/', dbtest);

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookCreds = require('./config/facebookCreds.js');
const session = require('express-session');

var facebook = {};

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );
app.use(cookieParser());

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*' );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

//Express
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

//Morgan
app.use(morgan('dev'));

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
        console.log('this is the profile info form passport strat:', profile);


        pool.query(sql, function(err, results, fields) {
            if (err) throw err;

            if (results.length === 0) {
                console.log('these are the results from passport strat:', results);
                let { id, emails: [{value: emailVal}], name: { givenName , familyName}, photos: [{value: photoVal}] } = profile;
                let isLoggedIn = 1;

                let sql = "INSERT INTO ??(??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)";
                let inserts = ['users', 'facebookID', 'email', 'first_name', 'last_name', 'pictureURL', 'isLoggedIn',
                    id, emailVal, givenName, familyName, photoVal, isLoggedIn];

                sql = mysql.format(sql, inserts);

                pool.query(sql, function(err, results, fields) {
                    if (err) throw err;
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
app.use(session({
    secret: 'ssshhhh',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// BEGIN NODEMAILER
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: USERNAME,     
      pass: PASSWORD  
    }                             
  });
// END NODEMAILER

require('./api')(app, passport);
require('./auth')(app, passport);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Listen
app.listen(4000,function(){
    console.log('the server is started on Port 4000');
});