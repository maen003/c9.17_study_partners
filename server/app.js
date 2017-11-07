const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Logger middleware for terminal

const app = express();

const passport = require('passport');
const Strategy = require('passport-facebook');
const facebookCreds = require('./facebookCreds.js');
const session = require('express-session');

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Express
app.use(express.static(path.resolve("..", "client", "dist")));

//Morgan
app.use(morgan('dev'));

//Session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//CREATE/JOIN EVENTS ROUTES
app.post('/events',function(req, res){
    const connection = mysql.createConnection(credentials);

    connection.connect(() => {
        console.log(arguments);
        connection.query(
            `SELECT * FROM events`, function(err, results, fields){
                console.log('query has finished', connection);
                const output = {
                    success: true,
                    data: results
                };
                res.end(JSON.stringify(output));
            });
        console.log('query has started')
    });
    console.log('got a user request????');
    //res.end('got a user request!!!!!');
});

app.post('/add_events',function(req, res){
    console.log('the data is receiveth');
    console.log('req is before this');
    console.log("DATA RECEIVEDDDDD!!!!");
    const connection = mysql.createConnection(credentials);

    const fields = `INSERT INTO events SET title = "${req.body.title}", description = "${req.body.description}", subject = "${req.body.subject}", date = "${req.body.date}", time = "${req.body.time}", duration = "${req.body.duration}", location = "${req.body.location}", max = "${req.body.max}", phone = "${req.body.phone}", email = "${req.body.email}", coordinates="123, 123", facebookID="0000"`;
    console.log(fields);
    console.log('this is a request body', req.body);
    connection.connect(() => {
        connection.query(
            fields
            , function(err, results, fields){
                const output = {
                    success: true,
                    data: results
                };
                res.end(JSON.stringify(output));
            });
        console.log('query has started')
    });
    console.log('got a event request');
    //res.end('got a user request!!!!!');
});

app.post('/delete_events',function(req, res){
    // console.log(req.body.name);

    console.log("Data is being deleted!!!!");
    const connection = mysql.createConnection(credentials);

    connection.connect(() => {
        console.log(arguments);
        console.log('this is the ',req.body.event_id);
        connection.query(
            `DELETE FROM events WHERE event_id = '${req.body.event_id}'`, function(err, results, fields){
                console.log('query has finished', connection);
                const output = {
                    success: true,
                    data: results
                };
                res.end(JSON.stringify(output));
            });
        console.log('query has started')
    });
    console.log('got a user request????');
    //res.end('got a user request!!!!!');
});
//END CREATE/JOIN EVENTS ROUTES


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'stubbies',
    port: 8889
});

//FB PASSPORT
passport.use(new Strategy(facebookCreds, // First argument accepts an object for clientID, clientSecret, and callbackURL
    function (accessToken, refreshToken, profile, cb) {
        let sql = "SELECT * FROM ?? WHERE ?? = ?";
        let inserts = ['users', 'facebookID', profile.id];
        sql = mysql.format(sql, inserts);
        pool.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log("These are the results", results);
            if (results.length === 0) {
                let { id, email, firstName, lastName, url } = profile;
                let sql = "INSERT INTO ??(??, ??) VALUES (?, ?)";
                let inserts = ['users', 'facebookID', 'email', 'firstName', 'lastName', 'picture',
                        id, email, firstName, lastName, url];
                sql = mysql.format(sql, inserts);
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


app.get('/',
    function(req, res) {
        res.sendFile(path.resolve('client', 'index.html'));
    }
);

app.get('/home',
    function(req, res) {
        console.log("This is the session data", req.session);
        res.sendFile(path.resolve('client', 'logout.html'));
    }
);

app.get('/login/facebook',
    passport.authenticate('facebook')
);

app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/home');
    }
);

app.get('/logout',
    function(req, res){
        res.redirect('/');
    }
);
//END FB PASSPORT


app.listen(4000,function(){
    console.log('the server is started on Port 4000');
});
