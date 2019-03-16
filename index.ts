import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';

import authRoutes from './routes/authRoutes';
import apiRoutes from './routes/apiRoutes';
import surveyRoutes from './routes/surveyRoutes';
import keys from './config/keys';

const cookieSession = require('cookie-session');
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
