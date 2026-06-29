
(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const t1=Q('ns_tail_digit','尾数锁定',['技巧'],()=>{
    const a=n(10,60), d=pk([12,22,32]);
    const arr=[a,a+d,a+2*d,a+3*d];
    const ans=String(a+4*d);
    const tail=ans.slice(-1);
    return R(
      `${arr.join('，')}，？。若已判断下一步应加 ${d}，答案尾数应为？`,
      tail,
      op(tail,[String((Number(tail)+1)%10),String((Number(tail)+3)%10),String((Number(tail)+5)%10)]),
      '数字推理算出大致规律后，可用尾数快速锁选项。',
      `下一项=${arr[3]}+${d}=${ans}，尾数为 ${tail}。`
    );
  });

  const t2=Q('ns_construct_network','构造网络',['基础'],()=>R(
    '一级做差后差值本身没有明显规律，课程提示还要看什么？',
    '差值与原数列能否构造关系',
    op('差值与原数列能否构造关系',['出口额是否大于进口额','比重是否降低三个百分点','是否属于资料分析']),
    '不要只盯着差值序列本身。',
    '原课路线是：做差无规律后，看差值和原数列有没有网络关系；还不行再考虑二级差或特殊考点。'
  ));

  const t3=Q('ns_descending_diff','单调递减也和差',['技巧'],()=>{
    const last=n(10,50), d=n(3,12);
    const arr=[last+4*d,last+3*d,last+2*d,last+d,last];
    const ans=String(last-d);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(last+d),String(last-2*d),String(last*d)]),
      '单调递减且三倍以内，也可做差看规律。',
      `每次减少 ${d}，所以下一项是 ${last}-${d}=${ans}。`
    );
  });

  const t4=Q('ns_nonmonotone_not_diff_first','非单调别机械做差',['运用'],()=>R(
    '1，2，2，4，8，？ 这种不严格单调的数列，为什么不应机械先做差？',
    '整体有更明显的前两项相乘得后一项',
    op('整体有更明显的前两项相乘得后一项',['因为所有数都超过三倍','因为只能用拆分','因为必须通分']),
    '和差分析的优先入口是单调三倍以内。',
    '这里 1×2=2，2×2=4，2×4=8，所以下一项 4×8=32，比硬做差更稳。'
  ));

  const p1=Q('ns_pair_difference_route','两两分组做差',['技巧'],()=>{
    const starts=[n(20,40),n(20,40),n(20,40),n(20,40)];
    const diffs=[1,3,5,7];
    const arr=[];
    for(let i=0;i<3;i++){arr.push(starts[i]);arr.push(starts[i]+diffs[i]);}
    arr.push(starts[3]);
    const ans=String(starts[3]+diffs[3]);
    return R(
      `${arr.join('，')}，？。按两两独立分组做差，？为多少？`,
      ans,
      op(ans,[String(starts[3]+diffs[2]),String(starts[3]-diffs[3]),String(starts[3]+diffs[3]+2)]),
      '两两分组不只看和，也常看差。',
      `每组差为 1、3、5、7，最后一组已有 ${starts[3]}，所以答案 ${starts[3]}+7=${ans}。`
    );
  });

  const p2=Q('ns_power_anchor_choice','次方锚点选择',['基础'],()=>R(
    '64 既可看成 8² 又可看成 4³。遇到多种拆法时，课程建议先找什么项做锚点？',
    '拆法更唯一、更简单的项',
    op('拆法更唯一、更简单的项',['最大项','最小项','选项里的第一个数']),
    '锚点稳定，规律才不容易跑偏。',
    '原课用 9 只能稳定看成 3² 这一类简单锚点，再反推其他项该怎么拆。'
  ));

  const f1=Q('ns_fraction_packaging','分数包装化简',['技巧'],()=>R(
    '6/6，4/6，3/6，2/5，？ 这类分数题第一步为什么要化简？',
    '去掉包装，露出分子分母规律',
    op('去掉包装，露出分子分母规律',['让所有分数变成整数','直接按小数做','判断顺差逆差']),
    '分数数列常把简单规律包装起来。',
    '6/6=1，4/6=2/3，3/6=1/2；化简后更容易看成 2/2、2/3、2/4、2/5。'
  ));

  const f2=Q('ns_no_province_wall','省份规律迁移',['驿站'],()=>R(
    '老师强调不要迷信“某省只考某省规律”，更合理的训练态度是什么？',
    '把见过的规律迁移到各类考试',
    ['把见过的规律迁移到各类考试','只练本省原题答案','完全不看外省题','每省都背一套互不相干公式'],
    '这是学习策略驿站，不是计算题。',
    '原课说题库会互相借鉴，见过的规律要能迁移；不要把规律人为限制在某个省份。'
  ));

  const f3=Q('ns_loose_pattern_emergency','不严密规律应急',['运用'],()=>R(
    '数字推理中两组关系推第三组不够严密，但所有常规方法都卡住且选项有对应答案时，考场上可以怎样处理？',
    '可作为应急选择，但复盘时要标记不严密',
    op('可作为应急选择，但复盘时要标记不严密',['永远不能选','以后所有题都这样凑','必须花十分钟证明']),
    '速度与严密性要平衡。',
    '原课多次说：三组推第四组更严密；但考场上若没有更好路线，有选项时可以先走，不要无限恋战。'
  ));

  const route=C('ns_original_route_edges','路线边界',['运用'],[t1,t2,t3,t4],'all');
  const methods=C('ns_original_method_edges','方法细节',['技巧'],[p1,p2,f1],'all');
  const strategy=C('ns_original_strategy_edges','迁移与应急',['运用'],[f2,f3],'all');
  add(C('ns_original_edges_card','路线边界｜迁移与应急',['运用'],[route,methods,strategy],'all'));
})();
