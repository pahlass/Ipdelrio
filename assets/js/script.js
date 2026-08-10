const nav = document.getElementById('nav');
addEventListener('scroll', () => { nav.classList.toggle('compacta', scrollY > 60); }, {passive:true});

/* ---------- Acordeón "Un día aquí" ---------- */
document.querySelectorAll('.momento-boton').forEach(boton => {
  boton.addEventListener('click', () => {
    const momento = boton.closest('.momento');
    const abierto = momento.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto);
  });
});

const hamburguesa = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');
function alternarMenu(abierto){
  menu.classList.toggle('abierto', abierto);
  hamburguesa.classList.toggle('activo', abierto);
  hamburguesa.setAttribute('aria-expanded', abierto);
  hamburguesa.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
}
hamburguesa.addEventListener('click', () => alternarMenu(!menu.classList.contains('abierto')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => alternarMenu(false)));
document.addEventListener('click', (e) => {
  if (!menu.classList.contains('abierto')) return;
  if (menu.contains(e.target) || hamburguesa.contains(e.target)) return;
  alternarMenu(false);
});

const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); observador.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.revelar').forEach(el => observador.observe(el));

/* ---------- Banda de aviso ---------- */
const banner = document.getElementById('bannerAnuncio');
const bannerCerrar = document.getElementById('bannerCerrar');
function medirBanner(){
  if (banner.classList.contains('oculto')) return;
  document.documentElement.style.setProperty('--barra-alto', banner.offsetHeight + 'px');
}
if (localStorage.getItem('avisoUtilesOculto') === '1') {
  banner.classList.add('oculto');
  banner.hidden = true;
  document.documentElement.style.setProperty('--barra-alto', '0px');
} else {
  medirBanner();
  addEventListener('resize', medirBanner);
}
bannerCerrar.addEventListener('click', () => {
  banner.classList.add('oculto');
  document.documentElement.style.setProperty('--barra-alto', '0px');
  localStorage.setItem('avisoUtilesOculto', '1');
  setTimeout(() => { banner.hidden = true; }, 300);
});

/* ---------- Modal: listas de útiles ---------- */
const modalFondo = document.getElementById('modalFondo');
const modalLista = document.getElementById('modalLista');
const modalCerrar = document.getElementById('modalCerrar');
let elementoConFoco = null;

function abrirModal(){
  elementoConFoco = document.activeElement;
  modalFondo.hidden = false;
  modalLista.hidden = false;
  requestAnimationFrame(() => {
    modalFondo.classList.add('visible');
    modalLista.classList.add('visible');
  });
  document.body.classList.add('modal-abierto');
  modalCerrar.focus();
}
function cerrarModal(){
  modalFondo.classList.remove('visible');
  modalLista.classList.remove('visible');
  document.body.classList.remove('modal-abierto');
  setTimeout(() => { modalFondo.hidden = true; modalLista.hidden = true; }, 300);
  if (elementoConFoco) elementoConFoco.focus();
}
document.querySelectorAll('.abrir-modal-lista').forEach(el => el.addEventListener('click', (e) => {
  e.preventDefault();
  abrirModal();
}));
modalCerrar.addEventListener('click', cerrarModal);
modalFondo.addEventListener('click', cerrarModal);
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalLista.hidden) cerrarModal();
});

const pestanas = document.querySelectorAll('.modal-tab');
pestanas.forEach(tab => tab.addEventListener('click', () => {
  pestanas.forEach(t => { t.classList.remove('activo'); t.setAttribute('aria-selected','false'); });
  tab.classList.add('activo');
  tab.setAttribute('aria-selected','true');
  document.querySelectorAll('.modal-panel').forEach(p => p.hidden = true);
  document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
}));
