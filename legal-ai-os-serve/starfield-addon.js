/* ============================================================
   STARFIELD ADD-ON — звёздный космический фон всего сайта
   вместо «клетчатого» грида. Canvas z-index:-1 за контентом
   (над тёмным body). Звёзды НЕ мигают — дрейф + параллакс
   (мышь и скролл). Туманность очень мягкая, чтобы не мешать
   тексту. Мобайл — меньше частиц; reduced-motion — статичный кадр.
   Монтаж в <html> + ретрай: переживает пересборку body dc-runtime.
   ============================================================ */
(function () {
  if (window.__ptStars) return;
  window.__ptStars = true;

  var reduce = false, small = false;
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  try { var iw = window.innerWidth || 0; if (iw > 0 && iw <= 760) small = true; } catch (e) {}

  var CSS =
    "#pt-stars{position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;display:block;}" +
    /* тёмную базу держит <html>, body делаем прозрачным — иначе он закрывает canvas z:-1 */
    "html{background-color:#07080b !important;}" +
    "body{background-color:transparent !important;}" +
    /* главная full-page обёртка тоже непрозрачная — пробиваем, чтобы canvas был виден за контентом */
    'div[style*="min-height: 100vh"][style*="rgb(7, 8, 11)"]{background:transparent !important;}' +
    /* убрать клетчатый грид и скан-линии (оставляем нижнюю виньетку и cyan-свечения body) */
    'div[style*="229, 255, 0.04) 1px"]{background-image:none !important;}' +
    'div[style*="255, 255, 0.01)"]{background-image:none !important;}';

  function mountStyle() {
    if (!document.getElementById("pt-stars-style")) {
      var st = document.createElement("style"); st.id = "pt-stars-style"; st.textContent = CSS;
      document.documentElement.appendChild(st);
    }
  }

  var c, ctx, W = 1280, H = 800, DPR = Math.min(window.devicePixelRatio || 1, 2);
  function size() {
    if (!c) return;
    W = window.innerWidth || document.documentElement.clientWidth || 1280;
    H = window.innerHeight || document.documentElement.clientHeight || 800;
    c.width = Math.max(1, Math.round(W * DPR)); c.height = Math.max(1, Math.round(H * DPR));
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (!running) drawFrame(performance.now()); // статичный кадр перерисовать
  }
  function ensureCanvas() {
    if (document.getElementById("pt-stars")) { if (!c) { c = document.getElementById("pt-stars"); ctx = c.getContext("2d"); size(); } return; }
    c = document.createElement("canvas"); c.id = "pt-stars";
    document.documentElement.appendChild(c);
    ctx = c.getContext("2d"); size();
  }

  function mb(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  var rnd = mb(20260925);
  var N = small ? 70 : 160;
  var stars = [];
  for (var i = 0; i < N; i++) stars.push({ x: rnd(), y: rnd(), d: 0.2 + rnd() * 0.8, vx: (rnd() - 0.5) * 0.00006 });
  var blobs = [
    { x: .16, y: .22, r: .50, col: [0, 229, 255], ph: 0.0 },
    { x: .86, y: .38, r: .55, col: [255, 46, 154], ph: 2.2 },
    { x: .52, y: .82, r: .60, col: [0, 229, 255], ph: 4.1 }
  ];

  var mx = 0, my = 0, tmx = 0, tmy = 0, scroll = 0, tscroll = 0;
  if (!small) {
    window.addEventListener("mousemove", function (e) { tmx = (e.clientX / (W || 1) - 0.5); tmy = (e.clientY / (H || 1) - 0.5); }, { passive: true });
  }
  window.addEventListener("scroll", function (e) {
    var v = 0; try { var t = e.target; if (t && t.scrollTop != null) v = t.scrollTop; } catch (er) {}
    var w = window.scrollY || document.documentElement.scrollTop || 0;
    tscroll = Math.max(v, w);
  }, true);

  var running = !reduce;
  var t0 = performance.now();
  function drawFrame(now) {
    if (!ctx) return;
    var t = (now - t0) / 1000;
    mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04; scroll += (tscroll - scroll) * 0.08;
    ctx.clearRect(0, 0, W, H);
    // мягкая туманность
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < blobs.length; i++) {
      var bl = blobs[i];
      var br = 0.5 + 0.5 * Math.sin(t * 0.12 + bl.ph);
      var bx = (bl.x + Math.sin(t * 0.05 + bl.ph) * 0.05 + mx * 0.04 * (i % 2 ? 1 : -1)) * W;
      var by = (bl.y + Math.cos(t * 0.045 + bl.ph) * 0.04) * H + my * 0.03 * H - scroll * 0.02;
      var rr = bl.r * Math.max(W, H) * (0.8 + 0.25 * br);
      var a = 0.055 * (0.6 + 0.4 * br);
      var g = ctx.createRadialGradient(bx, by, 0, bx, by, rr);
      g.addColorStop(0, "rgba(" + bl.col[0] + "," + bl.col[1] + "," + bl.col[2] + "," + a + ")");
      g.addColorStop(1, "rgba(" + bl.col[0] + "," + bl.col[1] + "," + bl.col[2] + ",0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, rr, 0, 7); ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    // звёзды
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i]; s.x += s.vx; if (s.x > 1) s.x -= 1; if (s.x < 0) s.x += 1;
      var px = s.x * W + mx * (8 + s.d * 30);
      var py = ((s.y * H - scroll * 0.04 * s.d + my * (6 + s.d * 20)) % H + H) % H;
      var r = s.d * 1.4 + 0.2, a = 0.16 + s.d * 0.5;
      ctx.fillStyle = "rgba(220,236,255," + a + ")"; ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.fill();
    }
  }
  function loop(now) { drawFrame(now); if (running) requestAnimationFrame(loop); }

  mountStyle(); ensureCanvas();
  requestAnimationFrame(loop); // reduced-motion → running=false → один кадр
  var n = 0, iv = setInterval(function () { n++; mountStyle(); ensureCanvas(); if (n > 30) clearInterval(iv); }, 300);
})();
