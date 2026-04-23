document.documentElement.classList.add('js');
console.log('Make Art Make Money loaded');

const alumniCarousel = document.querySelector('.alumni-carousel');
const alumniTrack = document.querySelector('.alumni-track');

if (alumniCarousel && alumniTrack) {
  let isPointerDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  function getLoopPoint() {
    return alumniTrack.scrollWidth / 2;
  }

  function setStartPosition() {
    const loopPoint = getLoopPoint();
    if (!loopPoint) return;
    alumniCarousel.scrollLeft = loopPoint;
  }

  function wrapScroll() {
    const loopPoint = getLoopPoint();
    if (!loopPoint) return;

    if (alumniCarousel.scrollLeft >= loopPoint * 2 - alumniCarousel.clientWidth) {
      alumniCarousel.scrollLeft -= loopPoint;
    }

    if (alumniCarousel.scrollLeft <= 0) {
      alumniCarousel.scrollLeft += loopPoint;
    }
  }

  function initCarousel() {
    requestAnimationFrame(() => {
      setStartPosition();
    });
  }

  window.addEventListener('load', initCarousel);
  window.addEventListener('resize', initCarousel);

  alumniCarousel.addEventListener('scroll', wrapScroll, { passive: true });

  alumniCarousel.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    alumniCarousel.classList.add('is-dragging');
    startX = e.clientX;
    startScrollLeft = alumniCarousel.scrollLeft;
  });

  window.addEventListener('pointerup', () => {
    isPointerDown = false;
    alumniCarousel.classList.remove('is-dragging');
  });

  alumniCarousel.addEventListener('pointerleave', () => {
    isPointerDown = false;
    alumniCarousel.classList.remove('is-dragging');
  });

  alumniCarousel.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    e.preventDefault();
    const walk = (e.clientX - startX) * 1.2;
    alumniCarousel.scrollLeft = startScrollLeft - walk;
  });

  alumniCarousel.querySelectorAll('img').forEach((img) => {
    img.setAttribute('draggable', 'false');
  });
}

/**
 * Money Rain Animation + Smooth Transition
 */
function makeItRain(callback) {
  const container = document.getElementById('money-rain');
  const overlay = document.getElementById('transition-overlay');

  if (!container) {
    if (typeof callback === 'function') callback();
    return;
  }

  const COUNT = 40;
  const BASE_DURATION = 900;
  const STAGGER = 20;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('img');
    el.src = 'images/money.png';
    el.className = 'money';

    const spread = 100 / COUNT;
    el.style.left = Math.min(i * spread + Math.random() * 1.5, 96) + 'vw';
    el.style.top = (-100 - Math.random() * 200) + 'px';

    const duration = BASE_DURATION + Math.random() * 600;
    el.style.animationDuration = duration + 'ms';

    const rotation = Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.5;
    el.style.transform = `rotate(${rotation}deg) scale(${scale})`;

    setTimeout(() => {
      container.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, duration + 800);
    }, i * STAGGER);
  }

  setTimeout(() => {
    if (overlay) overlay.classList.add('active');
  }, 1000);

  setTimeout(() => {
    if (typeof callback === 'function') callback();
  }, 1800);
}

/**
 * Attach to all CTAs safely
 */
document.querySelectorAll('.js-rain-cta').forEach((button) => {
  button.addEventListener('click', function (e) {
    const href = button.getAttribute('href');
    if (!href) return;

    e.preventDefault();

    makeItRain(() => {
      window.location.href = href;
    });
  });
});
