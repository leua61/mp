(function(){
  const {R,Q,C,add,op,n,pk,r1}=EX;

  const s1=Q('var_den_find_multiple','找接近倍数',['技巧'],()=>{
    const m=pk([2,3]);
    const small=n(180,360);
    const big=small*m+n(-12,18);
    const ans=`先按 ${m} 倍放缩`;
    return R(
      `两个分母为 ${small} 和 ${big}，它们接近 ${m} 倍关系。分数做差前优先怎么处理？`,
      ans,
      op(ans,[`先按 ${m} 倍放缩`,'直接把两个分母都看成1000','只改分母不改分子','先比较分子末位']),
      '变量训练要识别倍数骨架，不固定原文数字。',
      `${small}×${m}=${small*m}，接近 ${big}。先把小分母那一项分子分母同乘 ${m}，再考虑通分或估差。`
    );
  });

  const s2=Q('var_den_sync_multiple','同步放大分子',['基础'],()=>{
    const m=pk([2,3,4]);
    const num=n(120,480), den=n(90,260);
    const ans=`${num*m}/${den*m}`;
    return R(
      `为了让分母接近另一项，把 ${num}/${den} 的分母放大 ${m} 倍，等价分数应写成？`,
      ans,
      op(ans,[`${num}/${den*m}`,`${num*m}/${den}`,`${num+m}/${den*m}`]),
      '分子分母要同步放缩。',
      `${num}/${den}= ${num*m}/${den*m}。只改分母会改变原分数大小。`
    );
  });

  const d1=Q('var_den_choose_good_target','选好算目标',['技巧'],()=>{
    const targets=[['452','接近45，可利用5×9'],['125','联想到1/8'],['110','接近11，便于看1.1'],['450','接近45×10']];
    const [target,reason]=pk(targets);
    const ans=`选 ${target}，因为${reason}`;
    return R(
      `通分方向都可行时，若一个方向能调到 ${target}，应如何判断？`,
      ans,
      op(ans,[`选 ${target}，因为${reason}`,'永远选更小的分母','永远选更大的分母','完全不看后续计算']),
      '方向选择服务于后续心算。',
      `原文不是机械升降，而是看目标数是否有好算因子或熟悉分数骨架。${target} 的优势是：${reason}。`
    );
  });

  const d2=Q('var_den_rough_both_risk','双粗改风险变量',['运用'],()=>{
    const a=n(410,460), b=a+n(20,55);
    const ans='风险大，分数做差会放大这种误差';
    return R(
      `分数做差时，有人把两个分母 ${a} 和 ${b} 都粗略看成 ${Math.round((a+b)/200)*100}。这种做法的问题是？`,
      ans,
      op(ans,['风险大，分数做差会放大这种误差','完全没有风险','只会让答案更精确','一定比通分更稳']),
      '两个分数各自的误差相减后，可能占差值很大。',
      '更聪明的做法是让其中一个分母变成另一个，或先倍数放缩接近；不要为省一步制造更大误差。'
    );
  });

  const routeA=C('route_den_multiple','先倍数放缩',['技巧'],[s1,s2],'sequence');
  const routeB=C('route_den_direction','通分方向',['技巧'],[d1,d2],'sequence');

  add(C('var_denominator_strategy','变量训练｜分母处理策略',['技巧'],[routeA,routeB],'all'));
})();
