const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Logger middleware for terminal
const cookieParser = require('cookie-parser');
const redis = require('redis');

const app = express();

const routes = require('./routes');
const passportRoutes = require('./routes/passport');

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

// Routes
app.use('/', passportRoutes);
app.use('/api', routes);

// Listen
app.listen(4000,function(){
    console.log('the server is started on Port 4000');
});