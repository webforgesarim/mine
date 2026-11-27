(function(){
  if(window.__rain)return;window.__rain=true;
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CH='01{}<>/;=()[]$#&*+-ABCDEF0123456789'.split('');
  var rc=function(){return CH[Math.random()*CH.length|0]};

  var css=document.createElement('style');
  css.textContent=
    '.tsec,.lab{position:relative;overflow:hidden}'+
    '.tsec>.wrap,.lab>.wrap{position:relative;z-index:1}'+
    '.rain{display:none;position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.55;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 14%,#000 86%,transparent)}'+
    '.rain.fx{position:fixed;z-index:-1;opacity:.4}'+
    'html[data-theme="dark"] .rain{display:block}'+
    '@media (prefers-color-scheme:dark){html:not([data-theme="light"]) .rain{display:block}}';
  document.head.appendChild(css);

  var make=function(host,rgb,fixed){
    var cv=document.createElement('canvas');
    cv.className='rain'+(fixed?' fx':'');cv.setAttribute('aria-hidden','true');
    if(fixed)document.body.insertBefore(cv,document.body.firstChild);else host.insertBefore(cv,host.firstChild);
    var ctx=cv.getContext('2d'),W=0,H=0,S=16,drops=[],vis=true,raf=0,last=0;
    var draw=function(dt){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<drops.length;i++){
        var d=drops[i];if(!d)continue;
        var b=Math.floor(d.y);d.y+=d.v*dt;
        if(Math.floor(d.y)>b){d.ch.pop();d.ch.unshift(rc())}
        for(var k=0;k<d.len;k++){
          var y=(Math.floor(d.y)-k)*S;
          if(y<-S||y>H)continue;
          ctx.fillStyle='rgba('+rgb+','+((1-k/d.len)*(k?.42:.85))+')';
          ctx.fillText(d.ch[k],i*S,y);
        }
        if((d.y-d.len)*S>H){d.y=-Math.random()*12;d.v=.12+Math.random()*.22}
      }
    };
    var build=function(){
      var dpr=Math.min(devicePixelRatio||1,2);
      W=fixed?innerWidth:host.clientWidth;H=fixed?innerHeight:host.clientHeight;
      if(!W||!H)return;
      cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.font=(S-2)+'px ui-monospace,Menlo,Consolas,monospace';ctx.textBaseline='top';
      drops=[];
      for(var i=0,n=Math.ceil(W/S);i<n;i++){
        if(Math.random()<.45){drops.push(null);continue}
        var len=8+(Math.random()*10|0);
        drops.push({y:Math.random()*H/S,v:.12+Math.random()*.22,len:len,ch:Array.from({length:len},rc)});
      }
      if(still)draw(0);
    };
    var loop=function(t){raf=requestAnimationFrame(loop);draw(Math.min(3,(t-last)/16.7));last=t};
    var halt=function(){cancelAnimationFrame(raf);raf=0};
    var run=function(){
      var style=getComputedStyle(cv);
      if(still||raf||!vis||document.hidden||style.display==='none'||style.visibility==='hidden')return;
      last=performance.now();raf=requestAnimationFrame(loop);
    };
    var sync=function(){
      var style=getComputedStyle(cv);
      if(still||!vis||document.hidden||style.display==='none'||style.visibility==='hidden')halt();
      else run();
    };
    new IntersectionObserver(function(e){vis=e[0].isIntersecting;sync()}).observe(fixed?document.body:host);
    document.addEventListener('visibilitychange',sync);
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    var dark=matchMedia('(prefers-color-scheme: dark)');
    if(dark.addEventListener)dark.addEventListener('change',sync);else if(dark.addListener)dark.addListener(sync);
    if(window.ResizeObserver&&!fixed)new ResizeObserver(build).observe(host);else addEventListener('resize',build);
    build();run();
  };

  var secs=[].slice.call(document.querySelectorAll('.tsec,.lab'));
  if(secs.length){
    secs.forEach(function(s){make(s,/^(terminal|python|ctf)$/.test(s.id)?'124,255,178':'92,225,230',false)});
  }else{
    var g=getComputedStyle(document.documentElement).getPropertyValue('--g').trim(),rgb='92,225,230';
    if(/^#[0-9a-f]{6}$/i.test(g))rgb=[1,3,5].map(function(i){return parseInt(g.substr(i,2),16)}).join(',');
    make(document.body,rgb,true);
  }
})();