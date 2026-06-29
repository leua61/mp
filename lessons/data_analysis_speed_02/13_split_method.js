(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;
  const essence=Q('split_essence','本质',['基础'],()=>R('拆分法的本质是什么？','把分子拆成分母的100%、50%、10%、5%、1%等常见比例',op('把分子拆成分母的100%、50%、10%、5%、1%等常见比例',['把所有数拆成质因数','把分母固定改成100','把题目改成加法材料','只看标题不看数字']),'拆分法是口算化直除。','拆分法就是看分子里有多少个分母的常见比例，适合A÷B的首位或范围判断。'),coverage());
  const carry=Q('split_carry','不要漏进位',['技巧'],()=>R('拆分法中，先拆出1和0.5后，剩余部分还够0.1多，最容易犯什么错？','直接停在1.5，漏掉进位',op('直接停在1.5，漏掉进位',['把答案改成15倍','把分母扔掉','直接用三不看删除加号','把分子分母相加']),'拆分不是只拆最大两块。','拆分后要继续看剩余部分是否够下一档比例，避免漏掉0.1、0.05这类进位。'),coverage());
  const abPractice=Q('split_ab_practice','A÷B练习',['技巧'],()=>{const b=n(320,680), times=n(1,2), half=Math.round(b/2), extra=Math.round(b/10), a=b*times+half+extra; const ans=`约${times+0.6}`; return R(`${a}÷${b} 用拆分法先看成多少倍？`,ans,op(ans,[`约${times+0.5}`,`约${times+1}`,`约0.${times}`,`约${times+0.1}`]),'先拆整数倍，再拆50%和10%。',`${a}≈${times}个分母+50%分母+10%分母，所以约${times+0.6}倍。`,parameter());});

  const remainderPractice=Q('split_remainder_practice','剩余进位练习',['技巧'],()=>{const b=n(420,760), times=n(1,2), a=b*times+Math.round(b*0.5)+Math.round(b*0.12); const ans=`超过${times+0.6}倍`; return R(`${a}÷${b} 拆出${times}倍和50%后，剩余还超过10%，应怎么判断？`,ans,op(ans,[`正好${times+0.5}倍`,`不足${times+0.6}倍`,`超过${times+0.6}倍`,`等于${times+1}倍`]),'拆分后要继续看剩余够不够下一档。',`先拆出${times}倍和50%，还剩约12%，所以不能停在${times+0.5}，应超过${times+0.6}倍。`,parameter());});
  const limit=Q('split_limit_ab_only','适用边界',['基础'],()=>R('拆分法最适合哪类模型？','主要适合A÷B；A÷B×C以上会变复杂',op('主要适合A÷B；A÷B×C以上会变复杂',['最适合所有三数四数','专门处理两个分数做差','只适合百分数加法','完全不能用于资料分析']),'拆分法是备选，不是三数四数主线。','A÷B可以用拆分；A÷B×C、A÷B×C÷D要同时处理多项误差，划线法通常更合适。'),coverage());
  const core=C('split_core_module','拆分规则',['基础'],[essence,carry],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const drill=C('split_drill_module','变量练习',['技巧'],[abPractice,remainderPractice],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('split_method_card','拆分法｜本质、进位与适用边界',['技巧'],[core,drill,limit],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
