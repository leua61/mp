(function(){
  const {n,op,R,Q,C,add,fmt}=DA3;
  const formula1=Q('gr_formula_amount','增长率公式1',['基础'],()=>{
    const ans='增长率 = 增长量 ÷ 基期';
    return R('本节课最后开头讲到的增长率基本公式是？',ans,op(ans,['增长率 = 增长量 ÷ 现期','增长率 = 现期 ÷ 增长量','增长率 = 基期 ÷ 增长量']),'增长率描述“增长量相对于基期”。','增长率=增长量÷基期。');
  });
  const formula2=Q('gr_formula_current_base','增长率公式2',['基础'],()=>{
    const ans='增长率 = 现期 ÷ 基期 - 1';
    return R('若只给现期和基期，没有直接给增长量，增长率可以写成？',ans,op(ans,['增长率 = 基期 ÷ 现期 - 1','增长率 = 现期 + 基期 - 1','增长率 = 现期 ÷ 增长量 - 1']),'先把增长量写成现期-基期。','增长率=(现期-基期)÷基期=现期÷基期-1。');
  });
  const train=Q('gr_train_basic','增长量除基期变量',['技巧'],()=>{
    const base=n(500,1500), growth=n(50,300); const rate=growth/base*100;
    const ans=`${fmt(rate,1)}%`;
    return R(`基期 ${base}，增长量 ${growth}。增长率约为？`,ans,op(ans,[`${fmt(growth/(base+growth)*100,1)}%`,`${fmt((base+growth)/base*100,1)}%`,`${fmt(base/growth*100,1)}%`]),'增长率=增长量÷基期。',`${growth}÷${base}≈${fmt(rate,1)}%，所以增长率约为 ${ans}。`);
  });
  const train2=Q('gr_train_current_base','现基变量',['技巧'],()=>{
    const base=n(600,1400), rate=n(8,35); const cur=Math.round(base*(1+rate/100));
    const ans=`约 ${rate}%`;
    return R(`基期 ${base}，现期约 ${cur}。增长率最接近？`,ans,op(ans,[`约 ${rate+10}%`,`约 ${Math.max(1,rate-8)}%`,`约 ${Math.round(cur/base*100)}%`]),'现期÷基期-1。',`${cur}÷${base}-1≈${rate}%，所以最接近 ${ans}。`);
  });
  const variable=C('gr_variable','变量训练',['技巧'],[train,train2],'all');
  add(C('growth_rate_intro','增长率开头｜两个公式与代入',['基础'],[formula1,formula2,variable],'sequence'));
})();
