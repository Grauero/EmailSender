"use strict";
exports.__esModule = true;
function requireCredits(req, res, next) {
    if (req.user && req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits' });
    }
    next();
}
exports["default"] = requireCredits;
