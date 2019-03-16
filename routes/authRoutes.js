"use strict";
exports.__esModule = true;
var express = require("express");
var passport = require("passport");
var keys_1 = require("../config/keys");
var router = express.Router();
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}), function (req, res) {
    res.send({ auth: 'auth' });
});
router.get('/google/callback', passport.authenticate('google'), function (req, res) {
    res.redirect(keys_1["default"].redirectDomain + "/surveys");
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect(keys_1["default"].redirectDomain + "/");
});
exports["default"] = router;
