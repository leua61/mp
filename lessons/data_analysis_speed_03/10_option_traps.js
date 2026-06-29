(function(){
  const {n,op,R,Q,C,add,fmt,numOps}=DA3;
  const precision=Q('trap_precision_rule','选项决定精度',['运用'],()=>{
    const ans='精度由选项差距决定，不由题干数字大小决定';
    return R('为什么增长率只有0.7%时也不能一定忽略分母？',ans,op(ans,['增长率越小越不能算','题干数字越大越要精算','所有估算都绝对不可靠']),'看选项是否接近。','若选项之间只有千分之几差距，哪怕增长率很小，也不能粗估；如果选项差距很大，才可大胆估。');
  });
  const farOption=Q('trap_far_option','首位不同大胆估',['运用'],()=>{
    const ans='选项首位差异明显时，先估数量级和首位，不必精算到底';
    return R('选项首位明显不同，题目只是普通乘除估算时，正确策略是？',ans,op(ans,['必须算到小数点后三位','直接跳过材料','优先使用反带假设']),'选项本身告诉你需要的精度。','若选项首位不同，估到首位通常就能排除；若选项非常接近，才需要更精或反带。');
  });
  const lineBoundary=Q('trap_line_boundary','划线加减边界',['技巧'],()=>{
    const ans='划线法主要服务乘除估算，复杂分数加减不能机械套';
    return R('为什么“错位加减法/划线法”不能在所有分数加减里通用？',ans,op(ans,['因为乘除永远比加减简单','因为百分数不能出现小数','因为所有加减题都只能精算']),'加减会放大局部误差。','划线后单个乘除式可能很准，但两个接近结果再相减时，差值变小，误差占比会被放大，所以复杂分数加减要谨慎。');
  });
  const sumTrap=Q('trap_sum_rule','A等于B加C',['运用'],()=>{
    const ans='所求总量包含几个部分时，看选项是否有两个陷阱项相加等于总量项';
    return R('资料分析中的“反陷阱 A=B+C”适用在哪里？',ans,op(ans,['只适用于数量关系，资料分析不能用','只要看到百分号就用','只适用于平均数题']),'看所求对象是否由部分组成。','例如水产品=养殖水产品+捕捞水产品。出题人常把两个部分和总量同时放进选项。');
  });
  const reverseRule=Q('trap_reverse_rule','反带假设规则',['技巧'],()=>{
    const ans='选项极接近、正向估算分不清时，假设一个增长量，先求基期，再用基期×增长率反推';
    return R('反带假设法适合什么场景？',ans,op(ans,['选项首位完全不同','只要题目有百分号就用','题目问百分点时优先用']),'核心是选项接近。','选项很近时，正确答案范围已被压缩。任选一个近似增长量反带求基期，再用基期×增长率可唯一指向答案。');
  });
  const error=Q('trap_error_magnify','误差放大原理',['技巧'],()=>{
    const ans='加减法会放大误差，乘除法更适合划线估算';
    return R('为什么划线法适合乘除，但对复杂分数加减要谨慎？',ans,op(ans,['加减法会自动抵消所有误差','乘除法一定不能估算','只要保留三位，加减永远准确']),'两个很准的估算值相减，差值可能很小。','单个乘除估算可能只有千分误差，但两个接近数相减后，差值被缩小，误差占比会被放大。反带法正是利用加减法放大差异。');
  });
  const sumTrain=Q('trap_sum_train','总量陷阱变量',['运用'],()=>{
    const b=n(1200,3600), c=n(500,1800), a=b+c;
    const ans=`${a}`;
    return R(`某总量由甲部分和乙部分构成。估算后甲约 ${b}，乙约 ${c}。若问总量，选项里应优先锁定哪个？`,ans,op(ans,[String(b),String(c),String(a+n(80,160)),String(Math.max(1,a-n(80,160)))]),'总量=部分+部分。',`${b}+${c}=${a}。若选项中同时出现部分值与和值，和值通常就是总量答案。`);
  });
  const crossTrain=Q('trap_cross_year','跨期分段变量',['运用'],()=>{
    const a=n(180,420), b=n(150,360), total=a+b;
    const ans=String(total);
    return R(`2012比2011多约 ${a}，2011比2010多约 ${b}。若问2012比2010多多少，应选？`,ans,op(ans,[String(a),String(b),String(total+n(20,80)),String(Math.max(1,total-n(20,80)))]),'跨期增长量可拆成两段相加。',`2012-2010=(2012-2011)+(2011-2010)=${a}+${b}=${total}。`);
  });
  const reverseTrain=Q('trap_reverse_train','反带变量',['技巧'],()=>{
    const rate=[0.5,0.6,0.7,0.8,0.9,1.1][n(0,5)];
    const base=n(38000,56000); const growth=Math.round(base*rate/100); const cur=base+growth;
    const ans=String(growth);
    return R(`现期 ${cur}，增长率 ${rate}%。选项非常接近：${growth-3}、${growth}、${growth+2}、${growth+5}。用反带法应选？`,ans,op(ans,[String(growth-3),String(growth+2),String(growth+5)]),'可假设一个选项为增长量，现期-增长量≈基期。',`真实增长量约为基期×${rate}%。因为选项很近，反带任一选项都会指向 ${growth} 左右，所以选 ${growth}。`);
  });
  const sumRoute=C('trap_sum_route','A=B+C变量',['运用'],[sumTrain,crossTrain],'all');
  const train=C('trap_variable','变量训练',['运用'],[sumRoute,reverseTrain],'all');
  add(C('option_traps','选项意识与反陷阱｜精度、A=B+C、反带',['运用'],[precision,farOption,lineBoundary,sumTrap,reverseRule,error,train],'sequence'));
})();
