/* ============================================================
   VENUE ADD-ON — заменяет «радар» в карточке venue на живое фото
   высотки (Ken Burns + скан-линия + HUD-рамка + статичный пин).
   Без подписи VENUE. Переживает пересборку (interval + observer).
   ============================================================ */
(function () {
  if (window.__ptVenue) return;
  window.__ptVenue = true;

  var IMG = "venue.jpg";
  var CSS = `
.ptv-card{padding:0 !important;overflow:hidden;}
.ptv-hero{position:relative;height:300px;overflow:hidden;}
.ptv-photo{position:absolute;inset:-7%;background:url(${IMG}) center 38%/cover no-repeat;animation:ptvken 26s ease-in-out infinite alternate;}
.ptv-scrim{position:absolute;inset:0;background:linear-gradient(to top,#0a0c12 3%,rgba(10,12,18,.42) 38%,rgba(10,12,18,0) 70%);}
.ptv-vig{position:absolute;inset:0;box-shadow:inset 0 0 100px 26px rgba(5,6,10,.6);pointer-events:none;}
.ptv-scan{position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,229,255,.5),transparent);animation:ptvscan 6.5s linear infinite;opacity:.5;}
.ptv-hud{position:absolute;top:14px;left:16px;right:16px;display:flex;justify-content:space-between;align-items:center;font-family:'JetBrains Mono',monospace;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;z-index:3;}
.ptv-hud .l{color:#eaf0f7;}.ptv-hud .g{color:#bfe9f5;}
.ptv-cr{position:absolute;width:15px;height:15px;border:1.5px solid rgba(255,255,255,.4);z-index:3;}
.ptv-cr.a{top:11px;left:11px;border-right:0;border-bottom:0;}.ptv-cr.b{top:11px;right:11px;border-left:0;border-bottom:0;}.ptv-cr.c{bottom:11px;left:11px;border-right:0;border-top:0;}.ptv-cr.d{bottom:11px;right:11px;border-left:0;border-top:0;}
.ptv-title{position:absolute;left:18px;right:18px;bottom:16px;z-index:3;}
.ptv-title h3{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:1.5rem;letter-spacing:-.01em;color:#fff;margin:0 0 4px;text-shadow:0 2px 14px rgba(0,0,0,.75);}
.ptv-title p{color:#d3dbe6;font-size:.9rem;margin:0;text-shadow:0 1px 8px rgba(0,0,0,.75);}
.ptv-foot{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:18px 20px;}
@media(max-width:560px){.ptv-foot{grid-template-columns:1fr 1fr;gap:10px 16px;}}
.ptv-foot .k{display:block;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:#7d8492;margin-bottom:4px;}
.ptv-foot .v{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.9rem;color:#dfe5ee;}
@keyframes ptvken{0%{transform:scale(1) translate(0,0)}100%{transform:scale(1.12) translate(-1%,-3%)}}
@keyframes ptvscan{0%{top:-2px}100%{top:300px}}
@media(prefers-reduced-motion:reduce){.ptv-photo{animation:none}.ptv-scan{display:none}}
`;
  var HTML = `
<div class="ptv-hero">
 <div class="ptv-photo"></div><div class="ptv-scrim"></div><div class="ptv-vig"></div><div class="ptv-scan"></div>
 <span class="ptv-cr a"></span><span class="ptv-cr b"></span><span class="ptv-cr c"></span><span class="ptv-cr d"></span>
 <div class="ptv-hud"><span class="l">// красные ворота</span><span class="g">55.7720N / 37.6493E</span></div>
 <div class="ptv-title"><h3>БЦ «Красные Ворота»</h3><p>Москва · Садовая-Спасская, 21/1 · у сталинской высотки</p></div>
</div>
<div class="ptv-foot">
 <div><span class="k">метро</span><span class="v">Красные Ворота · 4 мин</span></div>
 <div><span class="k">формат</span><span class="v">Offline + Online</span></div>
 <div><span class="k">язык</span><span class="v">RU</span></div>
</div>`;

  function injectCSS(){ if(!document.getElementById('ptv-style') && document.head){ var s=document.createElement('style'); s.id='ptv-style'; s.textContent=CSS; document.head.appendChild(s); } }
  function findCard(){
    var els=document.querySelectorAll('div,span,p');
    for(var i=0;i<els.length;i++){
      if(els[i].children.length) continue;
      if((els[i].textContent||'').trim().toLowerCase()!=='// venue') continue;
      var n=els[i];
      for(var up=0;up<6 && n.parentElement;up++){ n=n.parentElement; if(n.classList && n.classList.contains('glass')) return n; }
    }
    return null;
  }
  function apply(){
    injectCSS();
    var card=findCard();
    if(!card || card.dataset.ptvDone) return;
    card.dataset.ptvDone='1';
    card.classList.add('ptv-card');
    card.innerHTML=HTML;
    console.log('[venue] карточка заменена на живое фото');
  }
  var n=0, iv=setInterval(function(){ n++; apply(); if(n===15||n===50||n===150){try{mo.disconnect();mo.observe(document,{childList:true,subtree:true});}catch(e){}} if(n>120){ clearInterval(iv); setInterval(apply,1200);} },150);
  apply(); window.addEventListener('load',apply); window.addEventListener('DOMContentLoaded',apply);
  try{ var mo=new MutationObserver(apply); if(document.body) mo.observe(document,{childList:true,subtree:true}); /* observer живёт вечно */ }catch(e){}
})();
