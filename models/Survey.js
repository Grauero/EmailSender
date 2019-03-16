"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Recipient_1 = require("./Recipient");
var surveySchema = new mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [Recipient_1["default"]],
    yes: {
        type: Number,
        "default": 0
    },
    no: {
        type: Number,
        "default": 0
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date
});
var Survey = mongoose.model('surveys', surveySchema);
exports["default"] = Survey;
