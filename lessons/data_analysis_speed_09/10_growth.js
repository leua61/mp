(function(){
  const {R,Q,C,add,op,n,r1}=EX;

  const q1=Q('growth_two_year','隔年增长率',['基础'],()=>{
    const rA=n(3,9), rB=-n(1,4);
    const ans=`${rA}%+(${rB}%)+${rA}%×(${rB}%)`;
    return R(
      `今年增长 ${rA}%，上一年增长 ${rB}%。隔年增长率应列为？`,
      ans,
      op(ans,[`${rA}%+${rB}%`,`${rA}%-(${rB}%)`,`${rA}%×${rB}%`]),
      '连续两年增长率不是简单相加，还要加乘积项。',
      `隔年增长率 r=${rA}%+(${rB}%)+${rA}%×(${rB}%)。`
    );
  });

  const q2=Q('growth_down_one','下降1%',['基础'],()=>{
    const ans='-1%';
    return R(
      '材料单独说“上年同期为下降1%”，增长率应取什么？',
      ans,
      op(ans,['-1%','1%','前一个增长率+1%','无法使用']),
      '下降就是比 0 小。',
      '“下降1%”对应增长率 -1%，不能误读为另一个正增长率。'
    );
  });

  const q3=Q('growth_avg_amount','年均增长量',['基础'],()=>{
    const start=n(40,80), end=start+n(18,42), years=n(4,7);
    const ans=`(${end}-${start})/${years}`;
    return R(
      `初始量 ${start}，末期量 ${end}，年份差 ${years} 年。年均增长量列式为？`,
      ans,
      op(ans,[`(${end}-${start})/${years+1}`,`${end}/${years}`,`(${end}-${start})×${years}`]),
      '年均增长量看总变化量平均分到几年。',
      `年均增长量=(末期量-初期量)/年份差，即 ${ans}。`
    );
  });

  const q4=Q('growth_prev_year','上一年初始',['运用'],()=>{
    const ans='初始年和年份差都要同步前推';
    return R(
      '题干说“04到09”，但材料明确给“上一年03”为初始相关量。处理原则是什么？',
      ans,
      op(ans,['初始年和年份差都要同步前推','仍按04到09五年','只改初始量不改年份差','直接跳过']),
      '初始年变了，跨度也随之变。',
      '若用03年作初始，则跨度应按03到09计算，年份差同步增加。'
    );
  });

  const q5=Q('growth_chase','哪年超过',['技巧'],()=>{
    const gap=n(45,90), fast=n(55,90), slow=n(15,45);
    const years=Math.ceil(gap/(fast-slow));
    const ans=`约 ${years} 年`;
    return R(
      `两者初始差距 ${gap}，快者每年增加 ${fast}，慢者每年增加 ${slow}。大约几年追上？`,
      ans,
      op(ans,[`约 ${Math.max(1,years-1)} 年`,`约 ${years+1} 年`,`约 ${years+2} 年`]),
      '追及时间=差距÷每年追赶量，结果向上取整。',
      `每年追赶 ${fast}-${slow}=${fast-slow}，${gap}÷${fast-slow}≈${r1(gap/(fast-slow))}，所以约 ${years} 年。`
    );
  });

  const q6=Q('growth_amount','增长量公式',['技巧'],()=>{
    const now=n(5000,9000), rate=n(5,18);
    const ans=`${now}×${rate}%/(1+${rate}%)`;
    return R(
      `现期量 ${now}，增长率 ${rate}%。增长量应列为？`,
      ans,
      op(ans,[`${now}×${rate}%`,`${now}/(1+${rate}%)`,`${now}×(1+${rate}%)`]),
      '增长量=现期量-基期量，也可写成现期量×r/(1+r)。',
      `增长量=${ans}。若选项很近，可用代入或反代检查。`
    );
  });

  add(C('growth_card','增长问题｜隔年年均追及',['基础'],[q1,q2,q3,q4,q5,q6],'all'));
})();
