(function(){
  const pk=a=>a[Math.floor(Math.random()*a.length)];
  const n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const r1=x=>Math.round(x*10)/10;
  const r2=x=>Math.round(x*100)/100;
  const pct=x=>`${r1(x)}%`;
  const uq=a=>[...new Set(a.map(String))];
  const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const op=(a,b,l=4)=>sh([String(a),...sh(uq(b).filter(x=>x!==String(a))).slice(0,l-1)]);
  const R=(q,a,pool,hint,solution,extra={})=>Object.assign({q,a:String(a),pool:pool.map(String),hint,solution},extra);
  const Q=(id,title,tags,mk,type)=>({id,title,t:title,type:type||tags[0],tags,mk,makeQuestion:mk});
  const C=(id,title,tags,subs,unlockMode='all')=>({id,title,t:title,type:tags[0],tags,unlockMode,subs});
  const cid='data_analysis_speed_09';
  const sec=title=>Game.addLessonTopic(cid,{k:'s',t:title});
  const add=t=>Game.addLessonTopic(cid,t);
  const done=title=>Game.finishLesson(cid,title);
  const near=(x,delta=2)=>[r1(x-delta),r1(x+delta),r1(x+delta*2),r1(Math.max(0.1,x-delta*2))].map(String);
  const chooseBase=(x)=> x>=1000 ? Math.round(x/100)*100 : x>=100 ? Math.round(x/10)*10 : Math.round(x);

  Game.beginLesson(cid);
  window.EX={pk,n,r1,r2,pct,uq,sh,op,R,Q,C,sec,add,done,near,chooseBase,cid};
})();
