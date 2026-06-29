(function(){
  const {n,R,Q,C,add}=EX;
  const bigSmall=Q('var_frac_basic_bigsmall','分子大分母小',['技巧'],()=>{
    const a=n(60,120), b=n(80,150); const c=a+n(10,30), d=b-n(10,30);
    return R(`比较 ${c}/${d} 与 ${a}/${b}，哪个更大？`,`${c}/${d}`,[`${c}/${d}`,`${a}/${b}`,'无法直接判断','一定相等'],'分子更大、分母更小。',`${c}>${a}且${d}<${b}，所以${c}/${d}一定更大。`);
  });
  const smallBig=Q('var_frac_basic_smallbig','分子小分母大',['技巧'],()=>{
    const a=n(80,150), b=n(60,120); const c=a-n(10,30), d=b+n(10,30);
    return R(`比较 ${c}/${d} 与 ${a}/${b}，哪个更大？`,`${a}/${b}`,[`${a}/${b}`,`${c}/${d}`,'无法判断','一定相等'],'左边分子小分母大。',`${c}<${a}且${d}>${b}，所以${c}/${d}更小，${a}/${b}更大。`);
  });
  const basic=C('var_frac_basic','基本大小',['技巧'],[bigSmall,smallBig],'all');

  const matchDen=Q('var_frac_match_den','配分母',['技巧'],()=>{
    const a=n(21,49), b=100, c=a+n(2,7), d=110; const left=a/b, right=c/d; const ans=left>right?`${a}/${b}`:`${c}/${d}`;
    return R(`用配分母思路比较 ${a}/${b} 与 ${c}/${d}，哪个更大？`,ans,[ans, ans===`${a}/${b}`?`${c}/${d}`:`${a}/${b}`,'一样大','无法比较'],'把110约配到100或把100配到110。',`可把${c}/${d}粗配到分母100，或直接比较交叉乘积：${a*d} 与 ${c*b}，答案为${ans}。`);
  });
  const matchNum=Q('var_frac_match_num','配分子',['技巧'],()=>{
    const a=n(40,80), b=n(90,160); const c=a+n(1,8), d=b+n(5,20); const ans=(a/b>c/d)?`${a}/${b}`:`${c}/${d}`;
    return R(`比较 ${a}/${b} 与 ${c}/${d}，可先把分子配近。哪个更大？`,ans,[ans, ans===`${a}/${b}`?`${c}/${d}`:`${a}/${b}`,'无法判断','必然相等'],'分子接近时看分母。',`分子很接近，分母越小分数越大；精确交叉也可验证，答案为${ans}。`);
  });
  const matchBad=Q('var_frac_match_bad','误差过大不用',['运用'],()=>R('配同法中，如果为了配同需要把一个数粗改20%以上，应如何处理？','不要硬配，换方法',['不要硬配，换方法','继续硬配','直接选分母小的','直接选分子大的'],'配同误差会误导。','配同适合误差可控的近似；误差过大时，应改用直除、交叉、拆分或差分。'));
  const match=C('var_frac_match','配同法',['技巧'],[matchDen,matchNum,matchBad],'sequence');

  const splitGt=Q('var_frac_split_gt','大于1',['技巧'],()=>{
    const b=n(80,160), tail=n(3,18), a=b+tail;
    return R(`${a}/${b} 接近1且大于1，应拆成什么？`,`1 + ${tail}/${b}`,[`1 + ${tail}/${b}`,`1 - ${tail}/${b}`,`${b}/${tail} - 1`,`${a+b}/${b}`],'超过1就是加尾巴。',`${a}/${b}=1+(${a}-${b})/${b}=1+${tail}/${b}。`);
  });
  const splitLt=Q('var_frac_split_lt','小于1',['技巧'],()=>{
    const b=n(90,180), tail=n(4,20), a=b-tail;
    return R(`${a}/${b} 接近1且小于1，应拆成什么？`,`1 - ${tail}/${b}`,[`1 - ${tail}/${b}`,`1 + ${tail}/${b}`,`${tail}/${b} - 1`,`${b}/${a} - 1`],'低于1就是减尾巴。',`${a}/${b}=1-(${b}-${a})/${b}=1-${tail}/${b}。`);
  });
  const splitTail=Q('var_frac_split_tail','尾巴方向',['技巧'],()=>R('两个小于1且都接近1的分数，拆成1-尾巴后，哪个更大？','尾巴更小的更大',['尾巴更小的更大','尾巴更大的更大','尾巴相加更大的更大','无法比较'],'从1里减得越少越大。','小于1时是1-尾巴，尾巴越大，整体越小。'));
  const split=C('var_frac_split','拆分法',['技巧'],[splitGt,splitLt,splitTail],'sequence');

  const diffUp=Q('var_frac_diff_up','差分大于小分数',['技巧'],()=>{
    const a=20, b=100, c=50, d=180; // small=.2 diff=30/80=.375, large=.277 bigger
    return R(`比较 ${c}/${d} 与 ${a}/${b}。差分为 ${(c-a)}/${(d-b)}，它大于小分数时结论是什么？`,`${c}/${d} 更大`,[`${c}/${d} 更大`,`${a}/${b} 更大`,'两者相等','不能比较'],'差分大，整体被拉高。',`小分数是${a}/${b}，差分${c-a}/${d-b}更大，所以大分数${c}/${d}被拉高，更大。`);
  });
  const diffDown=Q('var_frac_diff_down','差分小于小分数',['技巧'],()=>{
    const a=40, b=100, c=50, d=180; // small .4 diff .125, large .277 lower
    return R(`比较 ${c}/${d} 与 ${a}/${b}。差分为 ${(c-a)}/${(d-b)}，它小于小分数时结论是什么？`,`${c}/${d} 更小`,[`${c}/${d} 更小`,`${c}/${d} 更大`,'两者相等','一定无法判断'],'差分小，整体被拉低。',`新增部分比例小于原小分数，所以扩大后的${c}/${d}小于${a}/${b}。`);
  });
  const diffMis=Q('var_frac_diff_not_avg','错误理解',['运用'],()=>R('差分法中，差分分数能不能简单当作两个分数的平均数？','不能',['不能','能','只在分母相同时能','只在选项少时能'],'差分是新增部分比例。','差分分数表示新增分子/新增分母的比例，用来判断拉高还是拉低，不是两个原分数的平均数。'));
  const diff=C('var_frac_diff','差分法',['技巧'],[diffUp,diffDown,diffMis],'sequence');

  add(C('var_fraction_methods','变量训练｜分数比较方法选择',['技巧'],[basic,match,split,diff],'all'));
})();
