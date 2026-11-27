(function(){
  if(window.__cinema||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  window.__cinema=true;

  var load=function(src,ok,fail){
    var s=document.createElement('script');
    s.src=src;s.onload=ok;if(fail)s.onerror=fail;
    document.head.appendChild(s);
  };
  var GS='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/';

  load(GS+'gsap.min.js',function(){
    load(GS+'ScrollTrigger.min.js',function(){
      try{go()}catch(e){}
      load('https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js',smooth);
    });
  });

  function go(){
    var gsap=window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    /* 1. hero pulls back as you scroll */
    if(document.querySelector('.hero .wrap')){
      gsap.to('.hero .wrap',{
        yPercent:10,scale:1.05,opacity:.12,ease:'none',transformOrigin:'50% 0%',
        scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}
      });
    }

    /* 2. headings open like a curtain */
    gsap.utils.toArray('.head h2,.contact h2').forEach(function(h){
      gsap.fromTo(h,
        {clipPath:'inset(0 0 100% 0)',yPercent:35},
        {clipPath:'inset(-20% -5% -20% -5%)',yPercent:0,duration:1.1,ease:'power4.out',
         scrollTrigger:{trigger:h,start:'top 90%',once:true}});
    });

    /* 3. the big number counts up */
    var n=document.querySelector('.tile.big .n');
    if(n){
      var m=n.textContent.trim().match(/^(\d+)(.*)$/);
      if(m){
        var end=+m[1],tail=m[2],o={v:0};
        n.textContent='0'+tail;
        gsap.to(o,{v:end,duration:1.8,ease:'power2.out',
          scrollTrigger:{trigger:n,start:'top 85%',once:true},
          onUpdate:function(){n.textContent=Math.round(o.v)+tail}});
      }
    }

    /* 4. the marquee follows scroll speed and direction */
    var mq=document.querySelector('.mqt');
    if(mq&&mq.getAnimations){
      var a=mq.getAnimations()[0];
      if(a){
        var dir=1,cur=1,target=1;
        window.ScrollTrigger.create({
          onUpdate:function(self){
            dir=self.direction||dir;
            target=dir*(1+Math.min(5,Math.abs(self.getVelocity())/500));
          }
        });
        gsap.ticker.add(function(){
          target+=(dir-target)*.05;
          cur+=(target-cur)*.12;
          a.playbackRate=cur;
        });
      }
    }

    window.addEventListener('load',function(){window.ScrollTrigger.refresh()});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){window.ScrollTrigger.refresh()});
  }

  /* smooth scrolling, optional */
  function smooth(){
    var L=window.Lenis,gsap=window.gsap;
    if(!L||!gsap)return;
    var lenis=new L({duration:1.15,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}});
    lenis.on('scroll',window.ScrollTrigger.update);
    gsap.ticker.add(function(t){lenis.raf(t*1000)});
    gsap.ticker.lagSmoothing(0);

    /* boxes that scroll on their own must keep their own wheel */
    document.querySelectorAll('.pal,.tbox,.pyin,.pyout,.tw,.enc,pre,textarea').forEach(function(e){
      e.setAttribute('data-lenis-prevent','');
    });

    /* menu links glide to their section */
    document.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[href^="#"]');
      if(!a||a.getAttribute('href').length<2)return;
      var t=document.getElementById(a.getAttribute('href').slice(1));
      if(!t)return;
      e.preventDefault();
      lenis.scrollTo(t,{offset:-84});
    });

    /* pause page scroll while the Ctrl + K box is open */
    var pal=document.getElementById('pal');
    if(pal)new MutationObserver(function(){if(pal.open)lenis.stop();else lenis.start()}).observe(pal,{attributes:true,attributeFilter:['open']});
  }
})();