(function(){
  const {n,op,R,Q,C,add}=EX;

  const q1=Q('var_split_integer_cancel_expr','拆出整数变量',['技巧'],()=>{
    const d1=n(360,560), r1=n(40,190);
    const d2=n(360,560), r2=n(40,190);
    const a=d1+r1, b=d2+r2;
    const ans=`${r1}/${d1} - ${r2}/${d2}`;
    return R(
      `把 ${a}/${d1} - ${b}/${d2} 都拆出 1 后，剩下的表达式是什么？`,
      ans,
      op(ans,[`${d1}/${r1} - ${d2}/${r2}`,`${a}/${r1} - ${b}/${r2}`,`${r1}/${d1} + ${r2}/${d2}`]),
      '分子=分母+余数，先写成 1+余数/分母。',
      `${a}/${d1}=1+${r1}/${d1}，${b}/${d2}=1+${r2}/${d2}，1-1 抵消，剩 ${ans}。`
    );
  });

  const q2=Q('var_split_integer_cancel_when','是否值得拆变量',['运用'],()=>{
    const d=n(420,680), r=n(30,150);
    const ans='值得，先拆出整数部分再看余数';
    return R(
      `比较或计算 ${(d+r)}/${d} 与 ${(d+n(20,150))}/${d+n(10,90)} 的差，这类数都在 1 点几。策略是什么？`,
      ans,
      op(ans,['值得，先拆出整数部分再看余数','不值得，直接把两个数都当0','必须先求通分乘积','只看分母末位']),
      '都接近同一个整数时，整数部分先抵消。',
      '两个分数都有相同整数骨架，先拆掉公共整数，能把问题变成小余数分数之差。'
    );
  });

  const route=C('route_var_split_integer_cancel','整数抵消拆分',['技巧'],[q1,q2],'sequence');
  add(C('var_split_integer_cancel_card','变量训练｜整数抵消拆分',['运用'],[route],'all'));
})();
