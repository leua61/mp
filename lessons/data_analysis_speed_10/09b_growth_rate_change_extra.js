(function(){
  const {n,op,R,Q,C,add}=EX;

  const rateChange=C('growth_rate_change_route','增长率变化变量训练',['技巧'],[
    Q('growth_rate_change_two_rates','两年增长率作差',['技巧'],()=>{
      const base0=10000*n(3,8); // 2013
      const r0=n(4,9);
      const delta=EX.pk([-3,-2,-1,1,2,3]);
      const r1=r0+delta;
      const base1=base0*(100+r0)/100; // 2014
      const cur=base1*(100+r1)/100; // 2015
      const word=delta>0?'提高':'下降';
      const ans=`${word} ${Math.abs(delta)} 个百分点`;
      return R(
        `某指标 2013 年为 ${base0}，2014 年为 ${base1}，2015 年为 ${cur}。2015 年同比增长率较 2014 年约怎样变化？`, ans,
        op(ans,[`${delta>0?'下降':'提高'} ${Math.abs(delta)} 个百分点`,`${word} ${Math.abs(delta)+1} 个百分点`,`${word} ${Math.max(1,Math.abs(delta)-1)} 个百分点`]),
        '先分别求 2015 相对 2014、2014 相对 2013 的增长率，再做百分点差。',
        `2014 年增长率为 ${r0}%，2015 年增长率为 ${r1}%，两者相差 ${Math.abs(delta)} 个百分点，所以为${ans}。`
      );
    }),
    Q('growth_rate_change_compare_first','先判方向再算差',['技巧'],()=>{
      const base0=10000*n(3,7), r0=n(5,10), delta=EX.pk([-2,-1,1,2]);
      const r1=r0+delta, base1=base0*(100+r0)/100, cur=base1*(100+r1)/100;
      const ans=delta>0?'先判为提高，再估百分点差':'先判为下降，再估百分点差';
      return R(
        `三年数据为 ${base0}、${base1}、${cur}。问最后一年增长率较上一年如何变化，第一步最节能的判断是什么？`, ans,
        [ans, delta>0?'先判为下降，再估百分点差':'先判为提高，再估百分点差','直接把三个数相加','只看最后一年现期量'],
        '增长率大小可先比较现期÷基期。',
        `最后一年增长率为 ${r1}%，上一年为 ${r0}%，所以先判${delta>0?'提高':'下降'}，再算差 ${Math.abs(delta)} 个百分点。`
      );
    }),
    Q('growth_rate_change_not_rate_times','百分点差不是增长率乘法',['基础'],()=>R(
      '两个增长率分别约为 10% 和 7%。问“增长率提高了多少个百分点”，应该怎样处理？','10%-7%=3个百分点',
      ['10%-7%=3个百分点','10%×7%','10%÷7%','把 3% 再乘基期'],
      '百分点差是两个百分数直接相减。',
      '“增长率较上年提高/下降多少个百分点”不是求增长量，而是两个增长率直接相减。'
    )),
    Q('growth_rate_change_error_return','增长率差的误差回补',['运用'],()=>R(
      '用划线法比较两个增长率，估出差约 4 个百分点，但过程中把 4/7 当成 57.1%、又把分母简化。选项很近时下一步应做什么？','回补估算误差',
      ['回补估算误差','直接选 4 个百分点','放弃这题','只看选项字母'],
      '原课强调不要忘掉自己的误差。',
      '增长率差题中，两个比值都经过近似时，选项很近必须判断近似让结果偏大还是偏小，再决定答案。'
    ))
  ],'sequence');

  add(C('growth_rate_change_extra','增长率变化补全｜两年增速差',['技巧'],[rateChange],'all'));
})();
