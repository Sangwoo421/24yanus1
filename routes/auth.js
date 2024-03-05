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
  // 사용자 닉네임을 세션에 저장
  if (req.user && req.user.nick) {
    req.session.nick = req.user.nick; // 예시로 사용자 모델에 닉네임 필드가 있다고 가정
  }

  res.redirect('/?loggedIn=true');
});

module.exports = router;

