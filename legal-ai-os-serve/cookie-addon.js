/* ============================================================
   COOKIE CONSENT ADD-ON для бандла «ТехнологИИ права»
   152-ФЗ / GDPR. Самостоятельный, переживает пересборку бандла
   (висит на window, дожидается готовности DOM и встраивается).
   Прозрачно вставляется перед </body> исходного файла.
   ============================================================ */
(function () {
  if (window.__ptCookieAddon) return;
  window.__ptCookieAddon = true;

  var V = 1, NAME = "pt_cookie_consent", DAYS = 180;

  // Юр-документы: подставьте сюда URL страниц или PDF — ссылки откроются в новой вкладке.
  // Пока пусто — клик показывает аккуратное уведомление вместо перехода (152-ФЗ заглушка снята).
  var DOCS = { cookie: "", privacy: "" };

  var CSS = "\
#pt-ck-banner,#pt-ck-modal,#pt-ck-reopen{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;box-sizing:border-box;}\
#pt-ck-banner *,#pt-ck-modal *{box-sizing:border-box;}\
#pt-ck-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:760px;margin:0 auto;display:none;\
 background:rgba(12,14,20,.97);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid #262d3d;\
 border-radius:16px;padding:20px 22px;box-shadow:0 12px 40px rgba(0,0,0,.55);color:#EAF0F7;}\
#pt-ck-banner h3{font-size:16px;margin:0 0 7px;font-weight:700;}\
#pt-ck-banner p{color:#9AA6B8;font-size:13.5px;line-height:1.55;margin:0 0 16px;}\
#pt-ck-banner a{color:#00E5FF;text-decoration:underline;}\
.pt-ck-row{display:flex;gap:10px;flex-wrap:wrap;}\
.pt-ck-btn{flex:1;min-width:150px;font-size:14px;font-weight:600;padding:12px 18px;border-radius:8px;cursor:pointer;\
 border:1px solid #262d3d;background:transparent;color:#EAF0F7;transition:.16s;min-height:44px;}\
.pt-ck-btn:hover{border-color:#00E5FF;color:#00E5FF;}\
.pt-ck-btn.pri{background:#00E5FF;color:#06222a;border-color:#00E5FF;}\
.pt-ck-btn.pri:hover{box-shadow:0 0 0 4px rgba(0,229,255,.18);color:#06222a;}\
#pt-ck-modal{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;padding:18px;}\
#pt-ck-modal.open{display:flex;}\
#pt-ck-scrim{position:absolute;inset:0;background:rgba(0,0,0,.62);}\
.pt-ck-dlg{position:relative;background:#0C0E14;border:1px solid #262d3d;border-radius:16px;max-width:540px;width:100%;\
 max-height:86vh;overflow:auto;padding:26px;box-shadow:0 12px 40px rgba(0,0,0,.55);color:#EAF0F7;}\
.pt-ck-dlg h3{font-size:20px;margin:0 0 6px;font-weight:700;}\
.pt-ck-dlg>p{color:#9AA6B8;font-size:14px;margin:0 0 20px;}\
.pt-ck-cat{border:1px solid #1C2230;border-radius:10px;padding:15px;margin-bottom:11px;}\
.pt-ck-cat .t{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:6px;}\
.pt-ck-cat .t b{font-size:15px;}\
.pt-ck-cat p{color:#9AA6B8;font-size:12.5px;line-height:1.5;margin:0;}\
.pt-ck-lock{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#7d8492;}\
.pt-sw{position:relative;width:44px;height:25px;flex:0 0 auto;display:inline-block;}\
.pt-sw input{opacity:0;width:0;height:0;position:absolute;}\
.pt-sw .sl{position:absolute;inset:0;background:#262d3d;border-radius:999px;transition:.2s;cursor:pointer;}\
.pt-sw .sl::before{content:'';position:absolute;left:3px;top:3px;width:19px;height:19px;background:#fff;border-radius:50%;transition:.2s;}\
.pt-sw input:checked+.sl{background:#00E5FF;}\
.pt-sw input:checked+.sl::before{transform:translateX(19px);}\
.pt-ck-dlg .acts{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;}\
.pt-ck-dlg .acts .pt-ck-btn{flex:1;min-width:140px;}\
#pt-ck-reopen{position:fixed;left:16px;bottom:16px;z-index:2147482999;background:rgba(12,14,20,.9);border:1px solid #262d3d;\
 color:#9AA6B8;font-size:13px;border-radius:999px;padding:9px 14px;cursor:pointer;display:none;box-shadow:0 6px 20px rgba(0,0,0,.4);}\
#pt-ck-reopen:hover{color:#00E5FF;border-color:#00E5FF;}\
@media(max-width:560px){.pt-ck-btn{flex:1 1 100%;}}";

  function setC(v){var d=new Date();d.setTime(d.getTime()+DAYS*864e5);
    document.cookie=NAME+"="+encodeURIComponent(v)+";expires="+d.toUTCString()+";path=/;SameSite=Lax";}
  function getC(){var m=document.cookie.split("; ").filter(function(r){return r.indexOf(NAME+"=")===0;})[0];
    return m?m.split("=")[1]:null;}
  function read(){try{var r=getC();if(!r)return null;var c=JSON.parse(decodeURIComponent(r));return c.v===V?c:null;}catch(e){return null;}}
  function apply(c){
    if(c.analytics && typeof window.PTLoadAnalytics==="function") window.PTLoadAnalytics();
    if(c.marketing && typeof window.PTLoadMarketing==="function") window.PTLoadMarketing();
    console.log("[cookie-consent] применено:",c);
  }
  function save(a,m){var c={v:V,necessary:true,analytics:a,marketing:m,ts:new Date().toISOString()};
    setC(JSON.stringify(c));apply(c);hide();closeM();showReopen();}

  var banner,modal,reopen;
  function elFrom(html){var d=document.createElement("div");d.innerHTML=html;return d.firstElementChild;}

  function build(){
    if(!document.body) return false;
    if(!document.getElementById("pt-ck-style")){var st=document.createElement("style");st.id="pt-ck-style";st.textContent=CSS;document.head.appendChild(st);}
    if(document.getElementById("pt-ck-banner")) return true; // гард по КОНТЕНТУ, не по стилю

    banner=elFrom('<div id="pt-ck-banner" role="region" aria-label="Согласие на использование файлов cookie">\
<h3>🍪 Мы используем файлы cookie</h3>\
<p>Сайт использует cookie и обрабатывает данные для работы сервиса, аналитики и маркетинга. Необходимые cookie включены всегда, остальные — только с вашего согласия. Подробнее — в <a href="#" data-pt-doc="cookie">Политике в отношении файлов cookie</a> и <a href="#" data-pt-doc="privacy">Политике обработки персональных данных</a> (152-ФЗ).</p>\
<div class="pt-ck-row">\
<button class="pt-ck-btn pri" id="pt-ck-accept">Принять все</button>\
<button class="pt-ck-btn" id="pt-ck-reject">Только необходимые</button>\
<button class="pt-ck-btn" id="pt-ck-custom">Настроить</button>\
</div></div>');

    modal=elFrom('<div id="pt-ck-modal" role="dialog" aria-modal="true" aria-label="Настройки файлов cookie">\
<div id="pt-ck-scrim"></div>\
<div class="pt-ck-dlg">\
<h3>Настройки файлов cookie</h3>\
<p>Управляйте категориями. Изменить выбор можно в любой момент кнопкой «Cookie» внизу слева.</p>\
<div class="pt-ck-cat"><div class="t"><b>Необходимые</b><span class="pt-ck-lock">всегда вкл.</span></div>\
<p>Обеспечивают работу сайта: навигация, безопасность, сохранение вашего выбора. Без них сайт не работает.</p></div>\
<div class="pt-ck-cat"><div class="t"><b>Аналитические</b><label class="pt-sw"><input type="checkbox" id="pt-ck-an"><span class="sl"></span></label></div>\
<p>Помогают понять, как используется сайт, чтобы улучшать его. Данные обезличены.</p></div>\
<div class="pt-ck-cat"><div class="t"><b>Маркетинговые</b><label class="pt-sw"><input type="checkbox" id="pt-ck-mk"><span class="sl"></span></label></div>\
<p>Используются для релевантной рекламы и оценки её эффективности (ретаргетинг, пиксели).</p></div>\
<div class="acts"><button class="pt-ck-btn pri" id="pt-ck-save">Сохранить выбор</button><button class="pt-ck-btn" id="pt-ck-accept2">Принять все</button></div>\
</div></div>');

    reopen=elFrom('<button id="pt-ck-reopen" aria-label="Настройки cookie">🍪 Cookie</button>');

    document.body.appendChild(banner);
    document.body.appendChild(modal);
    document.body.appendChild(reopen);

    banner.querySelector("#pt-ck-accept").onclick=function(){save(true,true);};
    banner.querySelector("#pt-ck-reject").onclick=function(){save(false,false);};
    banner.querySelector("#pt-ck-custom").onclick=openM;
    modal.querySelector("#pt-ck-save").onclick=function(){save(modal.querySelector("#pt-ck-an").checked,modal.querySelector("#pt-ck-mk").checked);};
    modal.querySelector("#pt-ck-accept2").onclick=function(){save(true,true);};
    modal.querySelector("#pt-ck-scrim").onclick=closeM;
    reopen.onclick=openM;
    document.addEventListener("keydown",function(e){if(e.key==="Escape")closeM();});
    Array.prototype.forEach.call(document.querySelectorAll("[data-pt-doc]"),function(a){
      var dkey=a.getAttribute("data-pt-doc"), durl=DOCS[dkey];
      if(durl){a.href=durl;a.target="_blank";a.rel="noopener noreferrer";return;}
      a.addEventListener("click",function(e){e.preventDefault();
        var t=document.getElementById("pt-ck-toast");
        if(!t){t=document.createElement("div");t.id="pt-ck-toast";t.setAttribute("role","status");
          t.style.cssText="position:fixed;left:50%;top:24px;transform:translateX(-50%) translateY(-8px);z-index:2147483002;max-width:90vw;background:rgba(12,14,20,.97);border:1px solid #262d3d;border-radius:10px;padding:12px 16px;color:#EAF0F7;font:400 13.5px/1.45 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.55);opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;";
          document.body.appendChild(t);}
        t.textContent="Документ «"+(dkey==="cookie"?"Политика cookie":"Политика обработки персональных данных")+"» готовится и скоро будет доступен.";
        t.style.opacity="1";t.style.transform="translateX(-50%) translateY(0)";
        clearTimeout(window.__ptCkToastT);window.__ptCkToastT=setTimeout(function(){t.style.opacity="0";t.style.transform="translateX(-50%) translateY(-8px)";},3600);
      });
    });

    var c=read();
    if(c){ apply(c); showReopen(); } else { banner.style.display="block"; }
    window.PTCookieSettings=openM;
    return true;
  }
  function hide(){if(banner)banner.style.display="none";}
  function showReopen(){if(reopen)reopen.style.display="block";}
  function openM(){var c=read();
    modal.querySelector("#pt-ck-an").checked=c?!!c.analytics:false;
    modal.querySelector("#pt-ck-mk").checked=c?!!c.marketing:false;
    modal.classList.add("open");modal.querySelector("#pt-ck-save").focus();}
  function closeM(){if(modal)modal.classList.remove("open");}

  // Бандл пересобирает DOM асинхронно — пытаемся встроиться, пока не получится
  var tries=0;
  var iv=setInterval(function(){tries++;if(build()||tries>240){clearInterval(iv);setInterval(build,1500);}},120);
  if(document.readyState!=="loading") build();
  window.addEventListener("load",build);
  window.addEventListener("DOMContentLoaded",build);
})();
