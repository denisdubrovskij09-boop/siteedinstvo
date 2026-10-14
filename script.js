/* Единство народов — сила России: скрипты страницы */

(function(){
  var cap=document.getElementById('cap'); if(!cap) return;
  var track=document.getElementById('capTrack'), knob=document.getElementById('capKnob'),
      fill=document.getElementById('capFill'), st=document.getElementById('capStatus');
  var pos=0, active=false, moved=false, done=false;
  try{ done = sessionStorage.getItem('lawx.human')==='1'; }catch(e){}
  function maxX(){ return Math.max(40, track.clientWidth - knob.offsetWidth - 8); }
  function paint(){
    knob.style.transform='translateX('+pos+'px)';
    fill.style.width=(pos + knob.offsetWidth/2)+'px';
    var pct=Math.round(pos/maxX()*100);
    track.setAttribute('aria-valuenow', String(pct));
    track.setAttribute('aria-valuetext', pct>=96?'подтверждено':'не подтверждено');
  }
  function solve(){
    pos=maxX(); paint(); st.textContent='Проверено — добро пожаловать'; st.classList.add('cap-ok');
    knob.textContent='✓'; knob.style.transition='transform .18s ease';
    window.__lawxCap='solved';
    try{ sessionStorage.setItem('lawx.human','1'); }catch(e){}
    document.documentElement.classList.remove('cap-lock');
    setTimeout(function(){ cap.classList.add('cpt-off');
      setTimeout(function(){ cap.style.display='none'; }, 500); }, 380);
  }
  if(done){ cap.style.display='none'; window.__lawxCap='cached'; return; }
  document.documentElement.classList.add('cap-lock');
  window.__lawxCap='waiting';
  paint();
  function ptX(e){
    if(e.touches && e.touches.length) return e.touches[0].clientX;
    if(e.changedTouches && e.changedTouches.length) return e.changedTouches[0].clientX;
    return e.clientX;
  }
  function down(e){ active=true; moved=false; track.classList.add('cap-grab');
    if(knob.setPointerCapture&&e.pointerId!==undefined){ try{ knob.setPointerCapture(e.pointerId); }catch(err){} }
    e.preventDefault(); }
  function move(e){ if(!active) return; moved=true;
    var r=track.getBoundingClientRect();
    pos=Math.min(maxX(), Math.max(0, ptX(e) - r.left - knob.offsetWidth/2)); paint();
    if(pos>=maxX()-6){ active=false; track.classList.remove('cap-grab'); solve(); } }
  function up(){ if(!active) return; active=false; track.classList.remove('cap-grab');
    if(pos>=maxX()-8||!moved){ solve(); }
    else { pos=0; paint(); st.textContent='Ползунок вернулся назад — попробуйте ещё раз'; } }
  if(window.PointerEvent){
    knob.addEventListener('pointerdown', down);
    track.addEventListener('pointerdown', down);
    track.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  } else {
    knob.addEventListener('touchstart', down, {passive:false});
    track.addEventListener('touchstart', down, {passive:false});
    track.addEventListener('touchmove', move, {passive:false});
    window.addEventListener('touchend', up);
    window.addEventListener('touchcancel', up);
    knob.addEventListener('mousedown', down);
    track.addEventListener('mousedown', down);
    track.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }
  track.addEventListener('click', function(e){
    if(window.__lawxCap!=='waiting') return;
    if(e.target!==knob && !track.contains(e.target)) return;
    active=false; track.classList.remove('cap-grab');
    if(pos<maxX()-8) solve();
  });
  track.addEventListener('keydown', function(e){
    var step=maxX()/8;
    if(e.key==='ArrowRight'||e.key==='ArrowUp'){ pos=Math.min(maxX(), pos+step); paint(); e.preventDefault(); }
    else if(e.key==='ArrowLeft'||e.key==='ArrowDown'){ pos=Math.max(0, pos-step); paint(); e.preventDefault(); }
    else if(e.key==='Home'){ pos=0; paint(); e.preventDefault(); }
    else if(e.key==='End'||e.key==='Enter'||e.key===' '){ solve(); e.preventDefault(); }
  });
  window.addEventListener('resize', function(){ if(window.__lawxCap!=='waiting') return;
    if(pos>maxX()) pos=maxX(); paint(); });
})();

;

var quotes=["Единство — это не одинаковость, а созвучие разных голосов","Народов много — Родина одна","Юг России говорит на десятках языков, но понимает друг друга сердцем","В культуре народов — будущее России"];
var qi=0,q=document.getElementById('quote'),dots=[...document.querySelectorAll('#dots .dot')];
function show(i){qi=(i+quotes.length)%quotes.length;q.style.opacity=0;setTimeout(()=>{q.textContent=quotes[qi];q.style.opacity=1;dots.forEach((d,k)=>d.classList.toggle('on',k===qi))},180)}
document.getElementById('next').onclick=()=>show(qi+1);
document.getElementById('prev').onclick=()=>show(qi-1);
dots.forEach((d,k)=>d.onclick=()=>show(k));
setInterval(()=>show(qi+1),6000);
document.querySelectorAll('.pin').forEach(p=>{p.onclick=()=>{document.querySelectorAll('.pin').forEach(x=>x.classList.remove('active'));p.classList.add('active');document.getElementById('mapInfo').innerHTML='<b>'+p.dataset.t+'</b>';window.lawxUI&&window.lawxUI.toast('Регион: '+p.textContent.trim())}});
document.querySelectorAll('[data-a]').forEach(b=>{b.onclick=()=>{var bar=b.parentElement.querySelector('.bar i'),on=b.textContent==='⏸';b.textContent=on?'▶':'⏸';if(!on){var w=0;var t=setInterval(()=>{w+=4;if(w>=100||b.textContent==='▶'){clearInterval(t);if(w>=100)b.textContent='▶'}bar.style.width=w+'%'},120)}}});
var b=document.getElementById('burger'),nv=document.querySelector('.ui-nav-links');
if(b&&nv){b.onclick=function(){var o=nv.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false')};
nv.querySelectorAll('a').forEach(function(a){a.onclick=function(){nv.classList.remove('open');b.setAttribute('aria-expanded','false')}});
document.addEventListener('click',function(e){if(!e.target.closest('.ui-nav')&&nv.classList.contains('open')){nv.classList.remove('open');b.setAttribute('aria-expanded','false')}})}
// active menu on scroll
var secs=['top','oproekte','narody','nasledie','events','contacts'].map(function(id){return document.getElementById(id)}).filter(Boolean);
var links=[...document.querySelectorAll('.ui-nav-links a')];
function act(){var y=scrollY+110,cur='top';secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)})}
addEventListener('scroll',act,{passive:true});act();
['evform','cbform','subform'].forEach(id=>{var f=document.getElementById(id);if(f)f.addEventListener('submit',e=>{e.preventDefault();window.lawxUI&&window.lawxUI.toast('Спасибо! Заявка отправлена.');f.reset()})});

