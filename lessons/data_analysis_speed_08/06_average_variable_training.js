(function(){
  const {n,one,pct,op,R,Q,C,add,approx}=EX;
  const rise=C('avg_rise_route','升降判断流程',['技巧'],[
    Q('avg_rise_random','随机升降',['技巧'],()=>{
      let rt=n(-5,30), rf=n(-5,30); if(rt===rf) rf+=1;
      const ans=rt>rf?'上升':'下降';
      return R(`某平均数=总量÷份数，R总=${pct(rt)}，R份=${pct(rf)}，平均数如何变化？`,ans,op(ans,['上升','下降','不变']), '比较R总和R份。',`R总-R份=${one(rt-rf)}个百分点，${rt>rf?'大于0，平均数上升。':'小于0，平均数下降。'}`);
    }),
    Q('avg_rise_eliminate','排除方向',['运用'],()=>{
      let rt=n(1,25), rf=rt+n(1,10); const ans='排除上升类选项';
      return R(`R总=${pct(rt)}，R份=${pct(rf)}。若选项有两个“上升”、两个“下降”，应先排除哪类？`,ans,op(ans,['排除下降类选项','排除上升类选项','全部保留','只看现期平均数']), 'R总小于R份。',`R总<R份，平均数下降，先排除上升类选项。`);
    })
  ],'sequence');
  const rate=C('avg_rate_route','增长率计算流程',['技巧'],[
    Q('avg_rate_random','随机增长率',['技巧'],()=>{
      let rt=n(5,30), rf=n(-5,20); if(rt===rf) rt+=5;
      const val=(rt-rf)/(100+rf)*100; const ans=approx(val,1)+'%';
      return R(`总量增长${pct(rt)}，份数增长${pct(rf)}，平均数增长率约为多少？`,ans,op(ans,[approx(val+1,1)+'%',approx(val-1,1)+'%',approx(rt-rf,1)+'%']), '用(R总-R份)/(1+R份)。',`(${pct(rt)}-${pct(rf)})/(1+${pct(rf)})≈${ans}。`);
    }),
    Q('avg_rate_flat','持平处理',['技巧'],()=>{
      let rt=n(3,18); const ans=pct(rt);
      return R(`总薪酬增长${pct(rt)}，人数与上年持平，人均薪酬增长率是多少？`,ans,op(ans,[pct(rt-1),pct(rt+1),'0%']), '持平就是R份=0。',`(R总-R份)/(1+R份)=(${pct(rt)}-0)/(1+0)=${ans}。`);
    })
  ],'sequence');
  const amount=C('avg_amount_route','增长量计算流程',['技巧'],[
    Q('avg_amount_random','随机增长量',['技巧'],()=>{
      let avg=n(40,200), rt=n(8,30), rf=n(-4,18); if(rt<=rf) rt=rf+n(3,12);
      const val=avg*(rt-rf)/(100+rt); const ans=approx(val,1);
      return R(`现期平均数为${avg}，R总=${pct(rt)}，R份=${pct(rf)}，平均数增长量约为多少？`,ans,op(ans,[approx(val+2,1),approx(val-2,1),approx((rt-rf),1)]), '用现期平均数×(R总-R份)/(1+R总)。',`${avg}×(${rt}-${rf})/(100+${rt})≈${ans}。`);
    }),
    Q('avg_amount_negative','负值排除',['运用'],()=>{
      let rt=n(1,8), rf=rt+n(2,10); const ans='不能作为上涨最多';
      return R(`某商品平均价格：R总=${pct(rt)}，R份=${pct(rf)}。若问“平均价格上涨最多”，该项应如何处理？`,ans,op(ans,['不能作为上涨最多','一定是最大','只看现期平均数','改用贡献率']), 'R总-R份为负。',`平均数增长量符号取决于R总-R份；这里为负，说明平均价格下降。`);
    })
  ],'sequence');
  add(C('average_variable_training_card','平均数升降｜变量训练',['技巧'],[rise,rate,amount],'all'));
})();
