// EPA El Salvador — interacciones mínimas del Home Page

document.addEventListener('DOMContentLoaded', () => {

  // --- Toggle del menú en móvil ---
  const navToggle = document.getElementById('navToggle');
  const megaNav = document.getElementById('megaNav');
  if (navToggle && megaNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = megaNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // --- Banner de promociones rotativo ---
  const promos = [
    '36 cuotas sin intereses con tu tarjeta afiliada',
    'Envío gratis en compras mayores a $50',
    'Hasta 30% OFF en impermeabilizantes y canaletas'
  ];
  const promoEl = document.getElementById('promoText');
  if (promoEl) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % promos.length;
      promoEl.textContent = promos[i];
    }, 4500);
  }

  // --- Badge dinámico del carrito ---
  const cartBadge = document.getElementById('cartBadge');
  let cartCount = 0;
  document.querySelectorAll('.btn--add').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      cartBadge.textContent = String(cartCount);
      cartBadge.classList.add('bump');
      setTimeout(() => cartBadge.classList.remove('bump'), 250);
    });
  });

});