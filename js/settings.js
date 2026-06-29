// 设置页、存档导入导出、弹层动作分发
function savePack(){
  sscroll();
  return {
    app:'CODEX',
    version:3,
    exportedAt:new Date().toISOString(),
    keys:{
      [S]:localStorage[S]||'{}',
      [S+'c']:localStorage[S+'c']||'',
      [CARD_KEY]:localStorage[CARD_KEY]||'{}',
      [UI_KEY]:localStorage[UI_KEY]||'{}'
    }
  }
}
function currentLesson(){return (window.Game&&Game.lessons&&Game.lessons.find(x=>x.id==C))||{id:C,title:C,t:C}}
function currentLessonName(){let l=currentLesson();return l.title||l.t||l.id||'当前课程'}
function cardIdsForLesson(l){return new Set(cardAll(l||currentLesson()).map(c=>c&&c.id).filter(Boolean))}
function saveCardStore(s){try{localStorage[CARD_KEY]=J.stringify(s&&typeof s=='object'&&!Array.isArray(s)?s:{})}catch(e){}}
function clearCurrentCourseSave(){
  let l=currentLesson(),name=currentLessonName();
  if(!confirm('确定清空“'+name+'”的本课存档吗？\n\n会清空本课进度、36h 冷却、路线/滚动位置与本课卡牌；其他课程不受影响。'))return;
  let prefix=C+':',pc=0,cc=0,uc=0;
  Object.keys(M||{}).forEach(k=>{if(k.indexOf(prefix)===0){delete M[k];pc++}});
  sv();
  let cards=cardStore(),ids=cardIdsForLesson(l);
  if(cards&&typeof cards=='object'&&!Array.isArray(cards)){
    if(cards[C]!==undefined){delete cards[C];cc++}
    ids.forEach(id=>{if(cards[id]!==undefined){delete cards[id];cc++}});
    if(Array.isArray(cards.cards)){
      let old=cards.cards.length;
      cards.cards=cards.cards.filter(id=>!ids.has(id));
      cc+=old-cards.cards.length;
    }else if(cards.cards&&typeof cards.cards=='object'){
      Object.keys(cards.cards).forEach(id=>{if(ids.has(id)){delete cards.cards[id];cc++}})
    }
    saveCardStore(cards);
  }
  UI&&typeof UI=='object'&&!Array.isArray(UI)||(UI={});
  if(UI.byCourse&&UI.byCourse[C]){delete UI.byCourse[C];uc++}
  UI.course=C;
  sui();
  msg('已清空本课存档：进度 '+pc+' 项、卡牌 '+cc+' 项、界面位置 '+uc+' 项。正在刷新。');
  setTimeout(()=>location.reload(),450);
}
function clearAllSave(){
  if(!confirm('确定清空所有存档吗？\n\n会清空全部课程进度、36h 冷却、卡牌、最近课程与界面位置。此操作不可撤销，建议先导出备份。'))return;
  [S,S+'c',CARD_KEY,UI_KEY].forEach(k=>localStorage.removeItem(k));
  M={};UI={};C='';
  msg('已清空所有存档，正在刷新。');
  setTimeout(()=>location.reload(),450);
}
function openSettings(){
  let ex=J.stringify(savePack(),null,2),pf=PF?'<p>当前是完美测试视图：页面显示 5/5，但导出内容仍是真实本地存档。</p>':'';
  let o=document.querySelector('.ov');
  o||(o=document.createElement('div'),o.className='ov',document.body.appendChild(o));
  o.innerHTML=`<div class="pg" role="dialog" aria-modal="true"><div class="ph"><h2>设置</h2><button class="px" data-act="close">关闭</button></div>${pf}<div class="sec"><h3>导出存档</h3><p>导出的是浏览器 localStorage 中的真实存档：${S}、${S+'c'}、${CARD_KEY} 与 ${UI_KEY}（最近课程、路线位置、滚动位置）。</p><textarea class="svt" id="exs" readonly>${E(ex)}</textarea><div class="sr"><button data-act="copySave">复制导出内容</button><button data-act="downloadSave">下载存档 JSON</button></div></div><div class="sec"><h3>导入存档</h3><p>粘贴上方格式的 JSON，或选择导出的 JSON 文件。导入后会刷新页面读取新存档。</p><label class="file">选择文件 <input id="saveFile" type="file" accept="application/json,.json,text/plain"></label><textarea class="svt" id="ims" placeholder="把存档 JSON 粘贴到这里"></textarea><div class="sr"><button data-act="importSave">导入存档</button></div><div class="msg" id="msg"></div></div><div class="sec dangerSec"><h3>清空存档</h3><p>清空前建议先导出备份。本课存档只影响当前课程：${E(currentLessonName())}。</p><div class="sr"><button class="danger" data-act="clearCourseSave">清空本课存档</button><button class="danger strong" data-act="clearAllSave">清空所有存档</button></div></div></div>`;
  o.classList.add('op');
  o.onclick=e=>{if(e.target===o)closePage()};
  o.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act));
  let f=o.querySelector('#saveFile');
  f&&(f.onchange=()=>{let file=f.files&&f.files[0];if(!file)return;let r=new FileReader;r.onload=()=>{o.querySelector('#ims').value=r.result||''};r.readAsText(file)})
}
function closePage(){let o=document.querySelector('.ov');o&&o.classList.remove('op')}
function msg(t,ok=1){let m=document.querySelector('#msg');m&&(m.textContent=t,m.className='msg '+(ok?'ok':'no'))}
async function copySave(){let v=document.querySelector('#exs')?.value||J.stringify(savePack(),null,2);try{await navigator.clipboard.writeText(v);msg('已复制导出内容。')}catch(e){msg('复制失败，可手动选中复制。',0)}}
function downloadSave(){let v=document.querySelector('#exs')?.value||J.stringify(savePack(),null,2),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([v],{type:'application/json'}));a.download='codex-save-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);msg('已生成下载文件。')}
function importSave(){let t=document.querySelector('#ims')?.value||'';try{let d=J.parse(t),raw=d.keys&&d.keys[S]!==undefined?d.keys[S]:d.storage&&d.storage[S]!==undefined?d.storage[S]:d[S]!==undefined?d[S]:d,course=d.keys&&d.keys[S+'c']!==undefined?d.keys[S+'c']:d.storage&&d.storage[S+'c']!==undefined?d.storage[S+'c']:d[S+'c']!==undefined?d[S+'c']:'',uiRaw=d.keys&&d.keys[UI_KEY]!==undefined?d.keys[UI_KEY]:d.storage&&d.storage[UI_KEY]!==undefined?d.storage[UI_KEY]:d[UI_KEY];let obj=typeof raw=='string'?J.parse(raw):raw,cardRaw=d.keys&&d.keys[CARD_KEY]!==undefined?d.keys[CARD_KEY]:d.storage&&d.storage[CARD_KEY]!==undefined?d.storage[CARD_KEY]:d[CARD_KEY];if(!obj||typeof obj!='object'||Array.isArray(obj))throw Error('bad save');localStorage[S]=J.stringify(obj);if(course!==undefined&&course!==null)localStorage[S+'c']=String(course);if(cardRaw!==undefined){let co=typeof cardRaw=='string'?J.parse(cardRaw):cardRaw;if(!co||typeof co!='object'||Array.isArray(co))throw Error('bad card save');localStorage[CARD_KEY]=J.stringify(co)}if(uiRaw!==undefined){let u=typeof uiRaw=='string'?J.parse(uiRaw):uiRaw;if(!u||typeof u!='object'||Array.isArray(u))throw Error('bad ui save');localStorage[UI_KEY]=J.stringify(u);UI=u}M=obj;C=(UI&&UI.course)||localStorage[S+'c']||C;msg('导入成功，正在刷新读取新存档。');setTimeout(()=>location.reload(),450)}catch(e){msg('导入失败：请检查 JSON 格式是否正确。',0)}}
function act(a){({cards:openCards,settings:openSettings,close:closePage,copySave,downloadSave,importSave,clearCourseSave:clearCurrentCourseSave,clearAllSave}[a]||(()=>{}))()}
function pa(it){let t=it.s?((it.e||performance.now())-it.s)/1000:0,c=sub(it),p=prog(it.c,[]),y=it.el.querySelector('.ty');it.el.querySelector('.tm').textContent=t.toFixed(1)+' 秒';y&&(y.textContent=kg(c,it.q));it.el.querySelector('.lv').textContent='掌握 '+p.label;let b=it.el.querySelector('.mainbar b')||it.el.querySelector('.routes .bar b');b&&(b.style.width=p.frac*100+'%')}
