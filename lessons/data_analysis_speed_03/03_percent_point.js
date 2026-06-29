(function(){
  const {n,rn,op,R,Q,C,add,fmt,pct,pp}=DA3;
  const abs=Q('pp_abs_relative','绝对量比较',['基础'],()=>{
    const b=n(40,90), d=n(5,20), a=b+d;
    const rel=fmt(d/b*100,1)+'%';
    const ans='既可以做差，也可以做比';
    return R(`${a} 比 ${b} 多多少？这两个数都是绝对量，正确处理是？`,ans,op(ans,[`只能说多 ${d}`,'只能读作百分点','只能做除法']),'绝对量比较有两种读法。',`${a}-${b}=${d} 是绝对差；${d}÷${b}≈${rel} 是相对差。绝对量可以做差，也可以做比。`);
  });
  const rule=Q('pp_rule','百分数规则',['基础'],()=>{
    const ans='百分数之间原则上只做加减，结果读作百分点';
    return R('两个增长率、两个比重这类百分数比较时，核心规则是？',ans,op(ans,['百分数之间优先相乘','百分数做差后仍读百分号','百分数之间必须先除后减']),'百分数本身就是相对量。','百分数是相对量。两个相对量比较，规范做法是做差，且结果读作百分点。');
  });
  const industry=Q('pp_industry_added_value','产业增加值',['基础'],()=>{
    const names=['第一产业','第二产业','第三产业','工业','服务业'];
    const name=names[n(0,names.length-1)];
    const value=rn(120.5,980.5,1);
    const ans='具体指标值，不是增长量';
    return R(`材料说“${name}增加值为${value}亿元”。这里的“增加值”应理解为？`,ans,op(ans,['增长量，必须套增长量公式','百分点','同比增长率']),'这是经济统计名词。',`“${name}增加值”是一个具体经济指标值，可近似当成产值/量来处理，不要因为有“增加”二字就误判为增长量。`);
  });
  const standard=Q('pp_train_standard','规范差值变量',['技巧'],()=>{
    const b=rn(4,18,1), d=rn(2,12,1), a=Number((b+d).toFixed(1));
    const ans=pp(d);
    return R(`甲增长率为 ${pct(a)}，乙增长率为 ${pct(b)}。甲比乙高多少？`,ans,op(ans,[pct(d),pct(d/b*100),pp(d+1),pp(Math.max(0.1,d-1))]),'两个百分数做差，读成百分点。',`${pct(a)}-${pct(b)}=${pct(d)}，读作 ${ans}。`);
  });
  const noDivide=Q('pp_train_no_divide','不要先除变量',['技巧'],()=>{
    const b=n(4,12), d=n(2,6), a=b+d;
    const wrong=fmt(d/b*100,1)+'%';
    const ans=pp(d);
    return R(`${a}% 比 ${b}% 高多少？`,ans,op(ans,[wrong,pct(d),pp(d+1)]),'不是绝对量比较，不能优先做相对差。',`两个百分数比较，先做 ${a}%-${b}%=${d}%，结果读作 ${ans}；${wrong} 是把百分数又当绝对量做比。`);
  });
  const irregular=Q('pp_train_irregular','异常选项变量',['运用'],()=>{
    const b=n(5,15), d=n(3,9), a=b+d;
    const ans=`选数值为 ${d} 的差值项`;
    return R(`题目问 ${a}% 比 ${b}% 高多少。规范应为 ${d} 个百分点，但选项全写成百分号。考场应优先怎么办？`,ans,op(ans,['直接放弃此题','先算相对差','把两个百分数相乘']),'先按规范差值找答案。',`规范计算是 ${a}%-${b}%=${d} 个百分点。若只有 ${d}% 这类书面选项，仍优先选差值项；若差值完全没有，再考虑不规范的相对差。`);
  });
  const train=C('pp_variable','变量训练',['技巧'],[standard,noDivide,irregular],'all');
  add(C('percent_point','百分数与百分点｜读法、陷阱与变量训练',['基础'],[abs,rule,industry,train],'sequence'));
})();
