const express = require('express');
const Path = require('path-parser');
const { URL } = require('url');
const _ = require('lodash');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = require('../models/Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = express.Router();

router.post('/', requireLogin, requireCredits, async (req, res) => {
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

router.get('/thanks', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/webhooks', (req, res) => {
  const pathPattern = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = pathPattern.test(new URL(url).pathname);

      if (match) {
        return { email, ...match };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email: email,
              responded: false
            }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true }
        }
      ).exec();
    })
    .value();

  res.send({});
});

module.exports = router;