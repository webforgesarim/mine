
(function(){
  var root=document.documentElement;
  try{var s=localStorage.getItem('theme');if(s)root.setAttribute('data-theme',s)}catch(e){}
  var themeBtn=document.getElementById('theme');
  if(themeBtn)themeBtn.addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);
    var next=dark?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('theme',next)}catch(e){}
  });
  var nav=document.getElementById('nav'),b=document.getElementById('burger');
  if(b&&nav){
    b.addEventListener('click',function(){var o=nav.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  }
  var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
  document.querySelectorAll('.flip').forEach(function(c){c.addEventListener('click',function(){c.setAttribute('aria-pressed',c.classList.toggle('on'))})});
  var bb=document.querySelector('.bubbles');
  if(bb){
    for(var i=0;i<14;i++){var bubble=document.createElement('i'),z=22+Math.random()*80;bubble.style.cssText='left:'+Math.random()*100+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(14+Math.random()*16)+'s;animation-delay:-'+Math.random()*20+'s';bb.appendChild(bubble)}
    if(window.IntersectionObserver){
      var lab=bb.closest('.lab');
      if(lab)new IntersectionObserver(function(es){lab.classList.toggle('fx-active',es[0].isIntersecting)}).observe(lab);
    }else if(bb.closest('.lab'))bb.closest('.lab').classList.add('fx-active');
  }
  var mt=document.querySelector('.mqt');if(mt)mt.innerHTML+=mt.innerHTML;
  var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('vis');io.unobserve(x.target)}})},{threshold:.12}):null;
  document.querySelectorAll('.head,.proj,.svc>div,.tl article,.steps li,.plan,.cards .flip,.about .copy').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%3)*80+'ms';if(io)io.observe(el);else el.classList.add('vis')});
  document.querySelectorAll('.tile').forEach(function(t){t.addEventListener('pointermove',function(e){var r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')})});
  var bar=document.getElementById('bar'),de=document.documentElement;
  if(bar)addEventListener('scroll',function(){bar.style.transform='scaleX('+(de.scrollTop/((de.scrollHeight-de.clientHeight)||1))+')'},{passive:true});
  var toast=document.getElementById('toast');
  var copyBtn=document.getElementById('copy'),mailEl=document.getElementById('mail');
  if(copyBtn&&mailEl)copyBtn.addEventListener('click',function(){
    var t=mailEl.textContent;
    function done(m){toast.textContent=m;toast.classList.add('show');setTimeout(function(){toast.classList.remove('show')},2000)}
    if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){done('Email address copied')},function(){done(t)})}else{done(t)}
  });
})();
  /* contact form */
  var WA='923203723135',MAIL='mi35245620@gmail.com';
  var q=function(id){return document.getElementById(id)};
  var rules=[
    ['cname','Please enter your name.',function(v){return !v}],
    ['cemail','That email address does not look right.',function(v){return v&&!q('cemail').checkValidity()}],
    ['cmsg','Please tell me a little about the project.',function(v){return !v}]
  ];
  var check=function(){
    var ok=true;
    rules.forEach(function(r){
      var el=q(r[0]),bad=!!r[2](el.value.trim());
      el.setAttribute('aria-invalid',bad);
      q(r[0]+'-err').textContent=bad?r[1]:'';
      if(bad&&ok){el.focus();ok=false}
    });
    return ok;
  };
  var msg=function(){
    var em=q('cemail').value.trim();
    return 'Hi Joseph, my name is '+q('cname').value.trim()+'.\nProject type: '+q('ctype').value+'.\n\n'+q('cmsg').value.trim()+(em?'\n\nReply to: '+em:'');
  };
  q('cwa').addEventListener('click',function(){
    if(check())window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg()),'_blank','noopener');
  });
  q('cmail').addEventListener('click',function(){
    if(check())location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('New project: '+q('ctype').value)+'&body='+encodeURIComponent(msg());
  });
  q('cform').addEventListener('submit',function(e){e.preventDefault()});

  /* security checklist */
  var boxes=document.querySelectorAll('#chk input');
  var tiers=[
    ['Needs attention','Several basics are missing. They are quick to fix and worth doing first.'],
    ['Decent, with gaps','You have the foundations. A few gaps are worth closing before they cause trouble.'],
    ['In good shape','Strong basics. Keep software updated and test your backups now and then.']
  ];
  var upd=function(){
    var n=0;
    boxes.forEach(function(b){if(b.checked)n++});
    var t=tiers[n<=3?0:n<=6?1:2];
    q('sn').textContent=n;
    q('sb').style.width=(n/boxes.length*100)+'%';
    q('sm').setAttribute('aria-valuenow',n);
    q('st').textContent=n?t[0]:'Tick what applies';
    q('sx').textContent=n?t[1]:'Your result appears here as you go.';
  };
  boxes.forEach(function(b){b.addEventListener('change',upd)});

    /* typing demo */
  var demoRun=0,demoTimers=[];
  var sleep=function(ms,run){return new Promise(function(resolve){
    var timer=setTimeout(function(){
      demoTimers=demoTimers.filter(function(t){return t.id!==timer});
      resolve(run===demoRun);
    },ms);
    demoTimers.push({id:timer,resolve:resolve});
  })};
  var stopDemo=function(){
    demoRun++;
    demoTimers.forEach(function(t){clearTimeout(t.id);t.resolve(false)});
    demoTimers=[];
  };
  var play=async function(el,steps,fast,run){
    while(run===demoRun){
      el.textContent='';
      for(var s of steps){
        if(run!==demoRun)return;
        var sp=document.createElement('span');
        sp.className=s[0];
        el.appendChild(sp);
        if(fast||!s[2]){sp.textContent=s[1]}
        else{for(var ch of s[1]){sp.textContent+=ch;if(!await sleep(s[2],run))return}}
        if(s[3]&&!fast&&!await sleep(s[3],run))return;
      }
      if(fast)return;
      if(!await sleep(4000,run))return;
    }
  };
  var bashSteps=[
    ['g','Joseph@webforgestudio:~$ ',0],['','whoami\n',55,350],
    ['c','web developer, Linux user\n',0,500],
    ['g','Joseph@webforgestudio:~$ ',0],['','uname -s\n',55,300],
    ['c','Linux\n',0,500],
    ['g','Joseph@webforgestudio:~$ ',0],['','ls projects/\n',55,300],
    ['c','webforgestudio-store  hisaab  clinicq\n',0,600],
    ['g','Joseph@webforgestudio:~$ ',0],['','sudo ufw status\n',55,300],
    ['y','Status: active\n',0,0]
  ];
  var pySteps=[
    ['m','# check if a site address is secure\n',0,300],
    ['y','def ',45],['','is_secure(url):\n',45],
    ['','    return url.startswith(',45],['g','"https://"',45],['',')\n\n',45,300],
    ['y','print',45],['','(is_secure(',45],['g','"https://webforgestudio.com"',40],['','))\n',45,400],
    ['c','True\n',0,0]
  ];
  var demo=document.querySelector('.demo');
  if(demo){
    var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
    var demoVisible=false;
    var runDemo=function(){
      if(!demoVisible||document.hidden)return;
      stopDemo();
      var run=demoRun;
      play(q('t1'),bashSteps,still,run);
      play(q('t2'),pySteps,still,run);
    };
    var setDemoVisible=function(visible){
      demoVisible=visible;
      var active=visible&&!document.hidden;
      demo.classList.toggle('fx-active',active);
      if(active)runDemo();
      else stopDemo();
    };
    var dio=new IntersectionObserver(function(es){
      setDemoVisible(es[0].isIntersecting);
    },{threshold:.3});
    dio.observe(demo);
    document.addEventListener('visibilitychange',function(){setDemoVisible(demoVisible)});
  }
    /* loading screen */
  var ld=q('ld'),t0=Date.now();
  var hideLd=function(){if(ld)setTimeout(function(){ld.classList.add('done')},Math.max(0,1100-(Date.now()-t0)))};
  if(document.readyState==='complete')hideLd();else addEventListener('load',hideLd);
  if(ld)setTimeout(function(){ld.classList.add('done')},4000);

  /* interactive terminal */
  (function(){
    var out=q('tout'),inp=q('tin'),box=q('tbox');
    if(!out||!inp)return;
    var hist=[],hp=0,P='visitor@Joseph:~$ ';
    var line=function(txt,cls){
      var d=document.createElement('div');
      if(cls)d.className=cls;
      d.textContent=txt;
      out.appendChild(d);
    };
    var lines=function(arr,cls){arr.forEach(function(t){line(t,cls)})};
    var files={
      'about.txt':['Joseph, web developer and founder of webforgestudio Pvt. Ltd.','I build fast, secure websites and web apps, start to finish.'],
      'skills.txt':['Web:        HTML, CSS, JavaScript, Node.js','Systems:    Linux, Bash, SSH, Nginx','Scripting:  Python, automation','Security:   OWASP Top 10, Nmap, Burp Suite (labs and permitted tests)'],
      'projects.txt':['2025  webforgestudio Store    online shop','2025  Hisaab              expense tracker','2024  ClinicQ             appointment booking','2024  Noor Academy site   marketing site'],
      'contact.txt':['Email:  '+MAIL,'Tip: type  goto contact  to jump to the form.']
    };
    var cmds={
      help:function(){lines(['Commands:','  about       who I am','  skills      what I work with','  projects    things I have built','  contact     how to reach me','  ls          list files','  cat FILE    read a file, e.g. cat about.txt','  goto NAME   jump to a section, e.g. goto work','  theme       switch light and dark','  date        show the date','  clear       clear the screen'])},
      about:function(){lines(files['about.txt'])},
      skills:function(){lines(files['skills.txt'])},
      projects:function(){lines(files['projects.txt'])},
      contact:function(){lines(files['contact.txt'])},
      whoami:function(){line('visitor')},
      ls:function(){line(Object.keys(files).join('  '))},
      cat:function(a){var f=files[a[0]];if(f)lines(f);else line('cat: '+(a[0]||'')+': No such file','e')},
      goto:function(a){
        var el=document.getElementById(a[0]||'');
        if(el&&el.tagName==='SECTION'){el.scrollIntoView({behavior:'smooth'});line('Jumping to '+a[0]+'...','m')}
        else line('goto: unknown section. Try: work, services, lab, security, skills, plans, contact','e');
      },
      theme:function(){q('theme').click();line('Theme switched.','m')},
      date:function(){line(new Date().toString())},
      echo:function(a){line(a.join(' '))},
      sudo:function(){line('visitor is not in the sudoers file. This incident will be reported.','e')},
      clear:function(){out.textContent=''}
    };
    var run=function(raw){
      var t=raw.trim(),d=document.createElement('div'),pr=document.createElement('span');
      pr.className='g';pr.textContent=P;
      d.appendChild(pr);d.appendChild(document.createTextNode(t));
      out.appendChild(d);
      if(t){
        hist.push(t);hp=hist.length;
        var parts=t.split(/\s+/),c=parts.shift().toLowerCase();
        if(cmds.hasOwnProperty(c))cmds[c](parts);
        else line(c+': command not found. Type help.','e');
      }
      box.scrollTop=box.scrollHeight;
    };
    inp.addEventListener('keydown',function(e){
      if(e.key==='Enter'){run(inp.value);inp.value=''}
      else if(e.key==='ArrowUp'&&hp>0){hp--;inp.value=hist[hp];e.preventDefault()}
      else if(e.key==='ArrowDown'){hp=Math.min(hp+1,hist.length);inp.value=hist[hp]||'';e.preventDefault()}
      else if(e.key==='Tab'){
        var v=inp.value.toLowerCase(),m=Object.keys(cmds).filter(function(k){return v&&k.indexOf(v)===0});
        if(m.length===1){inp.value=m[0]+' ';e.preventDefault()}
      }
    });
    box.addEventListener('click',function(){if(!String(getSelection()))inp.focus({preventScroll:true})});
    document.querySelectorAll('.tchips button').forEach(function(b){b.addEventListener('click',function(){run(b.getAttribute('data-c'))})});
    lines(['Welcome to my terminal.','Type help, or tap a command below.'],'m');
  })();

  /* price estimator */
  (function(){
    var E=q('estimate');
    if(!E)return;
    /* EDIT YOUR RATES HERE. Amounts are in PKR.
       type: [price, weeks, pages included, name]   extra: [price, weeks] */
    var RATE={
      type:{launch:[25000,1,1,'Launch page'],business:[75000,3,5,'Business site'],app:[200000,8,3,'Web app'],fix:[15000,1,0,'Fix or rebuild']},
      page:5000,pageWeeks:.3,
      extra:{login:[30000,2],pay:[25000,1.5],admin:[35000,2],lang:[20000,1],seo:[12000,.5],copy:[15000,1],care:[20000,0]},
      rush:1.25
    };
    var NAMES={login:'User accounts and login',pay:'Online payments',admin:'Admin dashboard',lang:'Urdu and English versions',seo:'Search engine setup',copy:'Writing the page text',care:'3 months of support'};
    var st={};
    var money=function(n){return 'PKR '+(Math.round(n/1000)*1000).toLocaleString('en-US')};
    var calc=function(){
      var t=E.querySelector('input[name="etype"]:checked').value,T=RATE.type[t],fix=t==='fix',pages=+q('epages').value;
      q('epages').disabled=fix;
      q('epv').textContent=fix?'(not needed)':pages;
      var more=fix?0:Math.max(0,pages-T[2]);
      var cost=T[0]+more*RATE.page,wk=T[1]+more*RATE.pageWeeks;
      var items=[T[3]+(fix?'':', '+pages+(pages===1?' page':' pages'))];
      E.querySelectorAll('.ex input:checked').forEach(function(c){var x=RATE.extra[c.value];cost+=x[0];wk+=x[1];items.push(NAMES[c.value])});
      if(E.querySelector('input[name="etime"]:checked').value==='fast'){cost*=RATE.rush;wk*=.7;items.push('Fast delivery')}
      var w=Math.max(1,Math.round(wk));
      st={label:T[3],items:items,range:money(cost*.9)+' to '+money(cost*1.15),time:'about '+w+(w===1?' week':' weeks')};
      q('eamt').textContent=st.range;
      q('etm').textContent='Delivery: '+st.time;
      q('elist').innerHTML='';
      items.forEach(function(i){var li=document.createElement('li');li.textContent=i;q('elist').appendChild(li)});
    };
    E.addEventListener('input',calc);
    E.addEventListener('change',calc);
    q('esend').addEventListener('click',function(){
      q('ctype').value=st.label;
      q('cmsg').value='Estimate from the website:\n- '+st.items.join('\n- ')+'\nRough range: '+st.range+', '+st.time+'.\n\nMore about my project: ';
      q('contact').scrollIntoView({behavior:'smooth'});
      setTimeout(function(){q('cname').focus({preventScroll:true})},700);
    });
    calc();
  })();

  /* command palette */
  (function(){
    var dlg=q('pal'),inp=q('pin'),list=q('plist');
    if(!dlg||!dlg.showModal)return;
    var items=[
      ['Selected work','#work'],['Services','#services'],['Why work with me','#why'],['Tech lab','#lab'],
      ['Terminal','#terminal'],['Security check','#security'],['Toolbox','#skills'],['Experience','#experience'],
      ['Plans','#plans'],['Price estimator','#estimate'],['How a project runs','#process'],['FAQ','#faq'],['Contact','#contact'],
      ['Free tools page','tools.html'],
      ['Privacy X-Ray','xray.html'],
      ['Defence game','defense.html'],
      ['Security notes','blog.html'],
      ['Switch theme','!theme'],['Copy email address','!copy']
    ];
    var shown=[],cur=0;
    var kind=function(h){return h[0]==='#'?'Section':h[0]==='!'?'Action':'Page'};
    var mark=function(){
      [].forEach.call(list.children,function(li,k){li.setAttribute('aria-selected',k===cur)});
      var a=list.children[cur];
      if(a&&a.id){inp.setAttribute('aria-activedescendant',a.id);a.scrollIntoView({block:'nearest'})}
    };
    var run=function(it){
      if(!it)return;
      dlg.close();
      var h=it[1];
      if(h==='!theme')q('theme').click();
      else if(h==='!copy')q('copy').click();
      else if(h[0]==='#'){var el=document.getElementById(h.slice(1));if(el)el.scrollIntoView({behavior:'smooth'})}
      else location.href=h;
    };
    var draw=function(){
      var v=inp.value.trim().toLowerCase();
      shown=items.filter(function(i){return !v||i[0].toLowerCase().indexOf(v)>-1});
      cur=0;list.textContent='';
      inp.removeAttribute('aria-activedescendant');
      if(!shown.length){var n=document.createElement('li');n.className='none';n.textContent='Nothing found';list.appendChild(n);return}
      shown.forEach(function(it,k){
        var li=document.createElement('li'),sm=document.createElement('small');
        li.id='po'+k;li.setAttribute('role','option');
        li.appendChild(document.createTextNode(it[0]));
        sm.textContent=kind(it[1]);li.appendChild(sm);
        li.addEventListener('click',function(){run(it)});
        li.addEventListener('mousemove',function(){if(cur!==k){cur=k;mark()}});
        list.appendChild(li);
      });
      mark();
    };
    var open=function(){dlg.showModal();inp.value='';draw();inp.focus()};
    document.addEventListener('keydown',function(e){
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dlg.open?dlg.close():open()}
    });
    var popen=q('popen');
    if(popen)popen.addEventListener('click',open);
    inp.addEventListener('input',draw);
    inp.addEventListener('keydown',function(e){
      if(!shown.length)return;
      if(e.key==='ArrowDown'){cur=Math.min(cur+1,shown.length-1);mark();e.preventDefault()}
      else if(e.key==='ArrowUp'){cur=Math.max(cur-1,0);mark();e.preventDefault()}
      else if(e.key==='Enter'){run(shown[cur]);e.preventDefault()}
    });
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
  })();

  /* puzzle */
  (function(){
    var box=q('ctfs');
    if(!box)return;
    var L=[
      ['Level 1: Base64','VGhlIGZpcnN0IHdvcmQgaXM6IGxpZ2h0aG91c2U=','Letters and numbers ending in = are often Base64. The <a href="tools.html">Tools page</a> can decode it.','b370de14e94142d4a108a79df6d0e265a0ba3fa2e10f57c4b3a892b74c9f84aa'],
      ['Level 2: Caesar cipher','Wkh vhfrqg zrug lv: kdueru','Every letter was moved 3 places forward. Move each one back by 3 (W becomes T).','c1d64b2d4cb30f1be788cc4d246ddd9fc1fe85a3eb3a85a3de33829dfaf6ce7d'],
      ['Level 3: Hex','54 68 65 20 6c 61 73 74 20 77 6f 72 64 20 69 73 3a 20 63 72 6f 77 6e 74 65 63 68','Each pair of digits is one character. 54 is T, and 20 is a space.','bbc351920a1bdf09b56a45a8c74eda50c614537e35060815d6ae153afe1992e8']
    ];
    var cards=[];
    var hx=function(on){document.documentElement.classList.toggle('hax',on)};
    var sha=async function(s){
      var b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));
      return [].map.call(new Uint8Array(b),function(x){return ('0'+x.toString(16)).slice(-2)}).join('');
    };
    var lock=function(c,on){c.classList.toggle('lock',on);c.querySelectorAll('input,button').forEach(function(e){e.disabled=on})};
    var done=function(){
      hx(true);q('win').hidden=false;
      try{localStorage.setItem('hax','1')}catch(e){}
    };
    var ok=function(i){
      var c=cards[i],s=c.querySelector('.stt');
      lock(c,true);c.classList.remove('lock');c.classList.add('ok');
      s.textContent='Solved';s.className='stt good';
      if(cards[i+1])lock(cards[i+1],false);else done();
    };
    L.forEach(function(l,i){
      var c=document.createElement('div');
      c.className='lvl';
      c.innerHTML='<h3>'+l[0]+'</h3><pre class="enc">'+l[1]+'</pre>'+
        '<div class="crow"><input type="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Your answer" aria-label="Answer for level '+(i+1)+'">'+
        '<button class="btn fill" type="button">Check</button><button class="btn" type="button">Hint</button></div>'+
        '<p class="hnt" hidden>'+l[2]+'</p><p class="stt" aria-live="polite"></p>';
      var inp=c.querySelector('input'),b=c.querySelectorAll('button'),h=c.querySelector('.hnt'),s=c.querySelector('.stt');
      b[1].addEventListener('click',function(){h.hidden=!h.hidden});
      b[0].addEventListener('click',async function(){
        var v=inp.value.trim().toLowerCase();
        if(!v)return;
        if(!window.crypto||!crypto.subtle){s.textContent='This puzzle needs a secure page (https or localhost).';return}
        if(await sha(v)===l[3])ok(i);
        else{s.textContent='Not quite. Try again, or take a hint.';s.className='stt bad'}
      });
      inp.addEventListener('keydown',function(e){if(e.key==='Enter')b[0].click()});
      box.appendChild(c);cards.push(c);
      if(i)lock(c,true);
    });
    q('wmsg').addEventListener('click',function(){
      q('cmsg').value='I solved your puzzle on the website.\n\nMore about my project: ';
      q('contact').scrollIntoView({behavior:'smooth'});
      setTimeout(function(){q('cname').focus({preventScroll:true})},700);
    });
    q('wreset').addEventListener('click',function(){
      hx(false);
      try{localStorage.removeItem('hax')}catch(e){}
      location.reload();
    });
    try{if(localStorage.getItem('hax')==='1')cards.forEach(function(c,i){ok(i)})}catch(e){}
  })();

  /* urdu / english */
  (function(){
    var btn=q('lang');
    if(!btn)return;
    var UR={
      'Work':'کام','Services':'خدمات','Tech lab':'ٹیک لیب','Plans':'پیکجز','About':'تعارف','Skills':'مہارتیں','Experience':'تجربہ','Contact':'رابطہ','Tools':'ٹولز','Theme':'تھیم','Menu':'مینو','Search':'تلاش',
      'Joseph, web developer and founder of webforgestudio Pvt. Ltd. Open for new projects.':'آدم، ویب ڈویلپر اور کراؤن ٹیک پرائیویٹ لمیٹڈ کے بانی۔ نئے پروجیکٹس کے لیے دستیاب۔',
      'I build websites and apps that people actually finish using.':'میں ایسی ویب سائٹس اور ایپس بناتا ہوں جنہیں لوگ واقعی آخر تک استعمال کرتے ہیں۔',
      'From a first landing page to a full booking or shop system, I design, code and launch it myself, so one person owns the result.':'پہلے لینڈنگ پیج سے لے کر مکمل بکنگ یا آن لائن شاپ سسٹم تک، میں خود ڈیزائن کرتا ہوں، کوڈ لکھتا ہوں اور لانچ کرتا ہوں، تاکہ نتیجے کی ذمہ داری ایک ہی شخص کی ہو۔',
      'See my work':'میرا کام دیکھیں','Start a project':'پروجیکٹ شروع کریں',
      'Selected work':'منتخب کام','A few recent builds. Open any row for what the problem was and what I shipped.':'حالیہ کام کی چند مثالیں۔ مسئلہ کیا تھا اور میں نے کیا بنایا، یہ دیکھنے کے لیے کوئی بھی قطار کھولیں۔',
      'What I do':'میں کیا کرتا ہوں','Three kinds of work, each with a clear start and a clear finish.':'تین طرح کا کام، ہر ایک کی واضح ابتدا اور واضح اختتام کے ساتھ۔',
      'Websites':'ویب سائٹس','Fast, responsive sites for businesses and people. Clear pages, readable text, and loading times that hold up on a phone.':'کاروبار اور افراد کے لیے تیز اور ہر اسکرین کے مطابق ویب سائٹس۔ صاف صفحات، آسانی سے پڑھا جانے والا متن، اور ایسی لوڈنگ جو فون پر بھی تیز رہے۔',
      'Web apps':'ویب ایپس','Booking systems, dashboards, shops and internal tools. Built so your team can use them on day one without training.':'بکنگ سسٹم، ڈیش بورڈ، آن لائن شاپس اور اندرونی ٹولز۔ ایسے بنائے جاتے ہیں کہ آپ کی ٹیم پہلے ہی دن بغیر تربیت کے استعمال کر سکے۔',
      'Fixes and rebuilds':'مرمت اور نئی تعمیر','Slow, broken or confusing site? I find what is wrong, fix it, and leave notes so the next person can follow the code.':'سائٹ سست، خراب یا الجھی ہوئی ہے؟ میں خرابی تلاش کرتا ہوں، اسے ٹھیک کرتا ہوں، اور نوٹس چھوڑتا ہوں تاکہ اگلا شخص کوڈ آسانی سے سمجھ سکے۔',
      'Why work with me':'میرے ساتھ کام کیوں کریں','A small studio means one person who knows your project from the first call to the last fix.':'چھوٹے اسٹوڈیو کا مطلب ہے کہ ایک ہی شخص پہلی کال سے لے کر آخری مرمت تک آپ کے پروجیکٹ کو جانتا ہے۔',
      'Projects shipped':'مکمل کیے گئے پروجیکٹس','Shops, booking tools and company sites, each launched and still running.':'آن لائن شاپس، بکنگ ٹولز اور کمپنی ویب سائٹس، جو سب لانچ ہو چکی ہیں اور آج بھی چل رہی ہیں۔',
      'Reply time':'جواب کا وقت','Every message gets an answer within a day.':'ہر پیغام کا جواب ایک دن کے اندر ملتا ہے۔',
      'Mobile first':'پہلے موبائل','Every page is designed on a phone screen first, then scaled up.':'ہر صفحہ پہلے فون کی اسکرین پر ڈیزائن کیا جاتا ہے، پھر بڑی اسکرین کے لیے بڑھایا جاتا ہے۔',
      'Secure by default':'شروع ہی سے محفوظ','HTTPS, validated forms and safe logins are built in from day one, not added later.':'HTTPS، جانچے ہوئے فارم اور محفوظ لاگ اِن پہلے دن سے شامل ہوتے ہیں، بعد میں نہیں جوڑے جاتے۔',
      'Plain pricing':'سیدھی اور صاف قیمت','A fixed price, agreed before any work starts, so there are no surprises on the invoice.':'کام شروع ہونے سے پہلے طے شدہ ایک مقررہ قیمت، تاکہ بل میں کوئی حیرت نہ ہو۔',
      'I like turning messy, manual work into something simple that people trust.':'مجھے بکھرے ہوئے، ہاتھ سے ہونے والے کام کو ایسی آسان چیز میں بدلنا پسند ہے جس پر لوگ بھروسا کر سکیں۔',
      'I started writing code because I wanted to see my own ideas working in a browser. Since then I have built shops, booking tools and company sites, and the lesson has stayed the same: every bug teaches you something about the person using the product.':'میں نے کوڈ لکھنا اس لیے شروع کیا کہ میں اپنے خیالات کو براؤزر میں چلتا دیکھنا چاہتا تھا۔ اس کے بعد میں نے آن لائن شاپس، بکنگ ٹولز اور کمپنی ویب سائٹس بنائیں، اور سبق وہی رہا: ہر بگ آپ کو پروڈکٹ استعمال کرنے والے کے بارے میں کچھ سکھاتا ہے۔',
      'At webforgestudio I handle the whole path myself, from the first conversation to the launch and the support after it. You talk to the person writing the code.':'کراؤن ٹیک میں میں پورا راستہ خود سنبھالتا ہوں، پہلی بات چیت سے لانچ تک اور اس کے بعد کی سپورٹ تک۔ آپ اسی شخص سے بات کرتے ہیں جو کوڈ لکھ رہا ہوتا ہے۔',
      'Years building':'تجربے کے سال','Languages':'زبانیں','Urdu, English':'اردو، انگریزی','Within a day':'ایک دن کے اندر',
      'The technical side behind the websites. Tap any card to flip it and see how I use it.':'ویب سائٹس کے پیچھے کا تکنیکی پہلو۔ کسی بھی کارڈ پر ٹیپ کریں تاکہ وہ پلٹے اور آپ دیکھ سکیں کہ میں اسے کیسے استعمال کرتا ہوں۔','Tap to flip':'پلٹنے کے لیے ٹیپ کریں',
      'Terminal':'ٹرمینل','A working command line. Type help, or tap a command below. Try goto contact when you are ready to talk.':'ایک چلتی ہوئی کمانڈ لائن۔ help لکھیں یا نیچے کوئی کمانڈ ٹیپ کریں۔ بات کرنے کے لیے تیار ہوں تو goto contact آزمائیں۔',
      'Is your website secure?':'کیا آپ کی ویب سائٹ محفوظ ہے؟','A quick self-check, not a full audit. Tick what is true for your site today. Nothing is saved or sent anywhere.':'ایک فوری خود جانچ، مکمل آڈٹ نہیں۔ جو آپ کی سائٹ کے لیے آج درست ہو اسے ٹِک کریں۔ کچھ بھی محفوظ یا کہیں بھیجا نہیں جاتا۔','Ask for a free check':'مفت جانچ مانگیں',
      'Toolbox':'ٹول باکس','What I reach for most often, and what I am comfortable shipping to real users.':'جو میں سب سے زیادہ استعمال کرتا ہوں، اور جسے اصل صارفین تک پہنچانے میں مجھے اعتماد ہے۔','Front end':'فرنٹ اینڈ','Back end':'بیک اینڈ','Data':'ڈیٹا','Delivery':'ڈیلیوری',
      'Where I have worked, newest first.':'میں نے کہاں کام کیا ہے، تازہ ترین پہلے۔',
      'Three common starting points. Every quote is fixed after a free call.':'تین عام آغاز کے نقطے۔ ہر قیمت مفت کال کے بعد طے ہوتی ہے۔',
      'Launch page':'لانچ پیج','About 1 week':'تقریباً 1 ہفتہ','One-page site':'ایک صفحے کی سائٹ','Mobile-first layout':'پہلے موبائل کے مطابق ڈیزائن','Contact form or WhatsApp button':'رابطہ فارم یا واٹس ایپ بٹن','Basic search setup':'بنیادی سرچ سیٹ اپ','Get a quote':'قیمت معلوم کریں',
      'Most requested':'سب سے زیادہ مانگا جانے والا','Business site':'بزنس ویب سائٹ','About 3 weeks':'تقریباً 3 ہفتے','Up to 8 custom pages':'8 تک حسبِ ضرورت صفحات','Content you can edit yourself':'ایسا مواد جسے آپ خود تبدیل کر سکیں','Speed and security setup':'رفتار اور سیکیورٹی سیٹ اپ','One month of support':'ایک ماہ کی سپورٹ',
      'Web app':'ویب ایپ','6 to 10 weeks':'6 سے 10 ہفتے','User accounts and logins':'صارف اکاؤنٹس اور لاگ اِن','Database and dashboard':'ڈیٹابیس اور ڈیش بورڈ','Custom features':'حسبِ ضرورت فیچرز','Deployment and backups':'ڈیپلائمنٹ اور بیک اپ',
      'Estimate your project':'اپنے پروجیکٹ کا اندازہ لگائیں','Choose what you need and see a rough price and timeline. Nothing is sent until you press the button.':'اپنی ضرورت چنیں اور تقریبی قیمت اور وقت دیکھیں۔ جب تک آپ بٹن نہ دبائیں کچھ نہیں بھیجا جاتا۔',
      '1. What do you need?':'1. آپ کو کیا چاہیے؟','2. How many pages?':'2. کتنے صفحات؟','3. Extras':'3. اضافی چیزیں','4. Timeline':'4. وقت',
      'One-page site for a person or small business':'فرد یا چھوٹے کاروبار کے لیے ایک صفحے کی سائٹ','Several pages, built to bring in customers':'کئی صفحات، گاہک لانے کے لیے بنائے گئے','Booking, shop, dashboard or custom tool':'بکنگ، شاپ، ڈیش بورڈ یا حسبِ ضرورت ٹول','Fix or rebuild':'مرمت یا نئی تعمیر','Slow, broken or outdated site':'سست، خراب یا پرانی سائٹ',
      'Normal':'عام','Standard delivery':'معیاری ڈیلیوری','Fast':'تیز','Quicker delivery, +25%':'جلدی ڈیلیوری، +25٪',
      'User accounts and login':'صارف اکاؤنٹس اور لاگ اِن','Online payments':'آن لائن ادائیگیاں','Admin dashboard':'ایڈمن ڈیش بورڈ','Urdu and English versions':'اردو اور انگریزی ورژن','Search engine setup':'سرچ انجن سیٹ اپ','Writing the page text':'صفحات کا متن لکھنا','3 months of support':'3 ماہ کی سپورٹ',
      'Rough estimate':'تقریبی اندازہ','This is a rough guide, not a quote. The final price is fixed after a free call.':'یہ ایک تقریبی رہنمائی ہے، حتمی قیمت نہیں۔ حتمی قیمت مفت کال کے بعد طے ہوتی ہے۔','Send this to my enquiry':'اسے میری درخواست میں بھیجیں',
      'How a project runs':'پروجیکٹ کیسے چلتا ہے','The same four steps every time, so you always know what comes next.':'ہر بار وہی چار مراحل، تاکہ آپ کو ہمیشہ معلوم رہے کہ آگے کیا ہوگا۔',
      'Talk':'بات چیت','We agree on the goal, the budget and the deadline before anything is built.':'کچھ بھی بننے سے پہلے ہم مقصد، بجٹ اور آخری تاریخ طے کرتے ہیں۔',
      'Plan':'منصوبہ','You get a page-by-page outline and a fixed price to approve.':'آپ کو صفحہ بہ صفحہ خاکہ اور منظوری کے لیے مقررہ قیمت ملتی ہے۔',
      'Build':'تعمیر','You see a working version every week and can change direction early.':'آپ ہر ہفتے چلتا ہوا ورژن دیکھتے ہیں اور شروع ہی میں سمت بدل سکتے ہیں۔',
      'Launch':'لانچ','I deploy it, test it on real phones, and stay on call for the first month.':'میں اسے آن لائن لگاتا ہوں، اصل فونز پر جانچتا ہوں، اور پہلے مہینے رابطے میں رہتا ہوں۔',
      'Can you crack it?':'کیا آپ اسے حل کر سکتے ہیں؟','Three short puzzles. Decode each message, type the answer, and unlock something hidden in this site. Hints are allowed.':'تین مختصر پہیلیاں۔ ہر پیغام کو ڈی کوڈ کریں، جواب لکھیں، اور اس سائٹ میں چھپی ہوئی چیز کھولیں۔ اشارے لینے کی اجازت ہے۔',
      'Access granted':'رسائی مل گئی','You think like a tester, and that is exactly how I build things. The whole site has switched to hacker mode.':'آپ ٹیسٹر کی طرح سوچتے ہیں، اور میں بھی بالکل اسی طرح چیزیں بناتا ہوں۔ پوری سائٹ ہیکر موڈ میں بدل گئی ہے۔','Tell me you solved it':'مجھے بتائیں کہ آپ نے حل کر لیا','Back to normal':'پہلے جیسا کریں',
      'Questions people ask':'لوگ کیا پوچھتے ہیں','Short answers to the things most clients want to know before we start.':'ان باتوں کے مختصر جواب جو زیادہ تر کلائنٹس کام شروع ہونے سے پہلے جاننا چاہتے ہیں۔',
      'How long does a project take?':'پروجیکٹ میں کتنا وقت لگتا ہے؟','A launch page takes about a week, a business site about three weeks, and a web app six to ten weeks. The estimator above gives a timeline for your exact choices.':'لانچ پیج میں تقریباً ایک ہفتہ، بزنس ویب سائٹ میں تقریباً تین ہفتے، اور ویب ایپ میں چھ سے دس ہفتے لگتے ہیں۔ اوپر والا اندازہ کار آپ کی منتخب کردہ چیزوں کے مطابق وقت بتاتا ہے۔',
      'How does payment work?':'ادائیگی کیسے ہوتی ہے؟','Half to start the work and half when the site goes live. Larger apps can be split into milestones. Everything is agreed in writing before I begin.':'آدھی رقم کام شروع کرنے پر اور آدھی سائٹ لائیو ہونے پر۔ بڑی ایپس کو مراحل میں تقسیم کیا جا سکتا ہے۔ میرے شروع کرنے سے پہلے سب کچھ تحریری طور پر طے ہوتا ہے۔',
      'What do I need to give you?':'مجھے آپ کو کیا دینا ہوگا؟','Your logo and brand colours if you have them, the text and photos you want on the site, and a few websites you like. If you do not have the text yet, I can write it for you as an extra.':'اگر آپ کے پاس ہوں تو اپنا لوگو اور برانڈ کے رنگ، سائٹ پر لگانے کا متن اور تصاویر، اور چند ایسی ویب سائٹس جو آپ کو پسند ہوں۔ اگر متن ابھی تیار نہیں تو میں اضافی کام کے طور پر لکھ سکتا ہوں۔',
      'Will it work on phones?':'کیا یہ فون پر چلے گی؟','Yes. Every page is designed on a phone screen first and then scaled up to tablets and computers.':'جی ہاں۔ ہر صفحہ پہلے فون کی اسکرین پر ڈیزائن ہوتا ہے، پھر ٹیبلٹ اور کمپیوٹر کے لیے بڑھایا جاتا ہے۔',
      'Do you offer support after launch?':'کیا آپ لانچ کے بعد سپورٹ دیتے ہیں؟','Business sites include one month of support. For any other project you can add three months of support in the estimator. After that, fixes and changes are quoted as small separate jobs.':'بزنس ویب سائٹ میں ایک ماہ کی سپورٹ شامل ہے۔ کسی بھی دوسرے پروجیکٹ کے لیے آپ اندازہ کار میں تین ماہ کی سپورٹ شامل کر سکتے ہیں۔ اس کے بعد مرمت اور تبدیلیوں کی الگ چھوٹے کاموں کے طور پر قیمت بتائی جاتی ہے۔',
      'Who owns the website?':'ویب سائٹ کا مالک کون ہوگا؟','You do. The code, design and content are handed over to you once the final payment is made.':'آپ۔ آخری ادائیگی کے بعد کوڈ، ڈیزائن اور مواد آپ کے حوالے کر دیا جاتا ہے۔',
      'Can you fix a site someone else built?':'کیا آپ کسی اور کی بنائی ہوئی سائٹ ٹھیک کر سکتے ہیں؟','Usually, yes. I start with a short review of what is slow, broken or insecure, and then give you a fixed price to repair it.':'عموماً ہاں۔ میں پہلے مختصر جائزے سے شروع کرتا ہوں کہ کیا سست، خراب یا غیر محفوظ ہے، پھر مرمت کی مقررہ قیمت بتاتا ہوں۔',
      'What happens to the details I send?':'میں جو تفصیلات بھیجوں اس کا کیا ہوتا ہے؟','The contact form does not store anything. It opens WhatsApp or your email app with the message ready, so what you write goes only to me.':'رابطہ فارم کچھ بھی محفوظ نہیں کرتا۔ یہ واٹس ایپ یا آپ کی ای میل ایپ کھول دیتا ہے جس میں پیغام پہلے سے لکھا ہوتا ہے، اس لیے جو آپ لکھتے ہیں وہ صرف مجھ تک جاتا ہے۔',
      'Have something to build?':'کچھ بنوانا ہے؟','Tell me what you need. I reply within a day, usually sooner.':'مجھے بتائیں آپ کو کیا چاہیے۔ میں ایک دن کے اندر جواب دیتا ہوں، عموماً اس سے بھی جلدی۔','Copy address':'ای میل کاپی کریں',
      'Tell me about your project':'مجھے اپنے پروجیکٹ کے بارے میں بتائیں','Your name':'آپ کا نام','Email (optional)':'ای میل (اختیاری)','What do you need?':'آپ کو کیا چاہیے؟','Message':'پیغام','Send on WhatsApp':'واٹس ایپ پر بھیجیں','Send by email':'ای میل سے بھیجیں',
      'webforgestudio Pvt. Ltd. All rights reserved.':'کراؤن ٹیک پرائیویٹ لمیٹڈ۔ تمام حقوق محفوظ ہیں۔','Back to top':'اوپر جائیں'
    };
    var skip={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,PRE:1,NOSCRIPT:1};
    var saved=[],on=false;
    var loadFont=function(){
      if(document.getElementById('urfont'))return;
      var l=document.createElement('link');
      l.id='urfont';l.rel='stylesheet';
      l.href='https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&display=swap';
      document.head.appendChild(l);
    };
    var apply=function(){
      saved=[];
      var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n,all=[];
      while(n=w.nextNode())all.push(n);
      all.forEach(function(t){
        if(skip[t.parentNode.nodeName])return;
        var k=t.nodeValue.replace(/\s+/g,' ').trim();
        if(k&&UR.hasOwnProperty(k)){
          var m=t.nodeValue.match(/^(\s*)[\s\S]*?(\s*)$/);
          saved.push([t,t.nodeValue]);
          t.nodeValue=m[1]+UR[k]+m[2];
        }
      });
    };
    var set=function(ur){
      var d=document.documentElement;
      on=ur;
      if(ur){
        loadFont();apply();
        d.lang='ur';d.dir='rtl';
        btn.textContent='English';btn.lang='en';
        btn.setAttribute('aria-label','Switch language to English');
      }else{
        saved.forEach(function(s){s[0].nodeValue=s[1]});saved=[];
        d.lang='en';d.dir='ltr';
        btn.textContent='اردو';btn.lang='ur';
        btn.setAttribute('aria-label','Switch language to Urdu');
      }
      try{localStorage.setItem('lang',ur?'ur':'en')}catch(e){}
    };
    btn.addEventListener('click',function(){set(!on)});
    try{if(localStorage.getItem('lang')==='ur')set(true)}catch(e){}
  })();

  /* accent colour */
  (function(){
    var root=document.documentElement,sw=document.querySelectorAll('.sw button');
    if(!sw.length)return;
    var set=function(a){
      if(a==='orange')root.removeAttribute('data-accent');
      else root.setAttribute('data-accent',a);
      sw.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.a===a)});
      try{localStorage.setItem('accent',a)}catch(e){}
    };
    sw.forEach(function(b){b.addEventListener('click',function(){set(b.dataset.a)})});
    var s='orange';
    try{s=localStorage.getItem('accent')||'orange'}catch(e){}
    if(!document.querySelector('.sw [data-a="'+s+'"]'))s='orange';
    set(s);
  })();

