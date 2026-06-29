(function(){
  const {n,op,R,Q,C,add,pct,inter,d}=EX;
  const identify=Q('review_identify_type','识别题型',['基础'],()=>{
    const modes=['隔年增长','指数问题','混合原理','严格十字交叉','精算边界'];
    const ans=modes[n(0,modes.length-1)];
    const q={
      '隔年增长':'问 2020 年比 2018 年增长多少，首先识别为什么？',
      '指数问题':'材料给“价格指数 109.5”，首先识别为什么？',
      '混合原理':'问两地区总额增长率，材料给两个地区量和增速，首先识别为什么？',
      '严格十字交叉':'问男性人数，材料给男女平均用时与整体平均用时，首先识别为什么？',
      '精算边界':'选项差距只有千分之几，首先警惕什么？'
    }[ans];
    return R(q,ans,op(ans,modes),'先看问法和材料结构。',`该问法对应 ${ans}。`);
  });
  const formulaJudge=Q('review_formula_judge','判断公式',['技巧'],()=>{
    const r1=n(5,15), r2=n(3,12), ans=pct(inter(r1,r2));
    return R(`综合题中识别出隔年增长，两个增长率为 ${r1}%、${r2}%。应得总增长率约为？`,ans,op(ans,[pct(r1+r2),pct(r1*r2/100),pct(r1-r2),pct(r1+r2+5)]),'隔年增长率=r1+r2+r1r2。',`R=${r1}%+${r2}%+${r1}%×${r2}%=${ans}。`);
  });
  const boundaryJudge=Q('review_boundary_judge','估算边界',['运用'],()=>R(
    '综合题最后发现选项只有千分级差距，这时最该做什么？',
    '提高估算精度，不能随便忽略小量',
    ['提高估算精度，不能随便忽略小量','直接用首位直除','只看题干年份','把所有百分数舍去'],
    '方法精度要匹配选项精度。',
    '选项越近，越要使用千分位划线、反代或改选项等精算策略。'
  ));
  const comprehensiveRoute=C('review_comprehensive_route','综合判断',['运用'],[identify,formulaJudge,boundaryJudge],'sequence');

  const questionFirst=Q('review_question_first','先问法',['基础'],()=>R('做资料分析增长类题，第一步更应该先看什么？','问法',['问法','选项字母','材料页码','题号'],'问法决定题型。','先判断是跨年、指数、混合、人数还是精算题。'));
  const structureSecond=Q('review_structure_second','再结构',['技巧'],()=>R('识别问法后，第二步要看什么？','材料结构',['材料结构','字体大小','选项顺序','题目出处'],'看相邻/隔年、整体/部分、平均/分母。','材料结构决定公式与分母。'));
  const optionThird=Q('review_option_third','后选项',['运用'],()=>R('公式确定后，最后用什么决定粗算还是精算？','选项差距',['选项差距','年份大小','单位名称','题目长度'],'选项差距决定精度。','首位不同可粗算，千分级接近要精算。'));
  const normalRoute=C('review_three_steps','三步闭环',['运用'],[questionFirst,structureSecond,optionThird],'sequence');
  add(C('full_review','综合复盘｜全课闭环',['运用'],[normalRoute,comprehensiveRoute],'sequence'));
})();
