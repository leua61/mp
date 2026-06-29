(function(){
  const {n,pct,op,R,Q,C,add,approx}=EX;
  const range=C('mixed_range_route','整体增长率在两者之间',['技巧'],[
    Q('mixed_range','范围判断',['技巧'],()=>{ const r1=n(2,8), r2=n(12,20); const ans=`介于${pct(r1)}和${pct(r2)}之间`; return R(`甲增长${pct(r1)}，乙增长${pct(r2)}，甲乙合计增长率应在哪里？`,ans,op(ans,[`小于${pct(r1)}`,`大于${pct(r2)}`,ans,'一定等于二者平均数']),'混合增长率在部分增长率之间。',`整体由甲乙组成，增长率必在${pct(r1)}与${pct(r2)}之间。`); }),
    Q('closer_big','靠近量大者',['技巧'],()=>R('混合增长率更靠近哪个部分的增长率？','现期量或基期量占比更大的部分',['现期量或基期量占比更大的部分','增长率更大的部分','增长率更小的部分','名字更长的部分'],'量大者权重更高。','整体增长率是加权结果，更靠近量大的部分。'))
  ],'sequence');
  const distance=C('mixed_distance_route','距离与量反比',['技巧'],[
    Q('distance_ratio','距离分配',['技巧'],()=>{ const small=1, big=3, rlow=8, rhigh=17; const gap=rhigh-rlow; const step=gap/(small+big); const ans=approx(rlow+step,1)+'%'; return R(`甲量:乙量=3:1，甲增长${pct(rlow)}，乙增长${pct(rhigh)}，整体增长率约为多少？`,ans,op(ans,[approx(rlow+gap/2,1)+'%',approx(rhigh-step,1)+'%',pct(rhigh)]),'整体靠近量大的甲。','总距离9个百分点按1:3分给两边，整体距甲约9/4=2.25个百分点，约10.3%。'); }),
    Q('reverse_unknown','反推未知R',['技巧'],()=>R('已知整体增长率和一个部分增长率，要估另一个部分增长率，核心依据是什么？','距离与部分量大小成反比',['距离与部分量大小成反比','直接相加','直接相减','只看选项最大'],'混合增长率在线段内部。','量越大，整体增长率离它越近；距离按量的反比分配。'))
  ],'sequence');
  const baseDiff=C('base_diff_route','基期做差',['运用'],[
    Q('base_diff_first','先求现期差',['技巧'],()=>{ const whole=n(3000,6000), part=n(500,1500); const ans=whole-part; return R(`整体现期${whole}，已知部分现期${part}，另一部分现期是多少？`,String(ans),op(ans,[whole+part,part,ans+100]),'先做现期差。',`${whole}-${part}=${ans}。`); }),
    Q('base_diff_sign','判断正负',['运用'],()=>R('基期做差题中，若差值部分增长率为正，则差值部分基期与现期相比如何？','基期小于现期',['基期小于现期','基期大于现期','二者相等','无法比较'],'正增长说明现期更大。','基期=现期/(1+正增长率)，所以小于现期。')),
    Q('base_diff_estimate','必要时估R',['技巧'],()=>R('若仅凭正负不能锁定选项，下一步应做什么？','估算差值部分增长率',['估算差值部分增长率','重新全算两个基期','改用贡献率','放弃题目'],'正负只能粗排。','可用混合增长率的距离关系估算差值部分增长率，再求基期。'))
  ],'sequence');
  add(C('mixed_growth_training_card','混合增长率｜变量训练',['技巧'],[range,distance,baseDiff],'all'));
})();
