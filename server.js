const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const userRouter = require('./routes/user');
const noticesRouter = require('./routes/notices');
const faqsRouter = require('./routes/faqs');
const authRouter = require('./routes/auth');
const passportConfig = require('./passport');
const { sequelize } = require('./models');

dotenv.config(); // 중복 제거

const app = express();

// CORS 미들웨어를 가능한 다른 미들웨어 설정 전에 적용
app.use(cors());

// JSON 요청 본문을 처리하기 위한 미들웨어 추가
app.use(express.json());

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

app.use(express.static(path.join(__dirname, 'safe_guard/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'safe_guard/build/index.html'));
});

app.use('/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/notices', noticesRouter);
app.use('/api/faqs', faqsRouter); // 라우트 경로 올바르게 설정

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(8080, function () {
  console.log('listening on 8080');
});

// 모든 경로에 대한 리액트 앱의 index.html을 반환하는 라우트는
// API 라우트들 다음에 위치시킵니다.
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'safe_guard/build/index.html'));
});
