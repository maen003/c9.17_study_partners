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
        pool.query(sql, function(err, results, fields) {
            if (err) throw err;
            if (results.length === 0) {
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

// Reading Events
app.get('/events',
    function(req, res){
        const connection = mysql.createConnection(credentials);
        if (req.session.passport !== undefined) {


            const queryLoggedIn = `SELECT events.*, events_subjects.subject AS e_s_subj
        FROM events
        JOIN events_subjects on events.subject = events_subjects.id AND events.isActive = 1 WHERE events.facebookID != "${req.session.passport.user.id}"
        `;
            connection.connect(() => {
                connection.query(
                    queryLoggedIn, function (err, results, fields) {
                        const output = {
                            success: true,
                            data: results
                        };
                        res.end(JSON.stringify(output));
                    });
            });
        }
        else {
            const queryNotLoggedIn = `SELECT events.*, events_subjects.subject AS e_s_subj
                FROM events
                JOIN events_subjects on events.subject = events_subjects.id AND events.isActive = 1 WHERE events.facebookID 
                `;

            connection.connect(() => {
                connection.query(
                    queryNotLoggedIn, function (err, results, fields) {
                        const output = {
                            success: true,
                            data: results
                        };
                        res.end(JSON.stringify(output));
                    });
            });
        }

    });

app.get('/user_events',function(req, res){
    if(req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);
        connection.connect(() => {
            const query = `SELECT events.*, events_subjects.subject AS e_s_subj
            FROM events
            JOIN events_subjects on events.subject = events_subjects.id
            WHERE isActive = 1 AND facebookID = '${req.session.passport.user.id}'`;
            connection.query(
                query, function(err, results, fields){
                    const output = {
                        success: true,
                        data: results,
                        profile: req.session.passport
                    };
                    res.end(JSON.stringify(output));
                });
        });
    } else {
        // res.statusCode(404).redirect('/404');    //client side should create 404 route & 404 page for redirect if user isn't logged in
    }
});

// Adding Events
app.post('/add_events',
    function(req, res){
        // console.log('the data is receiveth');
        // console.log('req is before this');
        if(req.session.passport !== undefined){
            const connection = mysql.createConnection(credentials);
            const lat = req.body.coordinates.lat;
            const lng = req.body.coordinates.lng;
            // console.log('LOOK HERE:', req.body.coordinates);
            // Saving for later
            // lat="${req.body.coordinates.lat}", lng="${req.body.coordinates.lng}"
            const fields = `INSERT INTO events SET title = "${req.body.title}", description = "${req.body.description}", subject = "${req.body.subject}", date = "${req.body.date}", time = "${req.body.time}", duration = "${req.body.duration}", location = "${req.body.location}", max = "${req.body.max}", phone = "${req.body.phone}", email = "${req.body.email}", coordinates = '${req.body.coordinates}', facebookID="${req.session.passport.user.id}", isActive = '1'`;
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
            });

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
                } else {
                }
            });
            //End Nodemailer
        } else {
            // res.statusCode(404).redirect('/404');    //client side should create 404 route & 404 page for redirect if user isn't logged in
        }
    });

// Deleting Events
app.post('/delete_events',function(req, res){
    // console.log(req.body.name);

    const connection = mysql.createConnection(credentials);
    const query = `UPDATE events SET isActive = 0 WHERE event_id = '${req.body.event_id}'`;

    connection.connect(() => {
        connection.query(
            query, function(err, results, fields){
                const output = {
                    success: true,
                    data: results
                };
                res.end(JSON.stringify(output));
            });
    });

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
        } else {
        }
    });
    //End Nodemailer
});



// Joining Events
app.post('/join_events', function (req, res){
    if (req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);

        connection.connect(() => {
            connection.query(
                `SELECT * FROM joined_events WHERE event_id = "${req.body.event_id}"`, function (err, results){
                    // console.log("Le response:", res);
                    function insertUserIntoEvent() {
                                connection.query(
                                    `INSERT INTO joined_events SET facebookID = "${req.session.passport.user.id}", event_id = "${req.body.event_id}"`, function (err, results) {
                                        const output = {
                                            success: true,
                                            data: results
                                        };
                                        res.end(JSON.stringify(output));
                                    }
                                    // console.log("the fb id is: ", req.session.passport.user.id);
                                    // console.log("The event id is: ", req.payload.data);
                                )
                        }
                    if (err) throw err;
                    if (results.length == 0) {
                        insertUserIntoEvent();
                        //Start Nodemailer: Email for Event JOINED
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
                            } else {
                            }
                        });
                        //End Nodemailer
                    }
                    else if (results.length !==0 && results.length < req.body.max-1) {
                        connection.query(
                            `SELECT * FROM joined_events WHERE event_id = "${req.body.event_id}" AND facebookId = "${req.session.passport.user.id}"`, function (err, results){
                                if (results.length == 0) {
                                    insertUserIntoEvent();
                                }
                                else {
                                    res.end('duplicate');
                                }
                            }
                            )
                    }
                    else {
                        res.end("max")
                    }
                }
            )

        });

    } else {
    }
})

