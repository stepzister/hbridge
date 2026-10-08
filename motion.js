const hero = document.querySelector('#inicio');
const cosmos = document.createElement('div');
cosmos.className = 'hero-cosmos'; cosmos.setAttribute('aria-hidden','true');
cosmos.innerHTML = '<div class="cosmos-grid"></div><div class="aurora"></div><div class="aurora right"></div><div class="halo"></div><div class="halo halo-two"></div><div class="starfield"></div>';
hero.prepend(cosmos);
for(let i=0;i<32;i++){const star=document.createElement('i');star.className='star';star.style.cssText=`left:${(i*37+11)%100}%;top:${(i*23+7)%100}%;animation-delay:-${i%7}s`;cosmos.querySelector('.starfield').append(star);}
hero.querySelector('.inline-flex').classList.add('hero-kicker');
const strip = document.createElement('div');strip.className='signal-strip';strip.setAttribute('aria-hidden','true');
const phrase='<span>PERSONAS Y PREVENCIÓN <b>✦</b> SEGURIDAD Y SALUD <b>✦</b> TECNOLOGÍA CON PROPÓSITO <b>✦</b></span>';
strip.innerHTML='<div class="signal-track">'+phrase.repeat(4)+'</div>';hero.after(strip);
const preference=matchMedia('(prefers-reduced-motion: reduce)');let paused=preference.matches;
const control=document.createElement('button');control.className='motion-control';control.type='button';
function applyMotion(){document.body.classList.toggle('motion-off',paused);control.textContent=paused?'▷ Activar animaciones':'Ⅱ Pausar animaciones';control.setAttribute('aria-pressed',String(paused));}
control.addEventListener('click',()=>{paused=!paused;applyMotion();});preference.addEventListener('change',event=>{paused=event.matches;applyMotion();});document.body.append(control);applyMotion();
const cards=document.querySelectorAll('#servicios .glass-card,#capacitacion .glass-card');
cards.forEach(card=>{card.classList.add('tilt-card');if(matchMedia('(pointer:fine)').matches){card.addEventListener('pointermove',event=>{if(paused||preference.matches)return;const r=card.getBoundingClientRect();const x=event.clientX-r.left,y=event.clientY-r.top;card.style.setProperty('--mx',x+'px');card.style.setProperty('--my',y+'px');card.style.setProperty('--rx',(0.5-y/r.height)*5+'deg');card.style.setProperty('--ry',(x/r.width-0.5)*5+'deg');});card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');});}});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('#servicios .glass-card,#nosotros .glass-card,#capacitacion .glass-card,.method-card,#contacto .glass-card').forEach((el,i)=>{el.classList.add('reveal-item');el.style.setProperty('--reveal-delay',(i%3)*80+'ms');observer.observe(el);});}
const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);let queued=false;
function drawProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';queued=false;}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(drawProgress);}},{passive:true});addEventListener('resize',drawProgress);drawProgress();
// Menu state and keyboard support.
menuBtn.setAttribute('aria-controls','mobile-menu');menuBtn.setAttribute('aria-expanded','false');
function syncMenu(){const open=!mobileMenu.classList.contains('hidden');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');}
menuBtn.addEventListener('click',syncMenu);mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',syncMenu));
// Properly associate the original form labels and fields.
document.querySelectorAll('#contact-form label').forEach((label,i)=>{const field=label.parentElement.querySelector('input,select,textarea');if(field){field.id='contact-field-'+i;field.name='field-'+i;label.htmlFor=field.id;}});
const modal=document.querySelector('#modal-success');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-labelledby','success-title');modal.setAttribute('aria-hidden','true');modal.querySelector('h3').id='success-title';
let previousFocus;let closeTimer;
window.handleFormSubmit=function(event){event.preventDefault();clearTimeout(closeTimer);previousFocus=document.activeElement;modal.classList.remove('hidden','opacity-0');modal.setAttribute('aria-hidden','false');document.querySelector('header').inert=true;document.querySelectorAll('body>section,body>footer').forEach(el=>el.inert=true);control.inert=true;document.body.style.overflow='hidden';modal.querySelector('button').focus();event.target.reset();};
window.closeModal=function(){modal.classList.add('opacity-0');modal.setAttribute('aria-hidden','true');document.querySelector('header').inert=false;document.querySelectorAll('body>section,body>footer').forEach(el=>el.inert=false);control.inert=false;document.body.style.overflow='';closeTimer=setTimeout(()=>modal.classList.add('hidden'),preference.matches?0:300);previousFocus?.focus();};
document.addEventListener('keydown',event=>{if(modal.getAttribute('aria-hidden')==='false'){if(event.key==='Escape')closeModal();if(event.key==='Tab'){event.preventDefault();modal.querySelector('button').focus();}}else if(event.key==='Escape'&&!mobileMenu.classList.contains('hidden')){mobileMenu.classList.add('hidden');syncMenu();menuBtn.focus();}});

// Select the service associated with the chosen contact link.
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {document.querySelector('#contact-form select').value=link.dataset.service;}));
