var env = require('dotenv').config();
var express = require('express');
var cors = require('cors');
var port = process.env.PORT || 8081;
var app = express();
var logger = require('morgan');
var oauthServer = require('node-oauth2-server');
var database = require('./database');

app.use(cors());
app.use(require('body-parser')());
app.use(logger('dev'));

app.oauth = oauthServer({
    model: require('./oauth2'),
    grants: ['password', 'client_credentials', 'refresh_token'],
    debug: true,
    accessTokenLifetime: process.env.NODE_ENV ? null : 1
});

app.use(app.oauth.errorHandler());

app.use('/', require('./routes/index')(app));
app.use('/api/oauth', require('./routes/oauth')(app));
app.use('/api/auth', require('./routes/auth')(app));

app.listen(port, function() {
    console.log('Server started... http://localhost:%d', port);
});
