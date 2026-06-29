(function(){
  const {n,op,R,Q,C,add}=EX;

  const skeleton=C('speed_skeleton_extra','划线法骨架',['技巧'],[
    Q('speed_skeleton_var','保留骨架',['技巧'],()=>{
      const a=n(1200,9800), den=EX.pk([25,20,16,40]); const ans='保留有效数字并判断误差';
      return R(
        `估算 ${a}÷${den} 这类式子时，课程更强调哪件事？`, ans,
        ['保留有效数字并判断误差','每次都算到三位小数','只看选项字母','把单位全部删掉'],
        '划线法不是乱砍数字。',
        '划线法要保留能决定选项的数字骨架，同时知道自己放大或缩小了多少误差。'
      );
    }),
    Q('speed_error_large_options_var','选项差大容错',['技巧'],()=>{
      const err=n(1,3); return R(
        `估算过程中约有 ${err}% 误差，但选项差距明显大于它。此时通常应怎样？`, '可以直接选',
        ['可以直接选','必须精算到个位','一定放弃估算','随机选一个'],
        '误差要和选项差距比较。',
        `若误差只有 ${err}% 左右，而选项差距很大，估算足以定答案。`
      );
    })
  ],'all');

  const special=C('speed_special_extra','特殊口算补全',['技巧'],[
    Q('speed_mul_11_shift','乘 11 错位',['技巧'],()=>{
      const a=n(120,980); const ans=String(a*11);
      return R(
        `${a} × 11 = ?`, ans,
        op(ans,[String(a*10),String(a*12),String(a*11+n(10,30))]),
        '乘 11 可以看成乘 10 再加自身。',
        `${a}×11=${a}×10+${a}=${a*10}+${a}=${ans}。这就是错位相加的本质。`
      );
    }),
    Q('speed_one_over_n_var','小数百分数转分数',['技巧'],()=>{
      const pairs=[['10%','1/10'],['20%','1/5'],['25%','1/4'],['11.1%','1/9'],['16.7%','1/6'],['14.3%','1/7'],['33.3%','1/3'],['66.7%','2/3']];
      const [p,f]=EX.pk(pairs);
      return R(
        `${p} 最接近哪个常用分数？`, f,
        op(f,pairs.map(x=>x[1]).filter(x=>x!==f)),
        '常用百分数要形成条件反射。',
        `${p}≈${f}。资料分析估算中，这些分数敏感度很重要。`
      );
    }),
    Q('speed_ten_percent_move','10% 小数点',['技巧'],()=>{
      const b=n(20000,90000); const ans=String(Math.round(b/10));
      return R(
        `${b} 的 10% 约是多少？`, ans,
        op(ans,[String(Math.round(b/100)),String(Math.round(b/5)),String(b)]),
        '10% 就是十分之一。',
        `${b}×10%≈${ans}，本质是小数点移动一位。`
      );
    })
  ],'all');

  add(C('speed_enrichment','速算升华｜骨架、误差与错位',['技巧'],[skeleton,special],'all'));
})();
