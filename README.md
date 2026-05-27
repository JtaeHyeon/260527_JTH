# 저승 막걸리 (底承 막걸리)

> 망자(亡者)만 입장 가능한 한국 전통 심야 주막의 메뉴판 웹사이트.
> 한국 민속 귀신·요괴(구미호, 도깨비, 처녀귀신, 저승사자…)를 모티프로 한 가상의 음식·주류 메뉴를 다크 유머 톤으로 풀어낸다.

---

## 컨셉

- 톤: **다크 유머 70 / 호러 30** — 무서움보다 위트
- 가격 단위: 영혼·수명·미련·기억
- 비주얼: 다크 베이스 + 등불(주황)·핏빛(붉음)·도깨비불(청록) 3색 강조

---

## 기능

- 메인 페이지: 카테고리(주류·안주·후식·비밀메뉴)별 메뉴 그리드
- 메뉴 상세 페이지: `/menu/:id` 동적 라우트, 잘못된 id는 404
- 글래스모피즘 카드, 안개 그라데이션 hero
- 애니메이션 4종 — 로고 등불 깜빡임 / 비밀메뉴 뱃지 부유 / 카드 진입 시 안개에서 떠오르기(`IntersectionObserver`) / hover 등불 글로우
- `prefers-reduced-motion` 대응, NoJS 사용자 대비 안전망
- 반응형 그리드: 모바일 1열 / 태블릿 2열 / 데스크탑 3열

---

## 기술 스택

| 영역      | 도구                                           |
| --------- | ---------------------------------------------- |
| Runtime   | Node.js v20 LTS 이상                           |
| 패키지    | npm v10 이상                                   |
| 서버      | Express 4.x                                    |
| 템플릿    | EJS (서버 사이드 렌더링, layout 동적 include)  |
| 프론트    | Bootstrap 5.3 (CDN) + Vanilla JS               |
| 폰트      | Noto Serif KR · Gowun Batang · Black Han Sans (Google Fonts) |

---

## 실행

### 로컬 실행
```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 (nodemon 자동 재시작)
npm run dev

# 3. 일반 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.

### GitHub Actions 실행
GitHub Actions를 이용하여 CI 워크플로우 내에서 실행 및 테스트할 수 있습니다.
```yaml
# 예시 워크플로우 실행 단계
- name: Install dependencies
  run: npm ci

- name: Start server in background
  run: npm start &
```


---

## 디렉토리

```
저승막걸리/
├── server.js              # Express 진입점
├── package.json
├── data/menu.json         # 메뉴 데이터 (단일 진실 공급원)
├── lib/menu.js            # 데이터 접근 모듈 (캐시 + 검증)
├── routes/
│   ├── index.js           # GET /
│   └── menu.js            # GET /menu/:id
├── views/
│   ├── layout.ejs         # 공통 골격(폰트·nav·footer)
│   ├── index.ejs          # 메뉴판
│   └── detail.ejs         # 메뉴 상세
└── public/
    ├── css/main.css       # 디자인 토큰 + 컴포넌트 + 애니메이션
    └── js/main.js         # IntersectionObserver
```

---

## 메뉴 이미지에 관한 안내

본 저장소에는 메뉴 이미지(`/public/images/*.png`)가 **포함되어 있지 않습니다**.
개발 중에는 카드의 이미지 영역이 어두운 placeholder로 표시되며 브라우저 콘솔에 404가 보일 수 있습니다.

실제 운영 시에는 `data/menu.json`의 각 항목의 `image` 경로(예: `/images/gumiho-tail.png`)와 동명의 16:9 이미지를 `public/images/`에 넣으면 자동 표시됩니다. AI 생성 이미지 사용 시 일관된 스타일 프롬프트(예: "Korean traditional dim lantern, dark background, oil painting style")를 유지하는 것을 권장합니다.

---

## 프로젝트 문서

본 프로젝트는 3축 하네스 구조로 규칙을 분리한다.

- [AGENTS.md](AGENTS.md) — 페르소나·환경·코딩 컨벤션·콘텐츠 톤
- [SKILLS.md](SKILLS.md) — 커스텀 도구(스킬) 명세
- [DESIGN.md](DESIGN.md) — 단일 디자인 시스템(토큰·컴포넌트·애니메이션)
