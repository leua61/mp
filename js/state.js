// 全局状态、存档键、基础工具、通用 SVG/容器片段
const S='sf2',D=document.querySelector('#d'),J=JSON,QS=new URLSearchParams(location.search),PF=window.__PERFECT__===true||QS.get('perfect')==='1'||QS.get('save')==='perfect'||QS.has('perfectSave');
const CARD_KEY=S+'cards',UI_KEY=S+'ui';
let UI;try{UI=J.parse(localStorage[UI_KEY]||'{}')}catch(e){UI={}}
UI&&typeof UI=='object'&&!Array.isArray(UI)||(UI={});
let M=J.parse(localStorage[S]||'{}'),A=null,Y=0,Z=0,C=UI.course||localStorage[S+'c']||'',I=[];
const E=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const N=x=>String(x).trim().replace(/％/g,'%').replace(/，/g,',').replace(/。$/,'').replace(/\s+/g,'');
const sv=()=>{if(!PF)localStorage[S]=J.stringify(M)},lv=k=>PF?5:(M[k]?.l||0),sl=(k,v)=>{if(PF)return 5;M[k]={...(M[k]||{}),l:Math.max(0,Math.min(5,v))};sv()};
const lb=v=>['0/5','1/5','2/5','3/5','4/5','5/5'][v],eq=(a,b)=>N(a)==N(b)||!isNaN(+N(a))&&!isNaN(+N(b))&&Math.abs(+N(a)-+N(b))<1e-9;
const kg=(c,q)=>{let x=q&&(q.tags||q.type||q.kind||q.category)||c.tags||c.type||c.kind||c.category||'选择题';x=Array.isArray(x)?x:String(x).split(/[、,，/|]+/);return x.filter(Boolean).map(v=>String(v).replace(/^变量$/,'变量题')).join('・')};
const sh=a=>{for(let i=a.length-1;i>0;i--){let j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const ANIM=!document.documentElement.classList.contains('na');
const F=`<div class="fr"><svg viewBox="0 0 1280 1280" preserveAspectRatio="none"><rect x="100" y="100" width="1080" height="1080"/><rect x="124" y="124" width="1032" height="1032"/><rect x="148" y="148" width="984" height="984"/><rect x="172" y="172" width="936" height="936"/><rect x="196" y="196" width="888" height="888"/><line x1="614" y1="100" x2="614" y2="196"/><line x1="640" y1="100" x2="640" y2="196"/><line x1="666" y1="100" x2="666" y2="196"/><line x1="614" y1="1084" x2="614" y2="1180"/><line x1="640" y1="1084" x2="640" y2="1180"/><line x1="666" y1="1084" x2="666" y2="1180"/><line x1="100" y1="614" x2="196" y2="614"/><line x1="100" y1="640" x2="196" y2="640"/><line x1="100" y1="666" x2="196" y2="666"/><line x1="1084" y1="614" x2="1180" y2="614"/><line x1="1084" y1="640" x2="1180" y2="640"/><line x1="1084" y1="666" x2="1180" y2="666"/></svg></div>`;
const inn=`<section class="sq"><div class="rg"></div><div class="in"></div><i class="g g1"></i><i class="g g2"></i><i class="m m1"></i><i class="m m2"></i><i class="m m3"></i><i class="m m4"></i>`;

// 只记录界面位置，不影响掌握度；完美测试视图也可记住最近打开的位置。
function uib(){UI&&typeof UI=='object'&&!Array.isArray(UI)||(UI={});UI.byCourse&&typeof UI.byCourse=='object'&&!Array.isArray(UI.byCourse)||(UI.byCourse={});return UI.byCourse[C]||(UI.byCourse[C]={scroll:0,paths:{}})}
function sui(){try{UI.course=C;localStorage[UI_KEY]=J.stringify(UI)}catch(e){}}
function spath(it){if(!it||!it.c||!it.c.k)return;let b=uib();b.paths&&typeof b.paths=='object'&&!Array.isArray(b.paths)||(b.paths={});b.paths[it.c.k]=ps0(it.path||[]);sui()}
function sscroll(){if(!C)return;let b=uib();b.scroll=Math.max(0,Math.round(scrollY||0));sui()}
function savedPath(c){let b=uib(),p=b.paths&&b.paths[c.k];return p||''}
function savedScroll(){return Math.max(0,+(uib().scroll||0))}
