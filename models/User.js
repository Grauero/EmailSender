"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        "default": 0
    }
});
var User = mongoose.model('users', userSchema);
exports["default"] = User;
