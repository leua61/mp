(function(){
  const {n,op,R,Q,C,add,pct,d}=EX;
  const twoEndRange=Q('mixed_two_range','夹在中间',['基础'],()=>{
    const a=n(8,18), b=n(22,35); const ans=`${a}% 到 ${b}% 之间`;
    return R(`甲增长率 ${a}%，乙增长率 ${b}%。甲乙合计增长率一定在什么范围？`,ans,op(ans,[`大于 ${b}%`,`小于 ${a}%`,`等于 ${(a+b)/2}%`,`无法判断`]),'混合值夹在两个部分之间。',`整体增长率一定介于 ${a}% 和 ${b}% 之间。`);
  });
  const twoEndBias=Q('mixed_two_bias','偏向量大',['技巧'],()=>{
    const small=n(10,20), big=n(24,35), q1=n(1000,1800), q2=n(3000,5000); const ans=`更接近 ${big}%`;
    return R(`甲量 ${q1}、增长 ${small}%；乙量 ${q2}、增长 ${big}%。合计增长率更接近哪一端？`,ans,op(ans,[`更接近 ${small}%`,`正好中间`,`一定小于 ${small}%`,`更接近 ${big}%`]),'量大的部分影响更大。',`乙量更大，所以合计增长率更偏向乙的 ${big}%。`);
  });
  const distanceCalc=Q('mixed_distance_calc','距离反比换算',['技巧'],()=>{
    const low=10, high=22, ratioBig=2; const ans='18%';
    return R(`A 增长 10%，量为 1 份；B 增长 22%，量为 2 份。整体增长率约为？`,ans,op(ans,['14%','16%','18%','20%']),'量比 1:2，距离比 2:1。','两端差 12 个百分点，共 3 份，一份 4；整体离 B 的 22% 只有 1 份，所以 22%-4%=18%。');
  });
  const twoRoute=C('mixed_two_end_route','两端求整体',['技巧'],[twoEndRange,twoEndBias,distanceCalc],'sequence');

  const otherSide=Q('mixed_one_other_side','未知端方向',['技巧'],()=>{
    const known=n(12,22), whole=n(5,known-2); const ans='低于整体增长率';
    return R(`某部分增长率 ${known}%，整体增长率 ${whole}%。另一个部分增长率应在整体的哪一侧？`,ans,op(ans,['高于已知部分','低于整体增长率','等于已知部分','无法判断']),'整体要夹在两个部分之间。',`已知部分 ${known}% 高于整体 ${whole}%，另一部分必须低于整体，整体才会夹在两端之间。`);
  });
  const oneCalc=Q('mixed_one_calc','整体加一端',['技巧'],()=>{
    const smallQty=1, bigQty=9, known=13, whole=4; const ans='约 3%';
    return R(`柴油量约 1 份，增长率 13%；汽油量约 9 份，合计增长率 4%。汽油增长率约为？`,ans,op(ans,['约 3%','约 4%','约 9%','约 13%']),'量小距离远，柴油到整体的距离是 9 份。','柴油与汽油量比 1:9，距离比 9:1。13% 到 4% 差 9 个百分点，对应 9 份，1 份约 1 个百分点，汽油≈4%-1%=3%。');
  });
  const oneRoute=C('mixed_one_side_route','整体加一端求另一端',['技巧'],[otherSide,oneCalc],'sequence');

  const posNegMid=Q('mixed_pos_neg_mid','中点错误',['运用'],()=>R(
    '甲量明显大于乙量，甲增长 4%，乙下降 6%。若有人说整体约为 -1%，且 -1% 几乎在两端中间，应如何判断？',
    '可疑，整体应更偏向甲的 4%',
    ['可疑，整体应更偏向甲的 4%','一定正确，因为平均就是 -1%','一定低于 -6%','无法用混合判断'],
    '量明显不等时，整体不该在正中间。',
    '整体增长率夹在 -6% 和 4% 之间，但甲量更大，应更靠近 4%，不是几乎正中间。'
  ));
  const posNegBoundary=Q('mixed_pos_neg_boundary','现期近似边界',['运用'],()=>R(
    '混合增长中一部分增长 50%，另一部分下降 40%，为什么不能太粗地用现期量比代替基期量比？',
    '两个 1+r 分母差异太大',
    ['两个 1+r 分母差异太大','因为不能有负增长','因为选项一定相同','因为整体不在两端之间'],
    '资料分析混合近似约掉了 1+r。',
    '一边 1.50，一边 0.60，差异很大，用现期近似基期容易失真。'
  ));
  const posNegRoute=C('mixed_pos_neg_route','一正一负判断',['运用'],[posNegMid,posNegBoundary],'all');

  const timeSplit=Q('mixed_time_split','累计拆分',['基础'],()=>{
    const total=n(160,240), july=n(20,50); const first=total-july;
    return R(`1—7 月累计量 ${total}，7 月当月量 ${july}，则 1—6 月量是多少？`,String(first),op(String(first),[String(total+july),String(july),String(total),String(total-july+1)]),'累计量拆分：1—7 月=1—6 月+7 月。',`1—6 月=${total}-${july}=${first}。`);
  });
  const timeUnknown=Q('mixed_time_unknown_rate','未知段增长率',['技巧'],()=>R(
    '已知 1—7 月整体增长率和 7 月增长率，要求 1—6 月增长率，本质属于：',
    '已知整体和一个部分，求另一个部分',
    ['已知整体和一个部分，求另一个部分','隔年增长率','指数问题','百分点陷阱'],
    '1—7 月由 1—6 月和 7 月组成。',
    '累计段拆分后就是整体与两个部分的混合增长。'
  ));
  const timeRoute=C('mixed_time_route','时间段拆分',['运用'],[timeSplit,timeUnknown],'sequence');

  const identify=Q('mixed_deep_identify','识别整体部分',['基础'],()=>R('“四川+重庆固定资产投资总额”这类问法首先应识别为：','整体=两个部分相加',['整体=两个部分相加','隔年增长','指数增长','平均数除法'],'总额来自两个地区相加。','四川和重庆是两个部分，两地总额是整体。'));
  const canApprox=Q('mixed_deep_approx','能否近似',['技巧'],()=>R('若两个部分增长率都为正且相差不极端，混合原理用现期量比近似通常：','可以作为估算',['完全禁止','可以作为估算','必然精确','只能用于人数题'],'这是资料分析里的估算版十字交叉。','同正时被约掉的 1+r 差异通常不大，可以估算。'));
  const finalDistance=Q('mixed_deep_distance','最后距离',['技巧'],()=>R('量比 1:2 时，距离比应为：','2:1',['1:2','2:1','1:1','3:1'],'量大距离小。','部分量之比与距离之比成反比，所以 1:2 对应 2:1。'));
  const workflow=C('mixed_workflow_chain','判断链',['技巧'],[identify,canApprox,finalDistance],'sequence');
  const deepRoute=C('mixed_deep_route','综合路线',['运用'],[workflow],'sequence');
  add(C('mixed_training','混合原理｜变量训练',['运用'],[twoRoute,oneRoute,posNegRoute,timeRoute,deepRoute],'all'));
})();
