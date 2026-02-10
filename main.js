/* ========================================
   MIT Medical Tower - Home / Shared JS
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

  // Toggle hamburger ↔ X
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
