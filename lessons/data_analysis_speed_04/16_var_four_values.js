(function(){
  const {n,pctInt,R,Q,C,add,choose}=EX;

  const currentInc=Q('var_base_rate_current_inc','整数增长率',['技巧'],()=>{
    const base=n(80,300); const r=n(5,30); const cur=Math.round(base*(100+r)/100); const ans=String(cur);
    return R(`${base} 增长 ${r}% 后约为多少？`,ans,choose(ans,[cur+5,cur-5,base+r,base]),'现期=基期×(1+r)。',`${base}×(1+${r}%)≈${cur}。`);
  });
  const currentSmall=Q('var_base_rate_current_small','小数百分率',['技巧'],()=>{
    const base=n(200,900); const r=n(11,49)/10; const cur=Math.round(base*(1+r/100)); const ans=String(cur);
    return R(`${base} 增长 ${r}% 后约为多少？`,ans,choose(ans,[cur+3,cur-3,Math.round(base*(1-r/100)),base]),'小百分率也乘1+r。',`${base}×(1+${r}%)≈${cur}。`);
  });
  const currentDown=Q('var_base_rate_current_down','负增长',['技巧'],()=>{
    const base=n(300,900); const r=n(5,25); const cur=Math.round(base*(100-r)/100); const ans=String(cur);
    return R(`${base} 下降 ${r}% 后约为多少？`,ans,choose(ans,[Math.round(base*(100+r)/100),cur+8,cur-8,base-r]),'下降用1-r。',`${base}×(1-${r}%)≈${cur}。`);
  });
  const getCurrent=C('var_four_current','给基期和率求现期',['技巧'],[currentInc,currentSmall,currentDown],'sequence');

  const denomBase=Q('var_current_amount_rate_base','分母是基期',['技巧'],()=>{
    const base=n(100,400); const inc=n(10,90); const cur=base+inc; const rate=Math.round(inc/base*1000)/10; const ans=`${rate}%`;
    return R(`某指标现期为${cur}，比上期增加${inc}，增长率约为多少？`,ans,[ans,`${Math.round(inc/cur*1000)/10}%`,`${inc}%`,`${Math.round(cur/base*100)}%`],'先还原基期=现期-增长量。',`基期=${cur}-${inc}=${base}，增长率=${inc}/${base}≈${ans}。`);
  });
  const percentOption=Q('var_current_amount_rate_percent','百分号干扰',['运用'],()=>{
    const base=n(120,360); const inc=n(12,72); const cur=base+inc; const rate=Math.round(inc/base*1000)/10; const ans=`${rate}%`;
    return R(`现期${cur}万人，比基期多${inc}万人。下列哪个最可能是增长率？`,ans,[ans,`${inc}万人`,`${cur}万人`,`${base}万人`],'选项单位先筛。',`增长率应带百分号，且分母为基期${base}。`);
  });
  const wrongDenom=Q('var_current_amount_rate_wrong_denom','现期作分母陷阱',['运用'],()=>{
    const base=n(150,450); const inc=n(30,120); const cur=base+inc; const correct=Math.round(inc/base*1000)/10; const wrong=Math.round(inc/cur*1000)/10;
    return R(`现期${cur}亿元，增长${inc}亿元。若有人算成${inc}/${cur}≈${wrong}%，错在哪里？`,'把现期误作增长率分母',['把现期误作增长率分母','把增长量误作现期','把基期加了两次','把亿元写成万人'],'增长率分母永远是基期。',`正确分母是基期=${cur}-${inc}=${base}，不是现期${cur}。`);
  });
  const getRate=C('var_four_rate','给现期和增长量求率',['技巧'],[denomBase,percentOption,wrongDenom],'sequence');

  const baseUp=Q('var_current_rate_base_up','除以1+r',['技巧'],()=>{
    const base=n(100,500); const r=n(5,25); const cur=Math.round(base*(100+r)/100); const ans=String(Math.round(cur/(1+r/100)));
    return R(`现期约${cur}，同比增长${r}%，基期约为多少？`,ans,choose(ans,[Number(ans)+10,Number(ans)-10,cur,Math.round(cur*(1+r/100))]),'倒推基期要除以增长因子。',`基期≈${cur}/(1+${r}%)≈${ans}。`);
  });
  const baseDown=Q('var_current_rate_base_down','下降除以1-r',['技巧'],()=>{
    const base=n(200,700); const r=n(5,30); const cur=Math.round(base*(100-r)/100); const ans=String(Math.round(cur/(1-r/100)));
    return R(`现期约${cur}，同比下降${r}%，基期约为多少？`,ans,choose(ans,[Math.round(cur/(1+r/100)),Number(ans)+15,Number(ans)-15,cur]),'下降的因子是1-r。',`基期≈${cur}/(1-${r}%)≈${ans}。`);
  });
  const baseUnit=Q('var_current_rate_base_unit','选项单位干扰',['运用'],()=>{
    const base=n(50,180); const r=n(8,28); const cur=Math.round(base*(100+r)/100); const ans=`${Math.round(cur/(1+r/100))}亿元`;
    return R(`现期${cur}亿元，同比增长${r}%。基期约为？`,ans,[ans,`${r}%`,`${cur}亿元`,`${Math.round(cur*r/100)}亿元`],'题目问基期，是量。',`基期是具体量，约${ans}，不是百分号。`);
  });
  const getBase=C('var_four_base','给现期和率求基期',['技巧'],[baseUp,baseDown,baseUnit],'sequence');

  add(C('var_four_values','变量训练｜四量互推',['技巧'],[getCurrent,getRate,getBase],'all'));
})();
