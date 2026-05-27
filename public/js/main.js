/**
 * 「저승 막걸리」메인 스크립트
 * - 메뉴 카드가 viewport에 들어오면 안개에서 떠오르는 효과(rise-from-mist)를 부여.
 * - prefers-reduced-motion 사용자나 IO 미지원 브라우저는 즉시 visible 처리.
 */
(function () {
  'use strict';

  const cards = document.querySelectorAll('.menu-card');
  if (cards.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ioSupported = 'IntersectionObserver' in window;

  // 모션 감소 또는 IO 미지원 → 즉시 모두 표시
  if (reduceMotion || !ioSupported) {
    cards.forEach((card) => card.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
})();
