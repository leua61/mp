// v5｜data_analysis_speed_04_growth｜course common
(function(){
  const pk=a=>a[Math.floor(Math.random()*a.length)];
  const n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const uq=a=>[...new Set(a)];
  const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const op=(a,b,l=5)=>sh([a,...sh(uq(b).filter(x=>x!==a)).slice(0,l-1)]).slice(0,l);
  const pct=x=>`${Math.round(x*1000)/10}%`;
  const pctInt=x=>`${Math.round(x*100)}%`;
  const yuan=x=>`${x}亿元`;
  const wan=x=>`${x}万人`;
  const R=(q,a,pool,hint,solution,extra={})=>Object.assign({q,a,pool,hint,solution},extra);

  const cid='data_analysis_speed_04';
  const Q=(id,title,tags,mk,type)=>({id,title,t:title,type:type||tags[0],tags,mk,makeQuestion:mk});
  const C=(id,title,tags,subs,unlockMode='all')=>({id,title,t:title,type:tags[0],tags,unlockMode,subs});
  const sec=title=>Game.addLessonTopic(cid,{k:'s',t:title});
  const add=t=>Game.addLessonTopic(cid,t);
  const done=title=>Game.finishLesson(cid,title);
  const choose=(ans,wrongs)=>op(String(ans),wrongs.map(String),5);
  const near=(x,ds)=>ds.map(d=>String(x+d));
  const round1=x=>Math.round(x*10)/10;
  const round2=x=>Math.round(x*100)/100;
  const formulaPool=(ans,wrong)=>op(ans,wrong,5);

  Game.beginLesson(cid);
  window.EX={pk,n,uq,sh,op,pct,pctInt,yuan,wan,R,Q,C,sec,add,done,choose,near,round1,round2,formulaPool};
})();
