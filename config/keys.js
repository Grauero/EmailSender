"use strict";
exports.__esModule = true;
var dev_1 = require("./dev");
var prod_1 = require("./prod");
exports["default"] = (process.env.NODE_ENV === 'production' ? prod_1["default"] : dev_1["default"]);
