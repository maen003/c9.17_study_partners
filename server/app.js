const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.static(path.resolve("..", "client", "dist")));



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

app.listen(4000,function(){
    console.log('the server is started on Port 4000');
});
