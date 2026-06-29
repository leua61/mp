(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;
  const moreMeaning=Q('more_meaning_thousand','含义',['基础'],()=>{
    const p=n(3,8); const ans='比整百分数再多一点，通常是千分之几';
    return R(`误差写成“${p}多%”时，“多”是什么意思？`,ans,op(ans,['直接进到下一整百分数','可以当成没有误差','固定等于0.5%','表示不能估算']),'“多”是整百分数外的一点点。',`“${p}多%”表示比${p}%再多一点，通常是千分之几；不必精算，但要保留方向。`,parameter());
  });
  const notNext=Q('more_not_next_percent','不是下一点',['基础'],()=>{
    const p=n(4,7); const ans=`不能直接当成${p+1}%`;
    return R(`“${p}多%”应如何理解？`,ans,op(ans,[`直接当成${p+1}%`,`直接当成0%`,`只能精确到小数后三位`,`表示答案翻倍`]),'它不是完整多1个百分点。',`“${p}多%”介于${p}%和${p+1}%之间，通常更接近${p}%，不能粗暴当成${p+1}%。`,parameter());
  });

  const moreMerge=Q('more_merge_two_mores','多的合并',['技巧'],()=>{
    const a=n(2,5), b=n(2,5);
    const ans=`约${a+b}多%，不是刚好${a+b}%`;
    return R(
      `${a}多% 和 ${b}多% 叠加时，应怎样处理？`,
      ans,
      op(ans,[`刚好${a+b}%`,`直接进成${a+b+1}%`,`完全忽略两个“多”`,`只能用计算器精算`]),
      '两个“多”相加时，多出来的千分级也会累积。',
      `${a}多%+${b}多% 通常看成约${a+b}多%，必要时再根据选项判断是否比整${a+b}%再多一点；选项远时只保留范围。`,
      parameter()
    );
  });
  const downMore=Q('more_down_correction','下降修正',['技巧'],()=>{
    const base=n(160,360), p=n(4,8), rough=base-Math.round(base*p/100), ans=`比${rough}再小一点`;
    return R(`基准值${base}，需下降${p}多%。若先按${p}%得到${rough}，真实答案应怎样？`,ans,op(ans,[`刚好等于${rough}`,`比${rough}再大一点`,`比${base}大一点`,`无法判断`]),'下降“多”就是多减一点。',`按${p}%只是整点修正；${p}多%要再多下降一点，所以比${rough}再小一点。`,parameter());
  });
  const upMore=Q('more_up_correction','上升修正',['技巧'],()=>{
    const base=n(160,360), p=n(4,8), rough=base+Math.round(base*p/100), ans=`比${rough}再大一点`;
    return R(`基准值${base}，需上升${p}多%。若先按${p}%得到${rough}，真实答案应怎样？`,ans,op(ans,[`刚好等于${rough}`,`比${rough}再小一点`,`比${base}小一点`,`无法判断`]),'上升“多”就是多加一点。',`上升${p}多%比上升${p}%再多一点，所以答案比${rough}再大一点。`,parameter());
  });
  const examNear=Q('more_exam_near_options','考场处理',['运用'],()=>R('考场上如何处理“六多、三多”最合理？','选项近时用“多”判断稍大稍小，选项远时只保留范围',op('选项近时用“多”判断稍大稍小，选项远时只保留范围',['每题都精确算千分位','永远完全忽略','直接改成下一整百分数','只写竖式不看选项']),'训练和考场精度不同。','训练时细算方向；考场选项差距大只看范围，选项接近才利用“多”判断稍大或稍小。'),coverage());
  const identify=C('more_identify_module','识别“多”',['基础'],[moreMeaning,notNext,moreMerge],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const correct=C('more_correct_module','修正“多”',['技巧'],[downMore,upMore],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('more_card','误差里的“多”｜含义、修正与选项',['技巧'],[identify,correct,examNear],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