;

/* The behaviours of the stock site look, served at images/kit-ui.js and included by the page itself
   (`<script src="images/kit-ui.js" defer>`), never injected by the host. Everything here is opt-in
   through markup, so a page that uses none of it loses nothing:

   - theme: re-applies what the page's pre-paint one-liner computed (a page that lost that line
     pays a flash, not the dark theme), follows the system while no choice is stored, and
     `[data-theme-toggle]` stores one under `lawx.site.theme`. No density: a site is a document
     and keeps the document scale on a desktop;
   - emoji: on every platform but Apple's, text emoji become Apple's own rasters from
     images/emoji/<stem>.png, stem = code points in lowercase hex joined by `-`, the way the host
     files them; `code`, `pre`, fields and `[data-no-emoji]` subtrees are left alone;
   - icons: `<use href="images/icons.svg#name">` is rewritten onto an inlined copy of the sprite,
     because WebKit never loads an external <use>;
   - `data-*` behaviours: segmented tabs, switches, native dialogs, copy, toast, the year;
   - `window.lawxUI` — the only API a page calls: toast(text, {tone, ms}), theme(), setTheme(),
     emoji(root), icons(). `window.lawx` belongs to runtime.js and is sealed. */
(function () {
  'use strict';
  var root = document.documentElement;
  var THEME_KEY = 'lawx.site.theme';
  var DARK = '(prefers-color-scheme: dark)';

  function stored() {
    try {
      var value = localStorage.getItem(THEME_KEY);
      return value === 'light' || value === 'dark' ? value : 'system';
    } catch (_error) {
      return 'system';
    }
  }

  function applyTheme() {
    var choice = stored();
    var theme = choice === 'system' ? (matchMedia(DARK).matches ? 'dark' : 'light') : choice;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < toggles.length; i += 1) {
      toggles[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      // A toggle drawn with the moon shows the sun once the page is dark, and back again.
      var use = toggles[i].querySelector('use');
      var href = use && (use.getAttribute('href') || '');
      if (href && /#(moon|sun)$/.test(href)) use.setAttribute('href', href.replace(/#(moon|sun)$/, theme === 'dark' ? '#sun' : '#moon'));
    }
  }

  function setTheme(value) {
    try {
      if (value === 'light' || value === 'dark') localStorage.setItem(THEME_KEY, value);
      else localStorage.removeItem(THEME_KEY);
    } catch (_error) { /* storage refused: the choice lives for this page only */ }
    applyTheme();
  }

  applyTheme();
  try {
    matchMedia(DARK).addEventListener('change', function () { if (stored() === 'system') applyTheme(); });
  } catch (_error) { /* an engine without addEventListener on MediaQueryList keeps the first reading */ }

  /* ---- toast ---- */

  var host = null;

  function toast(text, options) {
    var opts = options || {};
    if (!host) {
      host = document.createElement('div');
      host.className = 'ui-toast-host';
      host.setAttribute('role', 'status');
      host.setAttribute('aria-live', 'polite');
      document.body.appendChild(host);
    }
    while (host.children.length >= 3) host.removeChild(host.firstChild);
    var node = document.createElement('div');
    node.className = 'ui-toast' + (opts.tone === 'error' ? ' ui-toast--error' : '');
    node.textContent = String(text == null ? '' : text);
    host.appendChild(node);
    var gone = false;
    var remove = function () {
      if (gone) return;
      gone = true;
      if (node.parentNode) node.parentNode.removeChild(node);
    };
    setTimeout(function () {
      node.classList.add('ui-toast--out');
      node.addEventListener('animationend', remove);
      setTimeout(remove, 400);
    }, Math.max(800, opts.ms || 2600));
    return node;
  }

  /* ---- emoji ---- */

  var APPLE = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  var EMOJI = null;
  var PRESENT = null;
  var FLAG = null;
  var GRAPHEME = null;
  try {
    // Extended_Pictographic misses the flags (regional indicator pairs) and the keycaps.
    EMOJI = new RegExp('\\p{Extended_Pictographic}|[\\u{1F1E6}-\\u{1F1FF}]|[0-9#*]\\uFE0F?\\u20E3', 'u');
    PRESENT = new RegExp('^\\p{Emoji_Presentation}', 'u');
    FLAG = new RegExp('^[\\u{1F1E6}-\\u{1F1FF}]{2}$', 'u');
    GRAPHEME = new RegExp(
      '[\\u{1F1E6}-\\u{1F1FF}]{2}|[0-9#*]\\uFE0F?\\u20E3|' +
      '\\p{Extended_Pictographic}(?:\\uFE0F|[\\u{1F3FB}-\\u{1F3FF}])?(?:\\u200D\\p{Extended_Pictographic}(?:\\uFE0F|[\\u{1F3FB}-\\u{1F3FF}])?)*|' +
      '[\\u{1F1E6}-\\u{1F1FF}]',
      'gu'
    );
  } catch (_error) { /* no \p{} in this engine: emoji stay the system's glyphs */ }
  var SKIP = 'code,pre,kbd,samp,textarea,input,select,button.ui-icon-button,script,style,noscript,svg,img,[contenteditable],[data-no-emoji]';
  var segmenter = null;
  try {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  } catch (_error) { /* the regex fallback below carries the same coverage */ }
  var MAX_SUBSTITUTIONS = 1500;
  var substitutions = 0;

  // What Apple draws as a picture: a sequence (ZWJ, keycap, variation selector), a flag, or a
  // glyph whose default presentation is emoji. A bare © ® ™ ☀ stays the text it was typed as.
  function isEmoji(grapheme) {
    if (!EMOJI || !EMOJI.test(grapheme)) return false;
    if (grapheme.indexOf('\uFE0F') >= 0 || grapheme.indexOf('\u200D') >= 0 || grapheme.indexOf('\u20E3') >= 0) return true;
    if (FLAG.test(grapheme)) return true;
    return PRESENT.test(grapheme);
  }

  function stemOf(grapheme) {
    var parts = [];
    for (var i = 0; i < grapheme.length;) {
      var code = grapheme.codePointAt(i);
      parts.push(code.toString(16));
      i += code > 0xffff ? 2 : 1;
    }
    return parts.join('-');
  }

  function imageFor(grapheme) {
    var img = document.createElement('img');
    img.className = 'ui-emoji';
    img.alt = grapheme;
    img.draggable = false;
    img.loading = 'lazy';
    img.decoding = 'async';
    var stem = stemOf(grapheme);
    var retried = false;
    img.onerror = function () {
      var bare = stem.split('-').filter(function (part) { return part !== 'fe0f'; }).join('-');
      if (!retried && bare && bare !== stem) {
        retried = true;
        img.src = 'images/emoji/' + bare + '.png';
        return;
      }
      if (img.parentNode) img.parentNode.replaceChild(document.createTextNode(grapheme), img);
    };
    img.src = 'images/emoji/' + stem + '.png';
    return img;
  }

  function pieces(text) {
    if (segmenter) {
      var out = [];
      var it = segmenter.segment(text)[Symbol.iterator]();
      for (var step = it.next(); !step.done; step = it.next()) out.push(step.value.segment);
      return out;
    }
    var result = [];
    var last = 0;
    GRAPHEME.lastIndex = 0;
    var match;
    while ((match = GRAPHEME.exec(text)) !== null) {
      if (match.index > last) result.push(text.slice(last, match.index));
      result.push(match[0]);
      last = match.index + match[0].length;
      if (match[0].length === 0) GRAPHEME.lastIndex += 1;
    }
    if (last < text.length) result.push(text.slice(last));
    return result;
  }

  function replaceIn(node) {
    var text = node.data;
    var fragment = document.createDocumentFragment();
    var buffer = '';
    var parts = pieces(text);
    var changed = false;
    for (var i = 0; i < parts.length; i += 1) {
      var part = parts[i];
      if (isEmoji(part) && substitutions < MAX_SUBSTITUTIONS) {
        if (buffer) fragment.appendChild(document.createTextNode(buffer));
        buffer = '';
        fragment.appendChild(imageFor(part));
        substitutions += 1;
        changed = true;
      } else {
        buffer += part;
      }
    }
    if (!changed) return;
    if (buffer) fragment.appendChild(document.createTextNode(buffer));
    node.parentNode.replaceChild(fragment, node);
  }

  function emoji(scope) {
    if (APPLE || !EMOJI) return;
    var start = scope || document.body;
    if (!start) return;
    if (start.nodeType === 1 && start.closest && start.closest(SKIP)) return;
    var walker = document.createTreeWalker(start, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || parent.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        EMOJI.lastIndex = 0;
        return EMOJI.test(node.data) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    var found = [];
    while (walker.nextNode()) found.push(walker.currentNode);
    for (var i = 0; i < found.length; i += 1) replaceIn(found[i]);
  }

  /* ---- icons ---- */

  var SPRITE = 'images/icons.svg';
  var spriteState = 'idle';

  function rewriteUses(scope) {
    var uses = (scope || document).querySelectorAll('use');
    for (var i = 0; i < uses.length; i += 1) {
      var use = uses[i];
      var href = use.getAttribute('href') || use.getAttribute('xlink:href') || '';
      var hash = href.indexOf(SPRITE + '#');
      if (hash === 0) {
        use.setAttribute('href', href.slice(SPRITE.length));
        use.removeAttribute('xlink:href');
      }
    }
  }

  function wantsSprite() {
    var uses = document.getElementsByTagName('use');
    for (var i = 0; i < uses.length; i += 1) {
      var href = uses[i].getAttribute('href') || uses[i].getAttribute('xlink:href') || '';
      if (href.indexOf(SPRITE + '#') === 0) return true;
    }
    return false;
  }

  function icons() {
    if (spriteState !== 'idle' || !wantsSprite()) return;
    spriteState = 'loading';
    fetch(SPRITE, { cache: 'force-cache', credentials: 'same-origin' })
      .then(function (response) { return response.ok ? response.text() : Promise.reject(new Error(String(response.status))); })
      .then(function (markup) {
        var parsed = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement;
        if (!parsed || parsed.nodeName.toLowerCase() !== 'svg') throw new Error('sprite');
        var svg = document.importNode(parsed, true);
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('hidden', '');
        svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
        document.body.insertBefore(svg, document.body.firstChild);
        spriteState = 'ready';
        rewriteUses();
      })
      .catch(function () { spriteState = 'failed'; });
  }

  /* ---- observer: late content gets the same treatment, our own writes never re-enter ---- */

  var observer = null;
  var pending = false;
  var passes = 0;
  var passWindow = 0;

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      var now = Date.now();
      if (now - passWindow > 1000) { passWindow = now; passes = 0; }
      passes += 1;
      if (passes > 6) {
        // A board redrawn every frame would keep this pass busy for nothing; the glyphs stay.
        if (observer) observer.disconnect();
        observer = null;
        return;
      }
      if (observer) observer.disconnect();
      emoji();
      if (spriteState === 'ready') rewriteUses();
      if (observer) observer.observe(root, { childList: true, subtree: true, characterData: true });
    });
  }

  function watch() {
    if (!window.MutationObserver) return;
    observer = new MutationObserver(schedule);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
  }

  /* ---- data-* behaviours ---- */

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return copyFallback(text); });
    }
    return Promise.resolve(copyFallback(text));
  }

  function copyFallback(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (_error) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  function selectSegment(segment) {
    var track = segment.closest('.ui-segmented');
    if (!track) return;
    var segments = track.querySelectorAll('.ui-segment');
    for (var i = 0; i < segments.length; i += 1) {
      var item = segments[i];
      var on = item === segment;
      item.setAttribute('aria-selected', on ? 'true' : 'false');
      if (item.hasAttribute('role')) item.setAttribute('tabindex', on ? '0' : '-1');
      var panelId = item.getAttribute('data-panel');
      if (panelId) {
        var panel = document.getElementById(panelId);
        if (panel) panel.hidden = !on;
      }
    }
    track.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { value: segment.getAttribute('data-panel') || segment.value || segment.textContent.trim() } }));
  }

  function toggleSwitch(control) {
    if (control.disabled || control.getAttribute('aria-disabled') === 'true') return;
    var on = control.getAttribute('aria-checked') !== 'true';
    control.setAttribute('aria-checked', on ? 'true' : 'false');
    control.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { checked: on } }));
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    var control;
    if ((control = target.closest('[data-theme-toggle]'))) {
      setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
      return;
    }
    if ((control = target.closest('[data-copy]'))) {
      var text = control.getAttribute('data-copy');
      var done = control.getAttribute('data-copied') || 'Скопировано';
      copy(text).then(function (ok) { toast(ok ? done : text); });
      return;
    }
    if ((control = target.closest('[data-toast]'))) {
      toast(control.getAttribute('data-toast'));
      return;
    }
    if ((control = target.closest('.ui-segment'))) {
      selectSegment(control);
      return;
    }
    if ((control = target.closest('.ui-switch'))) {
      toggleSwitch(control);
      return;
    }
    if ((control = target.closest('[data-dialog-open]'))) {
      var dialog = document.getElementById(control.getAttribute('data-dialog-open'));
      if (dialog && typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
      return;
    }
    if ((control = target.closest('[data-dialog-close]'))) {
      var owner = control.closest('dialog');
      if (owner) owner.close();
      return;
    }
    if (target instanceof HTMLDialogElement && target.open && target.classList.contains('ui-dialog')) {
      // A click that lands on the <dialog> itself, outside its content box, is the backdrop.
      var box = target.getBoundingClientRect();
      var inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
      if (!inside) target.close();
    }
  });

  document.addEventListener('keydown', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    if (target.classList.contains('ui-segment') && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      var track = target.closest('.ui-segmented');
      if (!track) return;
      var segments = Array.prototype.slice.call(track.querySelectorAll('.ui-segment'));
      var index = segments.indexOf(target);
      var next = segments[(index + (event.key === 'ArrowRight' ? 1 : segments.length - 1)) % segments.length];
      if (next) { selectSegment(next); next.focus(); event.preventDefault(); }
      return;
    }
    if (target.classList.contains('ui-switch') && (event.key === ' ' || event.key === 'Enter')) {
      event.preventDefault();
      toggleSwitch(target);
    }
  });

  function ready() {
    var years = document.querySelectorAll('[data-year]');
    for (var i = 0; i < years.length; i += 1) years[i].textContent = String(new Date().getFullYear());
    var tracks = document.querySelectorAll('.ui-segmented');
    for (var t = 0; t < tracks.length; t += 1) {
      var selected = tracks[t].querySelector('.ui-segment[aria-selected="true"]') || tracks[t].querySelector('.ui-segment');
      if (selected) selectSegment(selected);
    }
    emoji();
    icons();
    watch();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();

  var api = {
    toast: toast,
    theme: function () { return root.dataset.theme || 'light'; },
    setTheme: setTheme,
    emoji: emoji,
    icons: icons,
  };
  try {
    Object.defineProperty(window, 'lawxUI', { value: Object.freeze(api), writable: false, configurable: false });
  } catch (_error) {
    window.lawxUI = api;
  }
})();

