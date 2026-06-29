(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const e1=Q('da_first_digit_fraction','分数首位比较',['技巧'],()=>{
    const target=n(20,39)/10;
    const goodDen=n(160,240);
    const goodNum=Math.round(target*goodDen);
    const ans=`${goodNum}÷${goodDen}`;
    const bad1=`${n(400,600)}÷${n(80,130)}`;
    const bad2=`${n(80,150)}÷${n(150,250)}`;
    const bad3=`${n(700,900)}÷${n(90,150)}`;
    return R(
      `整体平均水平约为 ${target.toFixed(1)}。下列哪个分数最接近整体？`,
      ans,
      op(ans,[bad1,bad2,bad3]),
      '先看首位和数量级，行测不必每项精除。',
      `${ans}≈${target.toFixed(1)}，其首位与整体最接近。`
    );
  });

  const e2=Q('da_peak_valley','削峰填谷',['技巧'],()=>{
    const base=pk([80,90,100]);
    const count=pk([5,8,10]);
    const offsets=[];
    for(let i=0;i<count;i++) offsets.push(n(-5,4));
    const sum=offsets.reduce((a,b)=>a+b,0);
    const avg=Math.round((base+sum/count)*10)/10;
    const nums=offsets.map(x=>base+x).join('、');
    const ans=String(avg);
    return R(
      `一组数据为 ${nums}，都接近 ${base}。用削峰填谷求平均数约为？`,
      ans,
      op(ans,[String(base),String(Math.round((base+sum)*10)/10),String(Math.round((base-sum/count)*10)/10)]),
      '把每个数与参照值比较，算总偏差再除以个数。',
      `总偏差=${sum}，平均数=${base}+${sum}/${count}≈${avg}。`
    );
  });

  const e3=Q('da_weight_score','权重计算',['技巧'],()=>{
    const a=n(70,95), b=n(70,100), c=n(70,100);
    const score=Math.round((a*0.2+b*0.4+c*0.4)*10)/10;
    const ans=String(score);
    return R(
      `某项目三项得分分别为 ${a}、${b}、${c}，权重为 20%、40%、40%。综合得分约为？`,
      ans,
      op(ans,[String(Math.round((a+b+c)/3*10)/10),String(Math.round((a*0.4+b*0.4+c*0.2)*10)/10),String(a+b+c)]),
      '权重不是简单平均，要各自乘权重后相加。',
      `综合得分=${a}×20%+${b}×40%+${c}×40%≈${score}。`
    );
  });

  const e4=Q('da_quantity_order','数量级意识',['技巧'],()=>R(
    '增长额之差一正一负时，若问“两者增长额之差约为多少”，应特别注意什么？',
    '符号与数量级',
    op('符号与数量级',['只看绝对量最大','只看增长率最大','把百分号去掉直接相加']),
    '负增长的增长额为负；作差时可能变成相加。',
    '还要确认单位和小数位，避免把 8.9 看成 89 或 890。'
  ));

  const drill=C('da_estimate_variable_route','变量训练',['技巧'],[e1,e2,e3],'all');
  add(C('da_estimate_card','估算比较｜首位削峰权重',['技巧'],[drill,e4],'all'));
})();
