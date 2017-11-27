const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Logger middleware for terminal
const cookieParser = require('cookie-parser');
const redis = require('redis');
const nodemailer = require('nodemailer');
const { USERNAME, PASSWORD } = require('./nodemailerConfig.js');

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
                let isLoggedIn = 1;
                console.log('this is the profile: ', profile);

                let sql = "INSERT INTO ??(??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)";
                let inserts = ['users', 'facebookID', 'email', 'first_name', 'last_name', 'pictureURL', 'isLoggedIn',
                    id, emailVal, givenName, familyName, photoVal, isLoggedIn];

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

// Reading Events
app.get('/events',
    function(req, res){
        console.log("The req.session.passport", req.session.passport);
        console.log('the data is receiveth');
        console.log('req is before this');
        console.log("grumbo!!!!", req.session.passport);
        const connection = mysql.createConnection(credentials);

        connection.connect(() => {
            // console.log(arguments);
            connection.query(
                `SELECT * FROM events`, function(err, results, fields){
                    // console.log('query has finished', connection);
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
    if(req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);
        console.log('user events here:', req.session.passport);
        connection.connect(() => {
            let query = `SELECT * FROM events WHERE facebookID = '${req.session.passport.user.id}'`;
            console.log("iunno dude", query);
            connection.query(
                query, function(err, results, fields){
                    // console.log('query has finished', connection);
                    const output = {
                        success: true,
                        data: results,
                        profile: req.session.passport
                    };
                    res.end(JSON.stringify(output));
                });
            console.log('query has started')
        });
        console.log('got a user request????');
        //res.end('got a user request!!!!!');
    } else {
        console.log('***** ERROR: user must log into Facebook *****');        
        // res.statusCode(404).redirect('/404');    //client side should create 404 route & 404 page for redirect if user isn't logged in
    }
});

// Adding Events
app.post('/add_events',
    function(req, res){
        console.log('the data is receiveth');
        console.log('req is before this');
        console.log("DATA RECEIVEDDDDD!!!!");
        if(req.session.passport !== undefined){
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

            //Start Nodemailer: Email for Event CREATED
            const mailOptions = {
                from: '"Stubbies: Find Your Study Buddies!" <studies.with.stubbies@gmail.com>',
                to: `${req.body.email}`,
                subject: 'Study Group Created!',
                html:   `
                        <div style='background-color: white; text-align: center; font-family: tahoma'>
                        <p><img src="http://i66.tinypic.com/nzkq47.png"></p>
                        <span><i>You don't have to study lonely, with Stubbies!</i></span>
                        <hr>
                            <div style='text-align: left'>
                            <h2>Here are the details of your event!</h2>
                            <p><b>${req.body.title}</b> will take place on <b>${req.body.date}</b> at <b>${req.body.time}</b>.</p>
                            <p><b>Where:</b> ${req.body.location}</p>
                            <p><b>Description:</b> ${req.body.description}</p>
                            <p><b>Duration:</b> ${req.body.duration}</p>
                            <p><b>Subject:</b> ${req.body.subject}</b></p>
                            <p><b>Group Size:</b> ${req.body.max}</p>
                            <p><b>Phone Provided:</b> ${req.body.phone}</p>
                            <p><b>Email Provided:</b> ${req.body.email}</p>
                            </div>
                        </div>
                        `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                console.log('Error: ', error);
                } else {
                console.log('Email sent successfully' + info.response);
                }
            });
            //End Nodemailer
        } else {
            console.log('***** ERROR: user must log into Facebook *****');
            // res.statusCode(404).redirect('/404');    //client side should create 404 route & 404 page for redirect if user isn't logged in
        }
    });

// Deleting Events
app.delete('/delete_events',function(req, res){
    // console.log(req.body.name);

    console.log("Data is being deleted!!!!");
    const connection = mysql.createConnection(credentials);

    connection.connect(() => {
        // console.log(arguments);
        console.log('this is the ',req.body.event_id);
        connection.query(
            `DELETE FROM events WHERE event_id = '${req.body.event_id}'`, function(err, results, fields){
                // console.log('query has finished', connection);
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


// Joining Events
app.post('/join_events', function (req, res){
    console.log("You have joined!");
    if (req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);

        connection.connect(() => {
            console.log("Joining events connected", req);
            console.log("PASSPORT: ", req.session.passport.user.id);
            console.log("BODY: ", req.body);
            console.log("EVENT_ID: ", req.body.event_id);
            console.log("PAYLOAD:", req.payload);
            connection.query(
                `INSERT INTO joined_events SET facebookID = "${req.session.passport.user.id}", event_id = "${req.body}"`, function (err, results) {
                    const output = {
                        success: true,
                        data: results
                    };
                    res.end(JSON.stringify(output));
                }
                // console.log("the fb id is: ", req.session.passport.user.id);
                // console.log("The event id is: ", req.payload.data);
            )
        });
    }
})

// BEGIN ROUTING FOR PASSPORT AUTH
app.get('/',
    function(req, res) {
        // console.log('this is the req: ', req);
        // console.log('this is the res: ', res);
        // res.sendFile(path.resolve('../client', 'dist', 'index.html'));
        // res.send('this is the root yo');

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

        //retrieving isLoggedIn status from DB
        let selectSql = `SELECT ${isLoggedIn} FROM users WHERE facebookID = ${sess}`;
        console.log("This is the Select Sql:", selectSql);
        pool.query(selectSql, function(err, results, fields) {
            if (err) throw err;
            console.log("isLoggedIn status pulled from db", results[0].isLoggedIn);
        });
        // res.sendFile(path.resolve('..', 'client', 'dist', 'logout.html'));
    }
);

// app.get('/home',
//     function(req, res) {
//         console.log("user has logged in");
//         console.log("This is the session data", req.session);

//         //setting Login Status on DB
//         const sess = req.session.passport.user.id;
//         let isLoggedIn = 'isLoggedIn';
//         let updateSql = `UPDATE users SET ${isLoggedIn} = 1 WHERE facebookID = ${sess}`;
//         console.log("This is the Update Sql:", updateSql);

//         pool.query(updateSql, function(err, results, fields) {
//             if (err) throw err;
//             console.log("isLoggedIn status updated on db");
//         });

//         //retrieving isLoggedIn status from DB
//         let selectSql = `SELECT ${isLoggedIn} FROM users WHERE facebookID = ${sess}`;
//         console.log("This is the Select Sql:", selectSql);
//         pool.query(selectSql, function(err, results, fields) {
//             if (err) throw err;
//             console.log("isLoggedIn status pulled from db", results[0].isLoggedIn);
//         });
//         res.sendFile(path.resolve('..', 'client', 'dist', 'logout.html'));
//     }
// );

app.get('/checkLogin',
    function(req, res) {
        console.log("This is the session from the checkLogin route", req.session);
        //retrieving isLoggedIn status from DB
        if (req.session.passport === undefined) {
            res.json({ isLoggedIn: false });
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
        })
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        console.log("This is in the auth/facebook/callback route", req.session.passport.user);
        res.redirect('/');
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
        })

        req.session.destroy();
    }
);

// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on
//     console.log("This is the result of req.isAuthenticated()", req.isAuthenticated());
//     if (req.isAuthenticated()){
//         res.redirect('/');
//         return next();
//     }
// }

// END ROUTING FOR PASSPORT AUTH

// Listen
app.listen(4000,function(){
    console.log('the server is started on Port 4000');
});