;

(function(){
var D = {"rus": {"t": "Русские: казачья кухня Дона", "tag": "Ростовская область", "theme": "Кухня и праздничный стол", "img": "images/rus.jpg", "cap": "Курник — праздничный пирог донских казаков", "p1": "Курник — праздничный пирог русской кухни, известный с XVI–XVII веков. На Дону его пекли на свадьбу и на Масленицу, а форма и узоры из теста несли свой смысл: круглый пирог напоминал солнце, а пар выходил через отверстие в верхней крышке.", "p2": "Начинка у курника многослойная: блины, курица, картофель, грибы. Его готовили в печи на большие праздники и подавали к столу целым, разрезая уже за столом — сначала снимали верхнюю «крышку».", "lst": ["Курник", "Уха по-донскому", "Кулеш", "Донские раки"], "credit": "Off-shell", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Kurnik.jpg"}, "kalmyk": {"t": "Калмыки: чай степи", "tag": "Калмыкия", "theme": "Напиток и обычаи стола", "img": "images/kalmyk.jpg", "cap": "Джомба — чай с молоком и солью", "p1": "Джомба — калмыцкий чай: зелёный плиточный чай, сваренный с молоком и солью. В котёл добавляют мускатный орех и топлёное масло, а готовый напиток взбивают половником, чтобы он стал ровным и сытным.", "p2": "Чай здесь не просто напиток. Первую пиалу подносят старшему, гостя встречают чаем, и по тому, как он налит, читается уважение. В степи горячая джомба согревала и заменяла обед в дороге.", "lst": ["Джомба", "Борцоки (борцг)", "Махан-шультаган", "Кюр"], "credit": "Pannet", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:%D0%9A%D0%B0%D0%BB%D0%BC%D1%8B%D1%86%D0%BA%D0%B8%D0%B9_%D1%87%D0%B0%D0%B9_01.jpg"}, "adyghe": {"t": "Адыгейцы: сыр на каждый день", "tag": "Адыгея", "theme": "Гостеприимство и кухня", "img": "images/adyghe.jpg", "cap": "Адыгейский сыр из плетёной корзины", "p1": "Адыгейский сыр — мягкий сыр адыгской кухни. Его делают из молока с сывороткой, без сычужного фермента, а форму задаёт плетёная корзина: от неё на головке остаётся клетчатый рисунок.", "p2": "Сыр в адыгской кухне — обязательное угощение. Его подают свежим, жарят на масле и кладут в начинку для лепёшек; гостю за столом отводят первое место, и блюдо с сыром ставят на стол раньше остальных.", "lst": ["Адыгейский сыр", "Щипс", "Либже", "Гуубат", "Халюжи"], "credit": "Tetk200", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:%D0%90%D0%B4%D1%8B%D0%B3%D0%B5%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D1%8B%D1%80.jpg"}, "kazakh": {"t": "Казахи: бешбармак за дастарханом", "tag": "Астраханская область", "theme": "Праздничный стол", "img": "images/kazakh.jpg", "cap": "Бешбармак — мясо с тонким тестом", "p1": "Бешбармак переводится как «пять пальцев»: мясо с тонко раскатанным тестом едят руками. Его готовят из баранины, конины или говядины, а бульон — сорпу — подают отдельно в пиалах.", "p2": "Бешбармак — центр праздничного стола. На той его ставят перед гостями, лучшие куски отдают старшим, тесто нарезают ровными квадратами и заливают горячим бульоном.", "lst": ["Бешбармак", "Сорпа", "Баурсаки", "Кумыс", "Шужук"], "credit": "Pannet", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:%D0%91%D0%B5%D1%88%D0%B1%D0%B0%D1%80%D0%BC%D0%B0%D0%BA_%D0%B8%D0%B7_%D0%B3%D0%BE%D0%B2%D1%8F%D0%B4%D0%B8%D0%BD%D1%8B_01.jpg"}, "armenian": {"t": "Армяне: лаваш из тонира", "tag": "Краснодарский край", "theme": "Хлеб и печь", "img": "images/armenian.jpg", "cap": "Лаваш — тонкая лепёшка из тонира", "p1": "Лаваш раскатывают вручную до тонкости листа и приклеивают к раскалённой стенке глиняной печи — тонира. Через несколько секунд тесто вспухает, и лепёшку снимают крюком.", "p2": "Готовые лаваши складывают стопкой и укрывают тканью, чтобы они оставались мягкими. Лаваш — и хлеб, и посуда: в него заворачивают сыр, зелень и мясо. Традиция его выпечки внесена в список нематериального культурного наследия ЮНЕСКО.", "lst": ["Лаваш", "Долма", "Хаш", "Лоби", "Гата"], "credit": "Combrian", "lic": "CC0", "page": "https://commons.wikimedia.org/wiki/File:Lavash_arm%C3%A9nien.jpg"}, "chechen": {"t": "Чеченцы: хингалш с тыквой", "tag": "ЮФО • Кавказ", "theme": "Домашняя выпечка", "img": "images/chechen.jpg", "cap": "Хингалш — лепёшки с тыквой", "p1": "Хингалш — тонкие лепёшки с начинкой из тыквы и лука. Тесто раскатывают почти прозрачным, начинку кладут щедрым слоем, а край защипывают косичкой.", "p2": "Пекут хингалш на сухой сковороде и смазывают маслом, подают стопкой, разрезая на куски. Тыква в чеченской кухне — знак достатка, а стол — место, где младший уступает старшему.", "lst": ["Хингалш", "Чепалгаш", "Жижиг-галнаш", "Черемша"], "credit": "Muhammad Sugaipov", "lic": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:%D0%A5%D0%B8%D0%BD%D0%B3%D0%B0%D0%BB%D1%88_(%D1%84%D0%B0%D0%B9%D0%BB_6).jpg"}};
var m = document.getElementById('nationModal');
var last = null;
function fill(k){
  var d = D[k]; if(!d) return;
  document.getElementById('nImg').src = d.img;
  document.getElementById('nImg').alt = d.cap;
  document.getElementById('nTag').textContent = d.tag;
  document.getElementById('nTitle').textContent = d.t;
  document.getElementById('nTheme').textContent = d.theme;
  document.getElementById('nP1').textContent = d.p1;
  document.getElementById('nP2').textContent = d.p2;
  var ul = document.getElementById('nList'); ul.innerHTML = '';
  for (var i = 0; i < d.lst.length; i += 1) {
    var li = document.createElement('li'); li.textContent = d.lst[i]; ul.appendChild(li);
  }
  document.getElementById('nCredits').innerHTML =
    'Фото: ' + d.credit + ', Wikimedia Commons, ' + d.lic +
    ' — <a href="' + d.page + '" target="_blank" rel="noopener">страница файла</a>';
}
function open(k, btn){
  if (!D[k]) return;
  fill(k); yfo(k); last = btn || null;
  m.classList.add('on'); document.body.style.overflow = 'hidden';
  document.getElementById('nClose').focus();
}
function yfo(cur){ var g=document.getElementById('yfoGrid'); if(!g) return; g.innerHTML=''; var bs=document.querySelectorAll('[data-nation]'); Array.prototype.forEach.call(bs, function(b){  var k=b.getAttribute('data-nation'); var c=b.closest?b.closest('.card'):null; if(!c) return;  var im=c.querySelector('img'), nm=c.querySelector('h3'), rg=c.querySelector('.tag');  var it=document.createElement('button'); it.type='button'; it.className='yfo-item'+(k===cur?' on':'');  it.setAttribute('aria-label','Открыть карточку: '+(nm?nm.textContent.trim():k));  it.innerHTML='<img src="'+(im?im.getAttribute('src'):'')+'" alt="'+(im?im.getAttribute('alt'):'')+'">'+   '<span><b>'+(nm?nm.textContent.trim():k)+'</b>'+(rg?', '+rg.textContent.trim():'')+'</span>';  it.onclick=function(){ open(k,b); }; g.appendChild(it); }); } function close(){
  m.classList.remove('on'); document.body.style.overflow = '';
  if (last) last.focus();
}
document.addEventListener('click', function(e){
  var b = e.target.closest ? e.target.closest('[data-nation]') : null;
  if (b) { e.preventDefault(); open(b.getAttribute('data-nation'), b); return; }
  if (e.target === m) close();
});
document.getElementById('nClose').addEventListener('click', close);
document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && m.classList.contains('on')) close(); });
})();

