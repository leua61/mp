(function(){
  const {n,op,R,Q,C,add,d}=EX;
  const thousandNoIgnore=Q('calc_train_no_ignore','0.4%不忽略',['运用'],()=>{
    const cur=n(2500,3900), perm=n(3,8); const rate=perm/10; const ans=String(d(cur/(1+rate/100),0));
    return R(`现期 ${cur}，增长率 ${rate.toFixed(1)}%。若选项只差千分级，基期约为？`,ans,op(ans,[String(cur),String(d(cur*(1-rate/100),0)),String(d(cur+perm,0)),String(d(cur-perm,0))]),'0.4% 这类小量在选项很近时不能直接丢。',`基期=${cur}÷(1+${rate.toFixed(1)}%)≈${ans}。粗暴选 ${cur} 可能错。`);
  });
  const oneSide=Q('calc_train_one_side','只动一边',['技巧'],()=>R(
    '千分位划线时，课程建议分子分母怎样处理更不容易乱？',
    '只动其中一个，别两边同时乱改',
    ['只动其中一个，别两边同时乱改','分子分母必须都改','只能改答案','完全不能估算'],
    '千分级误差本来就小，操作要稳。',
    '只调整分子或分母之一，再补偿误差，能降低混乱。'
  ));
  const compensate=Q('calc_train_compensate','补偿误差',['技巧'],()=>R(
    '把除数略看大后，直接除出的结果会怎样？',
    '偏小，需要向上补偿',
    ['偏小，需要向上补偿','偏大，需要向下补偿','完全不变','必为负'],
    '除数越大，商越小。',
    '估算时若把分母看大，初步商偏小，要根据误差方向补回。'
  ));
  const route1=C('calc_thousand_route','千分位划线',['技巧'],[thousandNoIgnore,oneSide,compensate],'sequence');

  const frac143=Q('calc_train_frac_143','143骨架',['技巧'],()=>R(
    '看到 0.143、14.3%、143/1000 这类骨架，优先联想到：',
    '1/7',
    op('1/7',['1/6','1/8','1/9','2/7']),
    '143 是七分之一的近似循环节。',
    '1÷7≈0.142857，四舍五入可记成 0.143。'
  ));
  const frac571=Q('calc_train_frac_571','571骨架',['技巧'],()=>R(
    '看到 0.571、57.1% 这类骨架，优先联想到：',
    '4/7',
    op('4/7',['3/7','5/7','4/9','1/7']),
    '571 是七分之四的近似骨架。',
    '4÷7≈0.5714，所以 0.571 常可转为 4/7 辅助估算。'
  ));
  const fracUse=Q('calc_train_frac_use','转化目的',['运用'],()=>R(
    '分数转化的目的是什么？',
    '服务选项判断，减少无意义精算',
    ['服务选项判断，减少无意义精算','背得越多越好','替代所有公式','只用于指数题'],
    '速算方法要看选项。',
    '0.143≈1/7 这类转化，是为了快速定位选项或判断大小，不是为了脱离题目背小数。'
  ));
  const routeFrac=C('calc_fraction_route','分数转化',['技巧'],[frac143,frac571,fracUse],'all');

  const divSmall=Q('calc_train_div_small','小 r 场景',['技巧'],()=>{
    const A=n(2000,5000), r=n(2,8); const ans=String(d(A*(1-r/100),0));
    return R(`${A}÷(1+${r}%) 可用化除为乘近似为多少？`,ans,op(ans,[String(d(A*(1+r/100),0)),String(d(A/(1-r/100),0)),String(A),String(d(A-r,0))]),'A/(1+r)≈A(1-r)。',`${A}×(1-${r}%)≈${ans}。`);
  });
  const divBias=Q('calc_train_div_bias','偏大偏小',['技巧'],()=>R(
    'r>0 时，A(1-r) 与 A/(1+r) 相比一般怎样？',
    'A(1-r) 略小',
    ['A(1-r) 略小','A(1-r) 略大','完全相等','无法判断'],
    '忽略的是分母里的 1-r²。',
    '真实值=A(1-r)/(1-r²)，分母小于 1，所以真实值略大，A(1-r) 略小。'
  ));
  const divLarge=Q('calc_train_div_large','大 r 边界',['运用'],()=>R(
    '如果 r=45%，还机械用 A(1-r) 近似 A/(1+r)，最大风险是：',
    'r² 不小，误差明显',
    ['r² 不小，误差明显','答案一定更精确','题目必然无解','增长率会变成百分点'],
    '45% 的平方已经不小。',
    '化除为乘依赖忽略 r²，r 大时不能放心忽略。'
  ));
  const route2=C('calc_div_route','化除为乘',['技巧'],[divSmall,divBias,divLarge],'sequence');

  const reverseNear=Q('calc_train_reverse_near','选项很近',['运用'],()=>R(
    '增长量选项为 765、771、778、785 这类很近数据时，优先考虑：',
    '反代思维',
    ['反代思维','只看首位','把增长率全忽略','直接选中间'],
    '选项近，粗算不够。',
    '可取一个夹在选项中的好算假设值，再用基期×增长率验证。'
  ));
  const reverseMid=Q('calc_train_reverse_mid','中间假设',['技巧'],()=>R(
    '反代假设增长量时，为什么不一定要取某个选项本身？',
    '只要夹在选项之间且好算，就足够接近真实值',
    ['只要夹在选项之间且好算，就足够接近真实值','必须取最大选项','必须取最小选项','不能假设'],
    '假设值用于验证方向和接近程度。',
    '答案就在选项附近，取中间好算值能让后续乘法更顺。'
  ));
  const reverseVerify=Q('calc_train_reverse_verify','基期验证',['技巧'],()=>R(
    '增长量反代的验证式是：',
    '基期×增长率≈假设增长量',
    ['基期×增长率≈假设增长量','现期×基期≈增长率','指数-100≈基期','增长率÷现期≈增长量'],
    '先用现期减假设值得基期。',
    '若基期×增长率接近假设增长量，说明假设接近答案。'
  ));
  const route3=C('calc_reverse_route','反代思维',['运用'],[reverseNear,reverseMid,reverseVerify],'sequence');

  const remove10=Q('calc_train_remove10','结果在10点几',['技巧'],()=>R(
    '若 a/b 的选项都在 10 点几，改选项可先算什么？',
    'a/b-10=(a-10b)/b',
    ['a/b-10=(a-10b)/b','a/b+10=(a+10b)/b','a/b×10','a-b/10'],
    '先拿掉共同的 10。',
    '把共同整数部分拿掉后，剩余选项差异更明显。'
  ));
  const remove4=Q('calc_train_remove4','结果在4点几',['技巧'],()=>R(
    '若 a/b 的选项都在 4 点几，改选项更适合先减：',
    '4',
    ['4','10','100','0'],
    '减掉共同整数部分。',
    '结果在 4 点几，先算 a/b-4=(a-4b)/b。'
  ));
  const observeRest=Q('calc_train_observe_rest','观察剩余选项',['技巧'],()=>R(
    '改选项后，剩余选项差距变大，接下来应：',
    '用粗算判断剩余部分，再还原原答案',
    ['用粗算判断剩余部分，再还原原答案','重新精确计算所有原式','放弃题目','只选最大值'],
    '剩余差异已经被放大。',
    '先判断剩余部分落在哪个选项，再加回被减掉的共同部分。'
  ));
  const deep=C('calc_change_deep','去掉共同整数部分',['技巧'],[remove10,remove4],'sequence');
  const route4=C('calc_change_route','改选项法',['运用'],[deep,observeRest],'sequence');
  add(C('calculation_training','速算与精算边界｜变量训练',['运用'],[route1,routeFrac,route2,route3,route4],'all'));
})();
