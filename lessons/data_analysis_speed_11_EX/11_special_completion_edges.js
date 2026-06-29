(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  function twoDigitWithSum(s){
    const a=Math.max(1,Math.min(9,n(Math.max(1,s-9),Math.min(9,s-1))));
    return String(a)+String(s-a);
  }

  const t1=Q('ns_two_digit_split_sum','两位拆分求和',['技巧'],()=>{
    const s1=n(5,8), s2=s1+n(3,5), s3=s2+n(3,5);
    const arr=[twoDigitWithSum(s1),twoDigitWithSum(s1),twoDigitWithSum(s2),twoDigitWithSum(s2),twoDigitWithSum(s3)];
    const ans=twoDigitWithSum(s3);
    return R(
      `${arr.join('，')}，？。若按“数字拆开后位数和两项一组重复”看，下一项可选哪一个？`,
      ans,
      op(ans,[twoDigitWithSum(s1),twoDigitWithSum(s2),twoDigitWithSum(Math.max(3,s3-2))]),
      '两位数拆成十位和个位，先看位数和。',
      `前两项位数和为 ${s1}，中间两项为 ${s2}，后面应连续两项位数和为 ${s3}，所以选 ${ans}。`
    );
  });

  const t2=Q('ns_four_digit_split_review','多位数拆分方向',['基础'],()=>R(
    '三位数、四位数数列常规方法无规律时，拆分优先怎么想？',
    '按位或从中间拆开看',
    op('按位或从中间拆开看',['直接当资料分析做','只比较大小','只看最后一项']),
    '多位数是拆分高发信号。',
    '四位数常可拆成前两位和后两位；三位数可拆成首位/后两位或前两位/个位。'
  ));

  const f1=Q('ns_fraction_cross_relation','前后分子分母关系',['技巧'],()=>R(
    '1/2，3/5，8/13，？ 若每一项的分子分母相加依次参与后一项，下一项应为？',
    '21/34',
    op('21/34',['13/21','11/18','8/21']),
    '不要只会分子、分母各自看，也要看前一个分数内部与后一项的关系。',
    '1+2=3，2+3=5；3+5=8，5+8=13；所以下一项是 8+13=21，13+21=34。'
  ));

  const f2=Q('ns_fraction_common_denominator','通分做差',['技巧'],()=>R(
    '1/3，5/12，1/2，？ 若通分为十二分母后看分子等差，下一项应为？',
    '7/12',
    op('7/12',['2/3','1/4','5/6']),
    '分母存在明显倍数时，可以通分后做差。',
    '1/3=4/12，5/12=5/12，1/2=6/12，分子 4、5、6，下一项为 7/12。'
  ));

  const d1=Q('ns_decimal_internal_relation','小数内部运算',['技巧'],()=>R(
    '小数数列除了“整数部分、小数部分分别成规律”，还要注意哪条路线？',
    '前一项整数部分和小数部分加减乘除后影响后一项',
    op('前一项整数部分和小数部分加减乘除后影响后一项',['只看小数点个数','直接全部去掉小数点','按顺差逆差判断']),
    '小数点像分数线，点前点后既可分开看，也可内部运算。',
    '例如 3.4 的 3 和 4 可以相加、相减、相乘后，与后一项的整数部分或小数部分形成关系。'
  ));

  const d2=Q('ns_decimal_recursive_sum','小数递推和',['技巧'],()=>R(
    '2.0，0.2，2.2，2.4，？ 按前两项相加看，下一项为？',
    '4.6',
    op('4.6',['2.6','4.4','3.6']),
    '小数也可以按普通数列做递推和。',
    '2.0+0.2=2.2，0.2+2.2=2.4，所以 2.2+2.4=4.6。'
  ));

  const g1=Q('ns_triple_independent','独立三三分组',['技巧'],()=>{
    const s1=n(12,20), step=n(3,6);
    const a=n(2,5), b=n(2,5), c=s1-a-b;
    const d=n(3,7), e=n(3,7), f=s1+step-d-e;
    const g=n(4,8), h=n(4,8), ansNum=s1+2*step-g-h;
    const ans=String(ansNum);
    return R(
      `${a}，${b}，${c}，${d}，${e}，${f}，${g}，${h}，？。按三三独立分组求和，？为多少？`,
      ans,
      op(ans,[String(ansNum+1),String(ansNum-1),String(ansNum+step)]),
      '三三分组不只有交叉型，也有独立型。',
      `前三项和 ${s1}，中三项和 ${s1+step}，后三项和应为 ${s1+2*step}，所以 ?=${s1+2*step}-${g}-${h}=${ansNum}。`
    );
  });

  const g2=Q('ns_group_reduce_terms','分组的目的',['基础'],()=>R(
    '七项及以上为什么常考虑分组？',
    '把长数列压缩成更少的观察对象',
    op('把长数列压缩成更少的观察对象',['让题目必然变成等差','消除所有负数','保证答案唯一为 A']),
    '分组不是为了形式，而是为了降复杂度。',
    '两两或三三分组后，原本很多项会变成少量组，再看每组内部或组间规律。'
  ));

  const m1=Q('ns_matrix_four_terms','矩阵四项关系',['技巧'],()=>{
    const a=n(1,9), b=n(1,9), c=n(1,9);
    const ans=String(a+b+c);
    return R(
      `某矩阵每行四个数，规则为前三个数相加得第四个数。若一行为 ${a}、${b}、${c}、？则？为多少？`,
      ans,
      op(ans,[String(a*b+c),String(a+b),String(a+c)]),
      '矩阵题一行若有四项，可看前三项如何推出第四项。',
      `${a}+${b}+${c}=${ans}。行内不行再考虑列内。`
    );
  });

  const split=C('ns_split_completion_route','拆分补足',['技巧'],[t1,t2],'sequence');
  const fraction=C('ns_fraction_completion_route','分数补足',['技巧'],[f1,f2],'sequence');
  const decimal=C('ns_decimal_completion_route','小数补足',['技巧'],[d1,d2],'sequence');
  const grouping=C('ns_group_completion_route','分组补足',['技巧'],[g1,g2],'sequence');
  const matrix=C('ns_matrix_completion_route','矩阵补足',['技巧'],[m1],'all');
  add(C('ns_completion_card','特殊关系｜拆分分组与边界',['运用'],[split,fraction,decimal,grouping,matrix],'all'));
})();
