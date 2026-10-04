(function(){
  // Menu mobile
  var b=document.querySelector('.tx-burger'),n=document.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('ouvert');b.setAttribute('aria-expanded',o)});}

  // Formulaires factices
  document.querySelectorAll('.form-demo').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var c=f.querySelector('.confirm');c.textContent=f.dataset.msg;c.classList.add('on');f.reset();
    });
  });

  // Cabine du hero : un seul parcours au chargement
  var cab=document.getElementById('cabine'),aff=document.getElementById('afficheur');
  if(cab&&aff){
    var etages=[0,4,2],i=0,h=88,reduit=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function aller(e){
      var depart=parseInt(aff.textContent,10)||0;
      cab.style.bottom=(6+e*h)+'px';
      if(reduit){aff.textContent=e;return;}
      var pas=e>depart?1:-1,cur=depart;
      var t=setInterval(function(){if(cur===e){clearInterval(t);return;}cur+=pas;aff.textContent=cur;},3200/Math.max(1,Math.abs(e-depart)));
    }
    function ajuster(){h=cab.parentElement.clientHeight<400?59:88;
      cab.parentElement.querySelectorAll('.etiq-etage').forEach(function(l,k){l.style.bottom=(8+k*h)+'px'});
      cab.style.height=(h<88?84:120)+'px';}
    ajuster();addEventListener('resize',ajuster);
    setTimeout(function(){aller(4)},700);
    setTimeout(function(){aller(2)},5200);
  }

  // Simulateur
  var s=document.getElementById('simu');
  if(s){
    var niv=document.getElementById('niv'),nv=document.getElementById('niv-val'),T=document.getElementById('res-titre'),X=document.getElementById('res-txt');
    var noms={resid:'une résidence',bureau:'un immeuble de bureaux',sante:'un établissement de santé',commerce:'un commerce',industrie:'un site industriel'};
    function calc(){
      var bat=s.querySelector('[name=bat]:checked').value,q=s.querySelector('[name=quoi]:checked').value,v=+niv.value;
      nv.textContent=v;var t,x,lieu=noms[bat]+' de '+v+' niveau'+(v>1?'x':'');
      if(q==='charges'){t='Monte-charge';x='Pour '+lieu+', un monte-charge dimensionné selon le poids et le type de manutention.';}
      else if(q==='patients'){t='Monte-malade';x='Pour '+lieu+', un monte-malade capable d\'accueillir un lit avec le personnel soignant, complété par des ascenseurs pour les visiteurs.';}
      else if(q==='flux'){ if(v<=3){t='Escaliers mécaniques';x='Pour '+lieu+', des escaliers mécaniques entre les niveaux ouverts au public. Un trottoir roulant si les clients circulent avec des chariots.';}
        else {t='Escaliers mécaniques et ascenseurs';x='Pour '+lieu+', des escaliers mécaniques pour les premiers niveaux, et des ascenseurs pour desservir les étages supérieurs.';}}
      else { if(v<=2){t='Ascenseur ou plateforme';x='Pour '+lieu+', un petit ascenseur facilite surtout l\'accès des personnes à mobilité réduite.';}
        else if(v<=8){t='Ascenseur de personnes';x='Pour '+lieu+', un ascenseur de personnes dimensionné selon le nombre d\'occupants.';}
        else {t='Batterie d\'ascenseurs';x='Pour '+lieu+', au moins deux ascenseurs pour limiter l\'attente aux heures de pointe. Le nombre exact se fixe à l\'étude.';}}
      T.textContent=t;X.textContent=x;
    }
    s.addEventListener('input',calc);s.addEventListener('change',calc);calc();
  }
})();
