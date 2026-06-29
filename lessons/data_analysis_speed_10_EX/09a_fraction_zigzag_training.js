(function(){
  const {n,op,R,Q,C,add}=EX;

  const frac=C('frac_variable_training','分数数列变量训练',['技巧'],[
    Q('frac_num_den_arith_var','分子分母分别看',['技巧'],()=>{
      const a=n(1,4), d=n(1,3), b=n(5,10), e=n(2,4);
      const f1=`${a}/${b}`, f2=`${a+d}/${b+e}`, f3=`${a+2*d}/${b+2*e}`; const ans=`${a+3*d}/${b+3*e}`;
      return R(
        `分数数列 ${f1}，${f2}，${f3}，下一项最可能是？`, ans,
        op(ans,[`${a+3*d}/${b+2*e}`,`${a+2*d}/${b+3*e}`,`${a+4*d}/${b+4*e}`]),
        '分子看分子，分母看分母。',
        `分子每次 +${d}，分母每次 +${e}，所以下一项是 ${ans}。`
      );
    }),
    Q('frac_scale_var','同倍放缩变量',['技巧'],()=>{
      const k=n(2,5); const ans='同倍放缩';
      return R(
        `若分数 ${2*k}/${3*k} 看不出规律，但可化为 2/3，应使用什么思路？`, ans,
        ['同倍放缩','只改分子','只改分母','把分数改成整数'],
        '分子分母同除不改变数值。',
        `${2*k}/${3*k} 同除以 ${k} 得 2/3，可让分子或分母进入清楚规律。`
      );
    })
  ],'all');

  const zig=C('zigzag_variable_training','忽大忽小变量训练',['技巧'],[
    Q('zig_interval_sequence_var','间隔差变量',['技巧'],()=>{
      const a=n(2,8), b=n(20,40), da=n(2,5), db=n(3,7);
      const arr=[a,b,a+da,b+db,a+2*da,b+2*db]; const ans=String(a+3*da);
      return R(
        `数列 ${arr.join('，')}，下一项是多少？`, ans,
        op(ans,[String(b+3*db),String(a+2*da+db),String(arr[5]+da)]),
        '忽大忽小时先隔项看。',
        `奇数位：${a}，${a+da}，${a+2*da}，下一项为 ${a+3*da}。`
      );
    }),
    Q('zig_direct_after_fail','优先法失败后退路',['运用'],()=>R(
      '忽大忽小数列优先间隔差，但间隔差无规律时，下一步可以怎样？','退回直接做差或构造网络',
      ['退回直接做差或构造网络','永远不能做差','只能奇偶猜','直接放弃'],
      '优先法不是唯一法。',
      '非单调并不等于不能直接做差；间隔差失败后，可以看相邻差、做和或构造网络。'
    ))
  ],'all');

  add(C('fraction_zigzag_training','分数与忽大忽小变量训练｜放缩与间隔',['技巧'],[frac,zig],'all'));
})();
