(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const q1=Q('da_decline_reverse_float','下降倒推近似上浮',['技巧'],()=>{
    const base=n(260,520); const r=pk([6,8,9,10]);
    const now=Math.round(base*(100-r)/100);
    const rough=now+Math.round(now*r/100);
    const ans='比现期大，约等于现期上浮一点';
    return R(
      `现期 ${now}，同比下降 ${r}%。求基期时，第一反应应是什么？`,
      ans,
      op(ans,['比现期小，直接减去下降率','等于现期，不用倒推','一定是现期的两倍']),
      '下降后倒推是除以 1-降幅，基期一定比现期大。',
      `基期=${now}÷(1-${r}%)，一定大于 ${now}。粗估可理解为现期上浮约 ${r}% 左右，约 ${rough} 附近，不是再减一次。`
    );
  });

  const q2=Q('da_mix_weight_distance','混合距离看基数',['技巧'],()=>{
    const big=n(6,12)*100; const small=n(1,4)*100;
    const rBig=n(5,10), rSmall=n(-4,2);
    const whole=Math.round((big*rBig+small*rSmall)/(big+small)*10)/10;
    const ans=`更接近 ${rBig}%`;
    return R(
      `A 部分量 ${big}、增长率 ${rBig}%；B 部分量 ${small}、增长率 ${rSmall}%。整体增长率约 ${whole}%。它应更接近谁？`,
      ans,
      op(ans,[`更接近 ${rSmall}%`,'一定在两者正中间','一定等于两者相加']),
      '混合率不只夹在两者之间，还会更靠近基数大的部分。',
      `A 的基数明显更大，所以整体增长率虽然夹在 ${rSmall}% 和 ${rBig}% 之间，但更靠近 A 的 ${rBig}%。这能排除过于极端的选项。`
    );
  });

  const q3=Q('da_rough_preserve_lead_digit','粗估保首位',['技巧'],()=>{
    const now=pk([2164,26575,13411]);
    const approx=Math.round(now/10)*10;
    const ans='不影响首位或选项档位时，可以用整百整十近似';
    return R(
      `考场估算中，${now} 近似看成 ${approx}。这种处理什么时候合理？`,
      ans,
      op(ans,['任何题都必须精确到个位','只要近似就一定错','只有没有选项时才允许近似']),
      '看选项差距和问题所需精度。',
      '原课多次用 197≈200、2164≈2160 这类处理。若只判断“三开头/二开头”或选项差距很大，保住首位和量级即可。'
    );
  });

  const q4=Q('da_small_rate_digit_expand','十以内四位估增长量',['技巧'],()=>{
    const r=pk([4.6,5.8,6.4,8.2]);
    const thousands=n(1,5); const hundreds=n(1,8);
    const val=thousands*1000+hundreds*100+n(0,9)*10;
    const ans=`约 ${Math.round(val*r/100)}`;
    return R(
      `${val} 增长 ${r}%。用“100/1000 增加多少”估增长量。`,
      ans,
      op(ans,[`约 ${Math.round(val*r/100)+20}`,`约 ${Math.max(1,Math.round(val*r/100)-20)}`,`约 ${val}`]),
      '增长率在 10% 以内时，四位数可拆成几个 1000、几个 100 来估。',
      `1000 增加 ${r*10}，100 增加 ${r}，所以 ${val}×${r}%≈${Math.round(val*r/100)}。位数越大，保留千百位估算更稳。`
    );
  });

  const q5=Q('da_rate_method_switch','十以内超十切换',['基础'],()=>{
    const r=pk([18.3,24.4,29.7,35.4]);
    return R(
      `增长率/降幅达到 ${r}% 左右时，还应优先用“100 增加多少”的小增长率法吗？`,
      '不应优先，应改用份数法、划线法或公式估算',
      op('不应优先，应改用份数法、划线法或公式估算',['应该，所有百分数都这样估','直接忽略增长率','只看尾数即可']),
      '原课把 10% 以内的小增长率法和 20%—30% 的划线/份数法分开。',
      `${r}% 已经不小，继续用“100 增加多少”容易乱数量级；应换成份数、划线或公式倒推。`
    );
  });

  const q6=Q('da_weight_delta_compare','权重差额比较',['技巧'],()=>{
    const w1=pk([20,30]); const w2=100-w1;
    const a1=n(78,88), a2=n(88,96);
    const b1=a1+n(5,10), b2=a2-n(1,5);
    const A=a1*w1+a2*w2; const B=b1*w1+b2*w2;
    const ans=A>B?'甲更高':'乙更高';
    return R(
      `综合分=指标1×${w1}%+指标2×${w2}%。甲为(${a1},${a2})，乙为(${b1},${b2})。不用全算，谁更高？`,
      ans,
      op(ans,['二者必然相等','只看指标1即可','只看指标2即可']),
      '比较加权差额：一项多多少乘权重，另一项少多少乘权重。',
      `甲-乙=(${a1}-${b1})×${w1}+(${a2}-${b2})×${w2}=${A-B}，所以${ans}。这就是原课权重题“看差额不必全算”的升华。`
    );
  });

  const q7=Q('da_table_extreme_then_growth','先找极值再算增长额',['技巧'],()=>{
    const maxNow=n(1000,1800), minNow=n(100,280);
    const rMax=pk([4.6,5.8,6.4]); const rMin=pk([-35.4,-29.7,-24.4]);
    const ans='先找绝对量最大和最小，再分别估增长额/减少额';
    return R(
      `表格题问“绝对量最大和最小的行业，增长额之差”。已知最大 ${maxNow}、增速 ${rMax}%，最小 ${minNow}、增速 ${rMin}%。第一步是什么？`,
      ans,
      op(ans,['直接把两个现期量相减','只比较增长率大小','只看最大行业即可']),
      '题干先限定对象，再限定计算。',
      '原课这类题先在表中找绝对量最大/最小的行业，再分别估增长额；如果一个为负增长，差值还要注意正负号。'
    );
  });

  const q8=Q('da_review_resources_station','驿站｜复习资源',['驿站'],()=>R(
    '结课后如果方法生疏，原课给出的恢复路径是什么？',
    '复习笔记和录屏，继续刷题，有问题交流复盘',
    ['复习笔记和录屏，继续刷题，有问题交流复盘','只看最终答案','放弃资料分析','只背选项均衡性'],
    '这是训练保障，不是计算题。',
    '原文最后强调继续复习巩固笔记和录屏，训练读材料、读数据、划线法、估算法；有问题可讨论复盘。'
  ));

  const est=C('da_exhaustive_estimate_edges','估算边界',['技巧'],[q1,q3,q4,q5],'all');
  const structure=C('da_exhaustive_structure_edges','结构与权重',['技巧'],[q2,q6,q7],'all');
  const station=C('da_exhaustive_station','驿站',['驿站'],[q8],'all');
  add(C('da_exhaustive_audit_card','估算边界｜权重与极值',['运用'],[est,structure,station],'all'));
})();
