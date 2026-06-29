(function(){
  const {n,op,R,Q,C,comb,add}=EX;

  const q0=Q('combo_no_time_order','不交叉只选不排',['基础'],()=>R(
    '题干说明“所有比赛时间均不交叉”，问不同观赛方式时，通常意味着什么？',
    '只需选择项目，不必再排列时间顺序',
    ['只需选择项目，不必再排列时间顺序','必须把所有项目全排列','一定用插空法','一定按时间先后分组'],
    '时间不冲突，观赛方式本质就是选哪些项目。',
    '原题“比赛时间均不交叉”排除了时间安排冲突，所以核心是组合选择，而不是排列时段。'
  ));

  const q1=Q('combo_atleast_reverse','至少一个',['技巧'],()=>{
    const big=n(5,9), small=n(2,4), k=big;
    const total=comb(big+small,k);
    const ans=String(total-1);
    return R(
      `甲类有${big}项，乙类有${small}项，从全部项目中选${k}项，要求两类都至少选1项。共有多少种？`,
      ans,
      op(ans,[String(total),String(total-2),String(total-small),String(total-big)]),
      '“至少/不少于”优先想反面；反面是选出的项目全来自同一类。',
      `总数为 C(${big+small},${k})=${total}。乙类只有${small}项，无法单独凑出${k}项；唯一反面是全来自甲类，1种，所以答案为${total}-1=${ans}。`
    );
  });

  const q1b=Q('combo_symmetry','组合对称',['技巧'],()=>{
    const total=n(8,13), choose=n(2,4);
    const other=total-choose;
    const ans=`C(${total},${choose})`;
    return R(
      `计算 C(${total},${other}) 时，最节能的等价写法是什么？`,
      ans,
      op(ans,[`C(${total},${other})不能化简`,`C(${other},${choose})`,`A(${total},${choose})`]),
      'C(n,k)=C(n,n-k)。',
      `从${total}个里选${other}个，等价于留下不选的${choose}个，所以 C(${total},${other})=C(${total},${choose})。`
    );
  });



  const q1c=Q('combo_board_boundary','隔板法边界',['技巧'],()=>R(
    '课程里“至少一个”同时提到反面法和隔板法。隔板法更适合什么场景？',
    '把同类名额分给若干类且每类至少一个',
    ['把同类名额分给若干类且每类至少一个','从若干具体项目中选固定项目','判断利润最大','计算圆柱体积'],
    '隔板解决“同质名额分份额”，反面解决“排除不合格选择”。',
    '若题目是在若干具体项目中选择，通常用组合+反面；若是把同质数量分给若干对象且每份至少1个，才更像隔板法。'
  ));

  const q1d=Q('combo_quick_compute_tail','组合快算与尾数',['运用'],()=>{
    const total=n(8,13), choose=3;
    const value=comb(total,choose);
    const ans=String(value-1);
    return R(
      `从${total}项中选${total-choose}项，再减去1个反面情况。结果是多少？`,
      ans,
      op(ans,[String(value),String(value-2),String(comb(total,total-choose)-10)]),
      '先用组合对称，把C(n,n-3)化成C(n,3)，再处理“减1”。',
      `C(${total},${total-choose})=C(${total},${choose})=${total}×${total-1}×${total-2}/(3×2×1)=${value}，再减1得${ans}。原课C96=C93，也就是C(9,6)=C(9,3)，并看尾数，本质就是组合对称后的快算。`
    );
  });

  const q2=Q('combo_211_total','分配模式',['技巧'],()=>{
    const points=n(3,5), people=points+1;
    const total=comb(people,2);
    const ans='先写2-1-1…，再选2人组、选点、排剩余';
    return R(
      `${people}名专家去${points}个不同勘探点，每点至少1人。正确思路是什么？`,
      ans,
      op(ans,['先每点放1人，再把剩余1人随便放','直接点数^人数','只算C(人数,2)']),
      '人数比点数多1，分配模式一定是一处2人，其余各1人。',
      `分配模式为2-${Array(points-1).fill(1).join('-')}。先从${people}人中选2人同点，再选这个点，剩余${points-1}人排列到剩余${points-1}个点。不要“先每点放1人再放多余”，那会重复。`
    );
  });

  const q3=Q('prob_reverse_same','概率反面',['运用'],()=>{
    const points=n(3,5), people=points+1;
    const denom=comb(people,2);
    const same=`1/${denom}`;
    const diff=`${denom-1}/${denom}`;
    return R(
      `${people}名专家去${points}个不同点，每点至少1人。甲乙去不同点的概率是多少？`,
      diff,
      op(diff,[same,`${denom-2}/${denom}`,`${points-1}/${points}`]),
      '反面是甲乙去同一点。',
      `总分配模式是一处2人，其余各1人。任意一对人成为“2人组”的概率是1/C(${people},2)=${same}，所以甲乙不同点的概率为1-${same}=${diff}。`
    );
  });



  const q3b=Q('prob_forward_reverse_choice','正反择简',['技巧'],()=>R(
    '概率题既可以正着数，也可以反着数。考场上应优先选择哪一种？',
    '哪边情况少、结构清楚就选哪边',
    ['哪边情况少、结构清楚就选哪边','永远正着做','永远反着做','只看选项最大值'],
    '概率本质是A/B，A可以是正面，也可以用总数减反面。',
    '原课在甲乙不同勘探点题中明确说概率可以正着做，也可以反着做；因为反面“甲乙同点”正好对应2-1-1中的2人组，所以反面更省。'
  ));

  const q3c=Q('prob_option_denominator','概率分母意识',['技巧'],()=>{
    const points=n(3,6), people=points+1;
    const total=comb(people,2)*points;
    const ans=`约分前分母应来自总情况数${total}`;
    return R(
      `${people}人分到${points}个点且每点至少1人。若先算出总情况数为${total}，看概率选项时分母有什么检查价值？`,
      ans,
      op(ans,[`分母可以随便出现`,`只看分子，不看分母`,`分母必须都等于${people}`]),
      '概率=A/B，B来自总情况数；约分后分母也应与总情况数有整除关系。',
      `原课算出总数36后会观察选项分母是否能被36整除。这个动作不能直接得答案，但能排除明显不可能的选项，或判断是否还要继续算。`
    );
  });

  const q4=Q('prob_frequency','放回频率',['基础'],()=>{
    const total=n(20,50); const red=n(5,total-5); const times=total*2; const hit=red*2;
    return R(
      `一桶共${total}只球，放回摸球${times}次，其中${hit}次为红球。估计红球约多少只？`,
      String(red),
      op(String(red),[String(Math.max(1,red-2)),String(red+2),String(Math.round(hit/times))]),
      '放回重复实验：频率近似概率。',
      `红球频率=${hit}/${times}=${red}/${total}，所以红球约${red}只。`
    );
  });

  const train=C('combo_variable_route','变量训练｜至少分配与概率',['运用'],[q0,q1,q1b,q1c,q1d,q2,q3,q3b,q3c,q4],'all');
  add(C('combo_probability_card','排列概率｜反面与分配模式',['技巧'],[train],'all'));
})();
