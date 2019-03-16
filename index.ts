import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import passport from 'passport';

import authRoutes from './routes/authRoutes';
import apiRoutes from './routes/apiRoutes';
import surveyRoutes from './routes/surveyRoutes';
import keys from './config/keys';
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// common middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);

// auth middlewares
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api', apiRoutes);

if (process.env.NODE_ENV === 'production') {
  // assets for production
  app.use(express.static('client/build'));

  // serve up index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
