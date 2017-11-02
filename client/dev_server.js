const { resolve } = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const npm_config = require('./package.json');
const PORT = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    hot: false,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    proxy: npm_config.proxy,
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        children: false,
        modules: false,
        chunks: false,
        chunkModules: false
    }
}).listen(PORT, 'localhost', function(err){
    if(err){
        console.log(err);
    }

    console.log('\x1b[36m%s\x1b[33m%s\x1b[0m', 'Dev server running at ', 'localhost:' + PORT);
    console.log('\x1b[32m%s\x1b[0m', '\nWebpack compiling...');
});


const express = require('express');
const credentials = require('./mysql_credentials');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const webserver = express();
webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use( bodyParser.json() );

webserver.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

webserver.post('/events',function(req, res){
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

webserver.post('/add_events',function(req, res){
    console.log('the data is receiveth');
    console.log('req is before this');
    console.log("DATA RECEIVEDDDDD!!!!");
    const connection = mysql.createConnection(credentials);

    connection.connect(() => {
        console.log('omfg these is request time', req, 'this is the response', res);
        connection.query(
            `INSERT INTO events SET title = '${req.body.title}', description = '${req.body.description}', subject = '${req.body.subject}', date = '${req.body.date}', time = '${req.body.time}', duration = '${req.body.duration}', location = '${req.body.location}', max = '${req.body.max}', phone = '${req.body.phone}', email = '${req.body.email}'`, function(err, results, fields){
                console.log('query has finished', connection);
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

webserver.post('/delete_events',function(req, res){
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

webserver.listen(4000,function(){
    console.log('the server is started');
});
