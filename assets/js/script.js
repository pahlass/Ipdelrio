const nav = document.getElementById('nav');
addEventListener('scroll', () => { nav.classList.toggle('compacta', scrollY > 60); }, {passive:true});

const hamburguesa = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');
function alternarMenu(abierto){
  menu.classList.toggle('abierto', abierto);
  hamburguesa.classList.toggle('activo', abierto);
  hamburguesa.setAttribute('aria-expanded', abierto);
  hamburguesa.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('menu-abierto', abierto);
}
hamburguesa.addEventListener('click', () => alternarMenu(!menu.classList.contains('abierto')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => alternarMenu(false)));

const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); observador.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.revelar').forEach(el => observador.observe(el));
