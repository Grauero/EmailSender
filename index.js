const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send();
});

passport.use(new GoogleStrategy()); 

app.listen(PORT);