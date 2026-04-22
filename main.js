document.documentElement.classList.add('js');
console.log('Make Art Make Money loaded');

const alumniCarousel = document.querySelector('.alumni-carousel');
const alumniTrack = document.querySelector('.alumni-track');

if (alumniCarousel && alumniTrack) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  function getLoopPoint() {
    return alumniTrack.scrollWidth / 2;
  }

  function wrapScroll() {
    const loopPoint = getLoopPoint();
    if (!loopPoint) return;

    if (alumniCarousel.scrollLeft >= loopPoint) {
      alumniCarousel.scrollLeft -= loopPoint;
    } else if (alumniCarousel.scrollLeft <= 0) {
      alumniCarousel.scrollLeft += loopPoint;
    }
  }

  // start in the middle so user can drag both directions
  requestAnimationFrame(() => {
    alumniCarousel.scrollLeft = getLoopPoint() / 2;
  });

  alumniCarousel.addEventListener('scroll', wrapScroll);

  alumniCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    alumniCarousel.classList.add('is-dragging');
    startX = e.pageX - alumniCarousel.offsetLeft;
    scrollLeft = alumniCarousel.scrollLeft;
  });

  alumniCarousel.addEventListener('mouseleave', () => {
    isDown = false;
    alumniCarousel.classList.remove('is-dragging');
  });

  alumniCarousel.addEventListener('mouseup', () => {
    isDown = false;
    alumniCarousel.classList.remove('is-dragging');
  });

  alumniCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - alumniCarousel.offsetLeft;
    const walk = (x - startX) * 1.2;
    alumniCarousel.scrollLeft = scrollLeft - walk;
  });
}

/**
 * Money Rain Animation + Smooth Transition
 */
function makeItRain(callback) {
  const container = document.getElementById('money-rain');
  const overlay = document.getElementById('transition-overlay');

  // fallback: if container missing, just continue
  if (!container) {
    if (typeof callback === 'function') callback();
    return;
  }

  const COUNT = 40;
  const BASE_DURATION = 900; // ms
  const STAGGER = 20; // ms between drops

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('img');
    el.src = 'images/money.png';
    el.className = 'money';

    // spread evenly across screen with slight randomness
    const spread = 100 / COUNT;
    el.style.left = Math.min(i * spread + Math.random() * 1.5, 96) + 'vw';

    // start above viewport
    el.style.top = (-100 - Math.random() * 200) + 'px';

    // animation speed
    const duration = BASE_DURATION + Math.random() * 600;
    el.style.animationDuration = duration + 'ms';

    // rotation + scale
    const rotation = Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.5;
    el.style.transform = `rotate(${rotation}deg) scale(${scale})`;

    // staggered entry (this is what makes it feel "rainy" not clumpy)
    setTimeout(() => {
      container.appendChild(el);

      // cleanup
      setTimeout(() => {
        el.remove();
      }, duration + 800);
    }, i * STAGGER);
  }

  // fade overlay in (softens page transition)
  setTimeout(() => {
    if (overlay) overlay.classList.add('active');
  }, 1000);

  // redirect AFTER animation + fade
  setTimeout(() => {
    if (typeof callback === 'function') callback();
  }, 1800);
}

/**
 * Attach to ALL CTAs safely
 */
document.querySelectorAll('.js-rain-cta').forEach((button) => {
  button.addEventListener('click', function (e) {
    const href = button.getAttribute('href');

    // don't hijack if no href
    if (!href) return;

    e.preventDefault();

    makeItRain(() => {
      window.location.href = href;
    });
  });
});