(function(){
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};

  /* 1. hero particles */
  (function(){
    var hero=document.querySelector('.hero');
    if(!hero||hero.querySelector('.pfx'))return;
    var cv=document.createElement('canvas');
    cv.className='pfx';cv.setAttribute('aria-hidden','true');
    hero.insertBefore(cv,hero.firstChild);
    var ctx=cv.getContext('2d'),W=0,H=0,P=[],mx=-999,my=-999,vis=true,raf=0,n=0,D=125;
    var accent=function(){return getComputedStyle(document.documentElement).getPropertyValue('--pfx').trim()||'255,122,69'};
    var col=accent();
    var build=function(){
      var dpr=Math.min(devicePixelRatio||1,2);
      W=hero.clientWidth;H=hero.clientHeight;
      if(!W||!H)return;
      cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      var k=Math.max(60,Math.min(W<700?110:190,Math.round(W*H/6500)));P=[];
      for(var i=0;i<k;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.4+.9});
      if(still)frame();
    };
    var frame=function(){
      ctx.clearRect(0,0,W,H);
      if(++n%40===0)col=accent();
      for(var i=0;i<P.length;i++){
        var p=P[i],dx,dy,d2;
        if(!still){
          p.x+=p.vx;p.y+=p.vy;
          if(p.x<0||p.x>W)p.vx*=-1;
          if(p.y<0||p.y>H)p.vy*=-1;
          dx=p.x-mx;dy=p.y-my;d2=dx*dx+dy*dy;
          if(d2<16900&&d2>1){var d=Math.sqrt(d2),f=(1-d/130)*.7;p.x+=dx/d*f;p.y+=dy/d*f}
        }
        ctx.fillStyle='rgba(255,255,255,.8)';
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();
        dx=p.x-mx;dy=p.y-my;d2=dx*dx+dy*dy;
        if(d2<28900){
          ctx.strokeStyle='rgba('+col+','+(.7*(1-Math.sqrt(d2)/170))+')';
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mx,my);ctx.stroke();
        }
        for(var j=i+1;j<P.length;j++){
          var o=P[j],ax=p.x-o.x,ay=p.y-o.y,dd=ax*ax+ay*ay;
          if(dd<D*D){
            ctx.strokeStyle='rgba(255,255,255,'+(.2*(1-Math.sqrt(dd)/D))+')';
            ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(o.x,o.y);ctx.stroke();
          }
        }
      }
      if(!still&&vis)raf=requestAnimationFrame(frame);
    };
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
    hero.addEventListener('pointerleave',function(){mx=-999;my=-999});
    new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis&&!still){cancelAnimationFrame(raf);raf=requestAnimationFrame(frame)}}).observe(hero);
    if(window.ResizeObserver)new ResizeObserver(build).observe(hero);else addEventListener('resize',build);
    build();if(!still)raf=requestAnimationFrame(frame);
  })();

  /* 2. animated stat tiles and contact section */
  if(still||!window.IntersectionObserver||!document.body.animate)return;
  var once=function(el,fn,th){
    var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();fn()}},{threshold:th});
    io.observe(el);
  };
  var up=function(el,delay){
    el.style.opacity='';
    el.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'none'}],{duration:800,delay:delay,easing:'cubic-bezier(.2,.8,.25,1)',fill:'backwards'});
  };
  var count=function(el){
    var m=el.textContent.match(/^(\D*)(\d+)(.*)$/);
    if(!m)return;
    var a=m[1],end=+m[2],b=m[3],t0=performance.now();
    var tick=function(t){
      var p=Math.min(1,(t-t0)/1600);
      el.textContent=a+Math.round(end*(1-Math.pow(1-p,3)))+b;
      if(p<1)requestAnimationFrame(tick);
    };
    el.textContent=a+'0'+b;requestAnimationFrame(tick);
  };
  var hide=function(list){list.forEach(function(e){e.style.opacity='0'});setTimeout(function(){list.forEach(function(e){e.style.opacity=''})},9000)};

  $$('.tile').forEach(function(tile){
    var inner=$$('.n,h3,p,pre',tile);
    if(!inner.length)return;
    hide(inner);
    once(tile,function(){
      inner.forEach(function(e,i){up(e,300+i*150);if(e.classList.contains('n'))count(e)});
    },.3);
  });

  var c=document.getElementById('contact');
  if(c){
    var h2=c.querySelector('h2');
    var rest=$$('.note,.mail,.btns,.social a,.cform h3,.cform .fld,.cform .btns',c);
    hide(rest);if(h2)h2.style.opacity='0';
    once(c,function(){
      if(h2){
        h2.style.opacity='';
        h2.animate([{clipPath:'inset(0 0 100% 0)',transform:'translateY(46px)'},{clipPath:'inset(-20% -5% -20% -5%)',transform:'none'}],{duration:1100,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});
      }
      rest.forEach(function(e,i){up(e,350+i*90)});
    },.2);
  }
})();