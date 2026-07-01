/* ============================================================
   DATACHART ADD-ON — блок «Рост рынка БФЛ · 2018–2026»
   (таб Исследования, секция «Featured chart»).
   Дизайн V3 «Underline-табы + 2-кол дашборд»: подчёркивание-табы
   переключают 3 метрики (Кейсы БФЛ / Темп роста / Объём рынка),
   график плавно перетекает (rAF-морфинг), hero-число и чипы
   докручиваются (count-up). Слева hero+чипы, справа комбо
   столбцы+неоновая линия, прогноз-2026 пунктиром.

   УСТОЙЧИВОСТЬ К dc-runtime: рантайм гидрирует/клонирует DOM и
   сносит JS-обработчики/замыкания. Поэтому:
   • клики ловим ДЕЛЕГАЦИЕЙ на document (переживает пересборку);
   • всё состояние перечитываем из DOM, текущая метрика хранится
     в data-атрибуте карточки (переживает клонирование);
   • базово рисуем финал сразу + setTimeout-страховка дорисует
     финал, если rAF задушен (фон/headless).
   Anchor — заголовок в шапке (вне заменяемой зоны → без рекурсии).
   ============================================================ */
(function () {
  if (window.__ptDatachart) return;
  window.__ptDatachart = true;

  var YEARS = ["2018","2019","2020","2021","2022","2023","2024","2026e"];
  var M = {
    cases:{tab:"Кейсы БФЛ",yMax:450,ticks:[0,150,300,450],vals:[44,69,119,193,223,268,332],proj:410,
      hero:{l:"2024 · кейсов БФЛ",n:332,u:"K"},
      chips:[{l:"YoY · рост",p:"+",n:24,s:"%",c:"#00E5FF"},{l:"прогноз · 2026",p:"≈ ",n:410,s:"K",c:"#FF2E9A"}]},
    growth:{tab:"Темп роста",yMax:80,ticks:[0,40,80],vals:[38,57,72,62,16,20,24],proj:23,
      hero:{l:"2024 · YoY",n:24,u:"%"},
      chips:[{l:"средний · 7 лет",p:"+",n:41,s:"%",c:"#00E5FF"},{l:"прогноз · 2026",p:"+",n:23,s:"%",c:"#FF2E9A"}]},
    revenue:{tab:"Объём рынка",yMax:200,ticks:[0,100,200],vals:[12,19,33,54,72,95,128],proj:175,
      hero:{l:"2024 · объём рынка",n:128,u:" млрд ₽"},
      chips:[{l:"YoY · рост",p:"+",n:35,s:"%",c:"#00E5FF"},{l:"прогноз · 2026",p:"≈ ",n:175,s:" млрд",c:"#FF2E9A"}]}
  };
  var KEYS = ["cases","growth","revenue"];

  var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
.pt-gdash{font-family:'Space Grotesk',system-ui,sans-serif;}
.pt-gdash *{box-sizing:border-box;}
.pt-gdash .ut{position:relative;display:flex;gap:2px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:26px;}
.pt-gdash .ut-btn{appearance:none;border:0;background:transparent;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13px;letter-spacing:.04em;color:#9aa3b4;padding:12px 18px 14px;transition:color .28s;white-space:nowrap;}
.pt-gdash .ut-btn:hover{color:#fff;}
.pt-gdash .ut-btn.act{color:#00E5FF;}
.pt-gdash .ut-btn:focus-visible{outline:2px solid #00E5FF;outline-offset:-4px;border-radius:6px;}
.pt-gdash .ut-ink{position:absolute;bottom:-1px;left:0;height:2px;border-radius:2px;background:#00E5FF;box-shadow:0 0 10px rgba(0,229,255,.8);transition:transform .42s cubic-bezier(.34,1.4,.5,1),width .42s cubic-bezier(.34,1.4,.5,1);}
.pt-gdash .gd-2col{display:grid;grid-template-columns:300px minmax(0,1fr);gap:34px;align-items:center;}
.pt-gdash .gd-hero-l{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#6b7385;margin-bottom:12px;}
.pt-gdash .gd-hero-v{font-weight:700;font-size:clamp(46px,5.5vw,68px);line-height:.92;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:#fff;}
.pt-gdash .gd-hero-u{font-size:.42em;color:#9aa3b4;font-weight:600;margin-left:4px;letter-spacing:0;}
.pt-gdash .gd-chips{display:flex;flex-direction:column;gap:12px;margin-top:26px;}
.pt-gdash .gd-chip{display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:13px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(7,9,16,.4);}
.pt-gdash .gd-chip-l{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b7385;}
.pt-gdash .gd-chip-v{font-weight:700;font-size:20px;font-variant-numeric:tabular-nums;letter-spacing:-.01em;}
.pt-gdash .gd-chart{width:100%;display:block;overflow:visible;}
.pt-gdash .gd-bar rect.b{transition:filter .2s;}
.pt-gdash .gd-bar:hover rect.b{filter:brightness(1.2);}
.pt-gdash .gd-grid line{stroke:rgba(255,255,255,.06);}
.pt-gdash .gd-axis{font-family:'JetBrains Mono',monospace;font-size:11px;fill:#6b7385;}
.pt-gdash .gd-xlab{font-family:'JetBrains Mono',monospace;font-size:12px;fill:#9aa3b4;letter-spacing:.02em;}
.pt-gdash .gd-xlab.fc{fill:#00E5FF;}
.glass.pt-gd-host:hover{transform:none !important;}
@media(max-width:820px){.pt-gdash .gd-2col{grid-template-columns:1fr;gap:22px;}.pt-gdash .gd-hero-v{font-size:clamp(40px,12vw,60px);}.pt-gdash .gd-chips{flex-direction:row;flex-wrap:wrap;}.pt-gdash .gd-chip{flex:1;flex-direction:column;align-items:flex-start;gap:6px;}}
@media(prefers-reduced-motion:reduce){.pt-gdash .ut-btn,.pt-gdash .ut-ink,.pt-gdash .gd-bar rect.b{transition:none !important;}}
`;

  function injectCSS() {
    if (!document.getElementById("pt-gdash-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-gdash-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }

  var NS = "http://www.w3.org/2000/svg";
  function el(t, a) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function reduce() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  // геометрия графика
  var PL=46,PR=16,PT=20,PB=36,W=720,H=360;
  var plotW=W-PL-PR, plotH=H-PT-PB, bottom=PT+plotH, N=8, slot=plotW/N, bw=Math.min(34, slot-12);
  function cx(i){return PL+i*slot+slot/2;}
  function yOf(v,yMax){return bottom-(v/yMax)*plotH;}
  function smooth(pts){
    if (pts.length < 2) return "";
    var d = "M" + pts[0][0] + "," + pts[0][1];
    for (var i=0;i<pts.length-1;i++){
      var p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||pts[i+1];
      var c1x=p1[0]+(p2[0]-p0[0])/6,c1y=p1[1]+(p2[1]-p0[1])/6,c2x=p2[0]-(p3[0]-p1[0])/6,c2y=p2[1]-(p3[1]-p1[1])/6;
      d += "C"+c1x+","+c1y+" "+c2x+","+c2y+" "+p2[0]+","+p2[1];
    }
    return d;
  }

  function markup(uid) {
    return '<div class="ut" data-r="ut" role="tablist"><span class="ut-ink" data-r="ink"></span></div>'
      + '<div class="gd-2col"><div class="gd-left">'
      +   '<div class="gd-hero-l" data-r="heroL"></div>'
      +   '<div class="gd-hero-v"><span data-r="heroV">0</span><span class="gd-hero-u" data-r="heroU"></span></div>'
      +   '<div class="gd-chips" data-r="chips"></div>'
      + '</div><div class="gd-right">'
      +   '<svg class="gd-chart" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid meet" role="img" aria-label="График роста рынка БФЛ">'
      +     '<defs><linearGradient id="ptbarg' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#18cfe6" stop-opacity=".85"/><stop offset="1" stop-color="#0a3a52" stop-opacity=".5"/></linearGradient>'
      +     '<filter id="ptglow' + uid + '" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'
      +     '<g class="gd-grid" data-r="grid"></g><g data-r="axis"></g><g data-r="bars"></g>'
      +     '<path data-r="line" fill="none" stroke="#FF2E9A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" filter="url(#ptglow' + uid + ')"/>'
      +     '<path data-r="lineFc" fill="none" stroke="#FF2E9A" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="7 6" opacity=".85"/>'
      +     '<g data-r="dots"></g><g data-r="xlabs"></g>'
      +   '</svg>'
      + '</div></div>';
  }

  function drawAxis(gridLines, yLabs, m) {
    for (var t=0;t<4;t++){
      if (t<m.ticks.length){var v=m.ticks[t],y=yOf(v,m.yMax);
        if(gridLines[t]){gridLines[t].setAttribute("y1",y);gridLines[t].setAttribute("y2",y);gridLines[t].setAttribute("opacity",1);}
        if(yLabs[t]){yLabs[t].setAttribute("y",y+4);yLabs[t].textContent=(m===M.cases)?(v+"K"):(m===M.growth?(v+"%"):v);yLabs[t].setAttribute("opacity",1);}
      } else { if(gridLines[t])gridLines[t].setAttribute("opacity",0); if(yLabs[t])yLabs[t].setAttribute("opacity",0); }
    }
  }

  // Перерисовать метрику. Все узлы перечитываются из card (устойчиво к клонированию).
  function drawMetric(card, key, opts) {
    opts = opts || {};
    var m = M[key]; if (!m || !card) return;
    var bars = card.querySelectorAll('.gd-bar rect.b');
    var dots = card.querySelectorAll('[data-r="dots"] circle');
    var line = card.querySelector('[data-r="line"]'), lineFc = card.querySelector('[data-r="lineFc"]');
    var gridLines = card.querySelectorAll('[data-r="grid"] line'), yLabs = card.querySelectorAll('[data-r="axis"] text');
    var heroV = card.querySelector('[data-r="heroV"]'), heroU = card.querySelector('[data-r="heroU"]'), heroL = card.querySelector('[data-r="heroL"]');
    var chipL = card.querySelectorAll('.gd-chip-l'), chipV = card.querySelectorAll('.gd-chip-v');
    var btns = card.querySelectorAll('.ut-btn'), ink = card.querySelector('[data-r="ink"]');
    if (!bars.length || !heroV || bars.length < N) return;

    var idx = KEYS.indexOf(key);
    [].forEach.call(btns, function (b) { b.classList.toggle("act", b.getAttribute("data-key") === key); });
    if (ink && btns[idx] && btns[idx].offsetWidth) { ink.style.width = btns[idx].offsetWidth + "px"; ink.style.transform = "translateX(" + btns[idx].offsetLeft + "px)"; }
    drawAxis(gridLines, yLabs, m);

    heroL.textContent = m.hero.l; heroU.textContent = m.hero.u;
    for (var z=0;z<2;z++){ if(chipL[z]) chipL[z].textContent = m.chips[z].l; if(chipV[z]) chipV[z].style.color = m.chips[z].c; }

    var target = m.vals.concat([m.proj]), th = m.hero.n, tc = m.chips.map(function(c){return c.n;});
    var prevKey = card.dataset.ptKey || key, pm = M[prevKey] || m;
    var sV = opts.from0 ? [] : pm.vals.concat([pm.proj]);
    if (opts.from0) for (var i0=0;i0<N;i0++) sV.push(0);
    var sH = opts.from0 ? 0 : pm.hero.n, sC = opts.from0 ? [0,0] : pm.chips.map(function(c){return c.n;});
    card.dataset.ptKey = key;

    function frame(vals, hero, chips) {
      var pts = [];
      for (var i=0;i<N;i++){var y=yOf(vals[i],m.yMax),h=Math.max(0,bottom-y);bars[i].setAttribute("y",y);bars[i].setAttribute("height",h);if(dots[i]){dots[i].setAttribute("cx",cx(i));dots[i].setAttribute("cy",y);}pts.push([cx(i),y]);}
      if(line) line.setAttribute("d",smooth(pts.slice(0,7)));
      if(lineFc) lineFc.setAttribute("d","M"+pts[6][0]+","+pts[6][1]+"L"+pts[7][0]+","+pts[7][1]);
      heroV.textContent = Math.round(hero);
      for (var z=0;z<2;z++){ if(chipV[z]) chipV[z].textContent = m.chips[z].p + Math.round(chips[z]) + m.chips[z].s; }
    }

    if (!(opts.animate && !reduce())) { frame(target, th, tc); return; }
    if (card.__ptRaf) cancelAnimationFrame(card.__ptRaf);
    if (card.__ptFbk) clearTimeout(card.__ptFbk);
    var t0=null, D=760;
    function ease(t){return 1-Math.pow(1-t,3);}
    function step(ts){if(t0==null)t0=ts;var p=Math.min(1,(ts-t0)/D),e=ease(p);
      var vv=[];for(var i=0;i<N;i++)vv.push(sV[i]+(target[i]-sV[i])*e);
      frame(vv, sH+(th-sH)*e, [sC[0]+(tc[0]-sC[0])*e, sC[1]+(tc[1]-sC[1])*e]);
      if(p<1) card.__ptRaf=requestAnimationFrame(step);}
    card.__ptRaf=requestAnimationFrame(step);
    // отказоустойчивость: если rAF задушен — гарантированно ставим финал на живой карточке
    card.__ptFbk=setTimeout(function(){ var live=findCard(); if(live) drawMetric(live, key, {animate:false}); }, D+280);
  }

  function buildCard(card) {
    if (!card) return;
    if (card.dataset.ptGd === "1" && card.querySelector(".ut-btn")) return; // уже построено
    card.dataset.ptGd = "1";
    if (!card.dataset.ptKey) card.dataset.ptKey = "cases";
    card.classList.add("pt-gdash", "pt-gd-host");
    var uid = (window.__ptGdN = (window.__ptGdN || 0) + 1);
    card.innerHTML = markup(uid);

    var gBars=card.querySelector('[data-r="bars"]'),gDots=card.querySelector('[data-r="dots"]'),gGrid=card.querySelector('[data-r="grid"]'),gAxis=card.querySelector('[data-r="axis"]'),gX=card.querySelector('[data-r="xlabs"]'),ut=card.querySelector('[data-r="ut"]'),chipsBox=card.querySelector('[data-r="chips"]');
    for (var i=0;i<N;i++){
      var fc=(i===N-1), g=el("g",{class:"gd-bar"});
      g.appendChild(el("rect",{class:"b",x:cx(i)-bw/2,width:bw,rx:5,ry:5,fill:fc?"none":"url(#ptbarg"+uid+")",stroke:fc?"#18cfe6":"none","stroke-width":fc?1.8:0,"stroke-dasharray":fc?"6 5":"0",opacity:fc?".9":1,y:bottom,height:0}));
      gBars.appendChild(g);
      gDots.appendChild(el("circle",{r:fc?4.5:3.6,fill:"#FF2E9A",cx:cx(i),cy:bottom}));
      var xl=el("text",{class:"gd-xlab"+(fc?" fc":""),"text-anchor":"middle",x:cx(i),y:bottom+24}); xl.textContent=YEARS[i]; gX.appendChild(xl);
    }
    for (var t=0;t<4;t++){ gGrid.appendChild(el("line",{x1:PL,x2:W-PR,y1:bottom,y2:bottom,opacity:0})); gAxis.appendChild(el("text",{class:"gd-axis","text-anchor":"end",x:PL-10,opacity:0})); }
    KEYS.forEach(function(key,idx){var b=document.createElement("button");b.className="ut-btn"+(idx===0?" act":"");b.type="button";b.setAttribute("role","tab");b.setAttribute("data-key",key);b.textContent=M[key].tab;ut.appendChild(b);});
    for (var z=0;z<2;z++){var d2=document.createElement("div");d2.className="gd-chip";d2.innerHTML='<span class="gd-chip-l"></span><span class="gd-chip-v"></span>';chipsBox.appendChild(d2);}

    var startKey = card.dataset.ptKey;
    drawMetric(card, startKey, {animate:false});           // финал сразу — никогда не пусто
    if ("IntersectionObserver" in window) {                 // вход: 0→финал при появлении в кадре
      var io=new IntersectionObserver(function(es){for(var k=0;k<es.length;k++){if(es[k].isIntersecting){drawMetric(card, card.dataset.ptKey||"cases", {from0:true, animate:true});io.disconnect();break;}}},{threshold:0.15});
      io.observe(card);
    }
  }

  function findCard() {
    if (!document.body) return null;
    var hs = [].slice.call(document.body.querySelectorAll("h1,h2,h3,h4"));
    var h = null;
    for (var i=0;i<hs.length;i++){ if (/Рост рынка БФЛ/i.test(hs[i].textContent||"")){ h=hs[i]; break; } }
    if (!h) return null;
    var sec = h.closest("section"); if (!sec) return null;
    if (sec.querySelector('script[type^="__bundler"]')) return null; // страховка: не трогаем блобы
    return sec.querySelector(".glass");
  }

  // делегирование кликов на document — переживает пересборку/клонирование DOM рантаймом
  if (!window.__ptGdClick) {
    window.__ptGdClick = true;
    document.addEventListener("click", function (e) {
      var btn = e.target && e.target.closest && e.target.closest(".pt-gdash .ut-btn");
      if (!btn) return;
      var card = btn.closest(".pt-gdash"), key = btn.getAttribute("data-key");
      if (card && key) drawMetric(card, key, {animate:true});
    });
    window.addEventListener("resize", function () { var c = findCard(); if (c && c.dataset.ptKey) drawMetric(c, c.dataset.ptKey, {animate:false}); });
  }

  function apply() { injectCSS(); var c = findCard(); if (c) buildCard(c); }

  var n=0, iv=setInterval(function(){n++;apply();if(n>250)clearInterval(iv);},200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo=new MutationObserver(function(){var c=findCard();if(c&&(c.dataset.ptGd!=="1"||!c.querySelector(".ut-btn")))buildCard(c);});
    if (document.body) mo.observe(document.body,{childList:true,subtree:true});
    setTimeout(function(){mo.disconnect();},60000);
  } catch(e) {}
})();
