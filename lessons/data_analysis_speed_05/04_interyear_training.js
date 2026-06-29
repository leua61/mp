(function(){
  const {n,op,R,Q,C,add,pct,pp,inter,multRate,makeYear,d}=EX;
  const samePositive=Q('inter_train_same_positive','同正计算',['技巧'],()=>{
    const y=makeYear(), r1=n(5,18), r2=n(3,16), ans=pct(inter(r1,r2));
    const sum=pct(r1+r2);
    return R(`${y} 年比 ${y-1} 年增长 ${r1}%，${y-1} 年比 ${y-2} 年增长 ${r2}%。${y} 年比 ${y-2} 年增长约多少？`,ans,op(ans,[sum,pct(r1+r2+2),pct(r1+r2-1),pct(r1*r2/100)]),'同正时答案要比两者之和略大。',`隔年增长率=${r1}%+${r2}%+${r1}%×${r2}%=${ans}，比 ${sum} 略大。`);
  });
  const mixedSign=Q('inter_train_mixed_sign','一正一负',['技巧'],()=>{
    const y=makeYear(), r1=n(6,20), r2=-n(2,12), ans=pct(inter(r1,r2));
    const sum=pct(r1+r2);
    return R(`${y} 年增长 ${r1}%，${y-1} 年下降 ${-r2}%。${y} 年比 ${y-2} 年增长率约为？`,ans,op(ans,[sum,pct(r1-r2),pct(r1+r2+1),pct(r1+r2+Math.abs(r1*r2/100))]),'一正一负，乘积项为负，答案比前两项之和更小。',`R=${r1}%+(${r2}%)+${r1}%×(${r2}%)=${ans}，小于 ${sum}。`);
  });
  const bigProduct=Q('inter_train_big_product','大乘积项',['运用'],()=>{
    const y=makeYear(), r1=n(35,65), r2=n(20,45), ans=pct(inter(r1,r2));
    const prod=d(r1*r2/100,1);
    return R(`${y} 年增长 ${r1}%，${y-1} 年增长 ${r2}%。这类题最不能忽略哪一项？`,`乘积项，约 ${prod} 个百分点`,op(`乘积项，约 ${prod} 个百分点`,[`两者之和，约 ${r1+r2} 个百分点`,`年份差，约 1 年`,`基期年份，不影响答案`,`百分点单位，不需要看`]),'增长率越大，乘积项越大。',`乘积项=${r1}%×${r2}%≈${prod} 个百分点，已经不小，不能像小增长率那样忽略。`);
  });
  const formulaRoute=C('inter_formula_route','公式识别',['技巧'],[samePositive,mixedSign,bigProduct],'sequence');

  const yearPick=Q('inter_train_year_pick','年份定位',['基础'],()=>{
    const y=makeYear();
    return R(`求 ${y} 年比 ${y-2} 年增长率，应选哪两个增长率进入公式？`,`${y} 年和 ${y-1} 年`,op(`${y} 年和 ${y-1} 年`,[`${y-1} 年和 ${y-2} 年`,`${y} 年和 ${y-2} 年`,`${y-2} 年和 ${y-3} 年`]),'基期年份不直接作为增长率相加。',`${y-1} 年增长率是 ${y-1} 比 ${y-2}；${y} 年增长率是 ${y} 比 ${y-1}。`);
  });
  const baseTrap=Q('inter_train_base_trap','基期陷阱',['基础'],()=>{
    const y=makeYear();
    return R(`${y} 年比 ${y-2} 年增长，中间隔着哪一年？`,String(y-1),op(String(y-1),[String(y),String(y-2),String(y-3)]),'找中间年份。',`${y} 与 ${y-2} 不是相邻年份，中间隔着 ${y-1} 年。`);
  });
  const yearRoute=C('inter_year_route','年份定位',['基础'],[yearPick,baseTrap],'all');

  const pointDown=Q('inter_point_down','百分点下降',['基础'],()=>{
    const now=n(3,16), diff=n(1,8), ans=pct(now+diff);
    return R(`今年同比增长 ${now}%，比上年下降 ${diff} 个百分点。上年增长率是多少？`,ans,op(ans,[pct(now-diff),pct(diff),pct(-diff),pct(now)]),'“百分点”直接加减增长率。',`今年比上年低 ${diff} 个百分点，所以上年=${now}%+${diff} 个百分点=${ans}。`);
  });
  const separate=Q('inter_separate_down','为下降 x%',['基础'],()=>{
    const now=n(3,16), prev=n(1,8); const ans=pct(-prev);
    return R(`材料写：“今年同比增长 ${now}%，上年同期为下降 ${prev}%。”上年同期增长率是多少？`,ans,op(ans,[pct(now-prev),pct(now+prev),pp(prev),pct(prev)]),'“为下降”是独立句，不是“比上年下降”。',`上年同期自己就是下降 ${prev}%，即 ${ans}。`);
  });
  const pointRoute=C('inter_point_route','百分点陷阱',['基础'],[pointDown,separate],'sequence');

  const forward=Q('inter_forward_current','已知基期求现期',['技巧'],()=>{
    const base=n(800,1800), r1=n(2,9), r2=n(2,9); const ans=String(d(base*(1+r1/100)*(1+r2/100),1));
    return R(`某量 ${base}，下一年增长 ${r1}%，再下一年增长 ${r2}%。两年后约为多少？`,ans,op(ans,[String(d(base*(1+(r1+r2)/100),1)),String(d(base*(1+r1/100),1)),String(d(base*(1+r2/100),1)),String(base+r1+r2)]),'连续两年要连乘两个增长倍数。',`两年后=${base}×(1+${r1}%)×(1+${r2}%)≈${ans}。`);
  });
  const backward=Q('inter_backward_base','已知现期求基期',['技巧'],()=>{
    const base=n(600,1500), r1=n(5,18), r2=n(4,16); const cur=d(base*(1+r1/100)*(1+r2/100),1); const ans=String(base);
    return R(`某量现在约 ${cur}，前一年增长 ${r2}%，再前一年到前一年增长 ${r1}%。两年前基期约为多少？`,ans,op(ans,[String(d(cur/(1+(r1+r2)/100),0)),String(d(cur/(1+r2/100),0)),String(d(cur/(1+r1/100),0)),String(d(cur-r1-r2,0))]),'倒推要连续除以两个增长倍数。',`两年前≈${cur}÷(1+${r2}%)÷(1+${r1}%)≈${base}。`);
  });
  const baseRoute=C('inter_base_current_route','现期/基期互求',['技巧'],[forward,backward],'sequence');

  const threeYear=Q('inter_three_year','三年连乘',['运用'],()=>{
    const rs=[n(4,12),n(3,11),n(2,10)]; const ans=pct(multRate(rs));
    return R(`连续三年增长率分别为 ${rs[0]}%、${rs[1]}%、${rs[2]}%，总增长率约为？`,ans,op(ans,[pct(rs.reduce((a,b)=>a+b,0)),pct(rs[0]+rs[2]),pct(rs[0]*rs[1]/100),pct(multRate(rs)+2)]),'先连乘成倍数，再减 1。',`总倍数=(1+${rs[0]}%)(1+${rs[1]}%)(1+${rs[2]}%)，总增长率≈${ans}。`);
  });
  const timesMinus=Q('inter_times_minus','倍数减一',['基础'],()=>{
    const a=n(120,180)/100; const ans=pct((a-1)*100);
    return R(`最终量是基期的 ${a.toFixed(2)} 倍，总增长率是多少？`,ans,op(ans,[pct(a),pct(a*100),pct((a+1)*100),`${a.toFixed(2)} 倍`]),'增长率=倍数-1。',`${a.toFixed(2)}-1=${(a-1).toFixed(2)}，即 ${ans}。`);
  });
  const multiRoute=C('inter_multi_route','多年连乘路线',['运用'],[threeYear,timesMinus],'sequence');

  add(C('interyear_training','隔年增长｜变量训练',['运用'],[formulaRoute,yearRoute,pointRoute,baseRoute,multiRoute],'all'));
})();
