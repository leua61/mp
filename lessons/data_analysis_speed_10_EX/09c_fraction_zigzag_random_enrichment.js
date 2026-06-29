(function(){
  const {n,op,R,Q,C,add,pk}=EX;

  const frac=C('fraction_ops_random','分数四则变量',['技巧'],[
    Q('fraction_four_ops_random','前项分子分母四则随机',['技巧'],()=>{
      const a=n(1,8), b=n(2,9); const mode=pk(['和','差','积']);
      const val=mode==='和'?a+b:mode==='差'?Math.abs(a-b):a*b;
      return R(
        `某分数项为 ${a}/${b}。若规律是“前一项分子分母${mode}得到后一项某部位”，该部位应填多少？`, String(val),
        op(val,[a+b+1,Math.max(0,Math.abs(a-b)-1),a*b+1]),
        '分数多时，除分子分母分别看，还要看同一分数内的四则组合。',
        mode==='和'?`${a}+${b}=${val}。`:mode==='差'?`|${a}-${b}|=${val}。`:`${a}×${b}=${val}。`
      );
    }),
    Q('fraction_denominator_multiple_random','分母倍数通分随机',['技巧'],()=>{
      const d=n(3,8), m=pk([2,3,4]); const ans='考虑通分做差';
      return R(
        `分数数列中相邻分母出现 ${d}、${d*m}、${d*m*2} 这类明显倍数关系，优先考虑什么？`, ans,
        ['考虑通分做差','只看奇偶','直接猜最大','永远分子分母分别看'],
        '分母倍数明显时，通分会变得省力。',
        '这是原课分数数列的第三条优先路线：分母呈明显倍数关系，则考虑通分做差。'
      );
    })
  ],'all');

  const zig=C('zigzag_sum_random','间隔和变量',['技巧'],[
    Q('zigzag_interval_sum_random','间隔和备选随机',['技巧'],()=>{
      const a=n(2,9), b=n(10,20); const ans=String(a+b);
      return R(
        `忽大忽小数列优先间隔差；若题目设置成第1项 ${a} 与第3项 ${b} 的间隔“和”成规律，则第1、3项和是多少？`, ans,
        op(ans,[b-a,a*b,Math.abs(b-a)]),
        '间隔差更常见，但间隔和也可能出现。',
        `间隔和就是隔一项相加：${a}+${b}=${ans}。优先法失败时要允许换路。`
      );
    }),
    Q('zigzag_fallback_random','间隔失败后退路随机',['技巧'],()=>R(
      '忽大忽小题先试间隔差，但间隔差没有规律。下一步更符合课程路线的是？','退回直接做差并构造网络',
      ['退回直接做差并构造网络','继续硬做间隔差','马上做四级差','只猜奇偶'],
      '优先不等于唯一。',
      '间隔差只是优先路线；无规律时退回直接做差，再看能否构造网络。'
    ))
  ],'all');

  add(C('fraction_zigzag_random_enrichment','分数忽大忽小升华｜四则、通分与退路变量',['技巧'],[frac,zig],'all'));
})();
