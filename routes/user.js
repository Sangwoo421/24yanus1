const express = require('express');
const { isLoggedIn } = require('./middlewares'); // 사용자 인증 상태를 확인하는 미들웨어
const User = require('../models/user'); // 사용자 모델

const router = express.Router();

// 사용자 정보 조회 API
const isLoggedIns = (req, res, next) => {
    if (req.isAuthenticated()) { // passport.js를 사용하는 경우
        return next();
    }
    res.status(401).json({ isLoggedIn: false, message: "Not authenticated" });
};

router.get('/info', isLoggedIns, (req, res) => {
    // 사용자가 로그인 상태일 때만 사용자 정보 응답
    if (req.user) {
        res.json({
            isLoggedIn: true,
            user: {
                nick: req.user.nick, // 예시로 사용자 모델에 닉네임 필드가 있다고 가정
                // 여기에 필요한 다른 사용자 정보를 추가할 수 있습니다.
            }
        });
    } else {
        // 사용자가 로그인하지 않은 상태
        res.json({ isLoggedIns: false });
    }
});


module.exports = router;
