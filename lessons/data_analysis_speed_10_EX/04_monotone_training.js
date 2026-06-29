(function(){
  const {n,op,R,Q,C,add}=EX;

  const under=C('mono_train_under','三倍以内',['技巧'],[
    Q('mono_diff_level1','一级差',['技巧'],()=>{
      const a=n(3,12), d=n(2,8); const arr=[a,a+d,a+2*d,a+3*d]; const ans=String(a+4*d);
      return R(
        `数列 ${arr.join('，')}，下一项是多少？`, ans,
        op(ans,[String(a+5*d),String(a+4*d+1),String(a+3*d)]),
        '单调且倍数不大，先做差。',
        `相邻差都是 ${d}，所以下一项是 ${arr[3]}+${d}=${ans}。`
      );
    }),
    Q('mono_diff_level2','二级差',['技巧'],()=>{
      const a=n(2,8), d1=n(2,5), inc=n(2,4);
      const x1=a, x2=x1+d1, x3=x2+d1+inc, x4=x3+d1+2*inc; const next=x4+d1+3*inc;
      return R(
        `数列 ${x1}，${x2}，${x3}，${x4}，下一项是多少？`, String(next),
        op(next,[next+inc,next-inc,x4+d1]),
        '一级差再看差。',
        `一级差为 ${d1}，${d1+inc}，${d1+2*inc}，下一差为 ${d1+3*inc}，所以下一项 ${next}。`
      );
    })
  ],'all');

  const over=C('mono_train_over','三倍以上',['技巧'],[
    Q('mono_multi_seq','倍数序列',['技巧'],()=>{
      const a=n(1,4), m=n(3,5); const arr=[a,a*m,a*m*m]; const ans=String(a*m*m*m);
      return R(
        `数列 ${arr.join('，')}，下一项是多少？`, ans,
        op(ans,[String(a*m*m+a),String(a*m*m*(m+1)),String(a*m)]),
        '相邻倍数都较大，先看倍数。',
        `每次乘 ${m}，所以下一项是 ${arr[2]}×${m}=${ans}。`
      );
    }),
    Q('mono_power_seq','平方识别',['技巧'],()=>{
      const k=n(3,7); const arr=[(k-2)**2,(k-1)**2,k**2]; const ans=String((k+1)**2);
      return R(
        `数列 ${arr.join('，')}，下一项最可能是多少？`, ans,
        op(ans,[String((k+1)**2+1),String((k+2)**2),String(k**2+1)]),
        '接近平方数时看次方。',
        `这是连续平方数：${k-2}²，${k-1}²，${k}²，下一项为 ${k+1}²=${ans}。`
      );
    })
  ],'all');

  const edge=C('mono_train_edge','边界判断',['运用'],[
    Q('mono_edge_one','个别超三倍',['运用'],()=>R(
      '一个单调数列大多相邻倍数在三倍内，只有一组约 3.1 倍。优先路线是什么？','仍先和差分析',
      ['仍先和差分析','直接次方','直接奇偶猜','不能做'],
      '个别略超可忽略。',
      '口诀是经验入口，整体仍像三倍以内，就先做和差。'
    )),
    Q('mono_edge_two','多处超三倍',['运用'],()=>R(
      '一个单调数列中连续多组相邻倍数都超过三倍，应切换到什么路线？','倍数或次方',
      ['倍数或次方','只做一级差','只做和','看单位'],
      '多处超三倍不再是个别。',
      '此时优先怀疑乘法放大或幂次结构。'
    ))
  ],'all');

  add(C('monotone_training','单调变量训练｜做差与倍数切换',['技巧'],[under,over,edge],'all'));
})();
