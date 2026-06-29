// 选项生成、文本清洗、尺寸自适应、滚动锁定、解锁规则
function opt(q){let n=Math.max(3,Math.min(5,q.n||3+Math.random()*3|0)),a=q.a??q.answer,r=[a],s=new Set([N(a)]),p=q.options||q.pool||[];sh([...p]).map(v=>r.length<n&&!s.has(N(v))&&(r.push(v),s.add(N(v))));if(typeof a=='number')for(let d=1;r.length<n;d++)[-d,d,d+1,-d-1,d*2,-d*2].map(x=>{let v=a+x;Number.isInteger(a)||(v=+v.toFixed(3));r.length<n&&!s.has(N(v))&&(r.push(v),s.add(N(v))) });return sh(r)}
function pn(it){let q=it.q,r=[];q.hint&&r.push(['h','基础知识提示',q.hint]);q.solution&&r.push(['s','本题解法',q.solution]);return r}
function txt(s){return E(s).replace(/\n/g,'<br>')}
function fit(e){let t=e.querySelector('.tt'),o=+e.dataset.h||0,v;if(e.classList.contains('sp')){v=Math.max(o,(t?.offsetHeight||0)+24);e.dataset.h=v;e.style.setProperty('--h',v+'px');return v>o}let w=e.clientWidth,g=Math.round(w*.224),sw=w-g*2,ci=Math.max(10,Math.round(sw*.052)),h;e.style.setProperty('--fg',g+'px');e.style.setProperty('--ci',ci+'px');t&&(h=t.offsetHeight+g*2+ci*2);h=h||w;v=o?Math.max(o,h):h;e.dataset.h=v;e.dataset.g=g;e.style.setProperty('--h',v+'px');if(w&&v){let iw=Math.max(1,w-g*2),ih=Math.max(1,v-g*2),p=2*(iw+ih);window.__rgRefPerim=window.__rgRefPerim||p;let d=14.39*p/window.__rgRefPerim;e.style.setProperty('--rg-dur',d.toFixed(3)+'s')}return v>o}
function fl(e){let z=fit(e);if(ANIM){requestAnimationFrame(()=>fit(e));setTimeout(()=>fit(e),80);setTimeout(()=>fit(e),760)}return z}
function bb(e){let r=e.getBoundingClientRect(),g=+e.dataset.g||Math.round(e.clientWidth*.224),h=+e.dataset.h||e.offsetHeight;return r.top+h-g}
function sm(to,n,cb){let f=scrollY,d=880,s=performance.now();to=Math.max(0,to);requestAnimationFrame(function go(t){if(n!=Z)return;let p=Math.min(1,(t-s)/d),v=f+(to-f)*(1-Math.pow(1-p,3));scrollTo(0,v);p<1?requestAnimationFrame(go):(scrollTo(0,to),cb&&cb())})}
function mv(e,l){requestAnimationFrame(()=>requestAnimationFrame(()=>{fit(e);if(!l)return;let y=Math.max(0,bb(e)-innerHeight+22),n=++Z,to=scrollY+y;if(y)sm(to,n,()=>{n==Z&&A&&lk()});else A&&lk()}))}
function all(){document.querySelectorAll('.st').forEach(e=>{let r=e.getBoundingClientRect();r.bottom>-120&&r.top<innerHeight+120&&fl(e)})}
function lk(){if(!A||document.body.classList.contains('lk'))return;Y=scrollY;document.body.style.top=-Y+'px';document.body.classList.add('lk')}
function uk(){Z++;if(!document.body.classList.contains('lk'))return;document.body.classList.remove('lk');document.body.style.top='';document.body.style.width='';scrollTo(0,Y)}
const sp=c=>{let k=String(c&&c.k||'').toLowerCase(),t=String(c&&(c.type||c.kind)||'').toLowerCase();return k=='s'||k=='section'||k=='sep'||k=='separator'||t=='section'||t=='separator'||t=='分隔'||t=='章节'||c&&c.section===true||c&&c.isSection===true||c&&!c.mk&&!c.makeQuestion&&!(c.subs&&c.subs.length)&&!!(c.x||c.t||c.title)};
const pa0=p=>Array.isArray(p)?p.map(x=>+x).filter(Number.isFinite):p===undefined||p===null||p===''?[]:String(p).split(/[./,]/).filter(x=>x!=='').map(x=>+x).filter(Number.isFinite);
const ps0=p=>pa0(p).join('.');
const subRows=c=>(c&&c.subs||[]).map((x,i)=>({x,i})).filter(r=>!sp(r.x)),hs=c=>subRows(c).length>0;
function nodeAt(c,p=[]){let n=c;for(let i of pa0(p)){if(!n||!n.subs)return n;n=n.subs[i]}return n}
const si0=c=>{let r=subRows(c)[0];return r?r.i:0},sord=(c,i)=>subRows(c).findIndex(r=>r.i==i);
const bareTitle=t=>String(t||'').replace(/^\s*\d+(?:-\d+)?\s*[｜|、.．]\s*/,'');
const hasNo=t=>/^\s*\d+(?:-\d+)?\s*[｜|、.．]/.test(String(t||''));
const numTitle=(x,f)=>{let raw=x.t||x.title||x.id||f||'';if(hasNo(raw))return String(raw);let t=bareTitle(raw);return x._qn?String(x._qn).padStart(x._qpad||1,'0')+'｜'+t:t};
const snameAt=(root,parentPath,i)=>{let pp=pa0(parentPath),n=nodeAt(root,pp),r=subRows(n).find(r=>r.i==i),x=r&&r.x||{},k=sord(n,i)+1;if(pp.length){let raw=x.t||x.title||x.id||'';return String(k).padStart(x._localPad||1,'0')+'｜'+bareTitle(raw)}return numTitle(x,'子级别 '+k)};
const sname=(c,i)=>snameAt(c,[],i);
function pathName(root,p=[]){let a=pa0(p),r=[],n=root,q=[];for(let i of a){r.push(snameAt(root,q,i));q.push(i);n=nodeAt(root,q)}return r.join(' ⮕ ')}
function sk(c,p){let a=pa0(p),ids=[],n=c;for(let i of a){let x=n&&n.subs&&n.subs[i];if(!x)break;ids.push(x.id||x.t||x.title||i);n=x}return c.k+(ids.length?'/'+ids.join('/'):'')}
const lm=c=>String(c&& (c.levelType||c.levelMode||c.unlockMode||c.unlock) ||'all'),sq=c=>lm(c)==='sequence',lt=c=>sq(c)?'按顺序通关解锁':'默认全解锁';
const NL_WAIT=36*60*60*1000;
const parentPath=p=>pa0(p).slice(0,-1),nonLinearPath=(root,p=[])=>!sq(nodeAt(root,parentPath(p))),coolLeft=k=>PF?0:Math.max(0,NL_WAIT-(Date.now()-(+(M[k]&&M[k].wrongAt)||0)));
function coolText(ms){let m=Math.ceil(ms/60000),h=Math.floor(m/60);m%=60;return (h?`${h}h`:``)+(m?`${m}m`:h?'':'0m')}
function markWrong(k){if(PF)return;M[k]={...(M[k]||{}),wrongAt:Date.now()};sv()}
function clearWrong(k){if(PF||!M[k]||!M[k].wrongAt)return;delete M[k].wrongAt;sv()}
function donePath(root,p=[]){let n=nodeAt(root,p);if(!n||sp(n))return false;if(hs(n)){let rows=subRows(n);return !!rows.length&&rows.every(r=>donePath(root,pa0(p).concat(r.i)))}return lv(sk(root,p))>=5}
function prog(root,p=[]){let n=nodeAt(root,p);if(hs(n)){let rows=subRows(n),d=rows.filter(r=>donePath(root,pa0(p).concat(r.i))).length,t=rows.length;return {d,t,label:d+'/'+t,frac:t?d/t:0,kind:'children'}}let v=lv(sk(root,p));return {d:v,t:5,label:lb(v),frac:v/5,kind:'leaf'}}
const prevAt=(parent,i)=>{let a=subRows(parent).map(r=>r.i).filter(j=>j<i);return a.length?a[a.length-1]:null};
function ulAt(root,parentPath=[],i=0){let parent=nodeAt(root,parentPath);if(!parent||!hs(parent)||!sq(parent))return true;if(i==si0(parent))return true;let p=prevAt(parent,i);return p===null?true:donePath(root,pa0(parentPath).concat(p))}
function pathOk(root,p=[]){let q=[];for(let i of pa0(p)){if(!ulAt(root,q,i))return false;q.push(i)}return true}
const ps=(c,i)=>donePath(c,[i]),prev=(c,i)=>prevAt(c,i),ul=(c,i)=>ulAt(c,[],i);
function fiAt(root,parentPath=[]){let parent=nodeAt(root,parentPath);for(let r of subRows(parent))if(ulAt(root,parentPath,r.i))return r.i;return si0(parent)}
const fi=c=>fiAt(c,[]);
function firstPath(root,p=[]){let a=pa0(p),n=nodeAt(root,a);while(hs(n)){let i=fiAt(root,a);a.push(i);n=nodeAt(root,a)}return a}
function completePath(root,p=[]){let a=pa0(p);if(!pathOk(root,a))a=[];let n=nodeAt(root,a);while(hs(n)){let i=fiAt(root,a);a.push(i);n=nodeAt(root,a)}return a}
function leafCount(c){if(!c||sp(c))return 0;if(!hs(c))return 1;return subRows(c).reduce((a,r)=>a+leafCount(r.x),0)}
function nodeCount(c){if(!c||sp(c))return 0;return 1+subRows(c).reduce((a,r)=>a+nodeCount(r.x),0)}
function pm(){let ch=0,fill=(root,p=[])=>{let n=nodeAt(root,p);if(!n||sp(n))return;if(hs(n))subRows(n).forEach(r=>fill(root,pa0(p).concat(r.i)));else{let k=sk(root,p);lv(k)<5&&(M[k]={l:5},ch=1)}};Game.lessons.forEach(l=>(l.ts||[]).forEach((c,i)=>{if(sp(c))return;let root={...c,k:l.id+':'+(c.id||c.t||('topic_'+(i+1)))};fill(root,[])}));ch&&sv()}
