/* ============================================================
   INTRO ADD-ON — кинематографический заход на сайт.
   Оверлей на загрузке: полёт (космос→Земля→Москва→ворота) →
   гейт «Добро пожаловать» + «Войти на сайт». 1 раз за сессию.
   Мобайл / prefers-reduced-motion → лёгкий статичный гейт (без видео).
   Монтируется в <html> + ретрай: переживает пересборку body dc-runtime.
   ============================================================ */
(function () {
  if (window.__ptIntro) return;
  window.__ptIntro = true;
  try { if (sessionStorage.getItem("pt_intro_seen") === "1") return; } catch (e) {}

  var reduce = false, small = false;
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; small = matchMedia("(max-width:760px)").matches; } catch (e) {}
  try { var iw = window.innerWidth || 0; if (iw > 0 && iw <= 760) small = true; } catch (e) {} // запасной детект мобайла
  var light = reduce || small; // без тяжёлого видео
  var closed = false;

  var CSS = `
#pt-intro{position:fixed;inset:0;z-index:2147483640;background:#000;opacity:1;transition:opacity .9s ease;}
#pt-intro.pt-out{opacity:0;pointer-events:none;}
#pt-intro-v{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
#pt-intro .pt-gate{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity 1s ease;}
#pt-intro .pt-gate.on{opacity:1;pointer-events:auto;}
#pt-intro .pt-gbg{position:absolute;inset:0;background:url('intro-door.jpg') center 55%/cover no-repeat;transform-origin:50% 55%;}
#pt-intro .pt-gate.on .pt-gbg{animation:ptgapproach 6s cubic-bezier(.2,.6,.2,1) forwards;}
@keyframes ptgapproach{from{transform:scale(1.02)}to{transform:scale(1.14)}}
#pt-intro .pt-gscrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,6,10,.9),rgba(5,6,10,.25) 48%,rgba(5,6,10,.6));}
#pt-intro .pt-gct{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 24px;opacity:0;transform:translateY(14px);}
#pt-intro .pt-gate.on .pt-gct{animation:ptgrise 1.1s ease-out 1.2s forwards;}
@keyframes ptgrise{to{opacity:1;transform:none;}}
#pt-intro .pt-gcap{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:#00E5FF;margin:0 0 16px;}
#pt-intro h1{font-family:'Space Grotesk',system-ui,sans-serif;font-weight:700;font-size:clamp(32px,6vw,58px);line-height:1.05;color:#fff;margin:0 0 14px;text-shadow:0 6px 36px rgba(0,0,0,.7);}
#pt-intro h1 b{background:linear-gradient(90deg,#00E5FF,#FF2E9A);-webkit-background-clip:text;background-clip:text;color:transparent;}
#pt-intro .pt-gsub{font-size:16px;line-height:1.5;color:#dce4ee;margin:0 0 32px;text-shadow:0 2px 14px rgba(0,0,0,.8);}
#pt-intro .pt-genter{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:16px;color:#06222a;background:#00E5FF;border:0;border-radius:12px;padding:16px 34px;cursor:pointer;box-shadow:0 0 0 1px rgba(0,229,255,.4),0 14px 44px rgba(0,229,255,.4);transition:transform .2s,box-shadow .2s;}
#pt-intro .pt-genter:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(0,229,255,.7),0 18px 56px rgba(0,229,255,.55);}
#pt-intro .pt-gskip{position:absolute;top:18px;right:20px;z-index:5;font-family:'JetBrains Mono',monospace;font-weight:500;font-size:13px;color:#9aa6b8;background:rgba(7,8,11,.6);border:1px solid #1c2230;border-radius:999px;padding:9px 16px;cursor:pointer;}
#pt-intro .pt-gskip:hover{color:#00E5FF;border-color:#00E5FF;}
#pt-intro.pt-noanim .pt-gbg{animation:none !important;}
#pt-intro.pt-noanim .pt-gct{animation:none !important;opacity:1 !important;transform:none !important;}
`;

  function openGate() { var ov = document.getElementById("pt-intro"); var g = ov && ov.querySelector(".pt-gate"); if (g) g.classList.add("on"); }
  function done() {
    closed = true;
    try { sessionStorage.setItem("pt_intro_seen", "1"); } catch (e) {}
    var ov = document.getElementById("pt-intro");
    if (ov) {
      ov.classList.add("pt-out");
      setTimeout(function () {
        var o = document.getElementById("pt-intro"); if (o && o.parentNode) o.parentNode.removeChild(o);
        var s = document.getElementById("pt-intro-style"); if (s && s.parentNode) s.parentNode.removeChild(s);
      }, 950);
    }
  }

  function mount() {
    if (closed) return;
    var root = document.documentElement; // монтируем в <html> — переживает пересборку body
    if (!document.getElementById("pt-intro-style")) {
      var st = document.createElement("style"); st.id = "pt-intro-style"; st.textContent = CSS; root.appendChild(st);
    }
    if (document.getElementById("pt-intro")) return; // уже на месте
    var ov = document.createElement("div"); ov.id = "pt-intro";
    if (reduce) ov.className = "pt-noanim";
    ov.innerHTML =
      (light ? "" : '<video id="pt-intro-v" src="intro.mp4" autoplay muted playsinline preload="auto"></video>') +
      '<div class="pt-gate' + (light ? " on" : "") + '">' +
        '<div class="pt-gbg"></div><div class="pt-gscrim"></div>' +
        '<div class="pt-gct">' +
          '<p class="pt-gcap">// прибытие · красные ворота</p>' +
          '<h1>Добро пожаловать на<br><b>«ТехнологИИ права»</b></h1>' +
          '<p class="pt-gsub">Конференция · 25–26 сентября 2026 · Москва, БЦ «Красные Ворота»</p>' +
          '<button class="pt-genter">Войти на сайт →</button>' +
        '</div>' +
      '</div>' +
      '<button class="pt-gskip">Пропустить ↦</button>';
    root.appendChild(ov);
    ov.querySelector(".pt-genter").addEventListener("click", done);
    ov.querySelector(".pt-gskip").addEventListener("click", done);
    if (!light) {
      var v = ov.querySelector("#pt-intro-v");
      if (v) {
        v.addEventListener("ended", openGate);
        var p = v.play && v.play(); if (p && p.catch) p.catch(openGate);
        setTimeout(function () { var vv = document.getElementById("pt-intro-v"); if (vv && vv.paused && vv.currentTime === 0) openGate(); }, 1600);
      } else { openGate(); }
    }
  }

  mount();
  var n = 0, iv = setInterval(function () { n++; mount(); if (n > 25 || closed) clearInterval(iv); }, 200); // ретрай ~5с: переживает boot-перерисовку
})();
