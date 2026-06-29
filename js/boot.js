(function(){
  const CATALOG_PATH='catalog.js';
  const CARD_BINDINGS_PATH='card_bindings.js';
  const PER_FOLDER_LIST_FILE='_lesson_files.js';
  const loaded=new Set();

  function versioned(src){
    return src+(src.indexOf('?')>=0?'&':'?')+'v='+Date.now();
  }

  function mountError(err){
    console.error(err);
    const d=document.getElementById('d');
    if(!d)return;
    d.innerHTML='<section style="padding:24px;line-height:1.7;color:#fff"><h2>课程加载失败</h2><p>请检查 catalog.js 中的课程文件夹是否存在，且每个课程文件夹下是否存在 _lesson_files.js。</p><pre style="white-space:pre-wrap;max-width:100%;overflow:auto">'+String((err&&err.message)||err)+'</pre></section>';
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

  function loadOptionalScript(src){
    return loadScript(src).catch(err=>{
      console.warn('可选脚本未加载：',src,err);
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

  function lessonFileSort(a,b){
    const rank=f=>f==='_common.js'?0:(f==='_finish.js'?2:1);
    const ra=rank(a),rb=rank(b);
    if(ra!==rb)return ra-rb;
    const num=f=>{const m=String(f).match(/^(\d+)/);return m?Number(m[1]):Number.MAX_SAFE_INTEGER;};
    const na=num(a),nb=num(b);
    if(na!==nb)return na-nb;
    const aa=String(a).toLowerCase(),bb=String(b).toLowerCase();
    if(aa<bb)return -1;
    if(aa>bb)return 1;
    return String(a)<String(b)?-1:(String(a)>String(b)?1:0);
  }

  function normalizeLessonFiles(files){
    return [...new Set((files||[])
      .map(file=>String(file||'').trim())
      .filter(file=>file!==PER_FOLDER_LIST_FILE)
      .filter(file=>/^[^/\\?#]+\.js$/i.test(file)))]
      .sort(lessonFileSort);
  }

  function fileNameFromHref(href,base){
    let url,baseUrl;
    try{
      baseUrl=new URL(base,window.location.href);
      url=new URL(href,baseUrl.href);
    }catch(_){
      return '';
    }
    if(url.origin!==baseUrl.origin)return '';
    const basePath=baseUrl.pathname.endsWith('/')?baseUrl.pathname:baseUrl.pathname+'/';
    if(!url.pathname.startsWith(basePath))return '';
    let rest=url.pathname.slice(basePath.length);
    try{rest=decodeURIComponent(rest);}catch(_){}
    if(!rest||rest.includes('/')||!/\.js$/i.test(rest))return '';
    return rest;
  }

  function parseDirectoryListing(html,base){
    let doc;
    try{
      doc=new DOMParser().parseFromString(html,'text/html');
    }catch(_){
      return [];
    }
    return normalizeLessonFiles([...doc.querySelectorAll('a[href]')]
      .map(a=>fileNameFromHref(a.getAttribute('href'),base))
      .filter(Boolean));
  }

  async function discoverFilesFromDirectory(folder){
    const base='lessons/'+folder+'/';
    if(!window.fetch)return [];
    try{
      const res=await fetch(base,{cache:'no-store'});
      if(!res.ok)return [];
      const text=await res.text();
      return parseDirectoryListing(text,base);
    }catch(_){
      return [];
    }
  }

  function filesFromFolderList(folder){
    const lists=Game.lessonFileLists||window.LESSON_FILE_LISTS||{};
    return normalizeLessonFiles(lists[folder]);
  }

  async function loadFolderList(folder){
    const listPath='lessons/'+folder+'/'+PER_FOLDER_LIST_FILE;
    await loadOptionalScript(listPath);
    return filesFromFolderList(folder);
  }

  async function filesForFolder(folder){
    // GitHub Pages / 普通静态托管推荐路径：每个课程文件夹自己声明自己的脚本列表。
    const listed=await loadFolderList(folder);
    if(listed.length)return listed;

    // 本地开发服务器如果开放目录索引，也可以继续自动解析目录页面。
    const discovered=await discoverFilesFromDirectory(folder);
    if(discovered.length)return discovered;

    throw new Error([
      '无法读取课程脚本列表：lessons/'+folder+'/'+PER_FOLDER_LIST_FILE,
      '请在该课程文件夹内放置 _lesson_files.js，格式示例：',
      '(function(){',
      '  window.Game=window.Game||{};',
      '  Game.lessonFileLists=Game.lessonFileLists||{};',
      "  Game.lessonFileLists['"+folder+"']=['_common.js','00_xxx.js','_finish.js'];",
      '})();',
      '',
      '也可以在项目根目录运行：node tools/build_lesson_files.js 自动生成。'
    ].join('\n'));
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

  async function loadLessonFolder(folder){
    const files=await filesForFolder(folder);
    const before=(Game.lessons||[]).length;
    for(const file of files)await loadScript('lessons/'+folder+'/'+file);
    const added=(Game.lessons||[]).slice(before);
    if(added.length===1){
      applyCanonicalLessonId(added[0],folder);
    }else if(added.length>1){
      const exact=added.find(lesson=>lesson.id===folder);
      if(exact)applyCanonicalLessonId(exact,folder);
      else added.forEach(lesson=>applyCanonicalLessonId(lesson,folder));
    }
  }

  async function boot(){
    if(!window.Game)throw new Error('Game 未初始化，请检查 js/state.js 和 js/lessons-runtime.js 的加载顺序。');
    await loadScript(CATALOG_PATH);
    for(const folder of foldersFromCtl())await loadLessonFolder(folder);
    await loadScript(CARD_BINDINGS_PATH);
    if(!Game.lessons||!Game.lessons.length)throw new Error('课程脚本已加载，但没有注册任何课程。');
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
