const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const auth = require('./routes/authRoutes');
const api = require('./routes/apiRoutes');
const survey = require('./routes/surveyRoutes');
const keys = require('./config/keys');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/api/surveys', survey);
app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  // assets for production
  app.use(express.static('client/build'));

  // serve up index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT);
