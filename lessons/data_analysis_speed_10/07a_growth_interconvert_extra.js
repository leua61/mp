(function(){
  const {n,op,R,Q,C,add}=EX;

  const direct=[
    Q('growth_unit_vs_rate','单位与百分数',['基础'],()=>R(
      '题目问“比上年同期增加了多少亿元”，选项也都带“亿元”。这是优先识别为什么？','增长量',
      ['增长量','增长率','比重','平均数'],
      '看问法和选项单位。',
      '带具体单位是在问增加的量；若问百分之几，才是增长率。这是题型识别，不要一上来套百分数。'
    )),
    Q('growth_down_eliminate','下降先排除',['技巧'],()=>R(
      '题干说“同比下降”，选项中同时出现“增加”和“减少”。第一步应怎样？','排除正增长选项',
      ['排除正增长选项','排除所有减少选项','直接选最大数','把百分号去掉'],
      '下降意味着方向为负。',
      '题干说同比下降，增长率和增长量都是负向；先排掉“增加、正增长”方向的选项，再估减少量。'
    ))
  ];

  const inter=C('growth_interconvert_extra','增长互推变量',['技巧'],[
    Q('growth_rate_from_amount_var','增长量反推增长率',['技巧'],()=>{
      const base=n(3200,8800), r=n(3,12), inc=Math.round(base*r/100); const ans=`约 ${r}%`;
      return R(
        `某指标基期约 ${base}，增长量约 ${inc}。增长率约是多少？`, ans,
        op(ans,[`约 ${r+2}%`,`约 ${Math.max(1,r-2)}%`,`约 ${Math.round(inc/base*1000)/10} 倍`]),
        '增长率 = 增长量 ÷ 基期。',
        `${inc}÷${base}≈${r}%，所以增长率约 ${r}%。`
      );
    }),
    Q('growth_current_amount_base_var','现期与增长量还原基期',['技巧'],()=>{
      const base=n(4200,9600), inc=n(120,680), cur=base+inc;
      return R(
        `现期为 ${cur}，比上期增加 ${inc}。基期是多少？`, String(base),
        op(base,[base+inc,cur+inc,Math.max(1,base-inc)]),
        '基期 = 现期 - 增长量。',
        `${cur}-${inc}=${base}。如果题干说“减少”，要把减少量加回去。`
      );
    }),
    Q('growth_decrease_base_var','减少量还原基期',['技巧'],()=>{
      const cur=n(3600,8600), dec=n(120,720); const base=cur+dec;
      return R(
        `现期为 ${cur}，比上期减少 ${dec}。基期是多少？`, String(base),
        op(base,[cur-dec,cur,cur+dec+n(10,50)]),
        '减少说明现期比基期小。',
        `基期=${cur}+${dec}=${base}，不要机械写“现期-增长量”而忘记负号。`
      );
    })
  ],'sequence');

  add(C('growth_extra_complete','增长概念补全｜识别与互推',['技巧'],[...direct,inter],'all'));
})();
