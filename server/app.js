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
        const query = `SELECT events.*, events_subjects.subject AS e_s_subj
        FROM events
        JOIN events_subjects on events.subject = events_subjects.id AND events.isActive = 1
        WHERE facebookID != ${req.session.passport.user.id}`;

        connection.connect(() => {
            connection.query(
                query, function(err, results, fields){
                    const output = {
                        success: true,
                        data: results
                    };
                    res.end(JSON.stringify(output));
                });
            console.log('query has started')
        });
        console.log('got a user request????');
    });

app.get('/user_events',function(req, res){
    if(req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);
        console.log('user events here:', req.session.passport);
        connection.connect(() => {
            const query = `SELECT events.*, events_subjects.subject AS e_s_subj
            FROM events
            JOIN events_subjects on events.subject = events_subjects.id
            WHERE isActive = 1 AND facebookID = '${req.session.passport.user.id}'`;
            console.log("iunno dude", query);
            connection.query(
                query, function(err, results, fields){
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
    } else {
        console.log('***** ERROR: user must log into Facebook *****');        
        // res.statusCode(404).redirect('/404');    //client side should create 404 route & 404 page for redirect if user isn't logged in
    }
});

// Adding Events
app.post('/add_events',
    function(req, res){
        // console.log('the data is receiveth');
        // console.log('req is before this');
        console.log("DATA RECEIVEDDDDD!!!!");
        if(req.session.passport !== undefined){
            const connection = mysql.createConnection(credentials);
            const lat = req.body.coordinates.lat;
            const lng = req.body.coordinates.lng;
            // console.log('LOOK HERE:', req.body.coordinates);
            // Saving for later
            // lat="${req.body.coordinates.lat}", lng="${req.body.coordinates.lng}"
            const fields = `INSERT INTO events SET title = "${req.body.title}", description = "${req.body.description}", subject = "${req.body.subject}", date = "${req.body.date}", time = "${req.body.time}", duration = "${req.body.duration}", location = "${req.body.location}", max = "${req.body.max}", phone = "${req.body.phone}", email = "${req.body.email}", coordinates = '${req.body.coordinates}', facebookID="${req.session.passport.user.id}", isActive = '1'`;
            console.log(fields);
            // console.log('this is a respond body', res);
            connection.connect(() => {
                connection.query(
                    fields
                    , function(err, results, fields){
                        // console.log("INSERT UR EYEDEE:", results.insertId);
                        // if (err) throw err;
                        // else {
                        //     console.log("THE USER JOIN: ", results.insertId);
                        //     connection.query(
                        //         `INSERT INTO joined_events SET facebookID = "${req.session.passport.user.id}", event_id = "${results.insertId}"` , function(err, results){
                        //             const output = {
                        //                 success: true,
                        //                 data: results
                        //             };
                        //             res.end(JSON.stringify(output));
                        //         }
                        //     )

                        // }
                        const output = {
                            success: true,
                            data: results
                        };
                        res.end(JSON.stringify(output));
                    });
                console.log('query has started')
            });
            console.log('got a event request');

            //Start Nodemailer: Email for Event CREATED
            const subjArray = ["Life Sciences", "Visual and Performance Arts", "Liberal Arts", "Engineering and Technology", "Business"];
            const nodeMailSubj = subjArray[`${req.body.subject}`-1];
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
                            <h2>Here are the details of your study group!</h2>
                            <p><b>${req.body.title}</b> will take place on <b>${req.body.date}</b> at <b>${req.body.time}</b>.</p>
                            <p><b>Where:</b> ${req.body.location}</p>
                            <p><b>Description:</b> ${req.body.description}</p>
                            <p><b>Duration:</b> ${req.body.duration}</p>
                            <p><b>Subject:</b> ${nodeMailSubj}</b></p>
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
app.post('/delete_events',function(req, res){
    // console.log(req.body.name);

    console.log("Data is being deleted!!!!");
    const connection = mysql.createConnection(credentials);
    const query = `UPDATE events SET isActive = 0 WHERE event_id = '${req.body.event_id}'`;

    connection.connect(() => {
        console.log('this is the ',req.body.event_id);
        console.log("para aqui: ", query);
        connection.query(
            query, function(err, results, fields){
                const output = {
                    success: true,
                    data: results
                };
                res.end(JSON.stringify(output));
            });
        console.log('query has started')
    });
    console.log('got a user request????');

    console.log('KRYSTAL REQ SESSION PASSPORT', req.session.passport.user._json);
    //Start Nodemailer: Email for Event DELETED
    const userEmail = req.session.passport.user._json.email;
    const userName = req.session.passport.user._json.first_name;
    const mailOptions = {
        from: '"Stubbies: Find Your Study Buddies!" <studies.with.stubbies@gmail.com>',
        to: `${userEmail}`,
        subject: 'Study Group Deleted!',
        html:   `
            <div style='background-color: white; text-align: center; font-family: tahoma'>
            <p><img src="http://i66.tinypic.com/nzkq47.png"></p>
            <span><i>You don't have to study lonely, with Stubbies!</i></span>
            <hr>
            <div style='text-align: left'>
                <h2>Hi ${userName}! You have successfully deleted your study group event.</h2>
                <p><b>${req.body.title}</b> scheduled for <b>${req.body.date}</b> at <b>${req.body.time}</b> was deleted.</p>
                <p><b>If you wish to undo this, recreate your study group <a href="http://dev.michaelahn.solutions/create-event">here</a>.</b></p>
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
});



// Joining Events
app.post('/join_events', function (req, res){
    console.log("You have joined!");
    if (req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);

        connection.connect(() => {
            // console.log("Joining events connected", req);
            console.log("PASSPORT: ", req.session.passport.user.id);
            console.log("BODY: ", req.body);
            console.log("EVENT_ID: ", req.body.event_id);
            console.log("PAYLOAD:", req.payload);
            console.log("NUMBERS:", req.body.max);

            connection.query(
                `SELECT * FROM joined_events WHERE event_id = "${req.body.event_id}"`, function (err, results){
                    console.log("Le results:", results);
                    // console.log("Le response:", res);
                        function insertUserIntoEvent() {
                            if (results.length<req.body.max){
                                connection.query(
                                    `INSERT INTO joined_events SET facebookID = "${req.session.passport.user.id}", event_id = "${req.body.event_id}"`, function (err, results) {
                                        const output = {
                                            success: true,
                                            data: results
                                        };
                                        console.log("User", req.session.passport.user.id, "has joined event", req.body.event_id);
                                        res.end(JSON.stringify(output));
                                    }
                                    // console.log("the fb id is: ", req.session.passport.user.id);
                                    // console.log("The event id is: ", req.payload.data);
                                )
                            }
                        }
                    console.log("Le response body:", res.body);
                    if (err) throw err;
                    if (results.length == 0) {
                        insertUserIntoEvent();
                        //Start Nodemailer: Email for Event JOINED
                        console.log('KRYSTAL: SESSION PASSPORT DATA JSON:', req.session.passport.user._json);
                        const userEmail = req.session.passport.user._json.email;
                        const userName = req.session.passport.user._json.first_name;
                        const mailOptions = {
                            from: '"Stubbies: Find Your Study Buddies!" <studies.with.stubbies@gmail.com>',
                            to: `${userEmail}`,
                            subject: 'Study Group Joined!',
                            html:   `
                            <div style='background-color: white; text-align: center; font-family: tahoma'>
                            <p><img src="http://i66.tinypic.com/nzkq47.png"></p>
                            <span><i>You don't have to study lonely, with Stubbies!</i></span>
                            <hr>
                            <div style='text-align: left'>
                                <h2>Hi, ${userName}! You have joined a study group!</h2>
                                <p><b>${req.body.title}</b> will take place on <b>${req.body.date}</b> at <b>${req.body.time}</b>.</p>
                                <p>If you wish to contact the group creator prior to your study session, shoot them a message at <b>${req.body.email}</b>.</p>
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
                    }
                    const parsedResults = JSON.parse(JSON.stringify(results));
                    const map = Array.prototype.map;
                        console.log("The events log:", parsedResults);
                        console.log("The user who joined:", req.session.passport.user.id);
                    function checkDuplicates() {
                        map.call(parsedResults, function (events){
                            if (events.facebookID == req.session.passport.user.id){
                                console.log("This user has already joined this event");
                                console.log("The events log:", events);
                                console.log("The user who joined:", req.session.passport.user.id);
                                //THIS IS WHERE I CHANGE THE ERROR MODAL
                                res.status(500).send("Duplicate");
                            }
                            else if (results.length>=req.body.max) {
                                res.status(400).send("Max");
                            }
                            else if (results.length !== 0 && events.facebookID !== req.session.passport.user.id) {
                                insertUserIntoEvent();
                                //Start Nodemailer: Email for Event JOINED
                                console.log('KRYSTAL: SESSION PASSPORT DATA JSON:', req.session.passport.user._json);
                                const userEmail = req.session.passport.user._json.email;
                                const userName = req.session.passport.user._json.first_name;
                                const mailOptions = {
                                    from: '"Stubbies: Find Your Study Buddies!" <studies.with.stubbies@gmail.com>',
                                    to: `${userEmail}`,
                                    subject: 'Study Group Joined!',
                                    html:   `
                                <div style='background-color: white; text-align: center; font-family: tahoma'>
                                <p><img src="http://i66.tinypic.com/nzkq47.png"></p>
                                <span><i>You don't have to study lonely, with Stubbies!</i></span>
                                <hr>
                                <div style='text-align: left'>
                                    <h2>Hi, ${userName}! You have joined a study group!</h2>
                                    <p><b>${req.body.title}</b> will take place on <b>${req.body.date}</b> at <b>${req.body.time}</b>.</p>
                                    <p>To view more details about the event you've joined, check out your profile page <a href="dev.michaelahn.solutions/profile">here</a>.</p>
                                    <p>If you wish to contact the group creator prior to your study session, shoot them a message at <b>${req.body.email}</b>.</p>
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
                            }
                        })
                    }
                    checkDuplicates();
                }
            )

        });

    } else {
            console.log('***** ERROR: user must log into Facebook *****');
    }
})

//Display events user joined
app.get('/user_joined_events', function (req,res){
    console.log("Showing user events");
    if (req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);
        console.log("DUH request:", req);
        console.log("DUH response:", res);
        connection.connect(() => {
            connection.query(
                `SELECT joined_events.*, events.*
                FROM joined_events
                JOIN events on joined_events.event_id = events.event_id
                WHERE joined_events.facebookID = ${req.session.passport.user.id} AND isActive = 1`, function (err, results) {
                    const output = {
                        success: true,
                        data: results
                    };
                    console.log('the output from display user join events: ',output);
                    res.end(JSON.stringify(output))
                }
            )
        })
    }
    }

);

// BEGIN ROUTING FOR PASSPORT AUTH
app.get('/',
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

        //retrieving isLoggedIn status from DB
        let selectSql = `SELECT ${isLoggedIn} FROM users WHERE facebookID = ${sess}`;
        console.log("This is the Select Sql:", selectSql);
        pool.query(selectSql, function(err, results, fields) {
            if (err) throw err;
            console.log("isLoggedIn status pulled from db", results[0].isLoggedIn);
        });
    }
);

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
// END ROUTING FOR PASSPORT AUTH

app.get('*', function(req, res) {
    res.sendFile(path.resolve('..', 'client', 'dist', 'index.html'));
});

// Listen
app.listen(4000,function(){
    console.log('the server is started on Port 4000');
});