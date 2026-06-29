(function(){
  const {n,op,R,Q,C,add}=EX;

  const direct=[
    Q('funding_no_growth_rate','没有增长率用实际量',['技巧'],()=>R(
      '题干没有给增长率，只说“比去年减少 266 项”。此时应优先怎样还原基期？','用现期加回减少量',
      ['用现期加回减少量','强行套现期÷(1+r)','把 266 当增长率','直接忽略年份'],
      '没有 r 就不要硬套增长率公式。',
      '减少 266 项说明基期=现期+266；先用实际增长量还原，再代入比重关系。'
    ))
  ];

  const funding=C('ratio_funding_bridge','资助率变量应用',['技巧'],[
    Q('funding_rate_solve_den','资助率反求申请数',['技巧'],()=>{
      const receive=n(1200,2600), rate=EX.pk([20,25,40]); const funded=Math.round(receive*rate/100);
      return R(
        `资助项目 ${funded} 项，平均资助率 ${rate}%。接收申请项目数约是多少？`, String(receive),
        op(receive,[funded,Math.round(funded*rate/100),receive+n(80,160)]),
        '资助率 = 资助项目 ÷ 接收申请项目。',
        `接收申请项目≈${funded}÷${rate}%=${receive}。这是比重反求整体，不是平均数。`
      );
    })
  ],'sequence');

  const closeTrap=C('base_ratio_close_extra','近选项反陷阱强化',['运用'],[
    Q('base_ratio_pair_gap_var','选项差距匹配增速差',['运用'],()=>{
      const gap=EX.pk([0.4,0.6,0.8]); const ans='找相差约为增速差的陷阱对';
      return R(
        `基期比重题中，r部 与 r整 只相差约 ${gap} 个百分点，四个选项也非常接近。优先找什么？`, ans,
        ['找相差约为增速差的陷阱对','直接选最大值','把所有选项平均','只看字母顺序'],
        '近到千分之几/1%左右时，死算很慢。',
        '基期比重≈现期比重×(1+r整)/(1+r部)，答案常与现期陷阱只差 r整-r部 的量级。'
      );
    }),
    Q('base_ratio_direction_pair_var','陷阱对方向',['运用'],()=>R(
      '已知 r整 > r部。基期比重与现期比重相比，应选陷阱对中哪一侧？', '基期比重更大',
      ['基期比重更大','基期比重更小','二者必然相等','无法判断'],
      '看修正项 (1+r整)/(1+r部)。',
      'r整 > r部 时，修正项大于 1，所以基期比重大于现期比重；反之则小于现期比重。'
    ))
  ],'all');

  add(C('ratio_application_extra','比重应用补全｜资助率与近选项',['技巧'],[...direct,funding,closeTrap],'all'));
})();
