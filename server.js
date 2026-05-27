/**
 * 「저승 막걸리」Express 진입점 — 망자의 발길을 메뉴판으로 안내한다.
 */
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// 배포 환경(Vercel 등) 프록시 뒤에서도 req.protocol을 정확히 잡도록
app.set('trust proxy', true);

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 자원: /public 하위만 외부 노출
app.use(express.static(path.join(__dirname, 'public')));

/**
 * OG/canonical용 절대 URL과 현재 경로를 모든 뷰에 노출.
 * SITE_URL 환경변수가 있으면 우선, 없으면 요청 호스트로 폴백.
 */
app.use((req, res, next) => {
  const envUrl = (process.env.SITE_URL || '').trim().replace(/\/+$/, '');
  res.locals.siteUrl = envUrl || `${req.protocol}://${req.get('host')}`;
  res.locals.currentPath = req.originalUrl;
  next();
});

// 라우트 등록 — 1파일 = 1 URL prefix (AGENTS.md §5.4)
app.use('/', require('./routes/index'));
app.use('/menu', require('./routes/menu'));

// 404 — 길 잃은 망자
app.use((req, res) => {
  res.status(404).send('이곳은 아직 저승의 경계 밖입니다. (404)');
});

// 500 — 저승사자도 당황한 오류
app.use((err, req, res, _next) => {
  console.error('[저승 오류]', err);
  res.status(500).send('저승의 회로가 잠시 엉켰습니다. (500)');
});

app.listen(PORT, () => {
  console.log(`「저승 막걸리」가 http://localhost:${PORT} 에서 영업을 시작합니다.`);
});
