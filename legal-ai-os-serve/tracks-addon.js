/* ============================================================
   TRACKS BENTO ADD-ON — заменяет старую секцию «Шесть потоков»
   на bento-сетку (техно-футуризм, градиенты, hover).
   Переживает пересборку бандла (window + interval).
   ============================================================ */
(function () {
  if (window.__ptTracksAddon) return;
  window.__ptTracksAddon = true;

  var CSS = `
.pt-bento{display:grid!important;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(165px,auto);gap:14px;
 grid-template-areas:"a a b b" "a a c d" "e e f f";opacity:1!important;transform:none!important;margin-top:18px;}
@media(max-width:900px){.pt-bento{grid-template-columns:repeat(2,1fr);
 grid-template-areas:"a a" "a a" "b b" "c d" "e e" "f f";}}
@media(max-width:560px){.pt-bento{grid-template-columns:1fr;grid-auto-rows:auto;
 grid-template-areas:"a""b""c""d""e""f";}}
.pt-trk{position:relative;overflow:hidden;border-radius:16px;padding:20px;display:flex;flex-direction:column;
 font-family:'Space Grotesk','Inter',system-ui,sans-serif;
 background:radial-gradient(120% 120% at 0% 0%, color-mix(in srgb,var(--c1) 24%, transparent), transparent 55%),
  linear-gradient(150deg, color-mix(in srgb,var(--c1) 13%, #0b0e15), color-mix(in srgb,var(--c2) 9%, #090b11));
 border:1px solid color-mix(in srgb,var(--c1) 32%, #1C2230);box-shadow:inset 0 1px 0 rgba(255,255,255,.05);
 transition:transform .22s cubic-bezier(.2,.7,.2,1),box-shadow .22s,border-color .22s;}
.pt-trk::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;
 background:linear-gradient(90deg,var(--c1),var(--c2));opacity:.9;}
.pt-trk:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--c1) 65%, transparent);
 box-shadow:0 16px 40px color-mix(in srgb,var(--c1) 20%, transparent);}
.pt-trk.a{grid-area:a;}.pt-trk.b{grid-area:b;}.pt-trk.c{grid-area:c;}.pt-trk.d{grid-area:d;}.pt-trk.e{grid-area:e;}.pt-trk.f{grid-area:f;}
.pt-wm{position:absolute;right:14px;bottom:-12px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:92px;line-height:1;
 color:transparent;-webkit-text-stroke:1.5px color-mix(in srgb,var(--c1) 28%, transparent);opacity:.45;pointer-events:none;}
.pt-trk.a .pt-wm{font-size:150px;bottom:-26px;opacity:.35;}
.pt-top{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1;}
.pt-hud{font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:10.5px;letter-spacing:.16em;
 text-transform:uppercase;color:color-mix(in srgb,var(--c1) 88%,#fff);}
.pt-ic{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex:0 0 auto;
 background:color-mix(in srgb,var(--c1) 18%, #0c0f16);border:1px solid color-mix(in srgb,var(--c1) 42%, transparent);}
.pt-trk.a .pt-ic{width:38px;height:38px;}
.pt-ic svg{width:18px;height:18px;stroke:color-mix(in srgb,var(--c1) 90%,#fff);fill:none;stroke-width:1.8;}
.pt-trk.a .pt-ic svg{width:21px;height:21px;}
.pt-bd{margin-top:auto;position:relative;z-index:1;}
.pt-trk.a .pt-bd{margin-top:16px;}
.pt-trk h3{font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-.01em;font-size:19px;margin:14px 0 7px;color:#EAF0F7;}
.pt-trk.a h3{font-size:25px;margin-top:4px;}
.pt-d{color:#AEB8C7;font-size:13px;line-height:1.5;margin:0;font-family:'Inter',system-ui,sans-serif;
 display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.pt-trk.a .pt-d{-webkit-line-clamp:3;font-size:13.5px;}
.pt-feat{margin-top:14px;display:flex;flex-direction:column;gap:8px;}
.pt-feat div{display:flex;align-items:flex-start;gap:9px;font-family:'Inter',system-ui,sans-serif;font-size:12.5px;color:#C6CDD9;line-height:1.4;}
.pt-feat svg{width:15px;height:15px;stroke:var(--c1);fill:none;stroke-width:2.4;margin-top:1px;flex:0 0 auto;}
.pt-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px;}
.pt-tags span{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:color-mix(in srgb,var(--c1) 85%,#fff);
 border:1px solid color-mix(in srgb,var(--c1) 32%,transparent);border-radius:999px;padding:3px 9px;background:color-mix(in srgb,var(--c1) 8%,transparent);}
.pt-ft{display:flex;justify-content:space-between;align-items:center;margin-top:14px;
 font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#AEB8C7;position:relative;z-index:1;}
.pt-trk.a .pt-ft{margin-top:auto;padding-top:14px;border-top:1px solid color-mix(in srgb,var(--c1) 16%,#1C2230);}
.pt-mt{display:flex;gap:16px;align-items:baseline;}
.pt-mt b{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px;color:color-mix(in srgb,var(--c1) 88%,#fff);}
.pt-mt b span{color:#8b92a0;font-weight:400;font-size:11px;margin-left:4px;}
.pt-arr{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto;
 border:1px solid color-mix(in srgb,var(--c1) 45%,transparent);color:color-mix(in srgb,var(--c1) 90%,#fff);transition:.2s;}
.pt-trk:hover .pt-arr{background:var(--c1);color:#06222a;border-color:var(--c1);}`;

  var HTML = `
<article class="pt-trk a" style="--c1:#00E5FF;--c2:#3B82F6">
  <div class="pt-wm">01</div>
  <div class="pt-top"><span class="pt-hud">// track · 01 · flagship</span>
   <span class="pt-ic"><svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg></span></div>
  <div class="pt-bd"><h3>AI в банкротстве</h3>
   <p class="pt-d">Нейросети для юристов БФЛ: от анализа сделок до готовых ассистентов в реальной практике.</p>
   <div class="pt-feat"><div><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>Промпт-инжиниринг под документы БФЛ</div><div><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>AI-анализ сделок и поиск оснований для оспаривания</div><div><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>Сборка AI-ассистентов под рабочие задачи бюро</div></div>
   <div class="pt-tags"><span>LLM</span><span>автоматизация</span><span>предиктив</span></div></div>
  <div class="pt-ft"><div class="pt-mt"><b>14<span>сессий</span></b><b>9<span>экспертов</span></b><b>live</b></div><span class="pt-arr">→</span></div>
</article>
<article class="pt-trk b" style="--c1:#FF2E9A;--c2:#A855F7">
  <div class="pt-wm">02</div>
  <div class="pt-top"><span class="pt-hud">// track · 02</span>
   <span class="pt-ic"><svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 7-7"/><path d="M21 8v5h-5"/></svg></span></div>
  <div class="pt-bd"><h3>Масштабирование практики</h3>
   <p class="pt-d">Как вырастить юрбизнес в БФЛ: воронки клиентов, найм, юнит-экономика, упаковка услуг.</p>
   <div class="pt-tags"><span>юнит-экономика</span><span>найм</span></div></div>
  <div class="pt-ft"><span>12 сессий</span><span class="pt-arr">→</span></div>
</article>
<article class="pt-trk c" style="--c1:#7BB8FF;--c2:#6366F1">
  <div class="pt-wm">03</div>
  <div class="pt-top"><span class="pt-hud">// track · 03</span>
   <span class="pt-ic"><svg viewBox="0 0 24 24"><path d="M12 3v18M5 7l7-4 7 4M5 7l3 7H2zM19 7l3 7h-6z"/></svg></span></div>
  <div class="pt-bd"><h3>Право и судебная практика</h3>
   <p class="pt-d">Разборы дел, изменения закона 2025–2026, ключевые прецеденты ВС РФ.</p>
   <div class="pt-tags"><span>прецеденты</span><span>ФЗ-127</span></div></div>
  <div class="pt-ft"><span>16 сессий</span><span class="pt-arr">→</span></div>
</article>
<article class="pt-trk d" style="--c1:#E8B84B;--c2:#F97316">
  <div class="pt-wm">04</div>
  <div class="pt-top"><span class="pt-hud">// track · 04</span>
   <span class="pt-ic"><svg viewBox="0 0 24 24"><path d="M3 11l15-6v14L3 13zM3 11v2M8 12.5V19l3 1v-6"/></svg></span></div>
  <div class="pt-bd"><h3>Продажи и маркетинг</h3>
   <p class="pt-d">Скрипты, чек-листы, контент и performance-маркетинг для БФЛ.</p>
   <div class="pt-tags"><span>скрипты</span><span>performance</span></div></div>
  <div class="pt-ft"><span>11 сессий</span><span class="pt-arr">→</span></div>
</article>
<article class="pt-trk e" style="--c1:#4ADE80;--c2:#14B8A6">
  <div class="pt-wm">05</div>
  <div class="pt-top"><span class="pt-hud">// track · 05</span>
   <span class="pt-ic"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="8" r="2.3"/><path d="M16 15c3 0 5 2 5 5"/></svg></span></div>
  <div class="pt-bd"><h3>Команда и управление</h3>
   <p class="pt-d">Найм, мотивация, культура. Регулярный менеджмент юриста, KPI и метрики практики.</p>
   <div class="pt-tags"><span>KPI</span><span>культура</span></div></div>
  <div class="pt-ft"><span>10 сессий</span><span class="pt-arr">→</span></div>
</article>
<article class="pt-trk f" style="--c1:#A78BFA;--c2:#7C3AED">
  <div class="pt-wm">06</div>
  <div class="pt-top"><span class="pt-hud">// track · 06</span>
   <span class="pt-ic"><svg viewBox="0 0 24 24"><path d="M3 21h10M6 13l4-4M5 9l5 5M9 5l5 5M13 3l8 8-3 3-8-8z"/></svg></span></div>
  <div class="pt-bd"><h3>Арбитражное управление</h3>
   <p class="pt-d">Практика АУ: судебные баталии, работа с реестром, инвентаризация, торги и оспаривание.</p>
   <div class="pt-tags"><span>реестр</span><span>торги</span></div></div>
  <div class="pt-ft"><span>13 сессий</span><span class="pt-arr">→</span></div>
</article>`;

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
