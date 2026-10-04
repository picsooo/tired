(function(){
  var E=[
    {t:'Torex sarl',d:'Depuis 1998, étude, installation, maintenance et entretien d\'appareils de transport vertical et horizontal. Distributeur agréé KONE en Algérie.',u:['Hydra, Alger','Depuis 1998','KONE']},
    {t:'Ascenseurs',d:'Pour les résidences, bureaux, hôtels et administrations : confort, accessibilité et valeur du bâtiment.',u:['Résidences','Bureaux','Hôtels']},
    {t:'Monte-charges',d:'Marchandises, chariots et équipements lourds déplacés entre les niveaux, en sécurité.',u:['Industrie','Logistique','Commerce']},
    {t:'Monte-malades',d:'Une cabine profonde pour un lit ou un brancard, avec le personnel soignant.',u:['Hôpitaux','Cliniques']},
    {t:'Escaliers mécaniques',d:'Faire circuler un public nombreux entre deux niveaux, en continu.',u:['Centres commerciaux','Gares']},
    {t:'Trottoirs roulants',d:'Les longues distances à plat ou en pente douce, avec chariots ou bagages.',u:['Hypermarchés','Aéroports']}
  ];
  var baie=document.getElementById('baie'),int=document.getElementById('interieur'),num=document.getElementById('num'),dh=document.getElementById('dir-h'),db=document.getElementById('dir-b');
  var cur=0,busy=false,ctx=null,sonOn=false,reduit=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function remplir(e){
    var o=E[e],ic=e?document.getElementById('ico-'+e).innerHTML:document.querySelector('.tx-logo').innerHTML;
    int.innerHTML='<span class="etage-n">'+e+'</span>'+(e?ic:'<div style="width:150px;margin-bottom:auto">'+ic+'</div>')+'<h3>'+o.t+'</h3><p>'+o.d+'</p><div class="usages">'+o.u.map(function(x){return '<span>'+x+'</span>'}).join('')+'</div>';
  }
  function ding(){
    if(!sonOn||!ctx)return;
    [[880,0],[659,.28]].forEach(function(n){var o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=n[0];g.gain.setValueAtTime(0,ctx.currentTime+n[1]);g.gain.linearRampToValueAtTime(.25,ctx.currentTime+n[1]+.02);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+n[1]+1.2);o.connect(g);g.connect(ctx.destination);o.start(ctx.currentTime+n[1]);o.stop(ctx.currentTime+n[1]+1.3);});
  }
  function marquer(e){document.querySelectorAll('.touche').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.e===e?'true':'false')});}
  function aller(e){
    if(busy)return;
    marquer(e);
    if(e===cur&&baie.classList.contains('ouverte'))return;
    busy=true;
    if(reduit){cur=e;num.textContent=e;remplir(e);baie.classList.add('ouverte');busy=false;return;}
    baie.classList.remove('ouverte');
    setTimeout(function(){
      var pas=e>cur?1:-1;(pas>0?dh:db).classList.add('on');baie.classList.add('voyage');
      var t=setInterval(function(){
        if(cur!==e){cur+=pas;num.textContent=cur;}
        if(cur===e){clearInterval(t);dh.classList.remove('on');db.classList.remove('on');baie.classList.remove('voyage');
          remplir(e);ding();setTimeout(function(){baie.classList.add('ouverte');busy=false;},250);}
      },e===cur?10:650);
    },e===cur?50:1150);
  }
  document.getElementById('touches').addEventListener('click',function(ev){var b=ev.target.closest('.touche');if(b){aller(+b.dataset.e);if(innerWidth<900)baie.scrollIntoView({behavior:reduit?'auto':'smooth',block:'center'});}});
  document.getElementById('son').addEventListener('click',function(){
    sonOn=!sonOn;this.setAttribute('aria-pressed',sonOn);this.textContent=sonOn?'Couper le son de la cabine':'Activer le son de la cabine';
    if(sonOn&&!ctx){var A=window.AudioContext||window.webkitAudioContext;if(A)ctx=new A();}
    if(ctx&&ctx.state==='suspended')ctx.resume();
    if(sonOn)ding();
  });
  remplir(0);marquer(0);setTimeout(function(){baie.classList.add('ouverte')},600);
})();
