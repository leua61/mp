(function(){
  const {R,Q,C,add,op,n,r1}=EX;

  const frac1=Q('var_frac_tongfen','接近通分',['技巧'],()=>{
    const d2=n(680,780), up=n(20,50), d1=d2+up, num=n(220,330);
    const p=r1(up/d2*100);
    const ans=`约上升 ${p}%`;
    return R(
      `把分母 ${d2} 调到 ${d1}，分子应同步怎样变化？`,
      ans,
      op(ans,[`约下降 ${p}%`,`保持不变`,`约上升 ${r1(up/d1*100)}%`]),
      '分母等价放大，分子也要按同一比例放大。',
      `${d1}-${d2}=${up}，相对 ${d2} 约为 ${p}%，所以分子同步上升约 ${p}%。`
    );
  });

  const frac2=Q('var_frac_split','选项近拆分',['运用'],()=>{
    const ans='改用拆分或直除精算';
    return R(
      'A/B-C/D 的选项差距只有 1%—2%。此时最稳妥的策略是？',
      ans,
      op(ans,['改用拆分或直除精算','继续只看首位','直接取中间项','只看分母大小']),
      '两个分数做差会放大误差。',
      '选项非常近时，通分估算可能不够稳，拆分或直除更安全。'
    );
  });

  const mix1=Q('var_mix_range','夹逼排除',['基础'],()=>{
    const low=n(8,15), high=low+n(5,11);
    const ans=`不可能小于 ${low}% 或大于 ${high}%`;
    return R(
      `两个部分增长率为 ${low}% 和 ${high}%。混合增长率的排除规则是？`,
      ans,
      op(ans,[`一定等于 ${low+high}%`,`不可能小于 ${low}% 或大于 ${high}%`,`一定小于 ${low}%`,`一定大于 ${high}%`]),
      '混合值被两端夹住。',
      `混合增长率只能在 ${low}% 与 ${high}% 之间，区间外选项直接排除。`
    );
  });

  const mix2=Q('var_mix_lean_amount','偏向量大',['技巧'],()=>{
    const rBig=n(7,13), rSmall=rBig+n(6,12);
    const ans=`靠近 ${rBig}%`;
    return R(
      `量大的部分增长 ${rBig}%，量小的部分增长 ${rSmall}%。混合增长率更靠近？`,
      ans,
      op(ans,[`靠近 ${rBig}%`,`靠近 ${rSmall}%`,`正中间`,`两端之外`]),
      '量大者权重大。',
      `整体增长率偏向量大的部分，所以更靠近 ${rBig}%。`
    );
  });

  const mix3=Q('var_mix_three_first','三者先混',['技巧'],()=>{
    const ans='先把量接近的两项混成临时整体';
    return R(
      '三者混合中，两项现期量都约1000，第三项约9000。第一步应优先？',
      ans,
      op(ans,['先把量接近的两项混成临时整体','先把三个增长率平均','直接只看第三项','先选增长率最大项']),
      '两项量接近，混合点容易估。',
      '先混量接近、比例好算的两项，再和第三项混合。'
    );
  });

  const grow1=Q('var_growth_interval','隔年变量',['技巧'],()=>{
    const rA=n(3,8), rB=n(2,7);
    const val=r1(rA+rB+rA*rB/100);
    const ans=`约 ${val}%`;
    return R(
      `今年增长 ${rA}%，去年增长 ${rB}%。今年比前年增长约多少？`,
      ans,
      op(ans,[`约 ${rA+rB}%`,`约 ${r1(rA+rB-rA*rB/100)}%`,`约 ${r1(rA*rB/100)}%`]),
      '隔年增长率=两率相加再加乘积。',
      `${rA}%+${rB}%+${rA}%×${rB}%≈${val}%。`
    );
  });

  const grow2=Q('var_growth_year_gap','年份差变量',['基础'],()=>{
    const start=2003, end=2009;
    const ans='6 年';
    return R(
      '若按 2003 年为初始、2009 年为末期计算年均增长量，年份差是多少？',
      ans,
      op(ans,['5 年','6 年','7 年','9 年']),
      '年份差不是年份个数，是经过了几个年度间隔。',
      '2003→2004→2005→2006→2007→2008→2009，共 6 个间隔。'
    );
  });

  const grow3=Q('var_growth_chase','追及变量',['技巧'],()=>{
    const gap=n(50,95), fast=n(70,100), slow=n(20,45);
    const years=Math.ceil(gap/(fast-slow));
    const ans=`${years} 年`;
    return R(
      `初始差距 ${gap}，快者每年增 ${fast}，慢者每年增 ${slow}。至少几年超过？`,
      ans,
      op(ans,[`${Math.max(1,years-1)} 年`,`${years+1} 年`,`${years+2} 年`]),
      '差距除以每年追赶量，超过要向上取整。',
      `每年追赶 ${fast-slow}，${gap}÷${fast-slow}≈${r1(gap/(fast-slow))}，至少 ${years} 年。`
    );
  });

  const routeA=C('route_fraction','分数做差',['技巧'],[frac1,frac2],'sequence');
  const routeB=C('route_mixing','混合原理',['技巧'],[mix1,mix2,mix3],'sequence');
  const routeC=C('route_growth','增长综合',['技巧'],[grow1,grow2,grow3],'sequence');

  add(C('var_fraction_mix_growth_card','变量训练｜分数混合增长',['运用'],[routeA,routeB,routeC],'all'));
})();
