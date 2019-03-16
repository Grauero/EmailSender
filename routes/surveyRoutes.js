"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var express = require("express");
var path_parser_1 = require("path-parser");
var url_1 = require("url");
var _ = require("lodash");
var requireLogin_1 = require("../middlewares/requireLogin");
var requireCredits_1 = require("../middlewares/requireCredits");
var Survey_1 = require("../models/Survey");
var Mailer_1 = require("../services/Mailer");
var surveyTemplate_1 = require("../services/emailTemplates/surveyTemplate");
var router = express.Router();
router
    .route('/')
    .get(requireLogin_1["default"], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userSurveys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Survey_1["default"].find({ _user: req.user.id }).select({
                    recipients: false
                })];
            case 1:
                userSurveys = _a.sent();
                res.send(userSurveys);
                return [2 /*return*/];
        }
    });
}); })
    .post(requireLogin_1["default"], requireCredits_1["default"], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, title, subject, body, recipients, recipientCSV, survey, mailer, user, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, subject = _a.subject, body = _a.body, recipients = _a.recipients;
                recipientCSV = recipients;
                survey = new Survey_1["default"]({
                    title: title,
                    subject: subject,
                    body: body,
                    recipients: recipientCSV
                        .split(',')
                        .map(function (email) { return ({ email: email.trim() }); }),
                    _user: req.user.id,
                    dateSent: Date.now()
                });
                mailer = new Mailer_1["default"](survey, surveyTemplate_1["default"](survey));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, mailer.send()];
            case 2:
                _b.sent();
                return [4 /*yield*/, survey.save()];
            case 3:
                _b.sent();
                req.user.credits -= 1;
                return [4 /*yield*/, req.user.save()];
            case 4:
                user = _b.sent();
                res.send(user);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                res.status(422).send(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router["delete"]('/:surveyId', requireLogin_1["default"], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var updatedSurveys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Survey_1["default"].findByIdAndDelete({ _id: req.params.surveyId })];
            case 1:
                _a.sent();
                return [4 /*yield*/, Survey_1["default"].find({ _user: req.user.id }).select({
                        recipients: false
                    })];
            case 2:
                updatedSurveys = _a.sent();
                res.send(updatedSurveys);
                return [2 /*return*/];
        }
    });
}); });
router.get('/:surveyId/:choice', function (req, res) {
    res.send('Thanks for voting!');
});
router.post('/webhooks', function (req, res) {
    var pathPattern = new path_parser_1["default"]('/api/surveys/:surveyId/:choice');
    _.chain(req.body)
        .map(function (_a) {
        var email = _a.email, url = _a.url;
        var match = pathPattern.test(new url_1.URL(url).pathname);
        var expectedMatch = match;
        if (expectedMatch) {
            return {
                email: email,
                surveyId: expectedMatch.surveyId,
                choice: expectedMatch.choice
            };
        }
    })
        .compact()
        .uniqBy(['email', 'surveyId'])
        .each(function (_a) {
        var surveyId = _a.surveyId, email = _a.email, choice = _a.choice;
        var _b;
        Survey_1["default"].updateOne({
            _id: surveyId,
            recipients: {
                $elemMatch: {
                    email: email,
                    responded: false
                }
            }
        }, {
            $inc: (_b = {}, _b[choice] = 1, _b),
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
        }).exec();
    })
        .value();
    res.send({});
});
exports["default"] = router;
