# SKILLS.md — 「저승 막걸리」스킬 명세서

> 본 문서는 본 프로젝트 내에서 에이전트가 호출할 수 있는 **커스텀 도구(스킬)의 목록과 명세**다.
> 에이전트는 사용자의 요청을 처리할 때 본 문서를 스스로 참조하여,
> 가장 적합한 스킬을 **맥락적으로** 호출한다.

---

## 0. 스킬 호출 우선순위

1. 사용자가 명시적으로 특정 스킬을 지정 → 그대로 수행
2. 요청이 아래 정의된 스킬 중 하나에 해당 → 해당 스킬 자동 호출
3. 매칭되는 스킬이 없음 → 사용자에게 **"새 스킬로 등록할지"** 확인 후 진행
4. 두 개 이상의 스킬이 충돌 → 사용자에게 우선순위 질의

---

## 1. menu-manager — 메뉴 데이터 관리 스킬

### 목적
`/data/menu.json`을 단일 진실 공급원(Single Source of Truth)으로 유지하면서 안전하게 CRUD를 수행한다.

### 사용 시점
- 새 메뉴 아이템 추가 요청 (예: "구미호 꼬리찜 추가해줘")
- 가격·설명 수정
- 카테고리 재구성·삭제

### 입출력
- **Input**: `{ action: 'create' | 'read' | 'update' | 'delete', payload: MenuItem }`
- **Output**: 갱신된 `menu.json` 전체

### MenuItem 스키마
```json
{
  "id": "uuid-v4 문자열",
  "name": "구미호 꼬리찜",
  "category": "안주 | 주류 | 후식 | 비밀메뉴",
  "price": "영혼 3개",
  "description": "구미호가 천년에 한 번 떨군다는 꼬리. 씹을수록 옛 연인의 얼굴이 떠오른다.",
  "warning": "임산부, 미수습자 섭취 금지",
  "image": "/images/gumiho-tail.png",
  "tags": ["전설", "9000년산"]
}
```

### 수행 절차
1. 기존 `menu.json` 읽기 → 메모리에 파싱
2. action에 따라 처리 (id 충돌 시 에러)
3. 변경된 데이터를 다시 직렬화하여 저장
4. 동일한 id로 두 번 저장되지 않도록 검증

---

## 2. card-generator — 메뉴 카드 마크업 생성기

### 목적
Bootstrap 카드 마크업을 일관된 템플릿으로 생성하여, 메뉴 페이지 전반에서 시각적 통일성을 유지한다.

### 사용 시점
- 새 메뉴를 화면에 노출할 EJS 부분 템플릿이 필요할 때
- 기존 카드 레이아웃을 일괄 변경할 때 (이때는 부분 템플릿 1곳만 수정)

### 호출 형식
```
generateMenuCard(menuItem: MenuItem) → string (HTML)
```

### 출력 규칙
- Bootstrap 5 `.card` 기반
- 다크 테마: `.bg-dark.text-light` 또는 `DESIGN.md`에 정의된 글래스 효과 클래스 사용
- 가격: `--accent-blood` 토큰으로 강조
- `warning` 필드가 존재하면 `.badge.bg-danger`로 노출
- `tags` 배열은 `.badge.bg-secondary`로 나열

### 예시 출력 (생략된 형태)
```html
<article class="card menu-card bg-dark text-light">
  <img src="{image}" class="card-img-top" alt="{name}">
  <div class="card-body">
    <h3 class="card-title">{name}</h3>
    <p class="menu-card__price">{price}</p>
    <p class="card-text">{description}</p>
    <!-- warning, tags 조건부 렌더링 -->
  </div>
</article>
```

---

## 3. route-registrar — Express 라우트 등록 스킬

### 목적
새 페이지·API 엔드포인트를 추가할 때 라우트 모듈을 일관된 방식으로 등록한다.

