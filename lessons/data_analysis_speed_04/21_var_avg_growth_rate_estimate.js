(function(){
  const {n,R,Q,C,add}=EX;
  const pos=Q('var_agr_exact_pos','正增长',['基础'],()=>{
    const start=n(80,180), N=n(3,6), end=start+n(30,140);
    const ans=`(1+r)^${N} = ${end}/${start}`;
    return R(`从${start}增长到约${end}，${N}年年均增长率应列什么式？`,ans,[ans,`(1-r)^${N} = ${end}/${start}`,`${N}r = ${start}/${end}`,`r/${N} = ${end}/${start}`],'正增长用1+r。',`年均增长率连续乘法，${N}个间隔列(1+r)^${N}=末/初=${end}/${start}。`);
  });
  const neg=Q('var_agr_exact_neg','负增长',['基础'],()=>{
    const start=n(120,260), N=n(2,5), end=start-n(25,80);
    const ans=`(1-r)^${N} = ${end}/${start}`;
    return R(`从${start}下降到约${end}，${N}年年均下降率应列什么式？`,ans,[ans,`(1+r)^${N} = ${end}/${start}`,`${N}r = ${end}/${start}`,`r = ${start}/${end}`],'下降用1-r。',`年均下降率的因子是1-r，所以列(1-r)^${N}=末/初=${end}/${start}。`);
  });
  const exact=C('var_agr_exact_route','精确式识别',['基础'],[pos,neg],'sequence');

  const small=Q('var_agr_two_small','小增速可用',['技巧'],()=>{
    const N=n(3,8); const Rbig=n(12,32); const approx=Math.round(Rbig/N*10)/10;
    return R(`总增长约${Rbig}%，${N}年年均增长率两项估算约为多少？`,`${approx}%`,[`${approx}%`,`${Rbig}%`,`${Math.round(Rbig*N)}%`,`${Math.round(approx*2)}%`],'总增长率除以年份差。',`两项估算r≈${Rbig}%/${N}≈${approx}%。`);
  });
  const over=Q('var_agr_two_over','估算值偏大',['技巧'],()=>R('正增长两项估算为什么通常偏大？','忽略了正的二次项和更高项',['忽略了正的二次项和更高项','因为少除了一年','因为把现期当基期','因为单位换错'],'高次项也贡献增长。','真实(1+r)^N包含Nr以外的正高次项，只用Nr解释总增长，会把r估大。'));
  const chooseSmall=Q('var_agr_two_choose','选略小',['技巧'],()=>R('正增长两项估算得到10%，选项有8.8%、9.5%、10.8%、12%，一般优先考虑哪个？','9.5%',['9.5%','10.8%','12%','8.8%'],'真实值略小于估算值。','两项估算偏大，若选项合理，真实值通常略小于10%，优先考虑9.5%。'));
  const two=C('var_agr_two','两项式估算',['技巧'],[small,over,chooseSmall],'sequence');

  const high=Q('var_agr_bound_high','20%以上慎用',['技巧'],()=>R('选项在20%、30%以上时，两项估算应如何定位？','慎用，不能机械选刚小于估算值',['慎用，不能机械选刚小于估算值','一定最精确','直接选最大','完全不看末期初期'],'高次项影响大。','增速越大，r²、r³项越不可忽略，两项估算只能辅助判断。'));
  const upper=Q('var_agr_bound_upper','只能做上界',['技巧'],()=>R('正增长两项估算为25%，以下哪个选项可直接排除？','30%',['30%','22%','20%','18%'],'估算偏大，真实更小。','正增长两项估算通常是上界，高于上界的30%可排除。'));
  const notMechanical=Q('var_agr_bound_not_mechanical','不要机械选刚小',['运用'],()=>R('两项估算得到30%，选项29%、24%、21%、18%，为什么不能必然选29%？','大增速时高次项可能让真实值远低于估算',['大增速时高次项可能让真实值远低于估算','因为29%没有百分号','因为必须选最小','因为年均增长率不能超过20%'],'估算上界不等于答案。','大增速时二次项贡献很大，真实值可能明显低于30%，不能机械选刚小的29%。'));

  const declineSign=Q('var_agr_bound_decline_sign','下降符号陷阱',['运用'],()=>{
    const rough=n(12,22), real=rough+n(5,15);
    return R(`年均下降率粗估写成 -${rough}%，若进一步校验得到 -${real}%，应怎样理解？`,`-${real}%下降幅度更大`,[`-${real}%下降幅度更大`,`-${rough}%下降幅度更大`,'两者下降幅度相同','负号越靠近0下降越大'],'负增长要看下降幅度。',`代数上-${real}%更小，但下降幅度是${real}%，比${rough}%更大。负增长题不能只按“略小”机械选。`);
  });
  const bound=C('var_agr_bound','边界题',['运用'],[high,upper,notMechanical,declineSign],'sequence');

  const n3=Q('var_agr_three_n3','N=3',['技巧'],()=>R('N=3时，三项式应近似写为？','3r+3r²≈大R',['3r+3r²≈大R','3r+6r²≈大R','3r+10r²≈大R','r+3r²≈大R'],'C_3^2=3。','三项式是Nr+C_N^2r²，N=3时为3r+3r²。'));
  const n4=Q('var_agr_three_n4','N=4',['技巧'],()=>R('N=4时，三项式应近似写为？','4r+6r²≈大R',['4r+6r²≈大R','4r+4r²≈大R','4r+10r²≈大R','6r+4r²≈大R'],'C_4^2=6。','N=4时二次项系数为6。'));
  const n5=Q('var_agr_three_n5','N=5',['技巧'],()=>R('N=5时，三项式应近似写为？','5r+10r²≈大R',['5r+10r²≈大R','5r+4r²≈大R','5r+5r²≈大R','10r+5r²≈大R'],'C_5^2=10。','N=5时二次项系数为C_5^2=10。'));
  const correct=Q('var_agr_three_not_4','口误纠正',['运用'],()=>R('若笔记转写成“5r+4r²”，应如何修正？','5r+10r²',['5r+10r²','5r+4r²','4r+5r²','10r+4r²'],'组合数C_5^2=10。','三项式通式为Nr+C_N^2r²，N=5时必须是5r+10r²。'));
  const three=C('var_agr_three','三项式代入',['技巧'],[n3,n4,n5,correct],'sequence');

  add(C('var_avg_growth_rate_estimate','变量训练｜年均增长率估算',['技巧'],[exact,two,bound,three],'all'));
})();