;

(function(){
var players=[];
function fmt(s){s=Math.floor(s||0);return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2);}
Array.prototype.forEach.call(document.querySelectorAll('.folk'), function(card){
 var a=document.createElement('audio');
 a.src=card.getAttribute('data-src'); a.preload='metadata'; a.style.display='none';
 card.appendChild(a);
 var btn=card.querySelector('.folk-play'), fill=card.querySelector('.folk-bar i'),
     bar=card.querySelector('.folk-bar'), tm=card.querySelector('.folk-time'),
     total=card.getAttribute('data-len');
 function paint(){
   var d=isFinite(a.duration)&&a.duration?a.duration:0;
   tm.textContent=fmt(a.currentTime)+' / '+(d?fmt(d):total);
   fill.style.width=(d?(a.currentTime/d*100):0)+'%';
 }
 function stop(){card.classList.remove('on');btn.textContent='▶';}
 a.addEventListener('timeupdate',paint);
 a.addEventListener('loadedmetadata',paint);
 a.addEventListener('ended',function(){stop();paint();});
 a.addEventListener('pause',stop);
 btn.addEventListener('click',function(){
   if(a.paused){
     players.forEach(function(o){if(o!==a)o.pause();});
     card.classList.add('on'); btn.textContent='❚❚';
     a.play().catch(function(){stop();});
   } else { a.pause(); }
 });
 function seek(ev){
   if(!isFinite(a.duration)||!a.duration)return;
   var r=bar.getBoundingClientRect();
   a.currentTime=Math.min(1,Math.max(0,(ev.clientX-r.left)/r.width))*a.duration;
 }
 bar.addEventListener('click',seek);
 bar.addEventListener('keydown',function(ev){
   if(!isFinite(a.duration)||!a.duration)return;
   if(ev.key==='ArrowRight'){a.currentTime=Math.min(a.duration,a.currentTime+5);ev.preventDefault();}
   if(ev.key==='ArrowLeft'){a.currentTime=Math.max(0,a.currentTime-5);ev.preventDefault();}
 });
 players.push(a);
 paint();
});
})();

