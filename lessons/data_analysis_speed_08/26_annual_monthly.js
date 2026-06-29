(function(){
  const {R,Q,C,add,n,op}=EX;
  const subs=[
    Q('annual_amount','年均增长量',['基础'],()=>{ const a=n(100,300), years=n(3,8), b=a+n(20,60)*years; const ans=(b-a)/years; return R(`初期${a}，${years}年后为${b}，年均增长量是多少？`,String(ans),op(ans,[ans+1,ans-1,b-a]),'末期减初期，再除以年份差。',`(${b}-${a})/${years}=${ans}。`); }),
    Q('monthly_amount','月均增长量',['基础'],()=>{ const a=n(80,200), months=n(4,10), inc=n(5,20), b=a+inc*months; return R(`初月${a}，${months}个月后为${b}，月均增长量是多少？`,String(inc),op(inc,[inc+1,inc-1,b-a]),'末期减初期，再除以月份差。',`(${b}-${a})/${months}=${inc}。`); }),
    Q('month_boundary','月份基点',['技巧'],()=>R('问“7月至次年3月月平均增量”，材料给6月、7月、3月数据，通常应以哪个月作初始量？','6月',['6月','7月','3月','任选'],'7月的增量相对于6月产生。','若计算7月到3月每月增量，需要用3月量-6月量，再除以9个月。')),
    Q('annual_not_avg_rate','不要混同',['基础'],()=>R('年均/月均增长量与平均数增长率是否同一类公式？','不是',['是','不是','只差一个百分号','只在月份题相同'],'一个按时间平均，一个按总量/份数变化。','年均/月均增长量=(末期-初期)/时间差；平均数增长率=(R总-R份)/(1+R份)。'))
  ];
  add(C('annual_monthly_card','年均月均｜增长量边界',['基础'],subs,'all'));
})();
