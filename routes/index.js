/**
 * 메인 라우트 — 망자에게 전체 메뉴판을 펼쳐 보인다.
 */
const express = require('express');
const { getAllMenus, getMenusByCategory, ALLOWED_CATEGORIES } = require('../lib/menu');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('layout', {
    page: 'index',
    title: '저승 막걸리 — 망자(亡者) 전용 심야 주막',
    categories: ALLOWED_CATEGORIES,
    grouped: getMenusByCategory(),
    items: getAllMenus(),
  });
});

module.exports = router;
