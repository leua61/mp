(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const q1=Q('ns_interval_direction_detail','间隔分组看方向',['技巧'],()=>{
    const start=n(20,40), step=pk([1,2,3]);
    const evenStart=n(30,60), evenStep=pk([1,2,3]);
    const a1=start, a3=start-step, a5=start-2*step, ans=start-3*step;
    return R(
      `数列奇数项为 ${a1}, ${a3}, ${a5}, ?；偶数项另成一组。奇数项下一项是多少？`,
      String(ans),
      op(String(ans),[String(a5+step),String(a5),String(evenStart+evenStep)]),
      '间隔分组后还要看方向，是递增还是递减。',
      `奇数项每次减少 ${step}，所以 ${a5}-${step}=${ans}。不能只看“忽大忽小”而忽略方向。`
    );
  });

  const q2=Q('ns_interval_operations_variety','间隔不只做差',['基础'],()=>R(
    '原课说“间隔看”包含哪些可能操作？',
    '做差、做和、做乘积、做除法都可能，但更多是做差',
    op('做差、做和、做乘积、做除法都可能，但更多是做差',['只能做差','只能做乘法','只能看尾数']),
    '间隔是一种分组视角，不限定唯一运算。',
    '先分奇偶或隔项，再在组内尝试最简单稳定的加减乘除关系。'
  ));

  const q3=Q('ns_group_operation_not_single','分组运算不单一',['技巧'],()=>{
    const a=n(2,8), b=n(2,8), c=a+b, d=a*b;
    const mode=pk(['和','积']);
    const ans=mode==='和'?c:d;
    return R(
      `两两分组内部可以看不同运算。若一组是 (${a}, ${b})，题目当前规律要求看“${mode}”，本组结果是多少？`,
      String(ans),
      op(String(ans),[String(Math.abs(a-b)),String(c+d),String(Math.max(a,b))]),
      '两两/三三分组后，组内可做加减乘除，不只一种。',
      `${mode==='和'?`${a}+${b}=${c}`:`${a}×${b}=${d}`}。分组只是把项捆成整体，内部运算再看规律。`
    );
  });

  const q4=Q('ns_matrix_constant_correction','矩阵常数修正',['技巧'],()=>{
    const a=n(1,5), b=n(2,6), k1=n(-2,2); const c=a*b+k1;
    const d=n(2,6), e=n(2,7), k2=k1+1; const f=d*e+k2;
    const g=n(2,7), h=n(2,7), k3=k2+1; const ans=g*h+k3;
    return R(
      `矩阵每行前两数推出第三数：${a},${b}→${c}；${d},${e}→${f}。若修正常数依次为 ${k1}, ${k2}, ${k3}，则 ${g},${h}→？`,
      String(ans),
      op(String(ans),[String(g+h+k3),String(g*h+k2),String(g*h-k3)]),
      '行内关系可能是乘法再加一个按规律变化的常数。',
      `本行按 ${g}×${h}+${k3}=${ans}。原课矩阵题中就用过“相乘再加修正数”的思路。`
    );
  });

  const q5=Q('ns_decimal_no_common_denominator','小数没有通分',['基础'],()=>R(
    '分数数列可能通分做差；小数数列对应的注意点是什么？',
    '小数没有通分，主要看整数部分和小数部分',
    op('小数没有通分，主要看整数部分和小数部分',['所有小数都先通分','小数只能转百分数','小数不能拆分']),
    '小数点像分数线，但小数没有“分母通分”这一步。',
    '小数数列主要两路：整数/小数部分分别成规律；或前一项两部分四则运算推出后一项。'
  ));

  const q6=Q('ns_true_questions_fluency_station','驿站｜熟练度与真题',['驿站'],()=>R(
    '结课后数字推理/数量相关训练，老师强调的方向是什么？',
    '继续刷真题，提高口诀路线熟练度，有问题复盘交流',
    ['继续刷真题，提高口诀路线熟练度，有问题复盘交流','只背本节课选项','只看省份名称','完全不复盘'],
    '这是训练节奏，不是计算规则。',
    '原文强调数字推理内容就是这些口诀，后期关键是熟练度；数量关系尽量多刷真题，有问题讨论复盘。'
  ));

  const route=C('ns_round3_route_edges','分组与方向',['技巧'],[q1,q2,q3],'all');
  const special=C('ns_round3_special_edges','矩阵小数细节',['技巧'],[q4,q5],'all');
  const station=C('ns_round3_training_station','驿站',['驿站'],[q6],'all');
  add(C('ns_round3_audit_card','口诀细节｜矩阵小数与分组',['运用'],[route,special,station],'all'));
})();
