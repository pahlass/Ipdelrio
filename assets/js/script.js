const nav = document.getElementById('nav');
addEventListener('scroll', () => { nav.classList.toggle('compacta', scrollY > 60); }, {passive:true});

const hamburguesa = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');
hamburguesa.addEventListener('click', () => {
  const abierto = menu.classList.toggle('abierto');
  hamburguesa.classList.toggle('activo', abierto);
  hamburguesa.setAttribute('aria-expanded', abierto);
  hamburguesa.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('abierto');
  hamburguesa.classList.remove('activo');
  hamburguesa.setAttribute('aria-expanded','false');
}));

const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); observador.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.revelar').forEach(el => observador.observe(el));
