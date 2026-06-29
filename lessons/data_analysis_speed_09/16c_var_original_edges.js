(function(){
  const {R,Q,C,add,op,n,pk,r1}=EX;

  const m1=Q('var_mix_cumulative_identity','累计当月身份变量',['基础'],()=>{
    const end=n(3,12), part=pk(['当月','其中一类','其中一地区']);
    const ans='累计/合计是混合，单个部分是部分值';
    return R(
      `题干同时给“1-${end}月累计增长率”和“${part}增长率”。谁更可能是混合值？`,
      ans,
      op(ans,['累计/合计是混合，单个部分是部分值','单个部分是混合，累计是部分','二者都不是混合','只能看数值大小']),
      '混合身份由包含关系决定，不由增长率大小决定。',
      `累计或合计包含多个部分，所以是混合；${part}只是其中一部分。`
    );
  });

  const m2=Q('var_mix_distance_ratio','距离与量比变量',['技巧'],()=>{
    const d=n(1,4), big=n(3,8);
    const ans='量越大，混合值离它越近';
    return R(
      `A 的量约为 B 的 ${big} 倍。混合增长率到 A、B 两端的距离通常有什么关系？`,
      ans,
      op(ans,['量越大，混合值离它越近','量越大，混合值离它越远','混合值一定在正中间','距离只看增长率大小']),
      '偏向量大者，可以转化为距离判断。',
      `A 权重大，混合值被 A 拉近；若选项还不能排除，再估量比判断距离。`
    );
  });

  const r1q=Q('var_reverse_candidate','增长量反代变量',['技巧'],()=>{
    const now=n(28000,39000), rate=n(6,12), cand=Math.round(now*rate/(100+rate)/100)*100;
    const ans=`用 ${now}-${cand} 作基期检查`;
    return R(
      `现期量 ${now}，增长率 ${rate}%，候选增长量 ${cand}。反代时先做什么？`,
      ans,
      op(ans,[`用 ${now}-${cand} 作基期检查`,`用 ${now}+${cand} 作现期检查`,`直接把 ${cand} 除以 ${now}`,'只看候选末位']),
      '候选增长量正确，则现期-增长量≈基期。',
      `先算基期≈${now}-${cand}，再看这个基期乘 ${rate}% 是否接近 ${cand}。`
    );
  });

  const r2q=Q('var_reverse_option_choose','反代选项变量',['技巧'],()=>{
    const now=n(30000,38000), rate=n(7,11);
    const exact=now*rate/(100+rate);
    const ans=String(Math.round(exact/100)*100);
    return R(
      `现期量 ${now}，增长率 ${rate}%。下列哪个增长量候选最适合通过反代验证为答案？`,
      ans,
      op(ans,[String(Math.round(exact/100)*100+400),String(Math.max(100,Math.round(exact/100)*100-500)),String(Math.round(now*rate/100/100)*100)]),
      '正确增长量约为现期量×r/(1+r)，再用反代法验证。',
      `粗估增长量≈${r1(exact)}，最接近的是 ${ans}。若反代，${now}-${ans} 再乘 ${rate}% 应接近 ${ans}。`
    );
  });

  const b1=Q('var_base_diff_current_trap','基期差陷阱变量',['运用'],()=>{
    const a=n(2600,4300), b=a-n(300,900), ra=n(20,36), rb=ra-n(1,6);
    const ans='不能直接选现期差，要先分别回基期';
    return R(
      `现期甲 ${a}、乙 ${b}，题目问基期甲比乙多多少。若选项有 ${a-b}，应如何看？`,
      ans,
      op(ans,['不能直接选现期差，要先分别回基期','直接选现期差','只看甲的增长率','只看乙的增长率']),
      '基期差不是现期差。',
      `${a-b} 是现期差。基期差应列为 ${a}/(1+${ra}%)-${b}/(1+${rb}%)。`
    );
  });

  const b2=Q('var_base_diff_boundary','等价增长边界变量',['运用'],()=>{
    const neg=pk([-4,-6,-80,-120]);
    const ans=(Math.abs(neg)<=10)?'可勉强用混合近似':'不要硬用混合近似';
    return R(
      `两个分数做差转混合后，估出的等价增长率约为 ${neg}%。策略应是？`,
      ans,
      op(ans,['可勉强用混合近似','不要硬用混合近似','一定直接选现期差','把负号去掉再算']),
      '小负数和极端负数不是一回事。',
      `${neg}% ${Math.abs(neg)<=10?'属于小负数范围，若选项不近可勉强近似':'已经很极端，说明混合失真，应改用分别估算、直除或拆分'}。`
    );
  });

  const routeA=C('route_var_mix_identity','混合身份',['基础'],[m1,m2],'sequence');
  const routeB=C('route_var_reverse_growth','增长量反代',['技巧'],[r1q,r2q],'sequence');
  const routeC=C('route_var_base_diff','基期差陷阱',['技巧'],[b1,b2],'sequence');
  add(C('var_original_edges_card','变量训练｜原文边界补强',['运用'],[routeA,routeB,routeC],'all'));
})();
