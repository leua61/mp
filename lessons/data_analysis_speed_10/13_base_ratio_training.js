(function(){
  const {n,op,R,Q,C,add}=EX;

  const formula=C('base_ratio_formula','公式训练',['技巧'],[
    Q('base_ratio_current_part','现期比重',['技巧'],()=>{
      const whole=n(12000,22000), part=Math.round(whole*n(35,65)/100);
      const ans=`${part}/${whole}`;
      return R(
        `现期部分为 ${part}，现期整体为 ${whole}。现期比重先写成什么？`, ans,
        op(ans,[`${whole}/${part}`,`${part}+${whole}`,`${whole-part}/${whole}`]),
        '先写部分÷整体。',
        `现期比重 = ${part}/${whole}。`
      );
    }),
    Q('base_ratio_factor','修正项',['技巧'],()=>R(
      '基期比重 = 现期比重 × 哪个修正项？','(1+r整)/(1+r部)',
      ['(1+r整)/(1+r部)','(1+r部)/(1+r整)','r部-r整','r部+r整'],
      '基期要把部分和整体都还原。',
      '部分除以 1+r部，整体除以 1+r整，合并后是 ×(1+r整)/(1+r部)。'
    ))
  ],'sequence');

  const trap=C('base_ratio_trap','陷阱识别',['运用'],[
    Q('base_ratio_current_trap','现期不是答案',['运用'],()=>R(
      '题目问基期比重，选项中出现“现期比重”附近的数，它通常是什么？','陷阱项',
      ['陷阱项','必然答案','单位错误','无法出现'],
      '基期比重要乘修正项。',
      '出题人常把现期比重放进选项，诱导漏乘增长率修正项。'
    )),
    Q('base_ratio_gap','增速差决定接近程度',['技巧'],()=>{
      const rp=n(7,11), rt=rp+n(1,3); const ans='相差不大但基期偏大';
      return R(
        `r部=${rp}%，r整=${rt}%。基期比重与现期比重大致关系是？`, ans,
        ['相差不大但基期偏大','相差不大但基期偏小','必然相等','无法判断'],
        '看 (1+r整)/(1+r部)。',
        `r整 > r部，修正项大于 1，所以基期比重略大于现期比重。`
      );
    })
  ],'all');

  const direction=C('base_ratio_direction','方向判断',['技巧'],[
    C('base_ratio_deep_close','近选项反陷阱',['运用'],[
      Q('base_ratio_rt_gt_rp','r整大于r部',['运用'],()=>R(
        '基期比重题中，r整 > r部。若现期比重陷阱和答案非常接近，应选现期比重的哪一侧？','更大一侧',
        ['更大一侧','更小一侧','完全相等','无法判断'],
        '修正项 (1+r整)/(1+r部) 大于 1。',
        'r整 > r部，则基期比重大于现期比重。'
      )),
      Q('base_ratio_rt_lt_rp','r整小于r部',['运用'],()=>R(
        '基期比重题中，r整 < r部。答案相对现期比重陷阱通常在哪一侧？','更小一侧',
        ['更小一侧','更大一侧','完全相等','必然为 0'],
        '修正项小于 1。',
        'r整 < r部，则基期比重小于现期比重。'
      ))
    ],'sequence')
  ],'all');

  add(C('base_ratio_training','基期比重变量训练｜陷阱与反陷阱',['运用'],[formula,trap,direction],'all'));
})();
