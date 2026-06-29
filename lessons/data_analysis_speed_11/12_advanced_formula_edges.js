(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const l1=Q('da_line_awareness','划线意识',['技巧'],()=>R(
    '资料分析里“划线法/划线意识”的本质是什么？',
    '用接近关系和误差范围快速锁定量级',
    op('用接近关系和误差范围快速锁定量级',['把所有数精确相除','只看最大数字','把百分号全部去掉']),
    '课程强调：学了划线，不一定真的要划线，而是形成“略大、略小、误差不大”的意识。',
    '当 744 与 781 很接近时，744/781 略小于 1；再乘一个总量，结果也只是略小，不会小到差几个数量级。'
  ));

  const l2=Q('da_line_drill','接近比例',['技巧'],()=>{
    const total=pk([420,526,680,840]);
    const denom=n(720,960);
    const num=denom-n(20,70);
    const exact=Math.round(total*num/denom);
    const ans=`略小于 ${total}`;
    return R(
      `某比例为 ${num}/${denom}，要求 ${total}×${num}/${denom}。不精算时最合理的判断是？`,
      ans,
      op(ans,[`远大于 ${total*2}`,`约为 ${Math.round(total/2)}`,`接近 0`]),
      '分子比分母小一点，所以比例略小于 1。',
      `${num}/${denom} 略小于 1，所以结果约为 ${exact}，应判断为略小于 ${total}。`
    );
  });

  const y1=Q('da_two_year_rate','隔年增长率',['技巧'],()=>{
    const r1=pk([-20,-15,-10,8,12]);
    const r2=pk([-12,-8,10,15]);
    const val=(r1+r2+r1*r2/100).toFixed(1).replace('.0','');
    const ans=`约 ${val}%`;
    return R(
      `某指标第一年增长率 ${r1}%，第二年增长率 ${r2}%。隔年增长率约为？`,
      ans,
      op(ans,[`约 ${r1+r2}%`,`约 ${r1*r2}%`,`约 ${r1-r2}%`]),
      '隔年增长率不能只简单相加，还要加乘积项。',
      `隔年增长率=${r1}%+${r2}%+${r1}%×${r2}%≈${val}%。`
    );
  });

  const y2=Q('da_two_year_base','连续倒推',['技巧'],()=>{
    const base=n(80,180)*10;
    const r1=pk([10,12,20]);
    const r2=pk([5,8,10]);
    const now=Math.round(base*(1+r1/100)*(1+r2/100));
    const ans=`约 ${base}`;
    return R(
      `2014 年为未知，2015 年增长 ${r1}%，2016 年又增长 ${r2}%，2016 年现期约 ${now}。2014 年约为？`,
      ans,
      op(ans,[`约 ${now}`,`约 ${Math.round(now/(1+r2/100))}`,`约 ${Math.round(now*(1+r1/100))}`]),
      '隔年基期也可以连续除两次。',
      `${now}÷(1+${r2}%)÷(1+${r1}%)≈${base}。`
    );
  });

  const b1=Q('da_base_share_general','基期比重通式',['技巧'],()=>{
    const cur=n(20,70);
    const part=pk([8,12,15,20]);
    const whole=pk([3,5,10]);
    const v=Math.round(cur*(100+whole)/(100+part));
    const ans=`约 ${v}%`;
    return R(
      `现期比重 ${cur}%，部分增长率 ${part}%，整体增长率 ${whole}%。基期比重约为？`,
      ans,
      op(ans,[`${cur}%`,`约 ${Math.round(cur*(100+part)/(100+whole))}%`,`约 ${cur+part-whole}%`]),
      '基期比重不是直接加减增长率。',
      `基期比重=现期比重×(1+整体增长率)/(1+部分增长率)≈${v}%。`
    );
  });

  const b2=Q('da_avg_rate_general','平均数增长率',['技巧'],()=>{
    const totalR=n(8,20);
    const countR=n(1,totalR-2);
    const v=Math.round((totalR-countR)/(100+countR)*10000)/100;
    const ans=`约 ${v}%`;
    return R(
      `总量增长 ${totalR}%，份数增长 ${countR}%。若题目问平均数增长率，约为？`,
      ans,
      op(ans,[`${totalR-countR}%`,`${totalR}%`,`${countR}%`]),
      '升降只看大小；若问具体增长率，要除以 1+份数增长率。',
      `平均数增长率=(${totalR}%-${countR}%)/(1+${countR}%)≈${v}%。`
    );
  });

  const e1=Q('da_month_stable','累计不等于月度',['运用'],()=>R(
    '材料只说“1—12 月累计增速与 1—11 月持平”，能否推出每个月增速都平稳？',
    '不能',
    op('不能',['能','只能推出 12 月最快','只能推出 1 月最快']),
    '累计增速是混合结果，不等于每个月都一样。',
    '课程强调：“月增速平稳”指每个月增长率差不多；累计区间持平只能说明整体混合结果持平，不能推出每个月平稳。'
  ));

  const e2=Q('da_main_force','主力影响判断',['运用'],()=>{
    const east=n(12,20)*10000;
    const mid=n(3,8)*10000;
    const eastR=n(5,9);
    const midR=n(1,6);
    return R(
      `东部基数 ${east}，增速 ${eastR}%；中部基数 ${mid}，增速 ${midR}%。判断总增长主力更可能是谁？`,
      '东部',
      op('东部',['中部','无法比较','一定是增速低者']),
      '主力影响看“基数×增速”，不是只看增速。',
      `东部基数明显更大，且增速不低，增长贡献通常更大，所以更可能是主力。`
    );
  });

  const e3=Q('da_threshold_no_detail','不到超过判断',['技巧'],()=>{
    const now=n(1100,1500);
    const r=n(30,45);
    const base=Math.round(now/(1+r/100));
    const ans=base<1000?'不到1000':'超过1000';
    return R(
      `现期 ${now}，增长率 ${r}%。基期约 ${now}÷(1+${r}%)，判断是否不到 1000。`,
      ans,
      op(ans,['不到1000','超过1000','一定等于1000','无法判断']),
      '只问阈值时，不必精算所有小数位。',
      `约为 ${base}，所以${ans}。这就是“够判断即可”的三不看/阈值意识。`
    );
  });

  const line=C('da_line_route','划线估算',['技巧'],[l1,l2],'sequence');
  const formula=C('da_formula_extend_route','公式补足',['技巧'],[y1,y2,b1,b2],'all');
  const boundary=C('da_boundary_route','边界判断',['运用'],[e1,e2,e3],'all');
  add(C('da_completion_card','隐含考法｜公式与边界',['运用'],[line,formula,boundary],'all'));
})();
