(function(){
  const pk=a=>a[Math.floor(Math.random()*a.length)];
  const n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const rn=(a,b,d=1)=>Number((a+Math.random()*(b-a)).toFixed(d));
  const uq=a=>[...new Set(a)];
  const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const op=(a,b,l=4)=>sh([a,...sh(uq(b).filter(x=>x!==a)).slice(0,l-1)]);
  const R=(q,a,pool,hint,solution,extra={})=>Object.assign({q,a,pool,hint,solution},extra);
  const fmt=(x,d=1)=>Number(Number(x).toFixed(d)).toString();
  const pct=x=>`${fmt(x,1)}%`;
  const pp=x=>`${fmt(x,1)}个百分点`;
  const yuan=x=>`${fmt(x,1)}亿元`;
  const safeOps=(ans,alts,l=4)=>{
    const pool=[];
    for(const x of [ans,...alts]){
      if(x!==undefined && x!==null && !pool.includes(String(x))) pool.push(String(x));
    }
    let k=1;
    while(pool.length<l){
      const extra=String(ans).replace(/-?\d+(?:\.\d+)?/,m=>String(Number(m)+k));
      if(!pool.includes(extra)) pool.push(extra);
      k++;
    }
    return sh(pool).slice(0,l);
  };
  const numOps=(ans,alts,unit='',d=1)=>{
    const f=v=>`${fmt(Math.max(0,Number(v)),d)}${unit}`;
    const want=f(ans);
    const nums=[ans,...alts,ans*0.72,ans*0.81,ans*0.9,ans*1.08,ans*1.18,ans*1.27,ans+1,Math.max(0,ans-1),ans+2,Math.max(0,ans-2)];
    const pool=[];
    for(const v of nums){
      const x=f(v);
      if(!pool.includes(x)) pool.push(x);
      if(pool.length>=8) break;
    }
    return op(want,pool.filter(x=>x!==want),4);
  };
  const fracPool=[
    {p:1,q:9,pct:11.1,name:'1/9'},
    {p:2,q:9,pct:22.2,name:'2/9'},
    {p:4,q:9,pct:44.4,name:'4/9'},
    {p:1,q:8,pct:12.5,name:'1/8'},
    {p:1,q:7,pct:14.3,name:'1/7'},
    {p:2,q:7,pct:28.6,name:'2/7'},
    {p:1,q:6,pct:16.7,name:'1/6'},
    {p:1,q:5,pct:20,name:'1/5'},
    {p:1,q:4,pct:25,name:'1/4'},
    {p:1,q:3,pct:33.3,name:'1/3'},
    {p:1,q:2,pct:50,name:'1/2'},
    {p:2,q:3,pct:66.7,name:'2/3'}
  ];
  const cid='data_analysis_speed_03';
  const Q=(id,title,tags,mk,type)=>({id,title,t:title,type:type||tags[0],tags,mk,makeQuestion:mk});
  const C=(id,title,tags,subs,unlockMode='all')=>({id,title,t:title,type:tags[0],tags,unlockMode,subs});
  const sec=title=>Game.addLessonTopic(cid,{k:'s',t:title});
  const add=t=>Game.addLessonTopic(cid,t);
  const done=title=>Game.finishLesson(cid,title);
  Game.beginLesson(cid);
  window.DA3={pk,n,rn,uq,sh,op,safeOps,R,Q,C,sec,add,done,fmt,pct,pp,yuan,numOps,fracPool};
})();
