(function(){
  const {n,op,R,Q,C,add}=EX;
  const q1=Q('ga_var_one_over_n','1/n 增长量',['技巧'],()=>{
    const den=n(4,9); const present=(den+1)*n(30,120); const ans=String(present/(den+1));
    return R(`现期量为 ${present}，增长率约为 1/${den}，增长量约是多少？`,ans,op(ans,[String(present/den),String(Math.round(present/(den+2))),String(present)]),'1/n 增长率对应现期 n+1 份。',`增长量≈现期÷(${den}+1)=${present}÷${den+1}=${ans}。`);
  });
  const q2=Q('ga_var_m_over_n','m/n 增长量',['技巧'],()=>{
    const m=2, den=7; const unit=n(20,80); const present=(den+m)*unit; const ans=String(m*unit);
    return R(`现期量为 ${present}，增长率约为 2/7，增长量约是多少？`,ans,op(ans,[String(unit),String(den*unit),String(Math.round(present/7))]),'基期 7 份，增长 2 份，现期 9 份。',`现期 ${present} 对应 9 份，每份 ${unit}，增长量 2 份=${ans}。`);
  });
  const q3=Q('ga_var_decrease','下降减少量',['技巧'],()=>{
    const den=n(5,10); const r=1/den; const present=(den-1)*n(40,110); const ans=String(Math.round(present/(den-1)));
    return R(`现期量为 ${present}，下降率约为 1/${den}，减少量约是多少？`,ans,op(ans,[String(Math.round(present/(den+1))),String(Math.round(present/den)),String(present)]),'下降时现期是基期少一份。',`下降 1/${den} 表示基期 ${den} 份，现期 ${den-1} 份；减少量 1 份=${present}÷${den-1}≈${ans}。`);
  });
  const q4=Q('ga_var_method_by_options','按选项选法',['技巧'],()=>{
    const close=n(0,1)===1; const ans=close?'反代思维':'直除或划线';
    const desc=close?'选项如 268.1、268.5、269.0、269.4，前三位接近':'选项如 400、520、670、810，首位不同';
    return R(`求增长量时，${desc}。优先策略是？`,ans,op(ans,['反代思维','直除或划线','因子特征','逐位精算到小数后六位']),'先看选项精度。',`${close?'选项接近千分级，普通估算不够，应反代。':'首位差异大，直除或划线足够。'}`);
  });
  const q5=Q('ga_var_reverse_mid','反代中间值',['技巧'],()=>{
    const lo=n(2600,3900); const vals=[lo,lo+8,lo+13,lo+21]; const mid=lo+11;
    return R(`四个增长量选项约为 ${vals.join('、')}。反代时取 ${mid} 这样的值是否必须是选项？`,'不必须，只要夹在选项间且方便算',op('不必须，只要夹在选项间且方便算',['必须等于 A 选项','必须等于最大选项','只能取整数 1000']), '反代值是工具，不是答案本身。','反代值可以不是任何选项；关键是夹在选项区间内，并让做差或乘法更方便。');
  });
  const routeA=C('ga_var_route_a','分数法｜顺序',['技巧'],[q1,q2,q3],'sequence');
  const routeB=C('ga_var_route_b','选项法｜顺序',['技巧'],[q4,q5],'sequence');
  add(C('growth_amount_variable_card','增长量｜变量训练',['技巧'],[routeA,routeB],'all'));
})();
