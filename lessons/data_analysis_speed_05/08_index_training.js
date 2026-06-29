(function(){
  const {n,op,R,Q,C,add,pct,pp,inter}=EX;
  const indexUp=Q('index_train_up','上升指数',['基础'],()=>{
    const idx=n(1030,1260)/10, ans=pct(idx-100,1);
    return R(`某年指数为 ${idx.toFixed(1)}，默认上年=100，则增长率为？`,ans,op(ans,[pct(idx,1),pct(100-idx,1),`${idx.toFixed(1)}`,pp(idx-100,1)]),'指数减 100 添百分号。',`${idx.toFixed(1)}-100=${(idx-100).toFixed(1)}，所以增长率为 ${ans}。`);
  });
  const indexDown=Q('index_train_down','下降指数',['基础'],()=>{
    const idx=n(850,995)/10, ans=pct(idx-100,1);
    return R(`某年指数为 ${idx.toFixed(1)}，默认上年=100，则增长率为？`,ans,op(ans,[pct(100-idx,1),pct(idx,1),`${idx.toFixed(1)}`,pp(100-idx,1)]),'小于 100 表示下降。',`${idx.toFixed(1)}-100=${(idx-100).toFixed(1)}，所以增长率为 ${ans}。`);
  });
  const special=Q('index_train_special','特殊基准',['技巧'],()=>{
    const base=200, idx=n(150,240), ans=idx>base?'上升':'下降';
    return R(`题干说明“上年=200”，今年指数写作 ${idx}。应判断为上升还是下降？`,ans,op(ans,['上升','下降','无法判断','一定增长 100%']),'特殊基准优先，不默认 100。',`指定上年=200，应比较 ${idx} 与 200；${idx}${idx>base?'>':'<'}200，所以为${ans}。`);
  });
  const route1=C('index_convert_route','指数转增长率',['基础'],[indexUp,indexDown,special],'all');

  const actualTrap=Q('index_train_actual_trap','指数小但仍增长',['基础'],()=>{
    const idx=n(1010,1099)/10;
    return R(`某年指数 ${idx.toFixed(1)}，比上一年指数小。能否仅据此说该年实际量低于上一年？`,'不能',op('不能',['能','指数小于 110 就能','只要增长率低就能','要看选项']), '指数表示相对上一年的增长率。',`${idx.toFixed(1)}>100，说明该年仍比上一年增长 ${(idx-100).toFixed(1)}%，不能说实际量低于上一年。`);
  });
  const speedTrap=Q('index_train_speed_trap','增速与量',['基础'],()=>R('指数较大最直接说明什么？','增速较快',['实际量一定较大','增速较快','增长量一定最大','基期一定最大'],'指数转的是增长率。','默认基准下指数越大，增长率越大，只能说明增速更快。'));
  const route2=C('index_compare_route','指数比较陷阱',['基础'],[actualTrap,speedTrap],'all');

  const indexInter=Q('index_train_interyear','指数隔年',['技巧'],()=>{
    const i1=n(1040,1160)/10, i2=n(1030,1150)/10; const r1=i1-100, r2=i2-100; const ans=pct(inter(r1,r2));
    return R(`某年指数 ${i1.toFixed(1)}，上一年指数 ${i2.toFixed(1)}。默认基准下，该年比上上年增长率约为？`,ans,op(ans,[pct(r1+r2,1),pct(r1,1),pct(r2,1),pct(i1+i2-200,1)]),'先把指数转成增长率，再用隔年公式。',`两年增长率分别为 ${r1.toFixed(1)}% 和 ${r2.toFixed(1)}%，隔年增长率=${ans}。`);
  });
  const pointText=Q('index_train_point_text','百分点表述',['基础'],()=>{
    const a=n(1040,1140)/10, b=n(1010,1035)/10; const diff=(a-b).toFixed(1); const ans=`${diff} 个百分点`;
    return R(`甲年指数 ${a.toFixed(1)}，乙年指数 ${b.toFixed(1)}。甲年增速比乙年快多少？`,ans,op(ans,[`${diff}%`,pct(a-b,1),pct(a,1),`${a.toFixed(1)}-${b.toFixed(1)}`]),'增速差写百分点。',`增速分别为 ${(a-100).toFixed(1)}% 和 ${(b-100).toFixed(1)}%，差为 ${ans}。`);
  });
  const route3=C('index_inter_route','指数隔年',['技巧'],[indexInter,pointText],'sequence');
  add(C('index_training','指数问题｜变量训练',['运用'],[route1,route2,route3],'all'));
})();
