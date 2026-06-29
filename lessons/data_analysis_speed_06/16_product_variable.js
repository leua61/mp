(function(){
  const {n,op,R,Q,C,add,pct}=EX;
  const q1=Q('prod_var_positive','正正乘积',['技巧'],()=>{
    const r1=n(4,12), r2=n(3,10); const ans=(r1+r2+r1*r2/100).toFixed(1)+'%';
    return R(`数量增长 ${r1}%，单价增长 ${r2}%，金额增长率约为？`,ans,op(ans,[`${r1+r2}%`,`${(r1+r2-r1*r2/100).toFixed(1)}%`,`${(r1*r2/100).toFixed(1)}%`]),'别漏乘积项。',`${r1}%+${r2}%+${r1}%×${r2}%=${ans}。`);
  });
  const q2=Q('prod_var_negative','正负乘积',['技巧'],()=>{
    const r1=n(8,16), r2=-n(3,9); const ans=(r1+r2+r1*r2/100).toFixed(1)+'%';
    return R(`面积增长 ${r1}%，单价下降 ${-r2}%，成交额增长率约为？`,ans,op(ans,[`${r1+r2}%`,`${(r1-r2).toFixed(1)}%`,`${(r1*r2/100).toFixed(1)}%`]),'下降率要带负号。',`r=${r1}%+(${r2}%)+${r1}%×(${r2}%)=${ans}。`);
  });
  const q3=Q('prod_var_pp_to_rate','百分点转增长率',['技巧'],()=>{
    const cur=(n(100,180)/10); const drop=(n(8,25)/10); const base=cur+drop; const rate=-(drop/base*100); const ans=rate.toFixed(1)+'%';
    return R(`某比重现期为 ${cur.toFixed(1)}%，比上年下降 ${drop.toFixed(1)} 个百分点。这个“比重本身”的增长率约为？`,ans,op(ans,[`-${drop.toFixed(1)}%`,`${drop.toFixed(1)}%`,`${(drop/cur*100).toFixed(1)}%`]),'增长率=变化量÷基期比重。',`基期比重=${cur.toFixed(1)}%+${drop.toFixed(1)}%=${base.toFixed(1)}%，增长率=-${drop.toFixed(1)}÷${base.toFixed(1)}≈${ans}。`);
  });
  const q4=Q('prod_var_whole_ratio','整体比重乘积',['技巧'],()=>{
    const rw=n(6,14); const rr=-n(5,15); const ans=(rw+rr+rw*rr/100).toFixed(1)+'%';
    return R(`整体量增长 ${rw}%，部分占整体的比重增长 ${rr}%。部分量增长率约为？`,ans,op(ans,[`${rw+rr}%`,`${rw}%`,`${rr}%`]),'部分量=整体量×比重。',`部分增长率=${rw}%+(${rr}%)+${rw}%×(${rr}%)=${ans}。`);
  });
  const q5=Q('prod_var_construct_import','构造进口',['技巧'],()=>{
    const rex=n(5,13), rshare=n(3,9); const ans=(rex+rshare+rex*rshare/100).toFixed(1)+'%';
    return R(`出口增长 ${rex}%，进口占出口比重增长 ${rshare}%。进口增长率约为？`,ans,op(ans,[`${rex+rshare}%`,`${rex}%`,`${rshare}%`]),'进口=(进口/出口)×出口。',`进口增长率=${rex}%+${rshare}%+${rex}%×${rshare}%=${ans}。`);
  });
  const routeA=C('prod_var_route_a','直接乘积｜顺序',['技巧'],[q1,q2],'sequence');
  const routeB=C('prod_var_route_b','比重构造｜顺序',['技巧'],[q3,q4,q5],'sequence');
  add(C('product_variable_card','乘积增长率｜变量训练',['技巧'],[routeA,routeB],'all'));
})();
