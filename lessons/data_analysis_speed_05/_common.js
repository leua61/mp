(function(){
  const pk=a=>a[Math.floor(Math.random()*a.length)];
  const n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const uq=a=>[...new Set(a)];
  const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const op=(a,b,l=5)=>sh([a,...sh(uq(b).filter(x=>x!==a)).slice(0,l-1)]);
  const d=(x,p=1)=>Number((Math.round(x*Math.pow(10,p))/Math.pow(10,p)).toFixed(p));
  const pct=(x,p=1)=>`${d(x,p)}%`;
  const pp=(x,p=1)=>`${d(x,p)}个百分点`;
  const yuan=(x,p=1)=>String(d(x,p));
  const sign=x=>x>0?`+${pct(x)}`:pct(x);
  const R=(q,a,pool,hint,solution,extra={})=>Object.assign({q,a,pool,hint,solution},extra);
  const cid='data_analysis_speed_05';
  const Q=(id,title,tags,mk,type)=>({id,title,t:title,type:type||tags[0],tags,mk,makeQuestion:mk});
  const C=(id,title,tags,subs,unlockMode='all')=>({id,title,t:title,type:tags[0],tags,unlockMode,subs});
  const sec=title=>Game.addLessonTopic(cid,{k:'s',t:title});
  const add=t=>Game.addLessonTopic(cid,t);
  const done=title=>Game.finishLesson(cid,title);
  const inter=(r1,r2,p=1)=>d(r1+r2+r1*r2/100,p);
  const multRate=rs=>d((rs.reduce((m,r)=>m*(1+r/100),1)-1)*100,1);
  const nearChoices=(ans,unit='%')=>{
    const base=Number(String(ans).replace('%','').replace('个百分点',''));
    const vals=[base+d(n(2,9)/10,1),base-d(n(2,9)/10,1),base+n(1,3),base-n(1,3)].map(v=>unit==='%'?pct(v):unit==='百分点'?pp(v):String(d(v,1)));
    return vals;
  };
  const makeYear=()=>n(2012,2022);
  Game.beginLesson(cid);
  window.EX={pk,n,uq,sh,op,d,pct,pp,yuan,sign,R,Q,C,sec,add,done,inter,multRate,nearChoices,makeYear};
})();
