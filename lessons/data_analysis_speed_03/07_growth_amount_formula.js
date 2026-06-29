(function(){
  const {n,op,R,Q,C,add,numOps,fmt}=DA3;
  const definition=Q('ga_definition','增长量定义',['基础'],()=>{
    const ans='增长量 = 现期 - 基期';
    return R('“现在比过去多了多少”对应资料分析中的哪个基本公式？',ans,op(ans,['增长率 = 现期 - 基期','基期 = 现期 - 增长率','百分点 = 现期 - 基期']),'增长量是绝对差。','增长量就是现期比基期多出的量，所以增长量=现期-基期。');
  });
  const currentFormula=Q('ga_current_formula','现期公式',['基础'],()=>{
    const ans='增长量 = 现期 ÷ (1+r) × r';
    return R('已知现期和增长率，求增长量，最常用公式是？',ans,op(ans,['增长量 = 现期 × (1+r)','增长量 = 现期 ÷ r','增长量 = 现期 ÷ 基期 - 1']),'用基期公式替换基期。','由基期=现期÷(1+r)，增长量=基期×r，所以增长量=现期÷(1+r)×r。');
  });
  const baseFormula=Q('ga_base_formula','基期公式',['基础'],()=>{
    const ans='增长量 = 基期 × r';
    return R('已知基期和增长率，求增长量，直接用哪个公式？',ans,op(ans,['增长量 = 基期 ÷ r','增长量 = 现期 ÷ (1+r)','增长量 = 基期 + r']),'基期是“原来的量”。','比基期增长 r，增长出来的部分就是基期×r。');
  });
  const unitJudge=Q('ga_unit_judge','单位判断',['基础'],()=>{
    const ans='增长量';
    return R('题目问“比上年增长约多少”，选项为 120亿元、150亿元、180亿元、210亿元。它问的是？',ans,op(ans,['增长率','百分点','同比时间']),'看选项单位。','选项带“亿元”，是绝对量，所以问增长量；增长率通常是百分号。');
  });
  const formulaTrain=Q('ga_train_formula','现期代入变量',['技巧'],()=>{
    const cur=n(800,2200), r=n(8,35);
    const ans=`${cur} ÷ (1+${r}%) × ${r}%`;
    return R(`现期为 ${cur}，同比增长 ${r}%。求增长量，正确列式是？`,ans,op(ans,[`${cur} × (1+${r}%)`,`${cur} ÷ ${r}%`,`${cur} ÷ (1+${r}%)`]),'已知现期和增长率。',`套公式：增长量=现期÷(1+r)×r，所以是 ${ans}。`);
  });
  const baseTrain=Q('ga_train_base','基期代入变量',['技巧'],()=>{
    const base=n(500,1500), r=n(5,28);
    const val=base*r/100;
    const ans=fmt(val,1);
    return R(`基期为 ${base}，增长率为 ${r}%。增长量约是多少？`,ans,numOps(val,[val+base*0.01,val-base*0.01,base*(1+r/100)],'',1),'已知基期，直接乘增长率。',`增长量=基期×r=${base}×${r}%=${fmt(val,1)}。`);
  });
  const train=C('ga_formula_variable','变量代入',['技巧'],[formulaTrain,baseTrain],'all');
  add(C('growth_amount_formula','增长量公式｜定义、三种条件与单位识别',['基础'],[definition,currentFormula,baseFormula,unitJudge,train],'sequence'));
})();
