const express = require('express');
let stripe = require('stripe');

const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = require('../models/Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

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

router.post('/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get('/surveys/thanks', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/surveys/webhooks', (req, res) => {
  console.log(req);

  res.send({});
});

module.exports = router;
