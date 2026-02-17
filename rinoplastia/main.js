/* ========================================
   MIT Medical Tower - Rinoplastia Landing
   JavaScript
   ======================================== */

// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('header-scrolled', window.scrollY > 50);
}, { passive: true });


// ============ MOBILE MENU TOGGLE ============
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open');
  if (isOpen) {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>';
  } else {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>';
  }
}


// ============ SCROLL REVEAL ANIMATIONS ============
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


// ============ FAQ ACCORDION ============
function toggleFaq(btn) {
  const ans = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = ans.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotated'));

  // Open clicked if it was closed
  if (!isOpen) {
    ans.classList.add('open');
    icon.classList.add('rotated');
  }
}


// ============ BEFORE & AFTER CAROUSEL ============
(function() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let slidesPerView = 3;
  let autoplayTimer;

  function getSlidesPerView() {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, totalSlides - slidesPerView);
  }

  function updateCarousel() {
    const slideWidth = 100 / slidesPerView;
    track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + '%)';
    updateDots();
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    const totalDots = maxIdx + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
      dot.addEventListener('click', function() {
        currentIndex = i;
        updateCarousel();
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach(function(dot, i) {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  window.moveCarousel = function(direction) {
    const maxIdx = getMaxIndex();
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = maxIdx;
    if (currentIndex > maxIdx) currentIndex = 0;
    updateCarousel();
    resetAutoplay();
  };

  function startAutoplay() {
    autoplayTimer = setInterval(function() {
      const maxIdx = getMaxIndex();
      currentIndex = currentIndex >= maxIdx ? 0 : currentIndex + 1;
      updateCarousel();
    }, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  track.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      moveCarousel(diff > 0 ? 1 : -1);
    }
  }, { passive: true });

  function init() {
    slidesPerView = getSlidesPerView();
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    buildDots();
    updateCarousel();
  }

  init();
  startAutoplay();
  window.addEventListener('resize', function() {
    slidesPerView = getSlidesPerView();
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    buildDots();
    updateCarousel();
  });
})();


// ============ FORM SUBMISSION → WHATSAPP ============
function handleSubmit(e) {
  e.preventDefault();

  const nombre = document.getElementById('formNombre').value.trim();
  const telefono = document.getElementById('formTelefono').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const procedimiento = document.getElementById('formProcedimiento').value;
  const mensaje = document.getElementById('formMensaje').value.trim();

  let texto = 'Hola, me interesa agendar una consulta de Rinoplastia Tradicional en MIT Medical Tower.\n\n';
  texto += '*Nombre:* ' + nombre + '\n';
  texto += '*Teléfono:* ' + telefono + '\n';
  texto += '*Email:* ' + email + '\n';
  texto += '*Procedimiento:* ' + procedimiento + '\n';
  if (mensaje) texto += '*Mensaje:* ' + mensaje + '\n';

  const url = 'https://wa.me/5215528380715?text=' + encodeURIComponent(texto);
  window.location.href = url;
}
