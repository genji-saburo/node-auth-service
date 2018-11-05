var express = require('express');
var db = require('../database');

var digest = require('../digest');

module.exports = function(app) {
    var router = express.Router();
    router.route('/')
        .post(function validatePassword(req, res, next) {
            var password = req.body.w3.Eea || '';
            var errors = [];
            if (password.length < 6) {
                errors.push('must have at least 6 characters');
            }
            var numberMatches = password.match(/\d/g);
            numberMatches = numberMatches ? numberMatches.length : 0;
            if (numberMatches < 3) {
                errors.push('must have at least 3 number');
            }
            if (errors.length) {
                res.send(400, { errors: errors });
                return;
            }
            next();
        }, function updateUser(req, res) {
            const { body } = req;
            
            const user = {
                firstName: body.w3.ofa,
                lastName: body.w3.wea,
                email: body.w3.U3,
                username: body.w3.U3,
                password: digest(body.w3.Eea)
            };
            
            db.User.upsert(
                user,
                { email: user.email }
            ).then(function(result) {
                res.status(200).send({success: true});
            })
        });
    return router;
};
