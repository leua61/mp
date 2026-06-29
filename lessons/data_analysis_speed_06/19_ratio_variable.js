(function(){
  const {n,op,R,Q,C,add}=EX;
  const q1=Q('ratio_var_direct','现期比重',['技巧'],()=>{
    const total=n(500,1200); const p=n(20,80); const part=Math.round(total*p/100); const ans=`约${p}%`;
    return R(`某部分量 ${part}，整体量约 ${total}，比重大约是多少？`,ans,op(ans,[`约${Math.max(1,p-10)}%`,`约${Math.min(99,p+10)}%`,`约${Math.round(part/10)}%`]),'部分÷整体。',`${part}÷${total}≈${p}%，所以比重约 ${p}%。`);
  });
  const q2=Q('ratio_var_compare','比重比大小',['技巧'],()=>{
    const totalA=n(600,1100), totalB=n(500,1000);
    const pA=n(62,82), pB=n(35,58);
    const a=Math.round(totalA*pA/100), b=Math.round(totalB*pB/100);
    const ans='甲';
    return R(`甲：部分 ${a}、整体 ${totalA}；乙：部分 ${b}、整体 ${totalB}。谁比重更大？`,ans,op(ans,['甲','乙','一样大','无法判断']),'比重是部分÷整体，不是只看部分大小。',`甲比重约 ${pA}%，乙比重约 ${pB}%，所以甲更大。`);
  });
  const q3=Q('ratio_var_pp_days','百分点转天数',['技巧'],()=>{
    const days=n(28,31); const p=(n(25,70)/10).toFixed(1); const ans=(days*Number(p)/100).toFixed(1);
    return R(`某类天数占比高 ${p} 个百分点，月份共有 ${days} 天，实际多约多少天？`,`${ans}天`,op(`${ans}天`,[`${p}天`,`${(days+Number(p)).toFixed(1)}天`,`${(Number(p)/days).toFixed(1)}天`]),'百分点差要乘整体天数。',`${days}×${p}%≈${ans}，所以约多 ${ans} 天。`);
  });
  const q4=Q('ratio_var_part_total','部分比重求整体',['技巧'],()=>{
    const p=n(15,40); const total=n(80,200); const part=Math.round(total*p/100); const ans=String(Math.round(part/(p/100)));
    return R(`某部分量 ${part}，占整体 ${p}%，整体量约是多少？`,ans,op(ans,[String(part*p),String(Math.round(part*p/100)),String(part+p)]),'整体=部分÷比重。',`${part}÷${p}%≈${ans}。`);
  });
  const q5=Q('ratio_var_complement','补集比重',['技巧'],()=>{
    const p=n(10,40); const ans=`${100-p}%`;
    return R(`网民占总人数 ${p}%，非网民占比是多少？`,ans,op(ans,[`${p}%`,`${100+p}%`,`-${p}%`]),'补集比重=1−原比重。',`非网民占比=100%-${p}%=${ans}。`);
  });
  const q6=Q('ratio_var_unit_trap','单位陷阱',['运用'],()=>{
    const money1=n(100,500), money2=n(200,700), pieces=n(1000,3000); const ans=String(money1+money2);
    return R(`表格中：现金捐款 ${money1} 万元、社会组织捐款 ${money2} 万元、物资 ${pieces} 件。总捐赠款应为？`,`${ans} 万元`,op(`${ans} 万元`,[`${money1+money2+pieces} 万元`,`${pieces} 件`,`${money2+pieces} 万元`]),'款是金额，件数不能加。',`总捐赠款只加金额：${money1}+${money2}=${ans} 万元。物资件数不是款。`);
  });
  const q7=Q('ratio_var_factor_warning','因子特征警惕',['运用'],()=>R(
    '资料分析选项是约数时，看到某个选项有“7 的倍数”特征，能否只凭因子特征秒选？',
    '不能',
    op('不能',['能','只要题干没写约就能','必须选最大倍数']),
    '资料分析选项常是四舍五入。',
    '因子特征要求精确值；资料分析多数答案是估算或近似，不能只凭整除特征。'
  ));
  const routeA=C('ratio_var_route_a','直接比重｜顺序',['技巧'],[q1,q2],'sequence');
  const routeB=C('ratio_var_route_b','比重变形｜顺序',['技巧'],[q3,q4,q5],'sequence');
  const routeC=C('ratio_var_route_c','表格陷阱｜顺序',['运用'],[q6,q7],'sequence');
  const familyA=C('ratio_var_family_calc','计算变形',['技巧'],[routeA,routeB],'all');
  add(C('ratio_variable_card','比重基础｜变量训练',['技巧'],[familyA,routeC],'all'));
})();
