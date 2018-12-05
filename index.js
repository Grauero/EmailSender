const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const auth = require('./routes/authRoutes');
const api = require('./routes/apiRoutes');
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
app.use('/api', api);

app.listen(PORT);
