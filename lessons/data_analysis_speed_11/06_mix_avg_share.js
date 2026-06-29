(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const m1=Q('da_mix_rule','混合夹逼',['基础'],()=>R(
    '整体由 A、B 两部分构成时，整体增长率与两部分增长率的关系是？',
    '夹在两部分增长率之间',
    op('夹在两部分增长率之间',['一定大于两部分','一定小于两部分','等于两部分相加']),
    '整体是加权混合结果。',
    '整体增长率不会跑到两个部分增长率之外；这是混合原理。'
  ));

  const m2=Q('da_mix_direction','未知部分方向',['技巧'],()=>{
    const whole=n(2,8);
    const part=whole+n(1,5);
    const ans=`小于 ${whole}%`;
    return R(
      `整体增长率为 ${whole}%，已知 A 部分增长率为 ${part}%。B 部分增长率应在什么方向？`,
      ans,
      op(ans,[`大于 ${part}%`,`等于 ${whole}%`,`一定为负数`]),
      '整体必须夹在 A、B 之间。',
      `A 已经高于整体，要把整体拉回 ${whole}%，B 必须小于 ${whole}%。`
    );
  });

  const a1=Q('da_avg_direction_rule','平均数升降',['基础'],()=>R(
    '平均数=总量÷份数。判断平均数升降，只比较哪两个增长率？',
    '总量增长率与份数增长率',
    op('总量增长率与份数增长率',['现期量与基期量','部分量与整体量','出口额与进口额']),
    '平均数的分子是总量，分母是份数。',
    'R总>R份，平均数上升；R总<R份，平均数下降。'
  ));

  const a2=Q('da_avg_direction_drill','升降判断',['技巧'],()=>{
    const rt=n(-5,12);
    let rf=n(-4,13);
    if(rf===rt) rf+=2;
    const ans=rt>rf?'上升':'下降';
    return R(
      `某平均数=金额÷数量。金额增长率 ${rt}%，数量增长率 ${rf}%。平均数如何变化？`,
      ans,
      op(ans,['上升','下降','不变','无法判断']),
      '比较分子增长率和分母增长率。',
      `${rt}% ${rt>rf?'大于':'小于'} ${rf}%，所以平均数${ans}。`
    );
  });

  const b1=Q('da_ratio_formula','比重公式',['基础'],()=>R(
    '比重、占比、比例的基本结构是什么？',
    '部分÷整体',
    op('部分÷整体',['整体÷部分','增长量÷现期','基期÷现期']),
    '先确认部分和整体是否同口径。',
    '比重=部分÷整体；用比重求部分，就是整体×比重。'
  ));

  const b2=Q('da_ratio_transfer','比例迁移',['技巧'],()=>{
    const total=n(400,900);
    const whole=n(70,99)*100;
    const part=Math.round(whole*n(6,15)/100);
    const ans=`约 ${Math.round(total*part/whole)}`;
    return R(
      `甲类总量 ${total}，其行业分布比例与总体相同。总体中某行业 ${part}、总体总量 ${whole}。甲类该行业约多少？`,
      ans,
      op(ans,[`约 ${part}`,`约 ${total}`,`约 ${Math.round(total*whole/part)}`]),
      '先算总体行业占比，再乘甲类总量。',
      `甲类该行业≈${total}×${part}/${whole}≈${Math.round(total*part/whole)}。`
    );
  });

  const avg=C('da_avg_route','平均数',['技巧'],[a1,a2],'sequence');
  const ratio=C('da_ratio_route','比重比例',['技巧'],[b1,b2],'sequence');
  add(C('da_structure_card','结构关系｜混合平均比重',['技巧'],[m1,m2,avg,ratio],'all'));
})();
