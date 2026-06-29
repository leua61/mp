(function(){
  const {n,op,R,Q,C,add}=EX;

  const nearDen=C('cmp_train_near_den','首位与近分母',['技巧'],[
    Q('cmp_same_den_var','同分母近似',['技巧'],()=>{
      const den=n(520,680), denB=den+n(-3,3), a=n(410,500), b=a+n(15,60);
      const ans=`${b}/${denB}`;
      return R(
        `比较 ${a}/${den} 与 ${b}/${denB}，哪个更大？`, ans,
        op(ans,[`${a}/${den}`, '无法判断', '二者相等']),
        '分母几乎一样，优先看分子。',
        `两个分母接近，${b} 的分子更大，所以 ${ans} 更大。`
      );
    }),
    Q('cmp_first_digit_var','首位直除',['技巧'],()=>{
      const den=n(610,760), a=Math.floor(den*0.82), b=Math.floor(den*0.93);
      const ans=`${b}/${den}`;
      return R(
        `求较大值：${a}/${den} 约 8 开头，${b}/${den} 约 9 开头，选哪个？`, ans,
        op(ans,[`${a}/${den}`, '都一样', `${a+10}/${den+10}`]),
        '首位不同，先用首位。',
        `${b}/${den} 约 0.9 多，明显大于 0.8 多。`
      );
    })
  ],'all');

  const nearOne=C('cmp_train_near_one','和 1 比较',['技巧'],[
    Q('cmp_need_to_one','差多少到 1',['技巧'],()=>{
      const d1=n(460,560), gap1=n(45,70), d2=d1+n(-12,12), gap2=gap1+n(8,22);
      const f1=`${d1-gap1}/${d1}`, f2=`${d2-gap2}/${d2}`;
      return R(
        `比较 ${f1} 与 ${f2}，谁更大？`, f1,
        op(f1,[f2,'无法判断','二者相等']),
        '谁离 1 更近，谁更大。',
        `${f1} 距离 1 还差 ${gap1}/${d1}，${f2} 距离 1 还差 ${gap2}/${d2}，前者缺口更小，所以更大。`
      );
    }),
    Q('cmp_one_direction','接近 1 的方向',['技巧'],()=>{
      const d=n(700,850), gap=n(55,85);
      const ans='缺口更小者更大';
      return R(
        `两个分数都小于 1，分别还差 ${gap}/${d} 和 ${gap+20}/${d+5} 到 1。谁更大？`, ans,
        ['缺口更小者更大','缺口更大者更大','分母大者一定大','无法判断'],
        '都在 1 以下，看谁更接近 1。',
        '小于 1 的分数，离 1 越近，值越大。'
      );
    })
  ],'all');

  const diff=C('cmp_train_diff','差分法',['技巧'],[
    Q('cmp_diff_make','构造差分数',['技巧'],()=>{
      const a=n(460,520), b=n(530,590), c=a-n(45,75), d=b-n(50,90);
      const ans=`${a-c}/${b-d}`;
      return R(
        `比较 ${a}/${b} 与 ${c}/${d} 时，差分数应写成什么？`, ans,
        op(ans,[`${a+c}/${b+d}`,`${c-a}/${d-b}`,`${b-d}/${a-c}`]),
        '大分数与小分数的分子分母分别相减。',
        `差分数是 (${a}-${c})/(${b}-${d})=${ans}。`
      );
    }),
    Q('cmp_diff_judge','差分判断',['技巧'],()=>{
      const small='416/481', diff='69/71';
      return R(
        `差分数 ${diff} 大于小分数 ${small}，说明原来的大分数与小分数关系如何？`, '大分数更大',
        ['大分数更大','大分数更小','二者相等','无法判断'],
        '差分数代替大分数与小分数比较。',
        '差分数 > 小分数，则大分数 > 小分数；反之则大分数 < 小分数。'
      );
    })
  ],'sequence');

  add(C('compare_training','比大小变量训练｜分数比较路线',['技巧'],[nearDen,nearOne,diff],'all'));
})();
