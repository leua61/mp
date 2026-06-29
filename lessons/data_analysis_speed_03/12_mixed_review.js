(function(){
  const {n,op,R,Q,C,add,pp}=DA3;
  const identify=Q('mix_identify','先识别',['运用'],()=>{
    const ans='先看问法的时间、对象、求法，再回材料找匹配数据';
    return R('综合题第一步最应该做什么？',ans,op(ans,['先把材料全文读完并计算所有数据','先找最大数字','先看哪个选项最顺眼']),'资料分析先读问法。','先看问法：时间点判断基期/现期，对象决定找哪一行，求法决定是增长量、增长率、百分点还是其他。');
  });
  const chooseMethod=Q('mix_method_choice','方法选择',['运用'],()=>{
    const ans='选项远可估算，选项近要精算或反带';
    return R('同样是增长量题，什么时候大胆估，什么时候反带？',ans,op(ans,['增长率小就永远大胆估','选项近也可以随便忽略分母','只要有单位就必须精算到底']),'看选项距离。','选项差距大时用划线、比例法、小率近似；选项极近时，估算区分不了，要考虑反带假设。');
  });
  const mixedPercent=Q('mix_percent_or_rate','百分点混合变量',['运用'],()=>{
    const a=n(16,35), b=n(4,15), d=a-b; const ans=pp(d);
    return R(`某行业增长率 ${a}%，另一行业增长率 ${b}%。前者高多少？`,ans,op(ans,[`${d}%`,`${Math.round(d/b*100)}%`,pp(d+2)]),'两个增长率比较。',`增长率都是百分数，比较时做差并读作百分点：${a}%-${b}%=${ans}。`);
  });
  const mixedBase=Q('mix_base_or_amount','基期增长量混合变量',['运用'],()=>{
    const cur=n(1200,3000), r=n(10,30); const ans='求过去量用基期公式；求多多少用增长量公式';
    return R(`现期 ${cur}，同比增长 ${r}%。若问“去年是多少”和“比去年多多少”，应分别想到什么？`,ans,op(ans,['两个都用增长率公式','两个都直接现期×增长率','去年是多少用增长量公式，多多少用基期公式']),'问法不同，公式不同。',`去年是多少是求基期：${cur}÷(1+${r}%)；多多少是求增长量：${cur}÷(1+${r}%)×${r}%。`);
  });
  const finalCheck=Q('mix_three_checks','三省吾身收束',['运用'],()=>{
    const ans='对立面、隐含考点、再循环查漏';
    return R('复盘这节课时，“三省吾身”应检查哪三类缺口？',ans,op(ans,['只检查公式背没背','只检查例题会不会','只检查有没有错别字']),'不是只背公式。','第一看对立面和衍生面；第二想出题会不会考笔记没明说的角度；第三循环上述步骤查漏。');
  });
  const cases=C('mix_cases','混合变量',['运用'],[mixedPercent,mixedBase],'all');
  add(C('mixed_review','综合复盘｜识别、公式、方法选择',['运用'],[identify,chooseMethod,cases,finalCheck],'sequence'));
})();
