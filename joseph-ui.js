(function(){
  if(window.__jui)return;window.__jui=true;
  var root=document.documentElement,B='var(--blue,var(--acc,#FF7A45))';
  var here=location.pathname.split('/').pop()||'index.html';

  var css=document.createElement('style');
  css.textContent=[
    '#burger,#lang{display:none!important}',
    '.brand.wf{display:inline-flex!important;align-items:center;gap:.5rem;text-decoration:none}',
    '.brand .wf-mark{display:inline-flex;width:34px;height:34px;flex:none}',
    '.brand .wf-mark svg{width:100%;height:100%;overflow:visible}',
    '.brand .wf-word{color:inherit!important;font-weight:800;letter-spacing:-.02em;white-space:nowrap;line-height:1;overflow:visible!important;text-overflow:clip!important}',
    '.brand .wf-word b{font-weight:500;opacity:.7;margin-left:.28em}',
    '.wf-hex{stroke-dasharray:110;stroke-dashoffset:110;animation:wfd 1.3s cubic-bezier(.3,.7,.2,1) .1s forwards}',
    '.wf-br{stroke-dasharray:40;stroke-dashoffset:40;animation:wfd .9s ease .9s forwards}',
    '@keyframes wfd{to{stroke-dashoffset:0}}',
    '.wf-fl{transform-box:fill-box;transform-origin:50% 100%;opacity:0;animation:wfin .5s ease 1.6s forwards,wff 1.5s ease-in-out 2.1s infinite}',
    '@keyframes wfin{to{opacity:1}}',
    '@keyframes wff{0%,100%{transform:scale(1,1)}35%{transform:scale(.9,1.12) skewX(-4deg)}70%{transform:scale(1.07,.92) skewX(3deg)}}',
    '.wf-sp{opacity:0;animation:wfs 2.4s linear infinite}',
    '@keyframes wfs{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(-9px)}}',
    '.brand.wf:hover .wf-mark svg{filter:drop-shadow(0 0 6px #FF8A3D)}',
    '#theme.jm-t{position:relative;width:52px;height:28px;padding:0!important;flex:none;border-radius:99px!important;border:1px solid var(--line,rgba(127,127,127,.45))!important;background:var(--panel,rgba(127,127,127,.15))!important;cursor:pointer;overflow:hidden}',
    '#theme .k{position:absolute;top:2px;left:2px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:'+B+';color:var(--onblue,#fff);transition:transform .35s cubic-bezier(.3,.8,.3,1)}',
    '#theme[data-jm="dark"] .k{transform:translateX(24px)}',
    '#theme .k svg{grid-area:1/1;width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:opacity .25s,transform .4s}',
    '#theme .moon{opacity:0;transform:rotate(-70deg) scale(.6)}',
    '#theme[data-jm="dark"] .sun{opacity:0;transform:rotate(70deg) scale(.6)}',
    '#theme[data-jm="dark"] .moon{opacity:1;transform:none}',
    '.jm-m{display:inline-flex;align-items:center;justify-content:center;width:44px;height:30px;padding:0;flex:none;border-radius:99px;border:1px solid var(--line,rgba(127,127,127,.45));background:var(--panel,rgba(127,127,127,.15));color:var(--ink,inherit);cursor:pointer}',
    '.pg-i{display:grid;gap:4px;width:18px}',
    '.pg-i i{display:block;height:2px;border-radius:2px;background:currentColor;transition:transform .25s,opacity .2s}',
    '.jm-m[aria-expanded="true"] .pg-i i:nth-child(1){transform:translateY(6px) rotate(45deg)}',
    '.jm-m[aria-expanded="true"] .pg-i i:nth-child(2){opacity:0}',
    '.jm-m[aria-expanded="true"] .pg-i i:nth-child(3){transform:translateY(-6px) rotate(-45deg)}',
    '#pg-panel{position:fixed;z-index:60;right:max(.75rem,env(safe-area-inset-right,0px));top:calc(env(safe-area-inset-top,0px) + 70px);width:min(310px,calc(100vw - 1.5rem));max-height:calc(100vh - 100px);max-height:calc(100dvh - 100px);overflow:auto;padding:.5rem;border:1px solid var(--line,rgba(127,127,127,.4));border-radius:18px;background:var(--bg,#0A0F2A);color:var(--ink,#EEF1F7);font-family:var(--body,system-ui,sans-serif);box-shadow:0 20px 50px rgba(0,0,0,.35)}',
    '#pg-panel[hidden]{display:none}',
    '#pg-panel h3{font:600 .75rem var(--body,system-ui);letter-spacing:.06em;text-transform:uppercase;color:var(--mute,#9AA5C2);margin:.6rem .7rem .3rem}',
    '#pg-panel a{display:flex;align-items:center;gap:.75rem;padding:.4rem .5rem;border-radius:12px;text-decoration:none;color:inherit;font-size:1rem}',
    '#pg-panel a:hover,#pg-panel a[aria-current]{background:var(--panel,rgba(127,127,127,.15))}',
    '.jm-ic{display:grid;place-items:center;width:32px;height:32px;flex:none;border-radius:10px;color:'+B+';background:color-mix(in srgb,currentColor 16%,transparent);transition:background .2s,color .2s,transform .2s}',
    '.jm-ic svg{width:18px;height:18px}',
    '#pg-panel a:hover .jm-ic{background:'+B+';color:var(--onblue,#fff);transform:scale(1.08)}',
    '#pg-panel:not([hidden]) a{animation:jmin .35s ease backwards;animation-delay:calc(var(--n)*30ms)}',
    '@keyframes jmin{from{opacity:0;transform:translateX(12px)}}',
    '@media (min-width:761px){.jm-sec{display:none}}',
    '@media (prefers-reduced-motion:reduce){.wf-hex,.wf-br{animation:none;stroke-dashoffset:0}.wf-fl{animation:none;opacity:1}.wf-sp,#pg-panel a{animation:none!important}.pg-i i,#theme .k,#theme svg{transition:none}}'
  ].join('');
  document.head.appendChild(css);

  /* 1. logo */
  var brand=document.querySelector('.top .brand')||document.querySelector('.brand');
  if(brand&&!brand.classList.contains('wf')){
    brand.classList.add('wf');brand.setAttribute('aria-label','Webforge Studio, home');
    brand.innerHTML='<span class="wf-mark"><svg viewBox="0 0 40 40" aria-hidden="true" focusable="false"><defs><linearGradient id="wfg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB347"/><stop offset=".55" stop-color="#FF5A1F"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient><linearGradient id="wfl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE08A"/><stop offset="1" stop-color="#FF5A1F"/></linearGradient></defs><path class="wf-hex" d="M20 3 34 11v18L20 37 6 29V11z" fill="none" stroke="url(#wfg)" stroke-width="2.4" stroke-linejoin="round"/><path class="wf-br" d="M15.5 14.5 10 20l5.5 5.5M24.5 14.5 30 20l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path class="wf-fl" d="M20 11.5c2.8 3.5 3.9 6.3 2.5 9.4-.6 1.4-1.5 2.2-2.5 2.8-1-.6-1.9-1.4-2.5-2.8-1.4-3.1-.3-5.9 2.5-9.4z" fill="url(#wfl)"/><circle class="wf-sp" cx="20" cy="10" r=".9" fill="#FFD23F" style="animation-delay:2s"/><circle class="wf-sp" cx="18" cy="12" r=".7" fill="#FFB347" style="animation-delay:2.8s"/><circle class="wf-sp" cx="22.5" cy="11" r=".7" fill="#FFD23F" style="animation-delay:3.6s"/></svg></span><span class="wf-word" translate="no">Webforge<b>Studio</b></span>';
  }

  /* 2. moon toggle */
  var tg=document.getElementById('theme');
  if(tg&&!tg.classList.contains('jm-t')){
    tg.classList.add('jm-t');
    tg.innerHTML='<span class="k" aria-hidden="true"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg><svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></span>';
    var dark=function(){var t=root.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches};
    var sync=function(){var d=dark();tg.setAttribute('data-jm',d?'dark':'light');tg.setAttribute('aria-pressed',d);tg.setAttribute('aria-label','Dark mode')};
    new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-theme']});
    try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',sync)}catch(e){}
    sync();
  }

  /* 3. menu with icons */
  var host=tg||document.getElementById('nav');
  if(!host)return;
  ['pg-btn','pg-panel'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove()});
  var IC={
    lab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/>',
    tools:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    resume:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    xray:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    cal:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    hash:'<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>'
  };
  /* To add a page, add a line here: ['Name','file.html','icon'] */
  var PAGES=[['Lab','lab.html','lab'],['Tools','tools.html','tools'],['Resume','resume.html','resume'],['Privacy X-Ray','xray.html','xray'],['Defence game','defense.html','shield'],['Security notes','blog.html','pen'],['Live Earth','earth.html','globe'],['Locked message','secure.html','lock'],['Book a call','meet.html','cal'],['File tools','files.html','folder'],['Developer toolkit','devkit.html','code'],['Invoice generator','invoice.html','receipt']];

  var btn=document.createElement('button');
  btn.id='pg-btn';btn.type='button';btn.className='jm-m';
  btn.setAttribute('aria-label','Open menu');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','pg-panel');
  btn.innerHTML='<span class="pg-i" aria-hidden="true"><i></i><i></i><i></i></span>';
  if(tg)tg.insertAdjacentElement('afterend',btn);else host.appendChild(btn);

  var panel=document.createElement('nav');
  panel.id='pg-panel';panel.hidden=true;panel.setAttribute('aria-label','Menu');panel.setAttribute('data-lenis-prevent','');
  var n=0;
  var link=function(p){
    var a=document.createElement('a'),t=document.createElement('span'),i=document.createElement('span');
    a.href=p[1];a.style.setProperty('--n',n++);
    i.className='jm-ic';i.setAttribute('aria-hidden','true');
    i.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+IC[p[2]]+'</svg>';
    t.textContent=p[0];a.appendChild(i);a.appendChild(t);
    if(p[1]===here)a.setAttribute('aria-current','page');
    return a;
  };
  var group=function(title,list,cls){
    var box=document.createElement('div'),h=document.createElement('h3');
    if(cls)box.className=cls;h.textContent=title;box.appendChild(h);
    list.forEach(function(p){box.appendChild(link(p))});panel.appendChild(box);
  };
  var secs=[].slice.call(document.querySelectorAll('#nav > a')).filter(function(a){return (a.getAttribute('href')||'').charAt(0)==='#'}).map(function(a){return [a.textContent.trim(),a.getAttribute('href'),'hash']});
  if(secs.length)group('Sections',secs,'jm-sec');
  group('Pages',PAGES);
  document.body.appendChild(panel);

  var open=function(on){panel.hidden=!on;btn.setAttribute('aria-expanded',on);btn.setAttribute('aria-label',on?'Close menu':'Open menu')};
  btn.addEventListener('click',function(e){e.stopPropagation();open(panel.hidden)});
  panel.addEventListener('click',function(e){if(e.target.closest('a'))open(false)});
  document.addEventListener('click',function(e){if(!panel.hidden&&!panel.contains(e.target))open(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){open(false);btn.focus()}});
})();