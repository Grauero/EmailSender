"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var recipientSchema = new mongoose_1.Schema({
    email: String,
    responded: {
        type: Boolean,
        "default": false
    }
});
exports["default"] = recipientSchema;
