# DESIGN.md — 「저승 막걸리」디자인 사양서

> 본 문서는 「저승 막걸리」 프로젝트의 시각적 정체성을 정의하는 **단일 디자인 시스템**이다.
> 모든 컬러·타이포·컴포넌트·효과는 본 문서의 토큰을 통해서만 사용한다.
> 직접 헥스코드를 작성하거나 본 문서에 없는 컴포넌트를 즉흥적으로 만들지 않는다.

---

## 0. 디자인 무드 (Design Mood)

### 한 줄 정의

> **"저승의 술집은 어둡지만, 등불은 따뜻하다."**

### 무드 키워드

- 묵향(墨香), 한지, 도깨비불, 안개, 핏빛, 백골
- 다크 베이스에 따뜻한 등불색 1포인트
- 한국 전통 + 약간의 글리치 / 글래스모피즘 (저승의 경계가 흐릿한 느낌)

### 금기 무드

- 미국식 할로윈 (호박, 박쥐, 마녀모자) ❌
- 일본식 J-호러 (긴 머리 여귀 클로즈업) ❌
- 채도 높은 형광색 ❌

---

## 1. 컬러 토큰 (Color Tokens)

### 1.1. 토큰 정의

모든 컬러는 `:root`에 CSS 변수로 정의하며, 다른 곳에서 헥스코드 직접 사용은 금지된다.

```css
:root {
  /* ── 배경 (Background) ── */
  --bg-abyss: #0a0a0c; /* 저승의 심연 - 가장 어두운 배경 */
  --bg-ink: #14141a; /* 묵빛 - 메인 배경 */
  --bg-mist: #1f1b2e; /* 안개 보라 - 카드/패널 배경 */
  --bg-paper: #2a2530; /* 한지 회보라 - 모달/오버레이 */

  /* ── 강조 (Accent) ── */
  --accent-blood: #a31621; /* 핏빛 - 가격, 경고 강조 */
  --accent-blood-soft: #6e0f17; /* 어두운 핏빛 - hover/배경 */
  --accent-flame: #f4a300; /* 등불 주황 - 따뜻한 포인트 */
  --accent-ghost: #6ec3c9; /* 도깨비불 청록 - 영적 강조 */

  /* ── 텍스트 (Text) ── */
  --text-bone: #ece6d6; /* 백골빛 - 본문 기본 */
  --text-paper: #c9c0a8; /* 누런 한지 - 부제목 */
  --text-spirit: #7a7585; /* 영혼 회색 - 보조 텍스트 */
  --text-shadow: #4a4555; /* 그림자 회색 - placeholder */

  /* ── 경계 (Border) ── */
  --border-mist: rgba(236, 230, 214, 0.08); /* 안개 경계선 */
  --border-blood: rgba(163, 22, 33, 0.5); /* 핏빛 경계선 (강조 시) */
}
```

### 1.2. 사용 규칙

| 상황               | 토큰                                       |
| ------------------ | ------------------------------------------ |
| 페이지 전체 배경   | `--bg-ink`                                 |
| 카드/패널 배경     | `--bg-mist` (글래스 효과 적용 시 알파 70%) |
| 본문 텍스트        | `--text-bone`                              |
| 메뉴 제목          | `--text-bone` (font-weight 700)            |
| 가격               | `--accent-blood`                           |
| 메뉴 카테고리 라벨 | `--accent-flame`                           |
| 경고 뱃지 배경     | `--accent-blood`, 텍스트 `--text-bone`     |
| 비밀 메뉴 강조     | `--accent-ghost` (도깨비불)                |

---

## 2. 타이포그래피 (Typography)

### 2.1. 폰트 매트릭스

| 용도             | 폰트             | 굵기       |
| ---------------- | ---------------- | ---------- |
| 메인 제목(h1)    | `Gowun Batang`   | 700        |
| 메뉴 제목(h2~h3) | `Gowun Batang`   | 700        |
| 본문             | `Noto Serif KR`  | 400        |
| 가격·강조        | `Black Han Sans` | 400 (단일) |
| 경고·뱃지        | `Black Han Sans` | 400 (단일) |

