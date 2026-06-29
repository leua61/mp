(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;

  const twoFactor=Q('mul_two_factor_basic','两数乘法',['技巧'],()=>{
    const a=n(21,89);
    const b=n(31,49);
    const aa=Math.round(a/10)*10;
    const bb=Math.round(b/10)*10;
    const ans='先把两数划成舒服数，再看误差是否需要补';
    return R(
      `${a}×${b} 这类普通乘法，划线法的第一步是什么？`,
      ans,
      op(ans,['必须从个位竖式相乘','只能用错位加减法','先拆成两个分数','直接放弃估算']),
      '普通乘法也是纯乘除的一部分。',
      `例如可先看成 ${aa}×${bb} 的骨架，再判断 ${a}、${b} 分别是划大还是划小；乘法内部按同向叠加、异向抵消处理。`,
      parameter()
    );
  });

  const multiFactor=Q('mul_multi_factor_chain','多项连乘',['技巧'],()=>{
    const a=n(31,39), b=n(97,104), c=n(118,126);
    const ans='先找能互相抵消误差的因子，再出基准值';
    return R(
      `${a}×${b}×${c} 这类多项连乘，优先怎么划？`,
      ans,
      op(ans,['每个数都强行保留三位','先把所有数精确相乘','只看最后一个因子','把乘号全部改成除号']),
      '多项连乘不是新公式，仍是乘法误差合并。',
      `多项连乘时，不必死算 ${a}、${b}、${c} 的真实乘积；优先让某些因子上升、某些因子下降，使误差抵消。`,
      parameter()
    );
  });

  const multiplyModule=C('mul_ordinary_module','普通乘法与连乘',['技巧'],[twoFactor,multiFactor],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));

  const fifteenSkeleton=Q('sensitive_15_skeleton','15骨架',['技巧'],()=>R(
    '看到分母约为15时，为什么常能想到“3×5”，并把5转到分子侧处理？',
    '15=3×5，除以5可转成乘以2的骨架，方便配合三不看和误差修正',
    op('15=3×5，除以5可转成乘以2的骨架，方便配合三不看和误差修正',['15只能精确长除','15与分数转化无关','看到15必须改成1/7','15只能用于加法']),
    '这是分数转化和划线的联动。',
    '把分母改到15附近时，可把15拆成3×5；除以5相当于乘0.2，骨架上常转成“乘2再回位”，让运算更轻。'
  ),coverage());

  const oneEighteen=Q('sensitive_one_eighteen','1/18骨架',['技巧'],()=>R(
    '1/18 的速算骨架可以怎样由 5/9 联想到？',
    '1/18 = 0.0555…，可看成5/9骨架555前面补0并调整数量级',
    op('1/18 = 0.0555…，可看成5/9骨架555前面补0并调整数量级',['1/18等于0.18','1/18必须背成142857','1/18只能用错位加减法','1/18不能估算']),
    '课程例题里用过1/18和5/9的联动。',
    '因为1/9=0.111…，1/18是其一半，即0.0555…；所以可以抓555骨架，再用数量级回位。'
  ),coverage());

  const sensitiveModule=C('sensitive_edge_module','敏感骨架补充',['技巧'],[fifteenSkeleton,oneEighteen],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));

  const highAdd=Q('addition_high_first','高位叠加',['基础'],()=>R(
    '多位数加法如果只是后续题里的辅助计算，通常从哪边先看？',
    '从高位往低位看，必要时结合进位判断范围',
    op('从高位往低位看，必要时结合进位判断范围',['像小学竖式一样必须从个位开始','直接套三不看原则','把加号看成乘号','只看最后一位']),
    '这是课程里的旁支提示，不是本节主训练。',
    '多位数加法一般先看高位累加，低位只负责是否进位；资料分析里常不必把每一位都算到极精。'
  ),coverage());

  const tailDigit=Q('addition_tail_digit','尾数法提示',['基础'],()=>R(
    '资料分析中遇到多项加法，除了高位叠加，课程还提示过哪类辅助判断？',
    '尾数法',
    op('尾数法',['错位加减法专门化一','七分数循环节','增长率做差','百分号三不看']),
    '这是加法旁支。',
    '当选项尾数差异明显时，可以用尾数法；但这不是本节乘除速算的主线，只作为后续遇题时的辅助。'
  ),coverage());

  const addModule=C('addition_edge_module','加法旁支提示',['基础'],[highAdd,tailDigit],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));

  add(C('ordinary_multiply_and_edges_card','普通乘法与旁支提示｜纯乘法、敏感数与高位加法',['运用'],[multiplyModule,sensitiveModule,addModule],'all',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
