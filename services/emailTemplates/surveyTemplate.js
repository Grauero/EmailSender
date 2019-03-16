"use strict";
exports.__esModule = true;
var keys_1 = require("../../config/keys");
exports["default"] = (function (survey) { return "\n    <html>\n      <body>\n        <div style=\"text-align: center;\">\n          <h3>Give Us Feedback</h3>\n          <p>Please answer the question:</p>\n          <p>" + survey.body + "</p>\n          <div>\n            <a href=\"" + keys_1["default"].redirectDomain + "/api/surveys/" + survey.id + "/yes\">\n              Yes\n            </a>\n          </div>\n          <div>\n            <a href=\"" + keys_1["default"].redirectDomain + "/api/surveys/" + survey.id + "/no\">\n              No\n            </a>\n          </div>\n        </div>\n      </body>\n    </html>\n  "; });
