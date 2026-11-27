(function(){
  var L=[['en','English'],['ur','اردو (Urdu)'],['ar','العربية (Arabic)'],['hi','हिन्दी (Hindi)'],['bn','বাংলা (Bengali)'],['fa','فارسی (Persian)'],['ps','پښتو (Pashto)'],['sd','سنڌي (Sindhi)'],['pa','ਪੰਜਾਬੀ (Punjabi)'],['tr','Türkçe'],['id','Bahasa Indonesia'],['ms','Bahasa Melayu'],['fil'.replace('fil','tl'),'Filipino'],['fr','Français'],['de','Deutsch'],['es','Español'],['pt','Português'],['it','Italiano'],['nl','Nederlands'],['ru','Русский'],['uk','Українська'],['pl','Polski'],['ro','Română'],['el','Ελληνικά'],['cs','Čeština'],['sv','Svenska'],['da','Dansk'],['fi','Suomi'],['no','Norsk'],['hu','Magyar'],['iw','עברית (Hebrew)'],['zh-CN','中文 (Simplified)'],['zh-TW','中文 (Traditional)'],['ja','日本語'],['ko','한국어'],['th','ไทย'],['vi','Tiếng Việt'],['ta','தமிழ்'],['te','తెలుగు'],['ml','മലയാളം'],['mr','मराठी'],['gu','ગુજરાતી'],['kn','ಕನ್ನಡ'],['ne','नेपाली'],['si','සිංහල'],['my','မြန်မာ'],['km','ខ្មែរ'],['az','Azərbaycan'],['kk','Қазақша'],['uz','Oʻzbek'],['sw','Kiswahili'],['am','አማርኛ'],['ha','Hausa'],['yo','Yorùbá'],['zu','isiZulu'],['af','Afrikaans']];
  var ls=function(k,v){try{localStorage.setItem(k,v)}catch(e){}};
  var cookieCode=function(){var m=document.cookie.match(/(?:^|;\s*)googtrans=\/[^\/;]*\/([^;]+)/);return m?decodeURIComponent(m[1]):''};
  var ur=false;try{ur=localStorage.getItem('lang')==='ur'}catch(e){}
  var gt=cookieCode(),cur=ur?'ur':(gt&&gt!=='en'?gt:'en');
  var past='; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  var choose=function(code){
    document.cookie='googtrans='+past;
    document.cookie='googtrans='+past+'; domain='+location.hostname;
    ls('lang',code==='ur'?'ur':'en');
    if(code!=='ur'&&code!=='en')document.cookie='googtrans=/en/'+code+'; path=/';
    try{sessionStorage.setItem('ly',String(scrollY))}catch(e){}
    location.reload();
  };

  try{
    var y=sessionStorage.getItem('ly');
    if(y!==null){sessionStorage.removeItem('ly');setTimeout(function(){scrollTo(0,+y)},500)}
  }catch(e){}

  /* load Google's translator only when a language is chosen */
  if(cur!=='en'&&cur!=='ur'){
    var box=document.createElement('div');
    box.id='gt';box.setAttribute('aria-hidden','true');document.body.appendChild(box);
    window.gtInit=function(){try{new google.translate.TranslateElement({pageLanguage:'en',autoDisplay:false},'gt')}catch(e){}};
    var s=document.createElement('script');
    s.src='https://translate.google.com/translate_a/element.js?cb=gtInit';
    document.head.appendChild(s);
  }

  var build=function(){
    var sel=document.getElementById('footer-language');
    if(!sel)return;
    sel.setAttribute('translate','no');
    sel.className='notranslate';
    L.forEach(function(l){
      var o=document.createElement('option');
      o.value=l[0];
      o.textContent=l[1];
      if(l[0]===cur)o.selected=true;
      sel.appendChild(o);
    });
    sel.addEventListener('change',function(){choose(sel.value)});
  };
  var tries=0,t=setInterval(function(){
    var sel=document.getElementById('footer-language');
    if(sel||++tries>40){clearInterval(t);if(sel)build()}
  },100);
})();