/**
 * 메뉴 상세 라우트 — /menu/:id 로 들어오는 망자에게 한 잔의 사연을 풀어준다.
 */
const express = require('express');
const { getMenuById } = require('../lib/menu');

const router = express.Router();

router.get('/:id', (req, res, next) => {
  const item = getMenuById(req.params.id);
  if (!item) return next(); // 미지(未知)의 id → 전역 404 핸들러로 위임
  res.render('layout', {
    page: 'detail',
    title: `${item.name} — 저승 막걸리`,
    description: item.description,
    ogType: 'article',
    ogImage: item.image,
    item,
  });
});

module.exports = router;
