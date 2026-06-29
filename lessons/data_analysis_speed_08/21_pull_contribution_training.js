(function(){
  const {n,pct,op,R,Q,C,add,approx}=EX;
  const pull=C('pull_calc_route','拉动增长计算',['技巧'],[
    Q('pull_known','已知增长量和基期',['技巧'],()=>{ const b=n(300,900), a=n(12,80); const val=a/b*100; const ans=approx(val,1)+'个百分点'; return R(`A增长量为${a}，B基期量为${b}，A拉动B增长约多少？`,ans,op(ans,[approx(val+1,1)+'个百分点',approx(val-1,1)+'个百分点',approx(a/b,1)+'个百分点']),'A增长量/B基期量。',`${a}/${b}×100%≈${ans}。`); }),
    Q('pull_reverse','反求A增长量',['技巧'],()=>{ const b=n(400,900), p=n(2,8); const ans=Math.round(b*p/100); return R(`A拉动B增长${p}个百分点，B基期量为${b}，A增长量约是多少？`,String(ans),op(ans,[ans+10,ans-10,Math.round(b/p)]),'把公式倒过来。',`A增长量≈${b}×${p}%=${ans}。`); }),
    Q('pull_base_convert','B基期转化',['技巧'],()=>{ const cur=n(500,1200), r=n(3,12); const ans='B现期量÷(1+B增长率)'; return R(`已知B现期量${cur}、B增长${pct(r)}，求拉动增长分母B基期量，应先怎样处理？`,ans,op(ans,['B现期量÷(1+B增长率)','B现期量×B增长率','B现期量÷A增长率','B现期量-B增长率']),'分母必须是B基期量。',`B基期量=现期量/(1+增长率)。`); })
  ],'sequence');
  const contrib=C('contrib_calc_route','贡献率计算',['技巧'],[
    Q('contrib_known','两个增长量',['技巧'],()=>{ const b=n(100,500), a=n(20,b-10); const val=a/b*100; const ans=approx(val,1)+'%'; return R(`A增长量${a}，B增长量${b}，A对B的贡献率约为多少？`,ans,op(ans,[approx(val+5,1)+'%',approx(val-5,1)+'%',approx(a/b,1)+'%']),'A增长量/B增长量。',`${a}/${b}×100%≈${ans}。`); }),
    Q('contrib_need_growth','先求增长量',['技巧'],()=>R('贡献率题只给现期量和增长率，没有直接给增长量时，第一步应做什么？','先分别求增长量',['先分别求增长量','直接用现期量相除','直接用增长率相减','改算基期比重'],'贡献率分子分母都是增长量。','需要先用现期量/(1+r)×r求出相关增长量。'))
  ],'sequence');
  const diff=C('pull_contrib_diff_route','二者辨析',['基础'],[
    Q('keyword_pull','拉动关键词',['基础'],()=>R('题干出现“拉动……增长多少百分点”，优先使用哪个公式？','拉动增长',['拉动增长','贡献率','翻番','年均增长量'],'关键词直接提示公式。','拉动增长=A增长量/B基期量。')),
    Q('keyword_contrib','贡献关键词',['基础'],()=>R('题干出现“对……增长的贡献率”，优先使用哪个公式？','贡献率',['贡献率','拉动增长','比重变化','平均数增长率'],'关键词直接提示公式。','贡献率=A增长量/B增长量。'))
  ],'all');
  add(C('pull_contribution_training_card','拉动与贡献｜变量训练',['技巧'],[pull,contrib,diff],'all'));
})();
