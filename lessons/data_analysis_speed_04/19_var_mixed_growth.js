(function(){
  const {n,R,Q,C,add}=EX;
  const between=Q('var_mixed_between','整体在两者之间',['技巧'],()=>{
    const a=n(3,12), b=n(15,30); const low=Math.min(a,b), high=Math.max(a,b); const ans=`${n(low+1,high-1)}%`;
    return R(`甲增长${a}%，乙增长${b}%，甲乙合计增长率最可能是？`,ans,[ans,`${high+5}%`,`${low-3}%`,`${high+10}%`],'整体在部分之间。',`合计增长率是加权平均，只能在${low}%到${high}%之间。`);
  });
  const notMax=Q('var_mixed_not_max','不能取最大',['技巧'],()=>{
    const a=n(5,10), b=n(20,35);
    return R(`A增长${a}%，B增长${b}%，整体增长率能否高于${b}%？`,'不能',['不能','一定能','只要B现期大就能','只要A增长量小就能'],'加权平均不超过最大。',`整体增长率夹在${a}%与${b}%之间，通常不能高于最大部分${b}%。`);
  });
  const notMin=Q('var_mixed_not_min','不能取最小',['技巧'],()=>{
    const a=n(5,10), b=n(20,35);
    return R(`A增长${a}%，B增长${b}%，整体增长率能否低于${a}%？`,'不能',['不能','一定能','只要A基期小就能','只看增长量决定'],'加权平均不低于最小。',`整体增长率夹在${a}%与${b}%之间，通常不能低于最小部分${a}%。`);
  });
  const range=C('var_mixed_range','范围判断',['技巧'],[between,notMax,notMin],'all');

  const bigWeight=Q('var_mixed_big_weight','大权重拉动',['技巧'],()=>R('若甲基期占90%且增长率5%，乙基期占10%且增长率40%，整体增长率更靠近谁？','甲的5%',['甲的5%','乙的40%','两者正中间22.5%','一定超过40%'],'权重大者拉动整体。','整体增长率按基期权重加权，甲权重90%，所以整体更靠近甲的5%。'));
  const smallWeight=Q('var_mixed_small_weight','小权重有限',['技巧'],()=>R('某小部分增长率很高，但基期占比很小，对整体增速影响如何？','影响有限',['影响有限','一定决定整体','一定让整体超过最大值','完全没有影响'],'权重要看基期规模。','小权重部分即使增速高，也只能有限拉动整体，不会让整体超过部分最大增速。'));
  const weight=C('var_mixed_weight','权重偏向',['技巧'],[bigWeight,smallWeight],'all');

  const extreme=Q('var_mixed_eliminate_extreme','极端值排除',['运用'],()=>R('部分增速分别为4%、9%、12%，整体增速选项中哪个必错？','15%',['15%','8%','10%','6%'],'整体不超最大不低最小。','整体增速应在4%到12%之间，15%超出范围，必错。'));
  const inRange=Q('var_mixed_eliminate_weight','范围内再结合权重',['运用'],()=>R('混合增速选项都在范围内时，下一步应看什么？','基期权重偏向',['基期权重偏向','选项字数','材料页码','年份奇偶'],'范围只能先排除。','若选项都在部分增速之间，需要看基期权重，整体更靠近权重大的部分。'));
  const eliminate=C('var_mixed_eliminate','排除选项',['运用'],[extreme,inRange],'sequence');

  add(C('var_mixed_growth','变量训练｜混合增长率',['技巧'],[range,weight,eliminate],'all'));
})();
