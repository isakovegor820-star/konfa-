/* ============================================================
   TRACKS BENTO ADD-ON — заменяет старую секцию «Шесть потоков»
   на bento-сетку (техно-футуризм, градиенты, hover).
   Переживает пересборку бандла (window + interval).
   ============================================================ */
(function () {
  if (window.__ptTracksAddon) return;
  window.__ptTracksAddon = true;

  var CSS = `
.pt-bento{display:grid!important;grid-template-columns:repeat(4,1fr);grid-auto-rows:165px;gap:14px;
 grid-template-areas:"a a b b" "a a c d" "e e f f";opacity:1!important;transform:none!important;margin-top:18px;}
@media(max-width:900px){.pt-bento{grid-template-columns:repeat(2,1fr);
 grid-template-areas:"a a" "a a" "b b" "c d" "e e" "f f";}}
@media(max-width:560px){.pt-bento{grid-template-columns:1fr;grid-auto-rows:auto;
 grid-template-areas:"a""b""c""d""e""f";}}
.pt-trk{position:relative;overflow:hidden;border-radius:16px;padding:20px;display:flex;flex-direction:column;
 font-family:'Space Grotesk','Inter',system-ui,sans-serif;
 background:
  radial-gradient(120% 120% at 0% 0%, color-mix(in srgb,var(--c1) 26%, transparent), transparent 55%),
  linear-gradient(150deg, color-mix(in srgb,var(--c1) 14%, #0b0e15), color-mix(in srgb,var(--c2) 9%, #090b11));
 border:1px solid color-mix(in srgb,var(--c1) 34%, #1C2230);box-shadow:inset 0 1px 0 rgba(255,255,255,.05);
 transition:transform .22s cubic-bezier(.2,.7,.2,1),box-shadow .22s,border-color .22s;}
.pt-trk::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;
 background:linear-gradient(90deg,var(--c1),var(--c2));opacity:.9;}
.pt-trk::after{content:"";position:absolute;inset:10px;border-radius:10px;pointer-events:none;opacity:.5;
 background:
  linear-gradient(var(--c1),var(--c1)) left top/14px 1.5px no-repeat,
  linear-gradient(var(--c1),var(--c1)) left top/1.5px 14px no-repeat,
  linear-gradient(var(--c1),var(--c1)) right bottom/14px 1.5px no-repeat,
  linear-gradient(var(--c1),var(--c1)) right bottom/1.5px 14px no-repeat;}
.pt-trk:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--c1) 70%, transparent);
 box-shadow:0 16px 40px color-mix(in srgb,var(--c1) 22%, transparent),0 0 0 1px color-mix(in srgb,var(--c1) 40%,transparent);}
.pt-trk.a{grid-area:a;}.pt-trk.b{grid-area:b;}.pt-trk.c{grid-area:c;}.pt-trk.d{grid-area:d;}.pt-trk.e{grid-area:e;}.pt-trk.f{grid-area:f;}
.pt-trk .top{display:flex;justify-content:space-between;align-items:flex-start;}
.pt-trk .hud{font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:10.5px;letter-spacing:.16em;
 text-transform:uppercase;color:color-mix(in srgb,var(--c1) 85%,#fff);}
.pt-trk .num{font-weight:700;font-size:clamp(34px,7vw,64px);line-height:.85;color:transparent;
 -webkit-text-stroke:1.4px color-mix(in srgb,var(--c1) 70%, #888);opacity:.55;}
.pt-trk .ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex:0 0 auto;
 background:color-mix(in srgb,var(--c1) 20%, #0c0f16);border:1px solid color-mix(in srgb,var(--c1) 45%, transparent);}
.pt-trk .ico svg{width:19px;height:19px;stroke:color-mix(in srgb,var(--c1) 90%,#fff);fill:none;stroke-width:1.8;}
.pt-trk .body{margin-top:auto;}
.pt-trk h3{font-weight:700;letter-spacing:-.01em;font-size:18px;margin:14px 0 6px;color:#EAF0F7;}
.pt-trk.a h3{font-size:26px;}
.pt-trk p{color:#AEB8C7;font-size:13.5px;line-height:1.45;margin:0;font-family:'Inter',system-ui,sans-serif;}
.pt-trk.a p{font-size:15px;max-width:42ch;}
.pt-trk .tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px;}
.pt-trk .tags span{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:color-mix(in srgb,var(--c1) 85%,#fff);
 border:1px solid color-mix(in srgb,var(--c1) 35%,transparent);border-radius:999px;padding:3px 9px;
 background:color-mix(in srgb,var(--c1) 8%,transparent);}
.pt-trk .foot{display:flex;justify-content:space-between;align-items:center;margin-top:14px;
 font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#AEB8C7;}
.pt-trk .arr{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
 border:1px solid color-mix(in srgb,var(--c1) 45%,transparent);color:color-mix(in srgb,var(--c1) 90%,#fff);transition:.2s;}
.pt-trk:hover .arr{background:var(--c1);color:#06222a;border-color:var(--c1);transform:translateX(2px);}
.pt-trk .glow{position:absolute;width:180px;height:180px;border-radius:50%;right:-50px;bottom:-60px;pointer-events:none;
 background:radial-gradient(circle,color-mix(in srgb,var(--c1) 30%,transparent),transparent 70%);filter:blur(8px);}`;

  var HTML = `
<article class="pt-trk a" style="--c1:#00E5FF;--c2:#3B82F6">
  <div class="top"><span class="hud">// track · 01 · flagship</span>
   <span class="ico"><svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg></span></div>
  <div class="num">01</div>
  <div class="body"><h3>AI в банкротстве</h3>
   <p>Нейросети для юристов БФЛ: автоматизация анализа сделок, генерация документов, AI-ассистенты в практике.</p>
   <div class="tags"><span>LLM</span><span>автоматизация</span><span>предиктив</span></div>
   <div class="foot"><span>14 сессий</span><span class="arr">→</span></div></div>
  <div class="glow"></div></article>
<article class="pt-trk b" style="--c1:#FF2E9A;--c2:#A855F7">
  <div class="top"><span class="hud">// track · 02</span>
   <span class="ico"><svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 7-7"/><path d="M21 8v5h-5"/></svg></span></div>
  <div class="body"><h3>Масштабирование практики</h3>
   <p>Как вырастить юрбизнес в БФЛ: воронки клиентов, найм, юнит-экономика, упаковка услуг.</p>
   <div class="foot"><span>12 сессий</span><span class="arr">→</span></div></div>
  <div class="glow"></div></article>
<article class="pt-trk c" style="--c1:#7BB8FF;--c2:#6366F1">
  <div class="top"><span class="hud">// 03</span>
   <span class="ico"><svg viewBox="0 0 24 24"><path d="M12 3v18M5 7l7-4 7 4M5 7l3 7H2zM19 7l3 7h-6z"/></svg></span></div>
  <div class="body"><h3>Право и судебная практика</h3>
   <p>Разборы дел, изменения закона 2025–2026, прецеденты.</p>
   <div class="foot"><span>16 сессий</span><span class="arr">→</span></div></div>
  <div class="glow"></div></article>
<article class="pt-trk d" style="--c1:#E8B84B;--c2:#F97316">
  <div class="top"><span class="hud">// 04</span>
   <span class="ico"><svg viewBox="0 0 24 24"><path d="M3 11l15-6v14L3 13zM3 11v2M8 12.5V19l3 1v-6"/></svg></span></div>
  <div class="body"><h3>Продажи и маркетинг</h3>
   <p>Скрипты, чек-листы, контент и performance.</p>
   <div class="foot"><span>11 сессий</span><span class="arr">→</span></div></div>
  <div class="glow"></div></article>
<article class="pt-trk e" style="--c1:#4ADE80;--c2:#14B8A6">
  <div class="top"><span class="hud">// track · 05</span>
   <span class="ico"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="8" r="2.3"/><path d="M16 15c3 0 5 2 5 5"/></svg></span></div>
  <div class="body"><h3>Команда и управление</h3>
   <p>Найм, мотивация, культура. Регулярный менеджмент юриста, KPI и метрики практики.</p>
   <div class="foot"><span>10 сессий</span><span class="arr">→</span></div></div>
  <div class="glow"></div></article>
<article class="pt-trk f" style="--c1:#A78BFA;--c2:#7C3AED">
  <div class="top"><span class="hud">// track · 06</span>
   <span class="ico"><svg viewBox="0 0 24 24"><path d="M3 21h10M6 13l4-4M5 9l5 5M9 5l5 5M13 3l8 8-3 3-8-8z"/></svg></span></div>
  <div class="body"><h3>Арбитражное управление</h3>
   <p>Практика АУ: судебные баталии, работа с реестром, инвентаризация, торги и оспаривание.</p>
   <div class="foot"><span>13 сессий</span><span class="arr">→</span></div></div>
  <div class="glow"></div></article>`;

  function findBox() {
    // 1) точный контейнер карточек в этом бандле
    var box = document.querySelector('[data-dc-tpl="185"]');
    if (box && /TRACK/i.test(box.textContent)) return box;
    // 2) фолбэк: ищем подпись «Каждый поток» и берём следующий блок с карточками
    var subs = [].slice.call(document.querySelectorAll("div,p,section"));
    for (var i = 0; i < subs.length; i++) {
      if (/Каждый поток/.test(subs[i].textContent) && subs[i].children.length === 0) {
        var p = subs[i].parentElement;
        while (p) {
          var sib = p.nextElementSibling;
          if (sib && /TRACK/i.test(sib.textContent)) return sib;
          p = p.parentElement;
          if (p === document.body) break;
        }
      }
    }
    // 3) фолбэк: контейнер, чьи дети содержат "TRACK · 0"
    var all = [].slice.call(document.querySelectorAll("div"));
    for (var j = 0; j < all.length; j++) {
      var el = all[j], kids = el.children, cnt = 0;
      for (var k = 0; k < kids.length; k++) if (/TRACK\s*[·.]?\s*0[1-6]/i.test(kids[k].textContent)) cnt++;
      if (cnt >= 5) return el;
    }
    return null;
  }

  function build() {
    if (document.getElementById("pt-tracks-style")) return true;
    if (!document.body) return false;
    var box = findBox();
    if (!box) return false;
    var st = document.createElement("style"); st.id = "pt-tracks-style"; st.textContent = CSS;
    document.head.appendChild(st);
    box.className = "pt-bento";
    box.removeAttribute("style");
    box.style.opacity = "1"; box.style.transform = "none";
    box.innerHTML = HTML;
    console.log("[tracks-addon] секция «Шесть потоков» заменена на bento");
    return true;
  }

  var tries = 0;
  var iv = setInterval(function () { tries++; if (build() || tries > 240) clearInterval(iv); }, 120);
  if (document.readyState !== "loading") build();
  window.addEventListener("load", build);
  window.addEventListener("DOMContentLoaded", build);
})();
