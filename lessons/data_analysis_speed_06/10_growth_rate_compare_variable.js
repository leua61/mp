(function(){
  const {n,op,R,Q,C,add}=EX;
  const q1=Q('gr_var_current_base','现期基期比较',['技巧'],()=>{
    const b1=n(100,300), inc1=n(18,50), b2=n(120,360), inc2=n(5,16);
    const r1=inc1/b1, r2=inc2/b2; const ans=r1>r2?'甲':'乙';
    return R(`甲：基期 ${b1}、现期 ${b1+inc1}；乙：基期 ${b2}、现期 ${b2+inc2}。谁增长率更大？`,ans,op(ans,['甲','乙','一样大','无法判断']),'可比较增长量÷基期。',`甲增长率=${inc1}/${b1}≈${(r1*100).toFixed(1)}%；乙=${inc2}/${b2}≈${(r2*100).toFixed(1)}%，所以${ans}更大。`);
  });
  const q2=Q('gr_var_inc_base','增长量基期比较',['技巧'],()=>{
    const base=n(200,700); const incA=n(20,60); const incB=incA+n(5,35);
    const ans='乙';
    return R(`甲增长量 ${incA}、基期 ${base}；乙增长量 ${incB}、基期 ${base}。谁增长率更大？`,ans,op(ans,['甲','乙','一样大','无法判断']),'基期相同，看增长量。',`基期相同，增长量 ${incB}>${incA}，所以乙增长率更大。`);
  });
  const q3=Q('gr_var_ref_above','大于 1 参照',['技巧'],()=>{
    const d1=n(80,160), extra1=n(18,35), d2=n(80,160), extra2=n(5,15);
    const a1=d1+extra1, a2=d2+extra2; const ans=(extra1/d1>extra2/d2)?'甲':'乙';
    return R(`甲=${a1}/${d1}，乙=${a2}/${d2}，两个都大于 1。谁更大？`,ans,op(ans,['甲','乙','一样大','无法判断']),'都大于 1，看超过 1 的幅度。',`甲超过 1 的幅度约 ${extra1}/${d1}，乙约 ${extra2}/${d2}；幅度更大者分数更大，所以选${ans}。`);
  });
  const q4=Q('gr_var_ref_below','小于 1 参照',['技巧'],()=>{
    const d1=n(100,220), gap1=n(5,15), d2=n(100,220), gap2=n(20,40);
    const a1=d1-gap1, a2=d2-gap2; const ans=(gap1/d1<gap2/d2)?'甲':'乙';
    return R(`甲=${a1}/${d1}，乙=${a2}/${d2}，两个都小于 1。谁更大？`,ans,op(ans,['甲','乙','一样大','无法判断']),'都小于 1，离 1 越近越大。',`甲到 1 需上升约 ${gap1}/${d1}，乙需上升约 ${gap2}/${d2}；上升少者原来更大，所以选${ans}。`);
  });
  const q5=Q('gr_var_method_choose','形式选择',['技巧'],()=>{
    const cur=n(900,1500); const base=cur-n(20,80); const ans='增长量÷基期';
    return R(`比较 ${cur}/${base}−1 这类增长率时，哪种改写通常更好看？`,ans,op(ans,['现期÷基期继续硬除','增长量÷基期','现期×基期','只看现期']), '现期与基期接近，差值更小。',`${cur}/${base}−1=(${cur}-${base})/${base}，分子变小，更容易比较。`);
  });

  const q6=Q('gr_var_relative_error','相对误差比较',['技巧'],()=>{
    const top=900, bottom=1000;
    const downTop=n(80,150);
    const downBottom=downTop-n(20,50);
    const aTop=top, aBottom=bottom, bTop=top-downTop, bBottom=bottom-downBottom;
    const ans=(aTop/aBottom>bTop/bBottom)?'甲':'乙';
    return R(`甲=${aTop}/${aBottom}，乙=${bTop}/${bBottom}。从甲变到乙时，分子少 ${downTop}、分母少 ${downBottom}，谁更大？`,ans,op(ans,['甲','乙','一样大','无法判断']),'比较相对下降幅度，不只看绝对差。',`分子下降 ${downTop}/${top}，分母下降 ${downBottom}/${bottom}；分子相对下降更大，所以分数变小，原来的甲更大。`);
  });
  const routeA=C('gr_var_route_a','两种形式｜顺序',['技巧'],[q1,q2,q5],'sequence');
  const routeB=C('gr_var_route_b','参照一｜顺序',['技巧'],[q3,q4,q6],'sequence');
  add(C('growth_rate_compare_variable_card','增长率比较｜变量训练',['技巧'],[routeA,routeB],'all'));
})();
