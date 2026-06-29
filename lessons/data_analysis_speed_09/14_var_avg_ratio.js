(function(){
  const {R,Q,C,add,op,n,r1}=EX;

  const avgShare1=Q('var_avg_share_ratio','占比骨架',['技巧'],()=>{
    const a=n(60,88), c=n(30,55), b=100-a, d=100-c;
    const ans=`${a}/${b} × ${d}/${c}`;
    return R(
      `甲总量占 ${a}%，甲份数占 ${c}%。乙为其他部分。甲平均数/乙平均数的骨架是？`,
      ans,
      op(ans,[`${a}/${c} × ${b}/${d}`,`${b}/${a} × ${c}/${d}`,`${c}/${a} × ${d}/${b}`]),
      '先写甲平均数÷乙平均数，再约公共总量和公共份数。',
      `乙总量占 ${b}%，乙份数占 ${d}%，所以 (${a}/${c})÷(${b}/${d})=${ans}。`
    );
  });

  const avgShare2=Q('var_avg_other_part','其他部分',['基础'],()=>{
    const p=n(35,82);
    const ans=`${100-p}%`;
    return R(
      `某部分占整体 ${p}%，资料分析里“其他部分”占多少？`,
      ans,
      op(ans,[`${p}%`,`${100+p}%`,`${Math.abs(50-p)}%`]),
      '同一整体中，其他=1-本部分。',
      `其他部分占 100%-${p}%=${100-p}%。`
    );
  });

  const ratio1=Q('var_ratio_cross','交叉位置',['技巧'],()=>{
    const rp=n(8,22), rw=n(4,16);
    const ans=`整体 ${rw}% 在上，部分 ${rp}% 在下`;
    return R(
      `基期比重修正中，部分增长率 ${rp}%，整体增长率 ${rw}%。哪个增长率在分子位置？`,
      ans,
      op(ans,[`部分 ${rp}% 在上，整体 ${rw}% 在下`,`整体 ${rw}% 在上，部分 ${rp}% 在下`,`两个都在上`,`两个都不用`]),
      '基期比重=现期比重×整体增长因子÷部分增长因子。',
      `所以分子位置是整体增长因子 1+${rw}%，分母位置是部分增长因子 1+${rp}%。`
    );
  });

  const ratio2=Q('var_ratio_size','大小变量',['运用'],()=>{
    const rw=n(5,14), rp=rw+n(1,8);
    const ans='基期比重更小';
    return R(
      `部分增长 ${rp}%，整体增长 ${rw}%。若现期比重已知，基期比重相对现期应怎样？`,
      ans,
      op(ans,['基期比重更小','基期比重更大','完全相等','不能判断']),
      '部分涨得比整体快，现期份额提高。',
      `部分增速 ${rp}% 大于整体 ${rw}%，现期比重高于基期，所以基期比重更小。`
    );
  });

  const avgGrow1=Q('var_avg_growth_calc','公式变量',['技巧'],()=>{
    const rt=n(12,28), rc=n(3,10);
    const val=r1((rt-rc)/(100+rc)*100);
    const ans=`约 ${val}%`;
    return R(
      `总量增长 ${rt}%，份数增长 ${rc}%。平均数增长率约为？`,
      ans,
      op(ans,[`约 ${r1(rt-rc)}%`,`约 ${r1((rc-rt)/(100+rc)*100)}%`,`约 ${r1((rt-rc)/(100+rt)*100)}%`]),
      '用 (r总-r份)/(1+r份)。',
      `(${rt}%-${rc}%)/(1+${rc}%)=${rt-rc}%/${100+rc}%≈${val}%。`
    );
  });

  const avgGrow2=Q('var_avg_growth_direction','趋势变量',['运用'],()=>{
    const rc=n(8,18), rt=rc-n(1,6);
    const ans='平均数下降';
    return R(
      `总量增长 ${rt}%，份数增长 ${rc}%。平均数趋势是？`,
      ans,
      op(ans,['平均数上升','平均数下降','平均数不变','无法判断']),
      '只看 r总-r份 的正负。',
      `${rt}%<${rc}%，平均数增长率为负，平均数下降。`
    );
  });

  const routeA=C('route_avg_share','占比约分',['技巧'],[avgShare1,avgShare2],'sequence');
  const routeB=C('route_base_ratio','基期比重',['技巧'],[ratio1,ratio2],'sequence');
  const routeC=C('route_avg_growth','平均数增长',['技巧'],[avgGrow1,avgGrow2],'sequence');

  add(C('var_avg_ratio_card','变量训练｜平均数比重',['运用'],[routeA,routeB,routeC],'all'));
})();
