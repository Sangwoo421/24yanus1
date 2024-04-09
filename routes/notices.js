//notices.js
const express = require('express');
const db = require('../models'); // 공지사항 모델을 불러옴
const Notice = db.Notice;

const router = express.Router();

// 공지사항 목록 조회
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.findAll({
      attributes: ['id', 'title', 'content', 'createdAt'] // 'createdAt' 포함
    });
    res.json(notices);
  } catch (error) {
    console.error(error);
    res.status(500).send('공지사항을 불러오는 데 실패했습니다.');
  }
});


// 공지사항 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id); // id로 공지사항 조회
    if (notice) {
      res.json(notice);
    } else {
      res.status(404).send('해당 공지사항을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('공지사항을 불러오는 데 실패했습니다.');
  }
});

// 공지사항 생성
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = await Notice.create({ title, content });
    res.status(201).json(notice);
  } catch (error) {
    console.error(error);
    res.status(500).send('공지사항을 추가하는 데 실패했습니다.');
  }
});

// 공지사항 수정
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const affectedCount = await Notice.update({ title, content }, {
      where: { id: req.params.id }
    });

    if (affectedCount > 0) {
      // 성공적으로 업데이트된 경우
      res.json({ message: "공지사항이 성공적으로 업데이트되었습니다." });
    } else {
      // 업데이트할 공지사항이 없는 경우
      res.status(404).send("해당 공지사항을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('공지사항을 수정하는 데 실패했습니다.');
  }
});


// 공지사항 삭제
router.delete('/:id', async (req, res) => {
  try {
    const deletedRows = await Notice.destroy({
      where: { id: req.params.id }
    });

    if(deletedRows > 0) {
      res.send('공지사항이 성공적으로 삭제되었습니다.');
    } else {
      res.status(404).send('해당 공지사항을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('공지사항을 삭제하는 데 실패했습니다.');
  }
});


module.exports = router;
