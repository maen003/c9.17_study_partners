const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Logger middleware for terminal
const cookieParser = require('cookie-parser');


const app = express();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookCreds = require('./facebookCreds.js');
const session = require('express-session');

var facebook = {};

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );
app.use(express.cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:4000' );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: null}
}
));
app.use(passport.initialize());
app.use(passport.session());


app.get('/dbtest',function(req, res){
    console.log(credentials);
    const connection = mysql.createConnection(credentials);
    connection.connect( function(){
        console.log(arguments);
        connection.query('SELECT * FROM events', function(err, results){
            res.end(JSON.stringify(results));
        })
    })
});

//CREATE/JOIN EVENTS ROUTES
app.get('/events',function(req, res){
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
    passport.use(new FacebookStrategy(facebookCreds, // First argument accepts an object for clientID, clientSecret, and callbackURL
        function (accessToken, refreshToken, profile, cb) {
            console.log('hello good sir', profile);
        }));
    passport.authenticate('facebook');
    console.log('this is the passport', passport);
    console.log('this si the request', req.session);
    console.log('vibes', passport.session());
});

app.get('/add_events',function(req, res){
    console.log('req is before this');
    console.log("DATA RECEIVEDDDDD!!!!");
    const connection = mysql.createConnection(credentials);
    console.log('request data', req);
    const fields = `INSERT INTO events SET title = "${req.body.title}", description = "${req.body.description}", subject = "${req.body.subject}", date = "${req.body.date}", time = "${req.body.time}", duration = "${req.body.duration}", location = "${req.body.location}", max = "${req.body.max}", phone = "${req.body.phone}", email = "${req.body.email}", facebookID = "${app.fbID}" `;
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
    host: 'dev.michaelahn.solutions',
    user: 'michael',
    password: 'michaelAhn',
    database: 'stubbies',
    port: 3306
});

//FB PASSPORT
passport.use(new FacebookStrategy(facebookCreds, // First argument accepts an object for clientID, clientSecret, and callbackURL
    function (accessToken, refreshToken, profile, cb) {
        let sql = "SELECT * FROM ?? WHERE ?? = ?";
        let inserts = ['users', 'facebookID', profile.id];
        sql = mysql.format(sql, inserts);
        console.log('sql: ', sql, 'profile id is: ', profile.id);
            facebook.id = profile.id;
            console.log('senor this is faeq', facebook.id);
            console.log("mister professor profile: ", profile);
        pool.query(sql, function(err, results, fields) {
            if (err) throw err;
            console.log("These are the results", results);
            if (results.length === 0) {
                let { id, name: { familyName, givenName }, emails: [{value}] } = profile;
                console.log('this is the profile: ', profile);
                let sql = "INSERT INTO ??(??, ??, ??, ??) VALUES (?, ?, ?, ?)";
                let inserts = ['users', 'facebookID', 'last_name', 'first_name', 'email',
                    id, familyName, givenName, value];
                sql = mysql.format(sql, inserts);
                console.log("This is the prepared statement", sql);
                console.log("the facebook ID for your current user is: ", app.fbID);
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
        res.sendFile(path.resolve('../client', 'dist', 'index.html'));
    }
);

app.get('/home',
    function(req, res) {
        console.log("This is the session data", req.session);
        console.log('facebook request is here id', req.session.id);
        res.sendFile(path.resolve('../client', 'dist', 'index.html'));
        var cookie = req.cookies.fbIdNumber;
        res.cookie('fbIdNumber', req.session.id, {maxAge:900000, httpOnly: true});
        console.log('cookie has been successfully created!');
        // const dom = document.getElementById("facebookID");
        // dom.text(req.session)
        next();
    }
);

app.get('/auth/facebook',
    passport.authenticate('facebook'
        // , { scope: 'id, name, first_name, last_name' }
    )
);

app.get('/auth/facebook/callback',
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