### 2.2. 스케일 (Type Scale)

```css
--font-size-display: 3.5rem; /* 메인 타이틀 */
--font-size-h1: 2.5rem;
--font-size-h2: 1.75rem;
--font-size-h3: 1.25rem;
--font-size-body: 1rem;
--font-size-small: 0.875rem;
--font-size-caption: 0.75rem;

--line-height-tight: 1.2;
--line-height-base: 1.6;
```

### 2.3. 본문 규칙

- 본문은 항상 `line-height: 1.6`
- 한국어 가독성을 위해 `word-break: keep-all` 기본 적용
- 메뉴 설명은 최대 2줄까지만 노출, 넘치면 `...`

---

## 3. 그리드 & 레이아웃 (Grid & Layout)

### 3.1. 컨테이너

- 최대 너비: `1200px`
- 좌우 패딩: 모바일 `1rem`, 데스크탑 `2rem`
- Bootstrap의 `.container`를 기본으로 사용

### 3.2. 메뉴 그리드

| 브레이크포인트       | 컬럼 수 |
| -------------------- | ------- |
| `< 576px` (모바일)   | 1       |
| `576~991px` (태블릿) | 2       |
| `≥ 992px` (데스크탑) | 3       |

Bootstrap 클래스: `col-12 col-sm-6 col-lg-4`

### 3.3. 간격 (Spacing)

```css
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 2rem;
--space-xl: 3rem;
--space-2xl: 5rem;
```

섹션 간 수직 간격은 `--space-2xl`을 기본으로 한다.

---

## 4. 컴포넌트 사양 (Components)

### 4.1. 메뉴 카드 `.menu-card`

**구조**

```
┌─────────────────────────┐
│      [이미지/심볼]      │   ← 16:9 비율
├─────────────────────────┤
│ 카테고리 라벨           │   ← --accent-flame
│ 메뉴 제목 (Gowun Batang)│
│ 영혼 3개  ⚠ 위험        │   ← 가격(blood) + 뱃지
│ 설명 텍스트 (2줄 제한)  │
│ #전설 #9000년산         │   ← 태그
└─────────────────────────┘
```

**스타일 규칙**

- 배경: `var(--bg-mist)`에 `backdrop-filter: blur(8px)` (글래스모피즘)
- 테두리: `1px solid var(--border-mist)`
- 모서리: `border-radius: 12px`
- 그림자: `0 4px 24px rgba(0,0,0,0.4)`
- 패딩: `--space-md`
- hover 시 등불처럼 살짝 빛남 (4.3 애니메이션 참조)

### 4.2. 뱃지 `.badge`

| 종류     | 클래스             | 배경                         | 텍스트           |
| -------- | ------------------ | ---------------------------- | ---------------- |
| 카테고리 | `.badge--category` | transparent                  | `--accent-flame` |
| 경고     | `.badge--warning`  | `--accent-blood`             | `--text-bone`    |
| 비밀메뉴 | `.badge--secret`   | `--accent-ghost` (alpha 30%) | `--accent-ghost` |
| 태그     | `.badge--tag`      | `--border-mist`              | `--text-paper`   |

### 4.3. 버튼

**기본 버튼 `.btn-tavern`**

- 배경: 투명
- 테두리: `1px solid var(--accent-flame)`
- 텍스트: `--accent-flame`
- hover 시: 배경 `--accent-flame`, 텍스트 `--bg-ink`
- transition: `all 0.3s ease`

**위험 버튼 `.btn-blood`** (입장하기, 주문하기 등)

- 배경: `--accent-blood`
- 텍스트: `--text-bone`
- hover 시: 배경 `--accent-blood-soft`

### 4.4. 네비게이션

- 상단 고정 (`position: sticky; top: 0;`)
- 배경: `--bg-ink`에 알파 80% + `backdrop-filter: blur(12px)`
- 하단 경계선: `1px solid var(--border-mist)`
- 로고 옆에 작은 도깨비불 점등 애니메이션 1개 (3초 주기)

