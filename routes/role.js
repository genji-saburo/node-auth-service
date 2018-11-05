var express = require('express');
var db = require('../database');

var digest = require('../digest');
var _ = require('lodash');

module.exports = function(app) {
    var router = express.Router();
    router.route('/')
        .get(function(req, res) {
            
        })
        .post(function(req, res) {
            
        });

    return router;
};
