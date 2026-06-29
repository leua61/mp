(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const f1=Q('da_base_formula','基期公式',['技巧'],()=>R(
    '已知现期量 A 和增长率 r，求基期量的标准式是什么？',
    'A÷(1+r)',
    op('A÷(1+r)',['A×(1+r)','A÷r','A×r÷(1+r)']),
    '基期是把现期倒推回上一期。',
    '增长时：现期=基期×(1+r)，所以基期=A÷(1+r)。下降时就是 A÷(1-r)。'
  ));

  const f2=Q('da_growth_amount_formula','增长量公式',['技巧'],()=>R(
    '已知现期量 A 和增长率 r，求增长量的常用式是什么？',
    'A×r÷(1+r)',
    op('A×r÷(1+r)',['A÷(1+r)','A×(1+r)','A÷r']),
    '增长量=现期-基期。',
    '基期=A÷(1+r)，增长量=A-A÷(1+r)=A×r÷(1+r)。'
  ));

  const v1=Q('da_base_drill','倒推基期',['技巧'],()=>{
    const base=n(80,240)*10;
    const r=pk([5,8,10,12,20]);
    const now=Math.round(base*(100+r)/100);
    const ans=`约 ${base}`;
    return R(
      `某指标现期约为 ${now}，同比增长 ${r}%。基期约为多少？`,
      ans,
      op(ans,[`约 ${now}`,`约 ${Math.round(now*(100+r)/100)}`,`约 ${base+r*10}`]),
      '增长后倒推：现期除以 1+增长率。',
      `${now}÷(1+${r}%)≈${base}，所以基期约为 ${base}。`
    );
  });

  const v2=Q('da_down_base_drill','下降倒推',['技巧'],()=>{
    const base=n(90,260)*10;
    const r=pk([6,9,12,20,25]);
    const now=Math.round(base*(100-r)/100);
    const ans=`约 ${base}`;
    return R(
      `某指标现期约为 ${now}，同比下降 ${r}%。基期约为多少？`,
      ans,
      op(ans,[`约 ${now}`,`约 ${Math.round(now*(100-r)/100)}`,`约 ${base-r*10}`]),
      '下降后倒推：现期除以 1-降幅。',
      `${now}÷(1-${r}%)≈${base}，所以基期约为 ${base}。`
    );
  });

  const v3=Q('da_fraction_growth','份数增长量',['技巧'],()=>{
    const pairs=[[20,6],[25,5],[12.5,9],[11.1,10],[10,11]];
    const [r,den]=pk(pairs);
    const now=n(12,80)*den;
    const ans=`约 ${Math.round(now/den)}`;
    return R(
      `现期量约为 ${now}，同比增长约 ${r}%。用份数思维估增长量。`,
      ans,
      op(ans,[`约 ${Math.round(now/(den-1))}`,`约 ${Math.round(now/(den+1))}`,`约 ${now}`]),
      `把 ${r}% 看成常见分数，增长量≈现期除以“现期份数”。`,
      `${r}% 对应现期约 ${den} 份，增长 1 份，所以增长量≈${now}÷${den}=${Math.round(now/den)}。`
    );
  });

  const v4=Q('da_small_rate_100','100增加多少',['技巧'],()=>{
    const r=pk([3.2,4.6,5.8,6.4,8.5]);
    const base=pk([300,500,800,1000,1200]);
    const ans=`约 ${Math.round(base*r/100)}`;
    return R(
      `${base} 同比增长 ${r}%，用“100 增加多少”估增长量。`,
      ans,
      op(ans,[`约 ${Math.round(base*r/100)+10}`,`约 ${Math.max(1,Math.round(base*r/100)-10)}`,`约 ${base}`]),
      '增长率在 10% 以内，100 增加 r，base 增加 base×r%。',
      `${base}×${r}%≈${Math.round(base*r/100)}，所以增长量约为 ${Math.round(base*r/100)}。`
    );
  });

  const drill=C('da_growth_variable_route','变量训练',['技巧'],[v1,v2,v3,v4],'sequence');
  add(C('da_growth_card','增长核心｜基期与增长量',['技巧'],[f1,f2,drill],'all'));
})();