;

(function(){
var D = {"tr-rus": {"t": "Русские: масленица и хоровод", "tag": "Ростовская область", "theme": "Праздники и народные обычаи", "img": "images/trad-rus.jpg", "cap": "Масленица: проводы зимы", "p1": "Масленица — неделя перед Великим постом, самая шумная в русском календаре. Её открывали блинами: первый блин оставляли на окне в память о близких, а стол держали накрытым всю неделю.", "p2": "В последний день зиму провожали чучелом и костром, вокруг которого водили хоровод. Гуляния шли на площади: катания с гор, ряженые, песни — так праздник и сегодня собирает целые города.", "lh": "Попробовать и посмотреть", "lst": ["Блины на Масленицу", "Хоровод", "Проводы зимы", "Катания с гор"], "credit": "Лобачев Владимир", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File%3AMaslenitsa_in_Belgorod_2015_28.JPG"}, "tr-kazaki": {"t": "Казаки: обряды и джигитовка", "tag": "Дон • Кубань", "theme": "Обычаи и конная традиция", "img": "images/trad-kazaki.jpg", "cap": "Казачья джигитовка", "p1": "Джигитовка — конная выучка казаков: на полном ходу всадник встаёт в седле, рубит лозу, поднимает предмет с земли. Это не трюк, а боевое умение, выросшее из службы на границе.", "p2": "Сегодня джигитовку показывают на праздниках казачьих обществ, а рядом идут обряды: проводы на службу, встреча гостя хлебом и солью, песни за общим столом.", "lh": "Попробовать и посмотреть", "lst": ["Джигитовка", "Проводы на службу", "Хлеб-соль", "Казачья песня"], "credit": "Ele-chudinovsk", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File%3ACossack_dzhigitovka_in_a_Cossack_village_in_the_Slobodsky_district_of_the_Kirov_region.jpg"}, "tr-kalmyk": {"t": "Калмыки: традиции степи", "tag": "Калмыкия", "theme": "Вера, календарь, обычаи", "img": "images/trad-kalmyk.jpg", "cap": "Хурул в Элисте", "p1": "Хурул в Элисте — главный буддийский храм Калмыкии. Сюда приходят на Цаган Сар, праздник встречи весны, и на Зул, который в степи отмечают как наступление нового года жизни.", "p2": "Праздничный стол в степи начинается с чая: джомбу с молоком и солью подают первой, следом идут борцоки и мясо. Угостить старшего и гостя — часть самого обряда, а не просто вежливость.", "lh": "Попробовать и посмотреть", "lst": ["Цаган Сар", "Зул", "Джомба", "Борцоки"], "credit": "Alexxx1979", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File%3AElista_Burkhan_Bakshin_Altan_Sume_P5111392_2200.jpg"}, "tr-chechen": {"t": "Чеченцы: дом и стол", "tag": "Кавказ", "theme": "Семейные ценности", "img": "images/trad-chechen.jpg", "cap": "Ба1ар — чеченская выпечка", "p1": "В чеченском доме у каждого своё место: младший уступает старшему, гость садится первым. Эти правила старше любых слов — по ним встречают и в городе, и в ауле.", "p2": "Стол здесь продолжает разговор: ба1ар, чеченскую выпечку, готовят к чаю и на праздник, а рецепт держат в семье и передают от матери к дочери вместе с правилом — сначала угостить, потом спросить.", "lh": "Попробовать и посмотреть", "lst": ["Ба1ар", "Чепалгаш", "Жижиг-галнаш", "Чай за столом"], "credit": "Саид Мисарбиев", "lic": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File%3A%D0%91%D0%B01%D0%B0%D1%80.jpg"}, "ev-kover": {"t": "Ковёр дружбы", "tag": "Фестиваль • 12 июня", "theme": "Сальск, Ростовская область", "img": "images/event-kover.jpg", "cap": "Ярмарка изделий мастеров", "p1": "Ковёр дружбы — фестиваль орнаментов и ремёсел Юга. В Сальске мастера выкладывают узор прямо на площади, и каждый добавляет в общую работу свой фрагмент: керамику, ткачество, резьбу, вышивку.", "p2": "Днём работает ярмарка изделий, вечером выходят народные коллективы. Праздник приурочен ко Дню России, поэтому идёт на открытой площадке весь день.", "lh": "Что будет на фестивале", "lst": ["Ярмарка изделий мастеров", "Общий ковёр из узоров", "Выставка орнаментов", "Концерт народных коллективов"], "credit": "Алексей Белобородов", "lic": "CC BY-SA 4.0", "page": ""}, "ev-concert": {"t": "День народного единства", "tag": "Концерт • 4 ноября", "theme": "Ростов-на-Дону", "img": "images/event-concert.jpg", "cap": "Праздничный концерт", "p1": "4 ноября на главной площади города проходит концерт дружбы народов: на одной сцене выступают казачьи, калмыцкие и кавказские коллективы, а рядом разворачивается ярмарка промыслов.", "p2": "День начинается с выставки национальных костюмов и заканчивается вечерним концертом, который собирает весь город.", "lh": "Что будет на празднике", "lst": ["Праздничный концерт", "Выступления народных ансамблей", "Ярмарка промыслов", "Выставка костюмов"], "credit": "Brateevsky", "lic": "CC BY-SA 4.0", "page": ""}, "ev-jangar": {"t": "Джангариада", "tag": "Праздник • 9 мая", "theme": "Элиста, Калмыкия", "img": "images/event-horses.jpg", "cap": "Калмыцкие лошади в степи", "p1": "Джангариада названа по эпосу «Джангар»: в нём богатыри защищают страну Бумба. Праздник держится на коневодстве — скачки, джигитовка, национальная борьба и стрельба из лука.", "p2": "Эпос на празднике читают и поют: «Джангар» веками передавали изустно. К вечеру выступают ансамбли, а стол в степи накрывают с джомбой и борцоками.", "lh": "Что будет на празднике", "lst": ["Скачки", "Национальная борьба", "Чтение эпоса «Джангар»", "Выступления ансамблей"], "credit": "Oleg Mileev (Kamintsev)", "lic": "CC BY-SA 4.0", "page": ""}, "ev-sabantuy": {"t": "Сабантуй", "tag": "Праздник • 6 июля", "theme": "Астрахань", "img": "images/event-sabantuy.jpg", "cap": "Народные игры на Сабантуе", "p1": "Сабантуй — праздник окончания весенних полевых работ. Его отмечают татары и башкиры, а в Астрахани он собирает весь город: главное на поле — борьба и конные состязания.", "p2": "Рядом — песни под домбру, пляски и игры для детей: бег в мешках, перетягивание каната, разбивание горшка. Гостя на Сабантуе встречают угощением.", "lh": "Что будет на празднике", "lst": ["Национальная борьба", "Конные состязания", "Песни под домбру", "Игры и угощение"], "credit": "Игорь Улитин", "lic": "CC BY-SA 4.0", "page": ""}};
D["keramika"] = {"t": "Керамика: глина донской степи", "tag": "Ростовская область", "theme": "Народные промыслы", "img": "images/keramika.jpg", "cap": "Семикаракорская керамика: абажур с росписью", "p1": "Семикаракорская керамика родилась на Дону в 1972 году, но выросла из старой гончарной традиции донских станиц, где посуду лепили из местной красной глины. Мастера промысла работают с белым фаянсом: форму вытягивают на гончарном круге, подсушивают и расписывают вручную.", "p2": "Роспись узнаётся по крупным цветочным букетам и волнистым линиям, нанесённым по светлой глазури. В Семикаракорске делают не только посуду, но и декоративные вещи — абажуры, панно, сувениры. Каждая вещь единична: узор не повторяют точно, хотя мотивы и палитра держатся традиции.", "lh": "Попробовать и посмотреть", "lst": ["Посуда с цветочной росписью", "Поливная глазурь и подглазурная роспись", "Гончарный круг и ручная лепка", "Мастер-класс на фабрике промысла"], "credit": "Alexander Roumega", "lic": "CC0", "page": ""};
D["kovry"] = {"t": "Ковроткачество: узел к узлу", "tag": "Республика Калмыкия", "theme": "Народные промыслы", "img": "images/kovry.jpg", "cap": "Кубинский килим, около 1900 года", "p1": "Ковёр в степи был не украшением, а вещью первой необходимости: им застилали кибитку, на нём сидели и спали, им отделяли мужскую половину от женской. Ткали на простом станке из шерсти своей отары — овец в калмыцких хозяйствах держали всегда.", "p2": "Безворсовый ковёр — килим — ткут плотным переплетением нитей, поэтому он тонкий и двусторонний. Ворсовые ковры делают узелками, и тогда рисунок становится рельефным. Красили пряжу корнями, корой и травой, отсюда глухие тёплые тона; узор строили ромбами и медальонами, повторяя их от центра к кайме.", "lh": "Попробовать и посмотреть", "lst": ["Килим — безворсовый ковёр", "Ворсовое ткачество узелками", "Красители из корней и трав", "Орнамент: ромбы и медальоны"], "credit": "без автора", "lic": "Public domain", "page": ""};
D["rezba"] = {"t": "Деревянная резьба: наличники", "tag": "Ставропольский край", "theme": "Народные промыслы", "img": "images/rezba.jpg", "cap": "Домовая резьба: резные наличники", "p1": "Дом в южнорусской и казачьей станице узнавали по наличникам: оконная рама получала навершие, боковые доски и подоконник, и всё это резали из дерева. Мастер работал топором, долотом и пилой прямо на месте, подгоняя узор к дому.", "p2": "Различают пропильную резьбу — ажурный узор по доске — и глухую, рельефную, где фон выбирают, оставляя выпуклый рисунок. В мотивах читаются солнце, побег, вьющийся стебель, птица. Наличник был и защитой окна от ветра, и оберегом, и способом показать достаток хозяина.", "lh": "Попробовать и посмотреть", "lst": ["Наличники, причелины, полотенца", "Пропильная и глухая резьба", "Солярные знаки в узоре", "Инструмент резчика"], "credit": "Katya from Moscow, Russia", "lic": "CC BY-SA 2.0", "page": ""};
D["ukrasheniya"] = {"t": "Украшения: серебро и эмаль", "tag": "Чеченская Республика", "theme": "Народные промыслы", "img": "images/ukrasheniya.jpg", "cap": "Кубачинское серебро с эмалью", "p1": "На Северном Кавказе украшение носили как знак достатка и как оберег: пояс, нагрудник и браслеты собирали из серебряных пластин, монет и цепочек. Металл покупали у приезжих купцов, а чеканили и чернили его местные мастера.", "p2": "Соседнее дагестанское село Кубачи дало имя целому промыслу: там серебро гравируют, чернят, украшают цветной эмалью и зернью. Ларец на снимке — работа кубачинских серебряников, ближайший к чеченским украшениям пример того же кавказского серебряного дела: точных чеченских изделий в свободных фотоархивах нет.", "lh": "Попробовать и посмотреть", "lst": ["Пояс и нагрудные бляхи", "Гравировка и чернь", "Перегородчатая эмаль", "Зернь и скань"], "credit": "User:Silver & Enamel", "lic": "CC BY 4.0", "page": ""};
var m = document.getElementById('cardModal');
var last = null;
function fill(k){
  var d = D[k]; if(!d) return;
  document.getElementById('cImg').src = d.img;
  document.getElementById('cImg').alt = d.cap;
  document.getElementById('cTag').textContent = d.tag;
  document.getElementById('cTitle').textContent = d.t;
  document.getElementById('cTheme').textContent = d.theme;
  document.getElementById('cP1').textContent = d.p1;
  document.getElementById('cP2').textContent = d.p2;
  document.getElementById('cListHead').textContent = d.lh;
  var ul = document.getElementById('cList'); ul.innerHTML = '';
  for (var i = 0; i < d.lst.length; i += 1) {
    var li = document.createElement('li'); li.textContent = d.lst[i]; ul.appendChild(li);
  }
  document.getElementById('cCredits').innerHTML = 'Фото: ' + d.credit + ', Wikimedia Commons, ' + d.lic +
    (d.page ? ' — <a href="' + d.page + '" target="_blank" rel="noopener">страница файла</a>' : '');
}
function open(k, btn){
  if (!D[k]) return;
  fill(k); last = btn || null;
  m.classList.add('on'); document.body.style.overflow = 'hidden';
  document.getElementById('cClose').focus();
}
function close(){
  m.classList.remove('on'); document.body.style.overflow = '';
  if (last) last.focus();
}
document.addEventListener('click', function(e){
  var b = e.target.closest ? e.target.closest('[data-card]') : null;
  if (b) { e.preventDefault(); open(b.getAttribute('data-card'), b); return; }
  if (e.target === m) close();
});
document.getElementById('cClose').addEventListener('click', close);
document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && m.classList.contains('on')) close(); });
})();
