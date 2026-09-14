const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
let cart = JSON.parse(localStorage.getItem('amira-bag') || '[]');
const cartEl = $('.cart'), scrim = $('.scrim'), count = $('.bag-count');
function renderCart(){ count.textContent=cart.length; const items=$('.cart-items'); items.innerHTML=cart.length ? cart.map((item,i)=>`<div class="cart-item"><span>${item}</span><button class="remove" data-index="${i}">Remove</button></div>`).join('') : '<p class="empty">Your bag is waiting for its ritual.</p>'; $$('.remove').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.index,1);localStorage.setItem('amira-bag',JSON.stringify(cart));renderCart()}) }
function drawer(open, panel=cartEl){ panel.classList.toggle('open',open); scrim.classList.toggle('open',open); panel.setAttribute('aria-hidden',!open) }
renderCart();
$('.bag-button').onclick=()=>drawer(true); $('.close-cart').onclick=()=>drawer(false); scrim.onclick=()=>{drawer(false);drawer(false,$('.menu-panel'))};
$$('.add-bag').forEach(b=>b.onclick=()=>{cart.push(b.dataset.product);localStorage.setItem('amira-bag',JSON.stringify(cart));renderCart();drawer(true)});
const menu=$('.menu-panel'); $('.menu-toggle').onclick=()=>drawer(true,menu); $('.close-menu').onclick=()=>drawer(false,menu); $$('.menu-panel a').forEach(a=>a.onclick=()=>drawer(false,menu));
$$('.notes button').forEach(b=>b.onclick=()=>{const notes=b.parentElement;$$('button',notes).forEach(x=>x.classList.remove('active'));b.classList.add('active');b.closest('.product-info').querySelector('.add-bag').dataset.product='L’Huile Parfumée — '+b.textContent});
const dialog=$('.product-dialog'); const copy={pure:['L’HUILE PURE','Pure Argan Oil','A refined, fragrance-free essential for hair and body. A simple, beautiful gesture for everyday use.'],parfum:['L’HUILE PARFUMÉE','Scented Body Oil','A body-focused argan ritual with considered fragrance notes. Rose, amber and citrus are concept variants for the first Maison Amira collection.']};
$$('[data-open-product]').forEach(b=>b.onclick=()=>{const p=copy[b.dataset.openProduct];$('.dialog-label').textContent=p[0];$('.dialog-title').textContent=p[1];$('.dialog-copy').textContent=p[2];dialog.showModal()}); $('.dialog-close').onclick=()=>dialog.close();
$('.signup-form').onsubmit=e=>{e.preventDefault();$('.form-message').textContent='Private registration is opening soon. Thank you for your interest.';e.target.reset()};
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(e=>observer.observe(e));
