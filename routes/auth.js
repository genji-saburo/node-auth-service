var express = require('express');
var db = require('../database');

var digest = require('../digest');
var _ = require('lodash');

module.exports = function(app) {
    var router = express.Router();
    router.route('/')
        .post(function login(req, res) {
            db.User.find({ where: ['username=? or email=?', req.body.username, req.body.email] }).then(function(user) {
                
                if (user && user.password == digest(req.body.password)) {
                    var expires = new Date();
                    var refreshToken = digest(Date.now() + '' + user.id);

                    expires.setDate(expires.getDate() + 1);

                    db.RefreshToken.findOrCreate({ 
                        userId: user.id
                    }).then(function(token) {

                        token.updateAttributes({
                            refreshToken: refreshToken,
                            expires: expires
                        }).then(function () {
                            res.send(201, {
                                token: refreshToken
                            });
                        });
                    })
                } else {
                    res.send(400, {
                        error: 'wrong username or password'
                    });
                }
            });
        })
    return router;
};
