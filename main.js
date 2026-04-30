document.documentElement.classList.add('js');
console.log('Make Art Make Money loaded');

/**
 * Page-load + scroll reveal
 */
const revealItems = document.querySelectorAll(
  '.section .tag, .hero-copy, .hero-art, .section:not(.section-hero) .split-left, .section:not(.section-hero) .split-right, .final-cta-card'
);

revealItems.forEach((item) => {
  item.classList.add('reveal');

  // tags appear first (no delay)
  if (item.classList.contains('tag')) return;

  // hero image + right columns slightly delayed
  if (
    item.classList.contains('hero-art') ||
    item.classList.contains('split-right')
  ) {
    item.classList.add('reveal-delay-1');
  }
});

requestAnimationFrame(() => {
  document.querySelectorAll('.section-hero .reveal').forEach((item) => {
    item.classList.add('is-visible');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -80px 0px'
  }
);

document
  .querySelectorAll('.section:not(.section-hero) .reveal, .final-cta-card.reveal')
  .forEach((item) => revealObserver.observe(item));
  
/**
 * Seamless Alumni Marquee
 */
const alumniCarousel = document.querySelector('.alumni-carousel');
const alumniTrack = document.querySelector('.alumni-track');

if (alumniCarousel && alumniTrack) {
  const originalItems = Array.from(alumniTrack.children);
  let animationFrame;
  let position = 0;
  let speed = 0.3;
  let isPaused = false;
  let loopWidth = 0;

  function setupMarquee() {
    cancelAnimationFrame(animationFrame);

    // Reset to original items only
    alumniTrack.innerHTML = '';
    originalItems.forEach((item) => {
      alumniTrack.appendChild(item.cloneNode(true));
    });

    // Clone until the track is wide enough for a seamless loop
    while (alumniTrack.scrollWidth < alumniCarousel.offsetWidth * 2.5) {
      originalItems.forEach((item) => {
        alumniTrack.appendChild(item.cloneNode(true));
      });
    }

    loopWidth = alumniTrack.scrollWidth / 2;

    // Add one more full set for safety
    originalItems.forEach((item) => {
      alumniTrack.appendChild(item.cloneNode(true));
    });

    position = 0;
    alumniTrack.style.transform = 'translateX(0)';
    animationFrame = requestAnimationFrame(marquee);
  }

  function marquee() {
    if (!isPaused && loopWidth > 0) {
      position += speed;

      if (position >= loopWidth) {
        position = 0;
      }

      alumniTrack.style.transform = `translateX(${-position}px)`;
    }

    animationFrame = requestAnimationFrame(marquee);
  }

  window.addEventListener('load', setupMarquee);
  window.addEventListener('resize', setupMarquee);

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