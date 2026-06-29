(function(){
  const {n,op,R,Q,C,add,pk}=EX;

  const change=C('ratio_change_random','比重变化变量',['技巧'],[
    Q('ratio_change_amount_var','比重变化量数值',['技巧'],()=>{
      const partRate=n(3,14), wholeRate=n(partRate+1,partRate+8); const share=n(18,42);
      const raw=share*(wholeRate-partRate)/(100+partRate); const ans=`下降约 ${Math.round(raw*10)/10} 个百分点`;
      return R(
        `现期比重约 ${share}%，部分增长 ${partRate}%，整体增长 ${wholeRate}%。比重变化最接近？`, ans,
        op(ans,[`上升约 ${Math.round(raw*10)/10} 个百分点`,`下降约 ${Math.round((raw+1)*10)/10} 个百分点`,`下降约 ${Math.max(0.1,Math.round((raw-1)*10)/10)} 个百分点`]),
        '先看部分增速和整体增速，再估变化幅度。',
        `部分增速小于整体增速，比重下降；变化量≈${share}%×(${wholeRate}-${partRate})%÷(1+${partRate}%)≈${ans.replace('下降约 ','')}。`
      );
    }),
    Q('ratio_direction_random','比重方向随机',['基础'],()=>{
      const rp=n(4,16), rt=n(4,16); const ans=rp>rt?'上升':(rp<rt?'下降':'基本不变');
      return R(
        `某部分增长 ${rp}%，整体增长 ${rt}%。该部分占整体的比重如何变化？`, ans,
        op(ans,['上升','下降','基本不变','无法由增速判断']),
        '比重方向只看 r部 与 r整。',
        rp>rt?`r部=${rp}% > r整=${rt}%，比重上升。`:rp<rt?`r部=${rp}% < r整=${rt}%，比重下降。`:`r部=r整，比重大体不变。`
      );
    })
  ],'all');

  const funding=C('funding_random','资助率变量',['技巧'],[
    Q('funding_rate_reverse_random','资助率反推整体随机',['技巧'],()=>{
      const rate=pk([20,25,40,50]); const funded=n(800,2400); const total=Math.round(funded*100/rate);
      return R(
        `某类项目资助 ${funded} 项，平均资助率为 ${rate}%。接收申请项目数约为多少？`, String(total),
        op(total,[Math.round(funded*rate/100),funded+rate,Math.round(total*1.1)]),
        '资助率是资助项目占申请项目的比重。',
        `资助率=${funded}/申请数=${rate}%，所以申请数≈${funded}÷${rate}%=${total}。`
      );
    }),
    Q('avg_strength_random','资助强度随机',['技巧'],()=>{
      const fee=n(1200,8800), items=n(200,900); const ans=String(Math.round(fee/items*10)/10);
      return R(
        `某项目直接费用 ${fee}，资助项数 ${items}。平均资助强度约为多少？`, ans,
        op(ans,[String(Math.round(items/fee*10)/10),String(Math.round((fee+items)/10)/10),String(items)]),
        '强度是费用除以项数，不是资助率。',
        `平均资助强度=${fee}÷${items}≈${ans}。`
      );
    })
  ],'all');

  add(C('ratio_random_enrichment','比重升华｜方向、资助率与强度',['技巧'],[change,funding],'all'));
})();
