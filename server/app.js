const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan'); // Logger middleware for terminal

const app = express();

const routes = require('./routes');
const passportRoutes = require('./routes/passport');


//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