### 사용 시점
- 새 페이지 (예: 상세 페이지, 후기 페이지, 입장 가능 여부 체크)
- 새 API 엔드포인트 (예: `/api/menu`)

### 수행 절차
1. `/routes/{name}.js` 파일 생성
2. 라우트 핸들러 작성 (비즈니스 로직만, 데이터 조회는 별도 모듈 분리)
3. `server.js`에 `app.use('/{prefix}', require('./routes/{name}'))` 추가
4. 동작 검증: 해당 URL로 GET 요청 시 200 응답 확인

### 금지 사항
- 한 라우트 파일 안에 200줄 이상 코드 작성 금지 (분리 대상)
- 라우트 핸들러 안에서 `fs.readFileSync` 등 동기 I/O 직접 호출 금지

---

## 4. color-token-linter — 컬러 토큰 검증 스킬

### 목적
CSS/HTML 내에 하드코딩된 헥스코드를 잡아내고, `DESIGN.md`에 정의된 컬러 토큰만 사용하도록 강제한다.

### 사용 시점
- CSS 파일 저장 직후
- 새 컴포넌트 추가 직후
- 사용자가 "토큰 점검해줘" 또는 "린트 돌려줘"라고 지시했을 때

### 동작
1. `/public/css/*.css` 및 `/views/**/*.ejs` 스캔
2. `#xxxxxx` 또는 `rgb(...)` 직접 사용 위치 추출
3. `:root` 변수 정의 외부에서 발견 시 경고
4. 권장 대체 토큰을 함께 제시

### 출력 형식
```
⚠ /public/css/main.css:42 → "#b71c1c" 직접 사용 발견
   → 권장: var(--accent-blood)
```

---

## 5. korean-font-injector — 한국어 폰트 주입 스킬

### 목적
컨셉에 부합하는 한국어 웹폰트를 모든 페이지에 일관되게 주입한다.

### 사용 시점
- 새 EJS 레이아웃 파일을 만들 때
- 폰트가 변경됐을 때

### 폰트 매트릭스
| 용도 | 폰트 | 출처 |
|---|---|---|
| 본문 | Noto Serif KR | Google Fonts |
| 메뉴 제목 | Gowun Batang | Google Fonts |
| 강조·경고 | Black Han Sans | Google Fonts |

### 주입 위치
- 모든 EJS 레이아웃의 `<head>` 상단
- Google Fonts CDN으로 로드 (셀프 호스팅 금지)
- `font-display: swap` 적용 권장

---

## 6. 외부 도구 연동 (npx 기반 즉시 바인딩)

검증된 공통 패키지는 npx로 즉시 호출 가능하며, 별도 설치 명세 없이 사용한다.

| 명령 | 용도 | 사용 시점 |
|---|---|---|
| `npx nodemon server.js` | 개발 서버 자동 재시작 | 개발 중 상시 |
| `npx serve ./public` | 정적 자원만 빠르게 확인 | 디자인 점검 시 |
| `npx prettier --check .` | 코드 포맷 일관성 확인 | 커밋 직전 |
| `npx http-server` | 외부 디바이스에서 접근 테스트 | 반응형 확인 시 |

---

## 7. 스킬 확장 정책

- 새 스킬은 본 문서에 추가**한 후**에만 사용 가능
- 1회성 작업은 스킬로 등록하지 않음 (반복 사용 가능성이 있을 때만 등록)
- 외부 API 호출 스킬은 키를 `.env`로 분리, 절대 소스 코드에 하드코딩 금지
- 스킬이 5개 이상 추가되어 본 문서가 길어지면 카테고리별로 섹션 분할 고려

---

## 8. 스킬 작성자 노트 (Skill Creator)

> 본 프로젝트는 학습 목적의 컨셉 사이트이므로, 스킬은
> **"이 작업이 또 반복될 가능성이 있는가?"** 한 가지 기준으로만 추가한다.
> 욕심내서 미리 만들지 않는다. 필요할 때, 필요한 만큼.
