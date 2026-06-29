(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const a1=Q('da_positive_not_decline','正增长不算降幅',['基础'],()=>{
    const pos=n(8,35), d1=n(5,12), d2=n(13,28);
    const ans=`-${d2}%`;
    return R(
      `三个地区同比变化分别为 +${pos}%、-${d1}%、-${d2}%。若问“降幅最大”，应选哪个变化率？`,
      ans,
      op(ans,[`+${pos}%`,`-${d1}%`,`+${Math.max(pos,d2)}%`]),
      '降幅必须先有“降”，正增长不是降幅候选。',
      `+${pos}% 是增长，不属于降幅；两个下降中 ${d2}% 的绝对值更大，所以选 ${ans}。`
    );
  });

  const a2=Q('da_far_options_range','选项差距大先判范围',['技巧'],()=>{
    const total=pk([426,526,680,840]);
    const num=n(720,780), den=n(790,860);
    const close=Math.round(total*num/den);
    const ans=`接近且小于 ${total}`;
    return R(
      `需要估算 ${total}×${num}/${den}。选项中有 ${Math.round(total/2)}、${close}、${total*2}。优先怎样判断？`,
      ans,
      op(ans,[`约为 ${Math.round(total/2)}`,`远大于 ${total*2}`,`无法估算`]),
      '选项距离很大时，不必精算，先用比例范围。',
      `${num}/${den} 略小于 1，所以结果应接近且小于 ${total}，约 ${close}。`
    );
  });

  const a3=Q('da_growth_amount_diff_sign','增长额之差的正负',['技巧'],()=>{
    const inc=n(40,90), dec=n(8,25);
    const ans=String(inc+dec);
    return R(
      `甲行业增长额约 +${inc}，乙行业增长额约 -${dec}。若问两者增长额之差的绝对距离，约为多少？`,
      ans,
      op(ans,[String(inc-dec),String(dec),String(inc)]),
      '一个正增长、一个负增长，差距是正数减负数。',
      `增长额差距=|${inc}-(-${dec})|=${inc+dec}，不是 ${inc}-${dec}。`
    );
  });

  const a4=Q('da_scope_language_first','语言理解优先',['运用'],()=>R(
    '课程中多次说有些资料分析不是难在估算，而是难在什么？',
    '读懂限定范围和题干语言',
    op('读懂限定范围和题干语言',['背更多复杂公式','把所有数字精确除完','只看选项均衡']),
    '图表调查类、范围类题尤其如此。',
    '例如“所有考虑行程总耗时的人均选择飞机或高铁”会改变分子归属；“在飞机或高铁用户中”会改变分母范围。'
  ));

  const a5=Q('da_people_to_share_to_complement','人数占比互转路径',['技巧'],()=>{
    const total=pk([1000,1600,2000,2400]);
    const people=Math.round(total*pk([0.25,0.3,0.375,0.4]));
    const plane=Math.round(people/total*1000)/10;
    const train=Math.round((100-plane)*10)/10;
    const ans=`高铁约 ${train}%`;
    return R(
      `共有 ${total} 人，优先选飞机的约 ${people} 人。若图中给的是“优先选高铁占比”，应先匹配哪个值？`,
      ans,
      op(ans,[`飞机约 ${plane}%`,`高铁约 ${plane}%`,`总人数约 ${people}%`]),
      '人数题遇到占比图，先人数÷总人数，再做互补。',
      `飞机占比=${people}/${total}=${plane}%，所以高铁占比约 100%-${plane}%=${train}%。`
    );
  });

  const a6=Q('da_composite_priority_not_rule','综合题策略不是定理',['运用'],()=>R(
    '“综合题 A 概率低、C/D 常见、可先看 D”应如何使用？',
    '只作没时间或验证顺序的策略',
    op('只作没时间或验证顺序的策略',['直接当正确答案规律','完全不用读材料','看到 D 就必选 D']),
    '这是考场节能策略，不是知识公式。',
    '原课说“猜题归猜题”，有时间仍要验证；这些经验只用于没时间或决定先查哪个选项。'
  ));

  const a7=Q('da_subset_condition_belongs','条件建立子集',['技巧'],()=>{
    const all=n(1200,3000);
    const factor=n(5,15);
    const group=n(25,50);
    const ans=`${factor}% 属于该小范围，但在小范围内占比还要除以 ${group}%`;
    return R(
      `总人数中 ${factor}% 考虑某因素。题干说“只有 A 类有这个因素”，A 类占总人数 ${group}%。正确理解是？`,
      ans,
      op(ans,[`${factor}% 就是 A 类内部占比`,`应直接 1-${factor}%`,`这个因素与 A 类无关`]),
      '“只有 A 类有”说明分子属于 A 类，但原占比仍可能是总人数占比。',
      `分子可放入 A 类范围内，但若问 A 类内部占比，应计算 ${factor}%/${group}%。`
    );
  });

  const a8=Q('da_daily_practice_rhythm','驿站｜训练节奏',['驿站'],()=>R(
    '老师对资料分析课后训练提出的最低节奏是什么？',
    '每天至少四篇资料分析，并复盘读材料和估算方法',
    ['每天至少四篇资料分析，并复盘读材料和估算方法','只背公式不做题','只刷数字推理','完全依靠选项均衡'],
    '这是学习提示，不是计算题。',
    '原课结尾强调资料分析要坚持每天四篇，训练读材料能力和划线/估算能力。'
  ));

  const tone=C('da_final_wording_edges','原文口径',['基础'],[a1,a4,a6],'all');
  const calc=C('da_final_variable_edges','变量升华',['技巧'],[a2,a3,a5,a7],'all');
  const station=C('da_final_station','驿站',['驿站'],[a8],'all');
  add(C('da_final_audit_card','读题口径｜范围与策略',['运用'],[tone,calc,station],'all'));
})();
