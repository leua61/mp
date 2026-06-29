(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const q1=Q('da_object_missing_total_part','对象未直给',['基础'],()=>{
    const total=n(2400,5200), part=n(900,2200); const other=total-part;
    const obj=pk(['非养殖水产品','非东部地区投资','非铁路出行人数','非公立机构数量']);
    return R(
      `材料只直接给出“总量 ${total}”和“已知部分 ${part}”，题目问“${obj}”。第一反应是什么？`,
      '先用总量与已知部分推出未知部分',
      op('先用总量与已知部分推出未知部分',['直接说材料没有无法做','只拿已知部分当答案','只看选项均衡']),
      '对象没直给时，先看它是否是整体中的剩余部分。',
      `未知部分=${total}-${part}=${other}。增长率类还可进一步用混合原理判断方向。`
    );
  });

  const q2=Q('da_first_para_priority_boundary','首段优先边界',['基础'],()=>R(
    '“第一题一般在第一段”应该如何使用？',
    '先看第一段，但对象不在第一段就继续往下找',
    op('先看第一段，但对象不在第一段就继续往下找',['第一段没有就跳题','永远只用第一段数据','第一题一定不用看对象限定']),
    '首段优先是节能顺序，不是材料范围规则。',
    '原课说第一题一般在第一段，是为了提升定位效率；真正做题仍以时间、对象、问法为准。'
  ));

  const q3=Q('da_trade_money_not_volume','贸易看额不看量',['基础'],()=>{
    const expAmt=n(70,130), impAmt=n(20,60); const expQty=n(80,160), impQty=n(170,260);
    return R(
      `某产品出口额 ${expAmt} 亿元、进口额 ${impAmt} 亿元；出口量 ${expQty} 万吨、进口量 ${impQty} 万吨。若问“贸易顺逆差”，看哪组数据？`,
      '看出口额和进口额',
      op('看出口额和进口额',['看出口量和进口量','看出口增长率','看进口增长率']),
      '顺差、逆差是金额口径。',
      `贸易状态看钱：${expAmt}>${impAmt}，所以是顺差；数量口径不能替代金额口径。`
    );
  });

  const q4=Q('da_lowest_share_most_not_choose','最低占比推出多数不选',['运用'],()=>{
    const small=n(4,9), total=100; const not=total-small;
    const item=pk(['超过8小时高铁行程','某冷门营销事件','某低频出行因素','某少数行业']);
    return R(
      `图表显示选择“${item}”的占比只有 ${small}%，且为最低项。若选项说“绝大部分被调查者不选择它”，应如何判断？`,
      '可以支持，约有绝大部分不选择',
      op('可以支持，约有绝大部分不选择',['不能判断，因为必须精确人数','一定错误，因为最低不等于少','只能说明一半人不选择']),
      '占比很低时，其互补占比很高。',
      `不选择比例约为 ${not}%，可理解为绝大部分不选择。注意这是由占比互补推出的。`
    );
  });

  const q5=Q('da_point_not_percent_multiply','百分点不是乘法',['基础'],()=>{
    const cur=n(45,70), diff=n(2,6); const ans=cur+diff;
    return R(
      `现期比重为 ${cur}%，比上年降低 ${diff} 个百分点。上年比重是多少？`,
      `${ans}%`,
      op(`${ans}%`,[`${Math.round(cur*(1+diff/100))}%`,`${cur-diff}%`,`${diff}%`]),
      '百分点变化是直接加减，不是乘以百分比。',
      `降低 ${diff} 个百分点，说明上年更高，直接 ${cur}+${diff}=${ans}%。`
    );
  });

  const q6=Q('da_training_ability_target','驿站｜训练目标',['驿站'],()=>R(
    '老师说每天四篇资料分析，主要练的不是背题，而是什么能力？',
    '读数据、读材料、划线法、估算法和做题技巧熟练度',
    ['读数据、读材料、划线法、估算法和做题技巧熟练度','只记住每道例题答案','只练蒙题概率','只背顺差逆差定义'],
    '这是训练目标节点。',
    '原文强调每天四篇是为了保持读材料能力、读数据能力、划线法、估算法和技巧熟练度。'
  ));

  const locate=C('da_round3_locate_edges','定位细口径',['基础'],[q1,q2,q3],'all');
  const judge=C('da_round3_judge_edges','判断细口径',['技巧'],[q4,q5],'all');
  const station=C('da_round3_training_station','驿站',['驿站'],[q6],'all');
  add(C('da_round3_audit_card','定位细节｜口径与迁移',['运用'],[locate,judge,station],'all'));
})();
