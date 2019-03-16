import express from 'express';
import Path from 'path-parser';
import { URL } from 'url';
import _ from 'lodash';

import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import Survey, { ISurvey } from '../models/Survey';
import Mailer from '../services/Mailer';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';

const router = express.Router();

router
  .route('/')
  .get(requireLogin, async (req, res) => {
    const userSurveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(userSurveys);
  })
  .post(requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients }: ISurvey = req.body;
    const recipientCSV = recipients as string;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipientCSV
        .split(',')
        .map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    }) as any;

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

router.delete('/:surveyId', requireLogin, async (req, res) => {
  await Survey.findByIdAndDelete({ _id: req.params.surveyId });
  const updatedSurveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false
  });

  res.send(updatedSurveys);
});

router.get('/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/webhooks', (req, res) => {
  const pathPattern = new Path('/api/surveys/:surveyId/:choice');
  _.chain(req.body)
    .map(({ email, url }: { email: string; url: string }) => {
      const match = pathPattern.test(new URL(url).pathname);
      const expectedMatch = match as { surveyId: string; choice: string };

      if (expectedMatch) {
        return {
          email,
          surveyId: expectedMatch.surveyId,
          choice: expectedMatch.choice
        };
      }
    })
    .compact()
    .uniqBy(['email', 'surveyId'])
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
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    })
    .value();

  res.send({});
});

export default router;
