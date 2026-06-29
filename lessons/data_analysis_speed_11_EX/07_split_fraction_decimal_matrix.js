(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const s1=Q('ns_split_trigger','拆分触发',['基础'],()=>R(
    '常规做差、倍数、次方、分组都无规律，且每项多为三位数以上，优先考虑什么？',
    '数字拆分',
    op('数字拆分',['顺差逆差','平均数升降','基期比重']),
    '拆分属于二级考点，不是第一反应。',
    '三位数、四位数以上尤其常见，可从中间或按位拆。'
  ));

  const s2=Q('ns_split_drill','两段拆分',['技巧'],()=>{
    const a=n(12,20), step=n(1,3);
    const b=n(20,40), bstep=n(2,5);
    const arr=[];
    for(let i=0;i<4;i++) arr.push(String(a+i*step)+String(b+i*bstep));
    const ans=String(a+4*step)+String(b+4*bstep);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(a+4*step)+String(b+3*bstep),String(a+3*step)+String(b+4*bstep),String((a+4*step)*(b+4*bstep))]),
      '把四位数从中间拆成前两位和后两位。',
      `前两位为 ${a}、${a+step}、${a+2*step}、${a+3*step}，后两位为 ${b}、${b+bstep}、${b+2*bstep}、${b+3*bstep}，下一项为 ${ans}。`
    );
  });

  const f1=Q('ns_fraction_trigger','分数入口',['基础'],()=>R(
    '分数项多于整数项时，第一步通常先做什么？',
    '化简，再看分子分母',
    op('化简，再看分子分母',['直接通分所有项','只看整数项','按顺差判断']),
    '分数可能被包装过。',
    '化简后，分子单独看、分母单独看；若分母倍数明显，再考虑通分做差。'
  ));

  const f2=Q('ns_fraction_drill','分子分母',['技巧'],()=>{
    const top=n(1,4);
    const start=n(2,5);
    const arr=[`${top}/${start}`,`${top}/${start+1}`,`${top}/${start+2}`,`${top}/${start+3}`];
    const ans=`${top}/${start+4}`;
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[`${top+1}/${start+4}`,`${top}/${start+3}`,`${top+start}/${start+4}`]),
      '分子不变，分母等差增加。',
      `分母为 ${start}、${start+1}、${start+2}、${start+3}，下一项为 ${ans}。`
    );
  });

  const d1=Q('ns_decimal_rule','小数规则',['基础'],()=>R(
    '小数数列和分数数列相似，小数点相当于什么？',
    '分数线',
    op('分数线',['增长率','权重','顺差线']),
    '小数点前后可分开看。',
    '整数部分对应分子思路，小数部分对应分母思路；也可用前一项整数部分和小数部分运算推出后项。'
  ));

  const d2=Q('ns_decimal_drill','整数小数拆看',['技巧'],()=>{
    const a=n(1,4), b=n(1,5), c=n(1,4), e=n(1,4);
    const ints=[a,b,a+b,a+2*b,2*a+3*b];
    const decs=[c,e,c+e,c+2*e,2*c+3*e];
    const arr=ints.slice(0,4).map((v,i)=>`${v}.${decs[i]}`);
    const ans=`${ints[4]}.${decs[4]}`;
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[`${ints[3]}.${decs[3]}`,`${ints[4]}.${decs[3]}`,`${ints[3]}.${decs[4]}`]),
      '整数部分、小数部分分别按递推和看。',
      `整数部分 ${ints.slice(0,4).join('、')}，下一项为 ${ints[4]}；小数部分 ${decs.slice(0,4).join('、')}，下一项为 ${decs[4]}，所以答案 ${ans}。`
    );
  });

  const m1=Q('ns_matrix_rule','矩阵看法',['基础'],()=>R(
    '方框/矩阵型数字推理，优先从哪里看？',
    '从数据少的一边按行或列看',
    op('从数据少的一边按行或列看',['只看最大数','按资料分析公式','先猜选项均衡']),
    '方框只是排版，规律仍是加减乘除。',
    '一行三个数时，优先看前两个数如何通过四则运算得到第三个数；不行再看列。'
  ));

  const m2=Q('ns_matrix_drill','行内关系',['技巧'],()=>{
    const x=n(1,9), y=n(2,9), add=n(-2,2);
    const ans=String(x*y+add);
    return R(
      `某一行前两个数是 ${x}、${y}，本矩阵规则为“前两数相乘后${add>=0?'加':'减'} ${Math.abs(add)} 得第三数”。第三数应为？`,
      ans,
      op(ans,[String(x+y+add),String(x*y),String(x*y-add)]),
      '方框题本质仍是行列内的四则关系。',
      `${x}×${y}${add>=0?'+':'-'}${Math.abs(add)}=${ans}。`
    );
  });

  const split=C('ns_split_branch','拆分',['技巧'],[s1,s2],'sequence');
  const frac=C('ns_fraction_branch','分数',['技巧'],[f1,f2],'sequence');
  const dec=C('ns_decimal_branch','小数',['技巧'],[d1,d2],'sequence');
  const mat=C('ns_matrix_branch','矩阵',['技巧'],[m1,m2],'sequence');
  add(C('ns_special_card','特殊数列｜拆分分数小数矩阵',['技巧'],[split,frac,dec,mat],'all'));
})();
