const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Logger middleware for terminal
const cookieParser = require('cookie-parser');
const redis = require('redis');

const app = express();

// const routes = require('./routes');
// const passportRoutes = require('./routes/passport');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookCreds = require('./facebookCreds.js');
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

//Redis
// const client = redis.createClient(4000, "http://localhost");

//Express
app.use(express.static(path.resolve("..", "client", "dist")));

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
app.use(session({
    secret: 'ssshhhh',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Reading Events
app.get('/events',
    function(req, res){
        console.log("The req.session.passport", req.session.passport);
        console.log('the data is receiveth');
        console.log('req is before this');
        console.log("grumbo!!!!", req.session.passport);
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

app.get('/user_events',function(req, res){
    const connection = mysql.createConnection(credentials);
    console.log('user events here:', req.session.passport);
    connection.connect(() => {
        console.log(arguments);
        connection.query(
            `SELECT * FROM events WHERE facebookID = '${req.session.passport.id}'`, function(err, results, fields){
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

// Adding Events
app.post('/add_events',
    function(req, res){
        console.log('the data is receiveth');
        console.log('req is before this');
        console.log("DATA RECEIVEDDDDD!!!!");
        const connection = mysql.createConnection(credentials);
        const lat = req.body.coordinates.lat;
        const lng = req.body.coordinates.lng;
        console.log('LOOK HERE:', req.body.coordinates);
        // Saving for later
        // lat="${req.body.coordinates.lat}", lng="${req.body.coordinates.lng}"
        const fields = `INSERT INTO events SET title = "${req.body.title}", description = "${req.body.description}", subject = "${req.body.subject}", date = "${req.body.date}", time = "${req.body.time}", duration = "${req.body.duration}", location = "${req.body.location}", max = "${req.body.max}", phone = "${req.body.phone}", email = "${req.body.email}", coordinates = '${req.body.coordinates}', facebookID="${req.session.passport.user.id}"`;
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

// Deleting Events
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

app.get('/', isLoggedIn,
    function(req, res) {
        // console.log('this is the req: ', req);
        // console.log('this is the res: ', res);
        // res.sendFile(path.resolve('../client', 'dist', 'index.html'));
        res.send('this is the root yo');
    }
);

app.get('/home',
    function(req, res) {
        console.log("user has logged in");
        console.log("This is the session data", req.session);

        //setting Login Status on DB
        const sess = req.session.passport.user.id;
        let isLoggedIn = 'isLoggedIn';
        let updateSql = `UPDATE users SET ${isLoggedIn} = 1 WHERE facebookID = ${sess}`;
        console.log("This is the Update Sql:", updateSql);

        pool.query(updateSql, function(err, results, fields) {
            if (err) throw err;
            console.log("isLoggedIn status updated on db");
        });

        // var resObj = {
        //     success: true,
        //     data: data
        // }

        //retrieving isLoggedIn status from DB
        let selectSql = `SELECT isLoggedIn FROM users WHERE facebookID = ${sess}`;
        console.log("This is the Select Sql:", selectSql);
        pool.query(selectSql, function(err, results, fields) {
            if (err) throw err;
            console.log("isLoggedIn status pulled from db", results[0].isLoggedIn);
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

app.get('/checkLogin',

    function(req, res) {
        console.log("This is the session from the checkLogin route", req.session);
        //retrieving isLoggedIn status from DB
        if (req.session.passport === undefined) {
            res.sendFile(path.resolve("..", "client", "dist", "404.html"))
        } else {
            const sess = req.session.passport.user.id;
            let selectSql = `SELECT isLoggedIn FROM users WHERE facebookID = ${sess}`;
            console.log("This is the Select Sql:", selectSql);
            pool.query(selectSql, function(err, results, fields) {
                if (err) throw err;
                console.log("isLoggedIn status pulled from db", results[0].isLoggedIn);
                res.json({ isLoggedIn: true });
            });
        }
    }
)

app.get('/auth/facebook',
    passport.authenticate('facebook', {
            authType: 'rerequest',
            scope: ['email', 'public_profile']
        }
    )
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        console.log("This is in the auth/facebook/callback route", req.session.passport.user);


        res.redirect('/home');
    }
);

app.get('/logout',
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

// Listen
app.listen(4000,function(){
    console.log('the server is started on Port 4000');
});