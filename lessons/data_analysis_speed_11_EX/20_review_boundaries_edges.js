(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const q1=Q('ns_three_times_equal_boundary','三倍及以上边界',['基础'],()=>R(
    '数字推理里，多个相邻项达到“三倍及以上”时，路线通常怎么选？',
    '优先考虑倍数或次方，而不是机械做差',
    op('优先考虑倍数或次方，而不是机械做差',['一定先间隔分组','一定先数字拆分','直接放弃'] ),
    '原课把“个别超三倍”和“多个三倍及以上”分开。',
    '如果只是个别超三倍，仍可和差；如果多处达到三倍及以上，倍数/次方优先级上升。'
  ));

  const q2=Q('ns_diff_geometric_down','差值等比递减',['技巧'],()=>{
    const start=n(80,160); const d1=pk([32,48,64]);
    const arr=[start,start+d1,start+d1+d1/2,start+d1+d1/2+d1/4].map(x=>Math.round(x));
    const ans=String(Math.round(arr[3]+d1/8));
    return R(
      `${arr.join('，')}，？。做差后差值依次约为 ${d1}, ${d1/2}, ${d1/4}，下一项是？`,
      ans,
      op(ans,[String(arr[3]+d1/4),String(arr[3]+d1/2),String(arr[3]-d1/8)]),
      '和差分析不只看等差，也可能差值等比。',
      `差值每次减半，下一差值 ${d1/8}，所以答案 ${arr[3]}+${d1/8}≈${ans}。`
    );
  });

  const q3=Q('ns_group_reduce_terms_reason','分组压缩项数',['基础'],()=>R(
    '七项及以上为什么常考虑分组？',
    '把很多项捆成较少整体，降低观察复杂度',
    op('把很多项捆成较少整体，降低观察复杂度',['因为七项以上不能做差','因为分组一定比做差简单','因为所有长数列都是两两乘法']),
    '分组不是装饰，是降维。',
    '原课说两两分组后，本来很多项会变成几组整体，类似把对象捆绑起来再看组内规律。'
  ));

  const q4=Q('ns_matrix_switch_row_column','矩阵行列切换',['技巧'],()=>R(
    '方框/矩阵题如果按行看不出稳定关系，下一步应怎样？',
    '再按列看，仍是加减乘除或前三推后一的关系',
    op('再按列看，仍是加减乘除或前三推后一的关系',['立即判定无规律','只看最大数','只做尾数法']),
    '矩阵只是排列形式变化，本质仍是找行列关系。',
    '原课强调先从数据少的一边看；行不行，再列一列看，仍围绕加减乘除和修正常数。'
  ));

  const q5=Q('ns_square_power_nearby','次方附近数',['技巧'],()=>{
    const k=n(3,7); const mode=pk(['+1','-1']);
    const ans=mode==='+1'?k*k+1:k*k-1;
    return R(
      `某项靠近平方数 ${k}²=${k*k}，若本列规律是“平方数${mode}”，该项应为多少？`,
      String(ans),
      op(String(ans),[String(k*k),String((k+1)*(k+1)),String(k*k+(mode==='+1'?2:-2))]),
      '次方题不一定刚好是次方，也常是次方数附近。',
      `${k}²${mode}=${ans}。原课中 28、65 这类数就是靠近 27、64 的次方附近数。`
    );
  });

  const q6=Q('ns_fraction_answer_simplify','分数答案化简',['技巧'],()=>{
    const d=pk([6,8,10,12]); const num=d/2;
    return R(
      `按分子分母规律得到下一项为 ${num}/${d}。选项中可能写成什么？`,
      '1/2',
      op('1/2',[`${num}/${d}`,'2/1','无法化简']),
      '分数数列先拆包装，答案也常要化成最简形式匹配选项。',
      `${num}/${d} 化简为 1/2。原课分数题先把 6/6、4/6 等包装拆掉，本质也是这个意识。`
    );
  });

  const q7=Q('ns_review_resources_station','驿站｜复习资源',['驿站'],()=>R(
    '数字推理结课后，最重要的复盘方式是什么？',
    '按口诀路线刷真题，错题复盘，必要时回看录屏和笔记',
    ['按口诀路线刷真题，错题复盘，必要时回看录屏和笔记','只背广东题答案','只看题目年份','不再复习'],
    '这是训练保障。',
    '原文最后强调数字推理内容就是这些口诀，关键是熟练度；真题、笔记、录屏和问题交流都服务于复盘。'
  ));

  const route=C('ns_exhaustive_route_edges','口诀边界',['技巧'],[q1,q2,q3],'all');
  const special=C('ns_exhaustive_special_edges','特殊细节',['技巧'],[q4,q5,q6],'all');
  const station=C('ns_exhaustive_station','驿站',['驿站'],[q7],'all');
  add(C('ns_exhaustive_audit_card','口诀边界｜特殊细节与复盘',['运用'],[route,special,station],'all'));
})();
