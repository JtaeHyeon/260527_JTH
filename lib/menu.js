/**
 * 메뉴 데이터 접근 모듈 — menu.json을 단일 진실 공급원으로 캐시 후 조회 인터페이스 제공.
 */
const fs = require('node:fs');
const path = require('node:path');

const MENU_PATH = path.join(__dirname, '..', 'data', 'menu.json');
const ALLOWED_CATEGORIES = ['안주', '주류', '후식', '비밀메뉴'];

// 서버 부팅 시 1회 동기 로드. 라우트 핸들러는 메모리만 조회.
const cache = loadMenu();

/** menu.json을 읽어 스키마를 검증한 뒤 메모리에 캐싱한다. */
function loadMenu() {
  const raw = fs.readFileSync(MENU_PATH, 'utf-8');
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed.items)) {
    throw new Error('menu.json: "items" 배열이 없습니다.');
  }

  const ids = new Set();
  for (const item of parsed.items) {
    if (!item.id || !item.name || !item.category || !item.price) {
      throw new Error(`menu.json: 필수 필드 누락 — ${JSON.stringify(item)}`);
    }
    if (!ALLOWED_CATEGORIES.includes(item.category)) {
      throw new Error(`menu.json: 허용되지 않은 카테고리 "${item.category}" (${item.name})`);
    }
    if (ids.has(item.id)) {
      throw new Error(`menu.json: id 중복 — ${item.id}`);
    }
    ids.add(item.id);
  }

  return parsed.items;
}

/** 전체 메뉴 목록을 반환한다 (얕은 복사로 외부 변형 차단). */
function getAllMenus() {
  return cache.slice();
}

/** id에 해당하는 메뉴 1건. 없으면 null. */
function getMenuById(id) {
  return cache.find((item) => item.id === id) || null;
}

/** 카테고리별로 그룹화한 메뉴 맵 — 메인 페이지의 섹션 구성에 활용. */
function getMenusByCategory() {
  const grouped = Object.fromEntries(ALLOWED_CATEGORIES.map((c) => [c, []]));
  for (const item of cache) {
    grouped[item.category].push(item);
  }
  return grouped;
}

module.exports = {
  ALLOWED_CATEGORIES,
  getAllMenus,
  getMenuById,
  getMenusByCategory,
};
