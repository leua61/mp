(function(){
  const CATALOG_PATH='catalog.js';
  const LESSON_BUNDLE_PATH='lesson_bundle.js';
  const CARD_BINDINGS_PATH='card_bindings.js';
  const loaded=new Set();

  function versioned(src){
    return src+(src.indexOf('?')>=0?'&':'?')+'v='+Date.now();
  }

  function mountError(err){
    console.error(err);
    const d=document.getElementById('d');
    if(!d)return;
    d.innerHTML='<section style="padding:24px;line-height:1.7;color:#fff"><h2>课程加载失败</h2><p>打包课程脚本加载失败，请确认 gh-pages 分支根目录存在 lesson_bundle.js。</p><pre style="white-space:pre-wrap;max-width:100%;overflow:auto">'+String((err&&err.message)||err)+'</pre></section>';
  }

  function loadScript(src){
    if(loaded.has(src))return Promise.resolve();
    loaded.add(src);
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=versioned(src);
      s.onload=resolve;
      s.onerror=()=>reject(new Error('脚本加载失败：'+src));
      document.head.appendChild(s);
    });
  }

  function itemFolder(item){
    if(!item)return '';
    if(typeof item==='string')return item;
    return item.folder||item.id||'';
  }

  function normalizeCtl(){
    const ctl=Game.ctl||{};
    const groups=Array.isArray(ctl.selectorGroups)?ctl.selectorGroups:[];
    groups.forEach(group=>{
      if(!Array.isArray(group.folders)){
        group.folders=(Array.isArray(group.items)?group.items:[]).map(itemFolder).filter(Boolean);
      }
      const source=Array.isArray(group.items)?group.items:group.folders;
      group.items=group.folders.map((folder,index)=>{
        const raw=source[index]||{};
        return Object.assign({},typeof raw==='string'?{}:raw,{id:folder,folder,no:(raw&&raw.no)||String(index+1)});
      });
    });
    ctl.folders=(Array.isArray(ctl.folders)?ctl.folders:[]).map(itemFolder).filter(Boolean);
    Game.ctl=ctl;
    return ctl;
  }

  function foldersFromCtl(){
    const ctl=normalizeCtl();
    const grouped=(ctl.selectorGroups||[]).flatMap(group=>group.folders||[]);
    const standalone=ctl.folders||[];
    return [...new Set([...grouped,...standalone].filter(Boolean))];
  }

  function metaFromCtl(folder){
    const ctl=normalizeCtl();
    const out={folder};
    (ctl.selectorGroups||[]).forEach(group=>{
      (group.items||[]).forEach((item,index)=>{
        if(itemFolder(item)===folder){
          out.selectorGroup=group.title||group.t||group.name||'';
          out.selectorNo=item.no||item.n||String(index+1);
          if(item.title||item.t)out.title=item.title||item.t;
          if(item.no||item.n)out.no=item.no||item.n;
        }
      });
    });
    return out;
  }

  function applyCanonicalLessonId(lesson,folder){
    if(!lesson)return;
    const meta=metaFromCtl(folder);
    const oldId=lesson.id;
    if(oldId!==folder){
      lesson.sourceId=oldId;
      lesson.id=folder;
    }
    Object.assign(lesson,meta);
    lesson.title??=lesson.t??meta.title??folder;
    if(lesson.title&&(!lesson.t||lesson.t===oldId||lesson.t===folder))lesson.t=lesson.title;
    lesson.t??=lesson.title;
    lesson.topics??=lesson.ts;
    lesson.ts??=lesson.topics;
  }

  async function boot(){
    if(!window.Game)throw new Error('Game 未初始化，请检查基础脚本加载顺序。');
    await loadScript(CATALOG_PATH);
    await loadScript(LESSON_BUNDLE_PATH);
    for(const folder of foldersFromCtl()){
      const lesson=(Game.lessons||[]).find(x=>x&&x.id===folder);
      if(lesson)applyCanonicalLessonId(lesson,folder);
    }
    await loadScript(CARD_BINDINGS_PATH);
    if(!Game.lessons||!Game.lessons.length)throw new Error('打包课程脚本已加载，但没有注册任何课程。');
    if(typeof PF!=='undefined'&&PF&&typeof pm==='function')pm();
    if(typeof rd!=='function')throw new Error('rd() 不存在，请检查 js/lessons-runtime.js。');
    rd();
  }

  window.addEventListener('resize',()=>{
    if(window.Game&&typeof Game.resize==='function')Game.resize();
    if(window.Game&&typeof Game.fit==='function')Game.fit();
  });

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>boot().catch(mountError),{once:true});
  }else{
    boot().catch(mountError);
  }
})();
