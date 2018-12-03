const express = require('express');

const router = express.Router();

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.post('/stripe', (req, res) => {
  res.send({ hello: 1 });
});

module.exports = router;
