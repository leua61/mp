(function(){
  const {n,op,R,Q,C,add}=EX;
  const q1=Q('mix_var_rate_position','混合率位置',['技巧'],()=>{
    const r1=n(5,12), r2=n(16,25); const ans=`${r1}%到${r2}%之间`;
    return R(`部分1增长率 ${r1}%，部分2增长率 ${r2}%，整体混合增长率应在哪里？`,ans,op(ans,[`小于${r1}%`,`大于${r2}%`,`等于${r1+r2}%`]),'整体增长率被部分增长率夹住。',`混合增长率必在 ${r1}% 与 ${r2}% 之间。`);
  });
  const q2=Q('mix_var_weight_close','靠近量大者',['技巧'],()=>{
    const small=n(200,400), large=n(700,1200); const rSmall=n(5,9), rLarge=n(15,22);
    return R(`甲现期 ${small}、增长 ${rSmall}%；乙现期 ${large}、增长 ${rLarge}%。混合增长率更靠近谁？`,'乙',op('乙',['甲','二者正中间','无法判断']),'量大权重大。',`乙的量 ${large} 明显大于甲 ${small}，所以混合增长率更靠近乙的 ${rLarge}%。`);
  });
  const q3=Q('mix_var_base_sum','基期和',['技巧'],()=>{
    const A=n(3000,6000), B=n(4000,8000); const ans='先算现期和，再除以 1+混合增长率';
    return R(`${A}/(1+r1)+${B}/(1+r2) 应怎样快速处理？`,ans,op(ans,['分别精算两个分数','先算现期和，再除以 1+混合增长率','把 r1 和 r2 直接相加','只算较大的分数']),'这是两个部分的基期和。',`先算 ${A}+${B}，再估 ${A}、${B} 的混合增长率，最后除以 1+r。`);
  });
  const q4=Q('mix_var_base_diff','基期差',['技巧'],()=>{
    const A=n(7000,9500), B=n(2500,5200); const diff=A-B;
    return R(`${A}/(1+r1)−${B}/(1+r2) 的第一步现期差是多少？`,String(diff),op(String(diff),[String(A+B),String(B-A),String(Math.round(A/B))]),'基期差先算现期差。',`${A}-${B}=${diff}。后续再估差额部分增长率。`);
  });
  const q5=Q('mix_var_surplus','顺差现期',['技巧'],()=>{
    const exp=n(50,90), imp=n(20,45); const ans=String(exp-imp);
    return R(`出口 ${exp}，进口 ${imp}，现期顺差是多少？`,ans,op(ans,[String(exp+imp),String(imp-exp),String(exp)]),'顺差=出口−进口。',`${exp}-${imp}=${ans}。若题目问基期顺差，这只是第一步。`);
  });
  const q6=Q('mix_var_current_trap','现期陷阱',['技巧'],()=>{
    const cur=n(20,60); const positive=n(1,1)===1; const ans=positive?'小于现期值':'大于现期值';
    return R(`某量现期为 ${cur}，其增长率为正。若问基期值，应与 ${cur} 比较怎样？`,ans,op(ans,['大于现期值','小于现期值','等于现期值','无法判断']),'增长率为正，现期比基期大。',`基期=现期÷(1+r)，r>0 时分母大于 1，所以基期小于现期。`);
  });
  const q7=Q('mix_var_pos_neg','一正一负边界',['技巧'],()=>{
    const r1=n(4,12), r2=-n(2,8);
    return R(`两个部分增长率分别为 +${r1}% 和 ${r2}%。此时快速口算混合应如何处理？`,'不机械套，先改用稳妥判断',op('不机械套，先改用稳妥判断',['直接取平均','一定等于正数','一定等于负数']),'一正一负是边界。','课程提醒一正一负时混合口算不标准，应结合量、公式或方向稳妥判断。');
  });

  const q8=Q('mix_var_distance_split','份数切分口算',['技巧'],()=>{
    const left=n(2,5), right=n(3,7);
    const r1=n(8,13), diff=n(30,70)/10, r2=Number((r1+diff).toFixed(1));
    const mixed=Number(((left*r1+right*r2)/(left+right)).toFixed(1));
    const ans=`约${mixed.toFixed(1)}%`;
    return R(`甲乙现期量之比约为 ${left}:${right}，增长率分别为 ${r1}% 和 ${r2.toFixed(1)}%。混合增长率约为？`,ans,op(ans,[`约${((r1+r2)/2).toFixed(1)}%`,`约${r1.toFixed(1)}%`,`约${r2.toFixed(1)}%`]),'按量的权重口算，量大的增长率影响更大。',`混合率≈(${left}×${r1}+${right}×${r2.toFixed(1)})÷${left+right}≈${mixed.toFixed(1)}%，也就是把两端距离按总份数 ${left+right} 切分。`);
  });
  const routeA=C('mix_var_route_a','混合率｜顺序',['技巧'],[q1,q2,q8],'sequence');
  const routeB=C('mix_var_route_b','基期和差｜顺序',['技巧'],[q3,q4],'sequence');
  const routeC=C('mix_var_route_c','顺逆差｜顺序',['技巧'],[q5,q6,q7],'sequence');
  const familyA=C('mix_var_family_core','结构计算',['技巧'],[routeA,routeB],'all');
  add(C('mixed_variable_card','混合原理｜变量训练',['技巧'],[familyA,routeC],'all'));
})();
