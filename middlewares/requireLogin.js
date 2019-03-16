"use strict";
exports.__esModule = true;
function requireLogin(req, res, next) {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in' });
    }
    next();
}
exports["default"] = requireLogin;
