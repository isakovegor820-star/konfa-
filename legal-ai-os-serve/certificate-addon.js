/* ============================================================
   CERTIFICATE ADD-ON — секция «Сертификат» (таб Академия).
   Вариант «Витрина»: слева текст, справа фиолетовый сертификат
   LegalHunter как парящая 3D-карточка (наклон + float + свечение,
   выравнивание на hover). Заменяет содержимое 2-колоночной сетки.
   Поиск только в <body>, по .glass с «PT-2026-», без блоб-узлов.
   ============================================================ */
(function () {
  if (window.__ptCert) return;
  window.__ptCert = true;

  var CONTENT =
    '<div class="ptc-intro">'
    + '<p class="ptc-eyebrow ptc-reveal">// CERTIFICATION</p>'
    + '<h3 class="ptc-title ptc-reveal d1">Сертификат уровня экспертизы</h3>'
    + '<p class="ptc-desc ptc-reveal d1">Сертификация на каждом из четырёх уровней. Электронный документ с уникальным ID, подтверждение в реестре академии, экспортируемая запись в LinkedIn / hh.</p>'
    + '<ul class="ptc-list ptc-reveal d2">'
    + '<li><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Экзамен из 3 частей · теория, кейс, защита</li>'
    + '<li><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Проходной балл 78%</li>'
    + '<li><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Доступ к закрытому каналу выпускников</li>'
    + '<li><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>Скидка на конференцию «ТехнологИИ права»</li>'
    + '</ul>'
    + '</div>'
    + '<div class="ptc-stage"><div class="ptc-float"><div class="ptc-tilt">'
    + '<article class="ptc-cert" aria-label="Сертификат аттестации LegalHunter">'
    + '<header class="ptc-head"><span class="ptc-brand">LEGALHUNTER</span>'
    + '<span class="ptc-head-mid">Свидетельство об аттестации</span>'
    + '<span class="ptc-head-right">Технологии права</span></header>'
    + '<div class="ptc-rule"></div>'
    + '<div class="ptc-supra"><span>Сертификат аттестации</span><b>RU·ATT</b></div>'
    + '<h4 class="ptc-h1">Сертификат</h4>'
    + '<p class="ptc-conf">Настоящим подтверждается, что</p>'
    + '<p class="ptc-name">Иванов Иван Иванович</p>'
    + '<div class="ptc-name-rule"></div>'
    + '<p class="ptc-body">успешно прошёл курс по программе <em>«ФЗ-127 · 24 акад. часа»</em> и подтвердил освоение ключевых практических аспектов сопровождения процедур банкротства граждан.</p>'
    + '<div class="ptc-divider"></div>'
    + '<div class="ptc-facts">'
    + '<div class="ptc-fact"><span class="lbl">01 Программа</span><span class="val">ФЗ-127 · 24 ч</span></div>'
    + '<div class="ptc-fact"><span class="lbl">02 Формат</span><span class="val">Аттестация</span></div>'
    + '<div class="ptc-fact"><span class="lbl">03 Дата</span><span class="val">27.05.2026</span></div>'
    + '</div>'
    + '<div class="ptc-divider2"></div>'
    + '<footer class="ptc-foot">'
    + '<div class="ptc-serial"><span class="lbl">Сертификат №</span><span class="num">LH-2026-00481</span></div>'
    + '<div class="ptc-sign"><span class="scr">LegalHunter</span><div class="sline"></div><span class="lbl">Подпись комиссии</span></div>'
    + '<div class="ptc-seal"><span class="ptc-seal-ring"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span><span class="lbl">Проверено</span></div>'
    + '</footer>'
    + '</article></div></div></div>';

  var CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700&family=Space+Grotesk:wght@500;600;700&display=swap');

.ptc-host-grid{
  --cyan:#00E5FF;--ink:#fff;--ink2:rgba(255,255,255,.66);
  position:relative;font-family:'Space Grotesk',system-ui,sans-serif;
  max-width:1080px;margin:0 auto !important;
  display:grid !important;grid-template-columns:minmax(280px,1fr) minmax(360px,.92fr) !important;
  gap:clamp(40px,5vw,80px) !important;align-items:center !important;
}
.ptc-host-grid *{box-sizing:border-box;}
@media(max-width:880px){ .ptc-host-grid{grid-template-columns:1fr !important;gap:48px !important;} }

.ptc-eyebrow{font-family:'Montserrat',sans-serif;font-size:12px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--cyan);margin:0 0 22px;}
.ptc-title{font-family:'Space Grotesk','Montserrat',sans-serif;font-weight:600;font-size:clamp(28px,3.4vw,40px);line-height:1.14;margin:0 0 22px;letter-spacing:-.01em;color:#fff;}
.ptc-desc{font-size:16px;line-height:1.65;color:var(--ink2);margin:0 0 30px;max-width:46ch;}
.ptc-list{list-style:none;margin:0;padding:0;display:grid;gap:16px;}
.ptc-list li{position:relative;padding-left:30px;font-size:15px;line-height:1.55;color:rgba(255,255,255,.9);}
.ptc-list li svg{position:absolute;left:0;top:3px;width:14px;height:14px;color:var(--cyan);}

.ptc-stage{perspective:1300px;perspective-origin:55% 42%;display:flex;justify-content:center;align-items:center;padding:28px 6px;}
.ptc-float{animation:ptc-float 6.5s ease-in-out infinite;transform-style:preserve-3d;}
@keyframes ptc-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
.ptc-tilt{position:relative;width:min(440px,82vw);transform-style:preserve-3d;transform:rotateY(-6deg) rotateX(3deg);transition:transform .42s cubic-bezier(.2,.7,.2,1);will-change:transform;}
.ptc-tilt::after{content:"";position:absolute;left:8%;right:8%;bottom:-38px;height:58px;background:radial-gradient(60% 100% at 50% 0%, rgba(106,78,184,.5), rgba(106,78,184,0) 72%);filter:blur(13px);transform:translateZ(-60px);transition:opacity .42s ease,transform .42s ease;z-index:-1;}
.ptc-stage:hover .ptc-float{animation-play-state:paused;}
.ptc-stage:hover .ptc-tilt{transform:rotateY(0deg) rotateX(0deg) translateY(-6px) scale(1.01);}
.ptc-stage:hover .ptc-tilt::after{opacity:.8;transform:translateZ(-60px) translateY(8px) scaleX(1.04);}

.ptc-cert{font-family:'Montserrat',sans-serif;background:linear-gradient(150deg,#6248a9,#503a8f);border:1px solid rgba(255,255,255,.22);border-radius:18px;color:#fff;padding:28px 30px 26px;overflow:hidden;box-shadow:0 2px 0 rgba(255,255,255,.10) inset,0 32px 64px -26px rgba(0,0,0,.7),0 12px 32px -20px rgba(80,58,143,.85);--sec:rgba(255,255,255,.66);--line:rgba(255,255,255,.22);}
.ptc-head{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px 14px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;}
.ptc-brand{font-weight:800;letter-spacing:.18em;font-size:12px;min-width:0;}
.ptc-head-right{font-weight:600;color:rgba(255,255,255,.82);text-align:right;min-width:0;}
.ptc-head-mid{order:3;flex:0 0 100%;text-align:center;display:flex;align-items:center;justify-content:center;gap:10px;color:rgba(255,255,255,.86);letter-spacing:.2em;font-weight:600;font-size:9px;}
.ptc-head-mid::before,.ptc-head-mid::after{content:"";height:1px;width:20px;background:rgba(255,255,255,.4);flex:none;}
.ptc-rule{height:1px;background:var(--line);margin:16px 0 0;}
.ptc-supra{margin:18px 0 10px;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--sec);display:flex;gap:12px;align-items:baseline;}
.ptc-supra b{color:rgba(255,255,255,.82);font-weight:700;}
.ptc-h1{font-weight:800;font-size:clamp(30px,4.4vw,40px);line-height:1;letter-spacing:-.015em;margin:0 0 20px;}
.ptc-conf{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--sec);margin:0 0 10px;}
.ptc-name{font-weight:700;font-size:clamp(20px,2.6vw,24px);line-height:1.25;letter-spacing:.01em;margin:0;}
.ptc-name-rule{height:1px;background:var(--line);margin:12px 0 18px;}
.ptc-body{font-size:12.5px;line-height:1.6;color:rgba(255,255,255,.88);margin:0 0 20px;}
.ptc-body em{font-style:normal;font-weight:600;color:#fff;}
.ptc-divider,.ptc-divider2{height:1px;background:var(--line);margin:0 0 20px;}
.ptc-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:0 0 22px;}
.ptc-fact{position:relative;padding-left:12px;}
.ptc-fact::before{content:"";position:absolute;left:0;top:2px;width:2px;height:26px;background:rgba(255,255,255,.45);border-radius:2px;}
.ptc-fact .lbl{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--sec);display:block;line-height:1.5;margin-bottom:7px;}
.ptc-fact .val{font-size:13px;font-weight:700;line-height:1.5;color:#fff;}
.ptc-foot{display:grid;grid-template-columns:1.1fr 1.2fr .8fr;gap:18px;align-items:end;}
.ptc-foot .lbl{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--sec);display:block;line-height:1.5;}
.ptc-serial .num{font-weight:700;font-size:14px;letter-spacing:.08em;display:block;margin-top:8px;}
.ptc-sign{text-align:center;}
.ptc-sign .scr{font-style:italic;font-weight:700;font-size:19px;line-height:1;}
.ptc-sign .sline{height:1px;background:rgba(255,255,255,.55);margin:8px 0 9px;}
.ptc-seal{display:flex;flex-direction:column;align-items:center;gap:8px;}
.ptc-seal-ring{width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(255,255,255,.6);display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);}
.ptc-seal-ring svg{width:21px;height:21px;color:#fff;}
.ptc-seal .lbl{text-align:center;}
@media(max-width:520px){
  .ptc-cert{padding:24px 20px 22px;}
  .ptc-head-mid{display:none;}
  .ptc-facts{grid-template-columns:1fr;gap:16px;}
  .ptc-foot{grid-template-columns:1fr;gap:18px;text-align:left;}
  .ptc-sign,.ptc-seal{align-items:flex-start;}
  .ptc-sign{text-align:left;}
}
.ptc-reveal{opacity:0;transform:translateY(16px);animation:ptc-in .5s ease-out forwards;}
.ptc-reveal.d1{animation-delay:.06s;}
.ptc-reveal.d2{animation-delay:.14s;}
@keyframes ptc-in{to{opacity:1;transform:translateY(0);}}
@media (prefers-reduced-motion:reduce){
  .ptc-float{animation:none !important;}
  .ptc-tilt{transition:none !important;}
  .ptc-reveal{animation:none !important;opacity:1;transform:none;}
  .ptc-stage:hover .ptc-tilt{transform:rotateY(-6deg) rotateX(3deg);}
}
`;

  function injectCSS() {
    if (!document.getElementById("pt-cert-style") && (document.head || document.documentElement)) {
      var s = document.createElement("style"); s.id = "pt-cert-style"; s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
  }

  function findCard() {
    if (!document.body) return null;
    var cards = [].slice.call(document.body.querySelectorAll(".glass"));
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      if (c.querySelector('script[type^="__bundler"]')) continue; // страховка: не трогаем блобы
      var t = c.textContent || "";
      if (t.indexOf("PT-2026-") >= 0 || /CERTIFICATE\s*ID/i.test(t)) return c;
    }
    return null;
  }

  function render(card) {
    var grid = card && card.parentElement;
    if (!grid || grid.dataset.ptCert === "1") return;
    if (!grid.contains(card)) return;
    grid.dataset.ptCert = "1";
    grid.classList.add("ptc-host-grid");
    grid.innerHTML = CONTENT;
  }

  function apply() {
    injectCSS();
    var c = findCard();
    if (c) render(c);
  }

  var n = 0, iv = setInterval(function () { n++; apply(); if (n > 250) clearInterval(iv); }, 200);
  apply();
  window.addEventListener("load", apply);
  window.addEventListener("DOMContentLoaded", apply);
  try {
    var mo = new MutationObserver(function () {
      var c = findCard();
      if (c && c.parentElement && c.parentElement.dataset.ptCert !== "1") apply();
    });
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 60000);
  } catch (e) {}
})();
