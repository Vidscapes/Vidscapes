/* assets/js/main.js - interactions, GSAP animations, cursor, search behaviour */
document.addEventListener('DOMContentLoaded', () => {
  // GSAP is expected to be loaded before this script (via CDN in each HTML).
  const cards = document.querySelectorAll('.card[data-target]');
  const heroVideo = document.querySelector('video[data-hero]');
  const searchEl = document.querySelector('.search');
  const searchInput = document.querySelector('.search input');
  const searchIcon = document.querySelector('.search .icon svg');
  const cursor = document.querySelector('.cursor');
  let spinTween = null;
  let typingTimer;

  // Animate header & hero entrance using GSAP if available
  try{
    if(window.gsap){
      gsap.from('.logo',{y:-8,opacity:0,duration:0.8,ease:'power3.out'});
      gsap.from('.intro h2',{y:20,opacity:0,duration:0.9,delay:0.12,ease:'power3.out'});
      gsap.from('.intro p',{y:10,opacity:0,duration:0.9,delay:0.22,ease:'power3.out'});
      gsap.from('.card',{y:10,opacity:0,duration:0.9,delay:0.3,stagger:0.08,ease:'power3.out'});
    }
  }catch(e){/*quiet*/}

  // Card clicks for index -> pages
  cards.forEach(c => {
    c.addEventListener('click', () => {
      const target = c.getAttribute('data-target');
      if(target) window.location.href = target;
    });
    c.addEventListener('keydown', e => { if(e.key === 'Enter'){ const t = c.getAttribute('data-target'); if(t) window.location.href = t; }})
  });

  // Lazy play hero video when visible
  if(heroVideo){
    try{
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting){ heroVideo.play().catch(()=>{}); } else { heroVideo.pause(); } });
      },{threshold:0.5});
      io.observe(heroVideo);
    }catch(e){/*not fatal*/}
  }

  // Search expand & rotating icon while typing/focus
  if(searchEl){
    const startSpin = () => {
      if(window.gsap && !spinTween){
        spinTween = gsap.to(searchIcon, {rotation:360, duration:1, ease:'linear', repeat:-1, transformOrigin:'50% 50%'});
      }else{
        searchIcon.style.transition = 'transform 320ms linear';
        searchIcon.style.transform = 'rotate(360deg)';
      }
    };
    const stopSpin = () => {
      if(spinTween){ spinTween.kill(); spinTween = null; searchIcon.style.transform = 'rotate(0deg)'; }
      else{ searchIcon.style.transform = 'rotate(0deg)'; }
    };

    searchEl.addEventListener('click', ()=>{ searchEl.classList.add('expanded'); searchInput.focus(); });
    searchInput.addEventListener('focus', ()=>{ searchEl.classList.add('expanded'); startSpin(); });
    searchInput.addEventListener('blur', ()=>{ if(!searchInput.value) searchEl.classList.remove('expanded'); stopSpin(); });
    searchInput.addEventListener('input', ()=>{ startSpin(); clearTimeout(typingTimer); typingTimer = setTimeout(()=>{ stopSpin(); }, 900); });
  }

  // Custom cursor
  const moveCursor = (e) => {
    cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
  };
  document.addEventListener('mousemove', moveCursor);

  // scrolling effect on cursor
  let scrollTimer;
  window.addEventListener('scroll', ()=>{
    cursor.classList.add('big');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(()=> cursor.classList.remove('big'), 350);
  }, {passive:true});

  // shrink cursor on interactive hover
  const interactiveSelector = 'a,button,input,textarea,.card,button.back';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', ()=> cursor.classList.add('small'));
    el.addEventListener('mouseleave', ()=> cursor.classList.remove('small'));
  });

  // accessibility: allow keyboard users to see default cursor briefly
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Tab'){
      document.documentElement.style.cursor = 'auto';
      setTimeout(()=> document.documentElement.style.cursor = 'none', 2000);
    }
  });

  // small performance preconnect (non-blocking)
  const pre = document.createElement('link'); pre.rel='preconnect'; pre.href='https://images.unsplash.com'; document.head.appendChild(pre);
});