/* ========================================
   MIT Medical Tower - Abdominoplastia Landing
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


// ============ FORM SUBMISSION → WHATSAPP ============
function handleSubmit(e) {
  e.preventDefault();

  const nombre = document.getElementById('formNombre').value.trim();
  const telefono = document.getElementById('formTelefono').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const procSelect = document.getElementById('formProcedimiento');
  const procedimiento = procSelect.options[procSelect.selectedIndex].text;
  const mensaje = document.getElementById('formMensaje').value.trim();

  let texto = 'Hola, me interesa agendar una consulta de Mommy Makeover en MIT Medical Tower.\n\n';
  texto += '*Nombre:* ' + nombre + '\n';
  texto += '*Teléfono:* ' + telefono + '\n';
  texto += '*Email:* ' + email + '\n';
  texto += '*Procedimiento:* ' + procedimiento + '\n';
  if (mensaje) texto += '*Mensaje:* ' + mensaje + '\n';

  const url = 'https://wa.me/5215528380715?text=' + encodeURIComponent(texto);
  window.location.href = url;
}
