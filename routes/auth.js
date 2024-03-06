const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const router = express.Router();


// 로그아웃 처리
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  // 로그아웃 성공 응답
  res.status(200).json({ message: 'Logout successful' });
});

// 카카오 로그인 요청
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백 처리
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  // 로그인 성공 후 사용자 닉네임을 URL 쿼리 파라미터에 포함하여 클라이언트로 리디렉션
  const userNick = req.user ? encodeURIComponent(req.user.nick) : '';
  res.redirect(`/?loggedIn=true&nickname=${userNick}`);
});


module.exports = router;

