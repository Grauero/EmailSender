import express from 'express';
import Stripe from 'stripe';

import keys from '../config/keys';
import requireLogin from '../middlewares/requireLogin';

const router = express.Router();
const stripe = new Stripe(keys.stripeSecretKey);

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

export default router;
