(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const r1=Q('ns_diff_identify','入口识别',['基础'],()=>R(
    '和差分析最常用、最先试的一步是什么？',
    '做差',
    op('做差',['通分','查顺差','算权重']),
    '单调三倍以内时，先看相邻差。',
    '做差后可能是一阶等差、二级等差、倍数差或递推关系。'
  ));

  const d1=Q('ns_first_diff_constant','一级差常数',['技巧'],()=>{
    const a=n(1,30), d=n(2,15);
    const arr=[a,a+d,a+2*d,a+3*d];
    const ans=String(a+4*d);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(a+5*d),String(a+3*d+d+1),String(a+4*d-1)]),
      '相邻差相同，下一项继续加同一个差。',
      `差值都是 ${d}，所以下一项是 ${arr[3]}+${d}=${ans}。`
    );
  });

  const d2=Q('ns_second_diff','二级差',['技巧'],()=>{
    const a=n(5,30), d1v=n(1,6), step=n(2,5);
    const arr=[a];
    let diff=d1v;
    for(let i=0;i<4;i++){arr.push(arr[arr.length-1]+diff); diff+=step;}
    const ans=String(arr[4]+diff);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(Number(ans)+step),String(arr[4]+d1v),String(arr[4]*2)]),
      '先做一级差，若一级差成等差，再回带。',
      `一级差为 ${d1v}、${d1v+step}、${d1v+2*step}、${d1v+3*step}，下一差为 ${diff}，答案 ${arr[4]}+${diff}=${ans}。`
    );
  });

  const d3=Q('ns_recursive_sum','递推和',['技巧'],()=>{
    const a=n(1,6), b=n(2,9);
    const arr=[a,b,a+b,a+2*b,2*a+3*b];
    const ans=String(arr[3]+arr[4]);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(arr[4]+1),String(arr[4]*2),String(arr[2]+arr[4])]),
      '观察前两项能否相加得到后一项。',
      `${arr[0]}+${arr[1]}=${arr[2]}，${arr[1]}+${arr[2]}=${arr[3]}，${arr[2]}+${arr[3]}=${arr[4]}，所以下一项 ${arr[3]}+${arr[4]}=${ans}。`
    );
  });

  const drill=C('ns_diff_variable_route','变量训练',['技巧'],[d1,d2,d3],'sequence');
  add(C('ns_diff_card','和差分析｜做差与递推',['技巧'],[r1,drill],'all'));
})();
