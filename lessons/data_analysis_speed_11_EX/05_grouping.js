(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const g1=Q('ns_group_trigger','分组触发',['基础'],()=>R(
    '数列七项及以上时，优先进入哪个大方向？',
    '分组数列',
    op('分组数列',['贸易顺差','基期比重','权重平均']),
    '项数多，直接全局找规律效率低。',
    '分组可以减少观察对象，包括间隔、两两、三三。'
  ));

  const i1=Q('ns_interval_rule','间隔规则',['基础'],()=>R(
    '间隔分组本质是把哪些项分开看？',
    '奇数项和偶数项',
    op('奇数项和偶数项',['最大项和最小项','整数和小数','分子和分母']),
    '忽大忽小尤其适合这样看。',
    '第1、3、5项单独成规律，第2、4、6项单独成规律。'
  ));

  const i2=Q('ns_interval_drill','忽大忽小',['技巧'],()=>{
    const a=n(20,40), b=n(20,40), d=n(1,4), e=n(1,4);
    const arr=[a,b,a-d,b+e,a-2*d,b+2*e];
    const ans=String(a-3*d);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(b+3*e),String(a+d),String(b-e)]),
      '奇数项递减，偶数项递增。',
      `奇数项 ${a}、${a-d}、${a-2*d}，下一奇数项为 ${a-3*d}。`
    );
  });

  const t1=Q('ns_pair_type','两两类型',['基础'],()=>R(
    '两两分组有哪两类？',
    '独立型和交叉型',
    op('独立型和交叉型',['现期型和基期型','顺差型和逆差型','整数型和百分型']),
    '独立型不重叠，交叉型相邻两项重叠。',
    '偶数项较多可先独立分；奇数项两两分组常要交叉。'
  ));

  const t2=Q('ns_pair_independent','独立两两',['技巧'],()=>{
    const starts=[n(1,10),n(1,10),n(1,10)];
    const sums=[10,14,18];
    const arr=[];
    for(let i=0;i<3;i++){arr.push(starts[i]);arr.push(sums[i]-starts[i]);}
    const x=n(1,10), nextSum=22;
    arr.push(x);
    const ans=String(nextSum-x);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(x+nextSum),String(nextSum),String(Math.abs(x-ans))]),
      '两个两个独立成组，看每组内部和。',
      `每组和为 10、14、18、22，最后一组已有 ${x}，所以答案 ${nextSum}-${x}=${ans}。`
    );
  });

  const t3=Q('ns_pair_cross','交叉两两',['技巧'],()=>{
    const a=n(2,8), b=n(3,9);
    const arr=[a,b];
    for(let i=0;i<4;i++) arr.push(arr[i]+arr[i+1]);
    const ans=String(arr[4]+arr[5]);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(arr[5]+1),String(arr[4]*arr[5]),String(arr[5]-arr[4])]),
      '交叉两两看，相邻两项相加得到后面的某项。',
      `从第3项起，每项等于前两项之和，下一项=${arr[4]}+${arr[5]}=${ans}。`
    );
  });

  const h1=Q('ns_triple_cross','交叉三三',['技巧'],()=>{
    const arr=[n(1,5),n(1,5),n(1,5),n(1,5),n(1,5)];
    const s1=arr[0]+arr[1]+arr[2];
    const s2=arr[1]+arr[2]+arr[3];
    const s3=arr[2]+arr[3]+arr[4];
    const step=n(2,5);
    const target=s3+step;
    const ans=String(target-arr[3]-arr[4]);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(Number(ans)+step),String(target),String(arr[4]+step)]),
      '三三交叉分组，看每组三项和的变化。',
      `前三组三项和为 ${s1}、${s2}、${s3}。设下一组和延续到 ${target}，则答案=${target}-${arr[3]}-${arr[4]}=${ans}。`
    );
  });

  const interval=C('ns_interval_branch','间隔',['技巧'],[i1,i2],'sequence');
  const pair=C('ns_pair_branch','两两',['技巧'],[t1,t2,t3],'sequence');
  const triple=C('ns_triple_branch','三三',['技巧'],[h1],'all');
  const drill=C('ns_group_variable_route','变量训练',['技巧'],[interval,pair,triple],'all');
  add(C('ns_group_card','分组数列｜间隔两两三三',['技巧'],[g1,drill],'all'));
})();
