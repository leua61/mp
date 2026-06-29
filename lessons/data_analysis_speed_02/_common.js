(function(){
  const pk=a=>a[Math.floor(Math.random()*a.length)];
  const n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const uq=a=>[...new Set(a.map(String))];
  const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const op=(a,b,l=5)=>{
    const ans=String(a);
    return sh([ans,...sh(uq(b).filter(x=>x!==ans)).slice(0,l-1)]);
  };
  const R=(q,a,pool,hint,solution,extra={})=>{
    const ans=String(a);
    const opts=uq([ans,...pool.map(String)]);
    return Object.assign({q,stem:q,a:ans,answer:ans,pool:opts,options:opts,hint,solution},extra);
  };
  const cid='data_analysis_speed_02';
  const okTags=['基础','技巧','运用','驿站'];
  const normTags=tags=>{
    const arr=Array.isArray(tags)?tags:[tags];
    return arr.filter(x=>okTags.includes(x));
  };
  const Q=(id,title,tags,mk,typeOrExtra,extra={})=>{
    const ts=normTags(tags);
    const type=typeof typeOrExtra==='string'?typeOrExtra:(ts[0]||'基础');
    const more=(typeOrExtra&&typeof typeOrExtra==='object')?typeOrExtra:extra;
    return Object.assign({id,title,t:title,type,tags:ts,mk,makeQuestion:mk},more||{});
  };
  const C=(id,title,tags,subs,unlockMode='all',extra={})=>Object.assign({
    id,title,t:title,type:normTags(tags)[0]||'基础',tags:normTags(tags),unlockMode,subs
  },extra||{});
  const sequence=extra=>Object.assign({levelType:'sequence',unlockMode:'sequence'},extra||{});
  const coverage=extra=>Object.assign({randomMode:'coverage',randomLabel:'路线型随机'},extra||{});
  const parameter=extra=>Object.assign({randomMode:'parameter',randomLabel:'参数型随机'},extra||{});
  const sec=title=>Game.addLessonTopic(cid,{k:'s',t:title});
  const add=t=>Game.addLessonTopic(cid,t);
  const done=title=>Game.finishLesson(cid,title);
  const pct=(p,more=false)=>`${p}${more?'多':''}%`;
  const approx=x=>`${Math.round(x)}左右`;
  Game.beginLesson(cid);
  window.EX={pk,n,uq,sh,op,R,Q,C,sequence,coverage,parameter,sec,add,done,pct,approx};
})();