### 4.5. 모달 (메뉴 상세)

- 배경: `--bg-paper`
- 오버레이: `rgba(10, 10, 12, 0.85)` + `backdrop-filter: blur(4px)`
- 상단 안개 그라데이션 (5.2 참조)
- 닫기 버튼: 우상단, `--text-spirit` 컬러

### 4.6. 메뉴 카드 변형 `.menu-card--secret`

- 비밀메뉴(`category === '비밀메뉴'`)에만 적용
- 테두리: `rgba(110, 195, 201, 0.3)` (도깨비불 청록의 흐릿한 잔영)
- 제목 컬러: `--accent-ghost`

### 4.7. Hero 섹션 `.hero`

- 컨테이너: `padding: --space-2xl 0`, `position: relative`, `overflow: hidden`
- `.hero__mist` 절대 위치 레이어로 5.2 안개 그라데이션을 깐다
- `.hero__title` Gowun Batang 700, `--font-size-display`
- `.hero__sub` Noto Serif KR, `--text-paper`, `--font-size-h3`

### 4.8. 메뉴 섹션 `.menu-section`

- 카테고리 그룹 컨테이너. 하단 마진 `--space-2xl`
- `.menu-section__title` Gowun Batang 700, `--font-size-h2`
- 제목 앞뒤로 「」 자동 삽입 (`::before`/`::after`, `--accent-flame`)
- 제목 하단에 `1px solid var(--border-mist)` 구분선

### 4.9. 상세 카드 `.detail-card`

- 글래스(4.1 메뉴 카드와 동일 글래스 토큰) + `max-width: 720px` 중앙 정렬
- `.detail-card__warning` 좌측 3px `--accent-blood` 보더 + `rgba(163, 22, 33, 0.08)` 배경
- 메뉴 상세는 별도 라우트 `/menu/:id`로 페이지 렌더 (4.5 모달은 차후 인페이지 미리보기용으로 보존)

### 4.10. 사이트 네비/푸터

- `.site-nav` 4.4 네비게이션 사양 구현체. 로고 옆 도깨비불은 `<span>` 텍스트 마커(`◉`)로 임시 구성, Phase 5에서 깜빡임 애니메이션 부여 예정
- `.site-footer` 상단 경계선 `--border-mist`, 본문 `--text-spirit`, `--font-size-small`

---

## 5. 프리미엄 효과 (Premium Effects)

> 본 섹션은 강의자료 기준 "프리미엄 UI/UX 지향"의 핵심 — 글래스모피즘 / 그라데이션 / 애니메이션 — 을 명세한다.

### 5.1. 글래스모피즘 (Glassmorphism)

모든 카드/패널/네비게이션에 일관 적용:

```css
.glass {
  background: rgba(31, 27, 46, 0.7); /* --bg-mist의 70% */
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid var(--border-mist);
}
```

### 5.2. 안개 그라데이션 (Mist Gradient)

페이지 상단, 모달 상단, hero 섹션에 활용:

```css
.mist-gradient {
  background: linear-gradient(
    180deg,
    rgba(110, 195, 201, 0.08) 0%,
    /* 도깨비불 청록 흔적 */ rgba(20, 20, 26, 0) 100%
  );
}
```

### 5.3. 애니메이션

**(a) 등불 깜빡임 `flicker`** — 로고·강조 텍스트 (현재 적용: `.site-nav__lantern`)

```css
@keyframes flicker {
  0%,
  100% {
    opacity: 1;
    text-shadow: 0 0 12px var(--accent-flame);
  }
  50% {
    opacity: 0.85;
    text-shadow: 0 0 6px var(--accent-flame);
  }
}
.flicker {
  animation: flicker 3s ease-in-out infinite;
}
```

**(b) 도깨비불 부유 `float-ghost`** — 비밀 메뉴 뱃지 (현재 적용: `category === '비밀메뉴'`인 카드/상세의 `.badge--secret`)

```css
@keyframes float-ghost {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.float-ghost {
  animation: float-ghost 4s ease-in-out infinite;
}
```

