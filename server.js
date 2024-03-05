const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const userRouter = require('./routes/user');

dotenv.config();
require('dotenv').config();

const passportConfig = require('./passport');
const { sequelize } = require('./models');
const authRouter = require('./routes/auth');

const app = express();

passportConfig();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(8080, function () {
  console.log('listening on 8080')
});

app.use(express.static(path.join(__dirname, 'safe_guard/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'safe_guard/build/index.html'));
});

app.use('/auth', authRouter);

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/api/user', userRouter); 

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'safe_guard/build/index.html'));
});
