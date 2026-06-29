(function(){
  const {n,R,Q,C,add}=EX;
  const close2=Q('var_rule72_close2','接近2倍',['技巧'],()=>{
    const N=n(4,12); const ans=Math.round(72/N*10)/10;
    return R(`约${N}年翻一倍，年均增长率按72法则约为？`,`${ans}%`,[`${ans}%`,`${Math.round(115/N*10)/10}%`,`${N}%`,`${72*N}%`],'翻倍用72/N。',`72/${N}≈${ans}%。`);
  });
  const above2=Q('var_rule72_above2','略大于2倍',['技巧'],()=>R('末期是初期的2.1倍，答案相对72/N应如何？','略大于72/N',['略大于72/N','略小于72/N','等于115/N','必为负'],'比2倍多一点。','目标比例高于2倍，年均增长率应略高于72/N。'));
  const below2=Q('var_rule72_below2','略小于2倍',['技巧'],()=>R('末期是初期的1.9倍，答案相对72/N应如何？','略小于72/N',['略小于72/N','略大于72/N','等于115/N','必为0'],'比2倍少一点。','目标比例低于2倍，年均增长率应略低于72/N。'));
  const rule72=C('var_rule72','72法则',['技巧'],[close2,above2,below2],'sequence');

  const close3=Q('var_rule115_close3','接近3倍',['技巧'],()=>{
    const N=n(5,15); const ans=Math.round(115/N*10)/10;
    return R(`约${N}年增长到3倍，年均增长率按115法则约为？`,`${ans}%`,[`${ans}%`,`${Math.round(72/N*10)/10}%`,`${N}%`,`${115*N}%`],'三倍用115/N。',`115/${N}≈${ans}%。`);
  });
  const above3=Q('var_rule115_above3','略大于3倍',['技巧'],()=>R('末期是初期的3.2倍，答案相对115/N应如何？','略大于115/N',['略大于115/N','略小于115/N','等于72/N','必为0'],'比3倍更高。','目标比例高于3倍，年均增长率应略高于115/N。'));
  const below3=Q('var_rule115_below3','略小于3倍',['技巧'],()=>R('末期是初期的2.8倍，答案相对115/N应如何？','略小于115/N',['略小于115/N','略大于115/N','等于72/N','必为负'],'比3倍略低。','目标比例低于3倍，年均增长率应略低于115/N。'));
  const rule115=C('var_rule115','115法则',['技巧'],[close3,above3,below3],'sequence');

  const isTimes=Q('var_mul_is','是几倍',['基础'],()=>{
    const k=n(2,8);
    return R(`A是B的${k}倍，表示什么？`,`A/B=${k}`,[`A/B=${k}`,`(A-B)/B=${k}`,`A/B=${k+1}`,`B/A=${k}`],'“是”直接比。',`A是B的${k}倍，就是A/B=${k}。`);
  });
  const increaseTimes=Q('var_mul_increase','增长几倍',['基础'],()=>{
    const m=n(1,5); const ratio=m+1;
    return R(`A比B增长${m}倍，A/B等于多少？`,String(ratio),[String(ratio),String(m),String(ratio+1),`${m}%`],'增长部分要加回原来的1倍。',`增长${m}倍表示(A-B)/B=${m}，所以A/B=${m}+1=${ratio}。`);
  });
  const increase21=Q('var_mul_21','增长2.1倍',['基础'],()=>R('增长2.1倍，末期/初期应为多少？','3.1',['3.1','2.1','1.1','210%'],'增长倍数加1。','增长2.1倍表示多出2.1个基期，总量是1+2.1=3.1倍。'));
  const multi=C('var_multiple_words','倍数表述',['基础'],[isTimes,increaseTimes,increase21],'sequence');

  add(C('var_rules_multiple','变量训练｜72法则与倍数陷阱',['技巧'],[rule72,rule115,multi],'all'));
})();
