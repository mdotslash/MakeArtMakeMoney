document.documentElement.classList.add('js');
console.log('Make Art Make Money loaded');

/**
 * Seamless Alumni Marquee
 * Requires the alumni list to be duplicated once in the HTML:
 * Erica, Pablo, Jacoba, Erica, Pablo, Jacoba
 */
const alumniCarousel = document.querySelector('.alumni-carousel');
const alumniTrack = document.querySelector('.alumni-track');

if (alumniCarousel && alumniTrack) {
  let isPaused = false;
  let animationFrame;
  let speed = 0.35; // lower = slower, higher = faster

  function getLoopPoint() {
    return alumniTrack.scrollWidth / 2;
  }

  function marquee() {
    if (!isPaused) {
      alumniCarousel.scrollLeft += speed;

      const loopPoint = getLoopPoint();

      if (loopPoint && alumniCarousel.scrollLeft >= loopPoint) {
        alumniCarousel.scrollLeft = 0;
      }
    }

    animationFrame = requestAnimationFrame(marquee);
  }

  function initAlumniMarquee() {
    cancelAnimationFrame(animationFrame);
    alumniCarousel.scrollLeft = 0;
    animationFrame = requestAnimationFrame(marquee);
  }

  window.addEventListener('load', initAlumniMarquee);
  window.addEventListener('resize', initAlumniMarquee);

  alumniCarousel.addEventListener('mouseenter', () => {
    isPaused = true;
  });

  alumniCarousel.addEventListener('mouseleave', () => {
    isPaused = false;
  });

  alumniCarousel.addEventListener('touchstart', () => {
    isPaused = true;
  }, { passive: true });

  alumniCarousel.addEventListener('touchend', () => {
    isPaused = false;
  }, { passive: true });

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