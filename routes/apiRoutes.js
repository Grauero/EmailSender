const express = require('express');
let stripe = require('stripe');

const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const router = express.Router();
stripe = stripe(keys.stripeSecretKey);

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.post('/stripe', requireLogin, async (req, res) => {
  await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id
  });

  req.user.credits += 5;
  const updatedUser = await req.user.save();

  res.send(updatedUser);
});

module.exports = router;