**(c) 카드 등장 `rise-from-mist`** — 페이지 진입 시 메뉴 카드

```css
@keyframes rise-from-mist {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

- 카드는 진입 시 0.6초에 걸쳐 fade-in
- IntersectionObserver로 화면에 들어올 때 트리거
- **JS 게이트(.js) 규칙**: `<html>` 요소에 `.js` 클래스가 붙은 경우에만 카드 초기 invisible. NoJS 사용자는 즉시 정상 표시 (head inline script가 `.js`를 즉시 추가하여 FOUC 회피)
- IntersectionObserver 미지원·`prefers-reduced-motion` 사용자에게는 JS가 즉시 `.is-visible`을 부여하고, CSS에서도 reduce-motion 매체쿼리에서 `.js .menu-card`를 정상값으로 되돌리는 안전망 유지

**(d) hover 등불 점등 `glow-on-hover`** — 메뉴 카드 hover

```css
.menu-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(244, 163, 0, 0.15); /* 등불색 글로우 */
  transition: all 0.4s ease;
}
```

### 5.4. 애니메이션 사용 규칙

- 한 화면에 동시에 깜빡이는 요소는 **최대 2개**까지
- 애니메이션이 사용자 가독성을 해치면 즉시 제거
- `prefers-reduced-motion` 매체쿼리를 존중하여, 사용자가 모션 감소를 선호하면 깜빡임/부유를 끈다.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001s !important;
    transition-duration: 0.001s !important;
  }
}
```

---

## 6. 아이콘 & 이미지 (Iconography)

### 6.1. 아이콘

- Bootstrap Icons 사용 (`bi-*`)
- 아이콘 컬러는 텍스트 컬러 토큰을 따른다
- 한국적 컨셉을 위해 일부 영역은 SVG 한자/전각 기호로 대체 가능 (예: 「冥」, 「魂」)

### 6.2. 이미지

- 메뉴 이미지: 16:9 비율, 어두운 배경 위에 자연스러운 등불 조명
- AI 생성 이미지 사용 시 일관된 스타일 프롬프트 유지 (예: "Korean traditional dim lantern, dark background, oil painting style")
- 이미지 파일은 `/public/images/`에 보관, 파일명은 메뉴 id와 일치

---

## 7. 디자인 토큰 동기화 (Stitch / 외부 도구)

본 프로젝트는 직접 작성한 토큰을 우선하지만, **Stitch 등 외부 디자인 도구를 활용하여 컴포넌트를 시안화한 경우 다음 절차를 따른다**:

1. Stitch에서 컴포넌트 디자인 → 컬러/타이포 토큰 추출
2. 본 문서의 `:root` 정의와 충돌 여부 확인
3. 충돌 시: 본 문서가 우선 (Stitch 측을 본 문서 토큰에 맞춰 조정)
4. 새 토큰이 필요하면 본 문서 1.1 섹션에 추가한 후 사용

---

## 8. 디자인 왜곡 방지 체크리스트

신규 컴포넌트/페이지 추가 시 아래 항목을 모두 만족해야 한다:

- [ ] 헥스코드 직접 사용 없음 (모두 `var(--*)` 토큰 사용)
- [ ] 폰트는 본 문서의 매트릭스를 따름
- [ ] 카드/패널은 글래스 효과 적용
- [ ] 한 화면에 깜빡임 애니메이션 2개 이하
- [ ] `prefers-reduced-motion` 대응됨
- [ ] 모바일(< 576px) 단일 컬럼에서도 가독성 OK
- [ ] 한국어 `word-break: keep-all` 적용됨

---

## 9. 갱신 정책

- 본 문서는 `AGENTS.md`와 동일하게 **살아있는 문서**다.
- 컴포넌트 1개를 새로 만들 때마다 본 문서 4번 섹션에 사양을 1줄이라도 추가한다.
- 토큰명이 바뀌면 전역 검색·일괄 치환 후 본 문서를 함께 갱신한다.
- 디자인 결정사항 충돌 시: **본 문서 > 코드 > 임시 결정** 순으로 우선한다.
