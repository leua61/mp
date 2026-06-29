
(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const z1=Q('da_zero_option_emergency','选项含零',['运用'],()=>R(
    '老师提到“选项出现 0”时，没时间可以怎么处理？',
    '作为应急拆零线索，但不能当定理',
    op('作为应急拆零线索，但不能当定理',['一定选择含 0 选项','永远排除含 0 选项','直接跳过题干']),
    '这是考场应急意识，不是硬公式。',
    '原课说没时间时可以“拆零”，本质是利用选项特征做应急判断；有时间仍要回到题干验证。'
  ));

  const z2=Q('da_first_question_para','首题首段',['基础'],()=>R(
    '资料分析一篇材料的第一小题，定位时有什么经验性提示？',
    '常优先在第一段找，但仍要以对象为准',
    op('常优先在第一段找，但仍要以对象为准',['一定只看最后一段','不用看对象','直接看综合判断']),
    '这是定位效率经验，不是绝对规律。',
    '原课说“一般来讲第一题就在第一段”，但也反复强调完整对象不能丢。'
  ));

  const z3=Q('da_trade_total_export','总额推出进口额',['技巧'],()=>{
    const exp=n(60,130);
    const imp=n(20,80);
    const total=exp+imp;
    const ans=`进口额 ${imp}`;
    return R(
      `水产品进出口总额 ${total}，出口额 ${exp}。进口额是多少？`,
      ans,
      op(ans,[`进口额 ${total}`,`进口额 ${exp}`,`进口额 ${Math.abs(exp-imp)}`]),
      '总额=出口额+进口额。',
      `进口额=${total}-${exp}=${imp}。之后再比较出口额和进口额判断顺差或逆差。`
    );
  });

  const z4=Q('da_share_point_direct','比重百分点直推',['技巧'],()=>{
    const cur=n(35,75);
    const pp=n(2,6);
    const mode=pk(['降低','提高']);
    const prev=mode==='降低'?cur+pp:cur-pp;
    const ans=`${prev}%`;
    return R(
      `今年比重为 ${cur}%，比上年${mode} ${pp} 个百分点。上年比重为多少？`,
      ans,
      op(ans,[`${cur}%`,`${cur+pp}%`,`${cur-pp}%`]),
      '直接给百分点变化时，比重不用套复杂公式。',
      `${mode==='降低'?'今年低于上年':'今年高于上年'} ${pp} 个百分点，所以上年为 ${ans}。`
    );
  });

  const z5=Q('da_two_metric_fast','同时快于两个整体',['技巧'],()=>{
    const a=n(5,12), b=n(8,18);
    const x1=a+n(1,8), x2=b+n(1,8);
    const y1=a+n(1,8), y2=b-n(1,5);
    const z1v=a-n(1,4), z2=b+n(1,8);
    const ans='甲';
    return R(
      `全国整体两项增速分别为 ${a}%、${b}%。甲为 ${x1}%、${x2}%；乙为 ${y1}%、${y2}%；丙为 ${z1v}%、${z2}%。哪个同时快于全国两项整体？`,
      ans,
      op(ans,['乙','丙','甲乙丙都满足']),
      '“同时”意味着两个条件都要大于整体。',
      `甲两项都大于 ${a}% 和 ${b}%；乙第二项不满足，丙第一项不满足，所以选甲。`
    );
  });

  const z6=Q('da_opposite_rate_sum','一正一负不能抵消',['运用'],()=>R(
    '两个行业现期量相加，其中一个增长 +9.3%，另一个增长 -9.3%。能否据此判断它们基期和等于现期和？',
    '不能',
    op('不能',['能','只要增长率绝对值相同就能','只要现期量相同就必然能']),
    '增长率相反不等于增长量相反。',
    '基期要分别除以 1+9.3% 和 1-9.3%，不能用正负增长率直接抵消。'
  ));

  const z7=Q('da_change_amplitude_abs','变幅最大',['基础'],()=>{
    const vals=[n(5,12),-n(13,25),n(8,18),-n(26,40)];
    const labels=['甲','乙','丙','丁'];
    const idx=vals.map(Math.abs).indexOf(Math.max(...vals.map(Math.abs)));
    const ans=labels[idx];
    return R(
      `四个行业变动率分别为：甲 ${vals[0]}%，乙 ${vals[1]}%，丙 ${vals[2]}%，丁 ${vals[3]}%。若问“变幅最大”，选谁？`,
      ans,
      op(ans,labels),
      '变幅看变化幅度，通常看绝对值。',
      `绝对值最大的是 ${labels[idx]} 的 ${Math.abs(vals[idx])}%，所以选${ans}。`
    );
  });

  const z8=Q('da_visual_total_score','多指标总分最高',['技巧'],()=>R(
    '表格中问“综合得分最高”，如果某城市在每个分项都明显靠前，最省力的判断是什么？',
    '优先锁定该城市，再必要时验证',
    op('优先锁定该城市，再必要时验证',['必须把所有城市全加一遍','只看第一列即可','只看最低分']),
    '多指标都高时，总分通常也高。',
    '原课对冰雪旅游题的处理就是先观察各分项都高的城市，避免无谓全量精算。'
  ));

  const z9=Q('da_direct_difference','相差最大直接做差',['技巧'],()=>{
    const a=n(75,95), b=a-n(1,4);
    const c=n(75,95), d=c-n(8,15);
    const ans='乙';
    return R(
      `甲两项得分 ${a}、${b}；乙两项得分 ${c}、${d}。若问两项相差最大，谁更可能？`,
      ans,
      op(ans,['甲','两者一样','无法判断']),
      '问相差最大，本质直接做差。',
      `甲差 ${Math.abs(a-b)}，乙差 ${Math.abs(c-d)}，乙更大。`
    );
  });

  const z10=Q('da_group_sum_compare','地区合计比较',['技巧'],()=>{
    const h=[n(80,100),n(80,100),n(80,100)];
    const j=[n(60,85),n(60,85),n(60,85)];
    const hs=h.reduce((a,b)=>a+b,0), js=j.reduce((a,b)=>a+b,0);
    const ans=hs>js?'黑龙江':'吉林';
    return R(
      `黑龙江三个事件声量为 ${h.join('、')}；吉林三个事件声量为 ${j.join('、')}。合计谁更高？`,
      ans,
      op(ans,['黑龙江','吉林','无法比较','两者相等']),
      '同一地区多个对象比较，先合计同口径数据。',
      `黑龙江合计 ${hs}，吉林合计 ${js}，所以${ans}更高。`
    );
  });

  const locate=C('da_original_locate_edges','定位与应急',['运用'],[z1,z2,z3,z4],'all');
  const compare=C('da_original_compare_edges','比较与判断',['技巧'],[z5,z6,z7],'all');
  const chart=C('da_original_chart_edges','图表综合',['技巧'],[z8,z9,z10],'all');
  add(C('da_original_edges_card','路线边界｜迁移与应急',['运用'],[locate,compare,chart],'all'));
})();
