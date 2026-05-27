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
    description:
      '망자만 입장하는 한국 전통 심야 주막. 구미호·도깨비·저승사자가 차린 가상의 음식과 술 한 상, 영혼·수명·기억으로 값을 치른다.',
    ogType: 'website',
    ogImage: '/images/dokkaebi-makgeolli.png',
    categories: ALLOWED_CATEGORIES,
    grouped: getMenusByCategory(),
    items: getAllMenus(),
  });
});

module.exports = router;