//Display events user joined
app.get('/user_joined_events', function (req,res){
    if (req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);
        connection.connect(() => {
            connection.query(
                `SELECT joined_events.*, events.*, events_subjects.id, events_subjects.subject AS e_s_subj
                FROM events
                INNER JOIN joined_events on joined_events.event_id = events.event_id
                INNER JOIN events_subjects on events_subjects.id = events.subject
                WHERE joined_events.facebookID = ${req.session.passport.user.id} AND isActive = 1`, function (err, results) {
                    const output = {
                        success: true,
                        data: results
                    };
                    res.end(JSON.stringify(output))
                }
            )
        })
    }
    }

);

//Leaving Events from Profile Page
app.post('/leave_event', function (req, res){
    if (req.session.passport !== undefined){
        const connection = mysql.createConnection(credentials);
        connection.connect(() => {
            connection.query(
                `SELECT * FROM joined_events WHERE event_id = "${req.body.event_id}"`, function (err, results){
                    connection.query(
                        `DELETE FROM joined_events WHERE facebookID = "${req.session.passport.user.id}" AND event_id = "${req.body.event_id}"`, function (err, results) {
                            const output = {
                                success: true,
                                data: results
                            };
                            res.end(JSON.stringify(output));
                        }
                    )
                    if (err) throw err;
                    //Start Nodemailer: Email for LEAVING Event
                    const userEmail = req.session.passport.user._json.email;
                    const userName = req.session.passport.user._json.first_name;
                    const mailOptions = {
                        from: '"Stubbies: Find Your Study Buddies!" <studies.with.stubbies@gmail.com>',
                        to: `${userEmail}`,
                        subject: 'You Left A Study Group!',
                        html:   `
                        <div style='background-color: white; text-align: center; font-family: tahoma'>
                        <p><img src="http://i66.tinypic.com/nzkq47.png"></p>
                        <span><i>You don't have to study lonely, with Stubbies!</i></span>
                        <hr>
                        <div style='text-align: left'>
                            <h2>You have left ${req.body.title}!</h2>
                            <p>Your study buddies are sad to see you go :( Hope to see you in another group!</p>
                            <p>If this was a mistake, rejoin ${req.body.title} before it fills up! Join again by clicking 'Join' on the event <a href="http://dev.michaelahn.solutions/join-event">here</a>.</p>
                            </div>
                        </div>
                `
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                        } else {
                        }
                    });
                    //End Nodemailer
                }
            )
        });
    } else {
    }
})

// BEGIN ROUTING FOR PASSPORT AUTH
app.get('/',
    function(req, res) {
        //setting Login Status on DB
        const sess = req.session.passport.user.id;
        let isLoggedIn = 'isLoggedIn';
        let updateSql = `UPDATE users SET ${isLoggedIn} = 1 WHERE facebookID = ${sess}`;
        pool.query(updateSql, function(err, results, fields) {
            if (err) throw err;
        });

        //retrieving isLoggedIn status from DB
        let selectSql = `SELECT ${isLoggedIn} FROM users WHERE facebookID = ${sess}`;
        pool.query(selectSql, function(err, results, fields) {
            if (err) throw err;
        });
    }
);

app.get('/checkLogin',
    function(req, res) {
        //retrieving isLoggedIn status from DB
        if (req.session.passport === undefined) {
            res.json({ isLoggedIn: false });
        } else {
            const sess = req.session.passport.user.id;
            let selectSql = `SELECT isLoggedIn FROM users WHERE facebookID = ${sess}`;
            pool.query(selectSql, function(err, results, fields) {
                if (err) throw err;
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
        res.redirect('/');
    }
);

app.get('/logout',
    function(req, res){
        res.redirect('/');

        //setting Login Status on DB
        const sess = req.session.passport.user.id;
        let isLoggedIn = 'isLoggedIn';
        let sql = `UPDATE users SET ${isLoggedIn} = 0 WHERE facebookID = ${sess}`;

        pool.query(sql, function(err, results, fields) {
            if (err) throw err;
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
    console.log("Server has started")
});