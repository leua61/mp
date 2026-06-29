(function(){
  const {n,R,Q,C,add}=EX;
  const list=Q('var_line_pos_list','列式',['技巧'],()=>{
    const start=n(80,160), N=n(2,5), end=start+n(25,120);
    const ans=`(1+r)^${N} = ${end}/${start}`;
    return R(`从${start}到约${end}，${N}年年均增长率r，划线法第一步列什么？`,ans,[ans,`(1-r)^${N} = ${end}/${start}`,`${N}r = ${start}/${end}`,`r = ${end}-${start}`],'正增长列1+r。',`划线体系先列乘方骨架，再估右边比例：${ans}。`);
  });
  const tryR=Q('var_line_pos_try','试候选',['技巧'],()=>{
    const r=n(6,18), N=n(2,5); const factor=(1+r/100).toFixed(2).replace(/0$/,'').replace(/\.0$/,'');
    const ans=`${factor}^${N}`;
    return R(`若候选r=${r}%，则${N}年增长因子应写成什么？`,ans,[ans,`${(1-r/100).toFixed(2)}^${N}`,`${factor}`,`${r}^${N}`],'候选率先转因子。',`正增长${r}%的年增长因子是1+${r}%，即${factor}，${N}年就是${ans}。`);
  });
  const high=Q('var_line_pos_high','偏大则降',['技巧'],()=>{
    const target=n(120,180)/100, trial=(target+n(4,15)/100).toFixed(2);
    return R(`目标比例约${target.toFixed(2)}，候选r代入后得到${trial}，说明候选r怎样？`,'偏大，应降低',['偏大，应降低','偏小，应提高','刚好准确','只能改年份差'],'增长过头。',`候选乘方${trial}超过目标比例${target.toFixed(2)}，说明候选r过大，真实r更小。`);
  });
  const pos=C('var_line_pos','正增长划线',['技巧'],[list,tryR,high],'sequence');

  const useOneMinus=Q('var_line_neg_minus','用1-r',['技巧'],()=>{
    const r=n(8,35), N=n(2,5), start=n(100,300); const end=Math.round(start*Math.pow(1-r/100,N));
    const ans=`(1-r)^${N} = ${end}/${start}`;
    return R(`从${start}下降到约${end}，${N}年年均下降率r，应列什么？`,ans,[ans,`(1+r)^${N} = ${end}/${start}`,`${N}r = ${end}/${start}`,`1+r = ${end}/${start}`],'下降用保留率。',`下降r意味着每年保留1-r，所以列${ans}。`);
  });
  const downR=Q('var_line_neg_r','下降率转因子',['技巧'],()=>{
    const r=n(10,45); const factor=(1-r/100).toFixed(2).replace(/0$/,'').replace(/\.0$/,'');
    return R(`年均下降${r}%，每年因子是多少？`,factor,[factor,(1+r/100).toFixed(2),String(r),`-${factor}`],'保留1-r。',`下降${r}%就是保留${100-r}%，因子为${factor}。`);
  });
  const notPlus=Q('var_line_neg_not_plus','不要用1+r',['运用'],()=>{
    const r=n(10,40); const wrong=(1+r/100).toFixed(2), right=(1-r/100).toFixed(2).replace(/0$/,'').replace(/\.0$/,'');
    return R(`下降${r}%的题中，把因子写成${wrong}会造成什么问题？`,'把下降误当增长',['把下降误当增长','只是单位不同','答案完全不受影响','年份差少1'],'方向反了。',`${wrong}=1+${r}%代表增长${r}%，下降${r}%应写${right}=1-${r}%。`);
  });
  const neg=C('var_line_neg','负增长划线',['技巧'],[useOneMinus,downR,notPlus],'sequence');

  const single=Q('var_line_err_single','单因子误差',['技巧'],()=>{
    const e=n(1,5); const a=(1+e/100).toFixed(2).replace(/0$/,'').replace(/\.0$/,'');
    return R(`候选因子${a}相对1.00约有多大误差？`,`约${e}%`,[`约${e}%`,`约${e*10}%`,`约${Math.round(e/2)}%`,'无法估计'],'相对误差看比例。',`${a}比1.00大约${e}%。`);
  });
  const power=Q('var_line_err_power','幂次累加',['技巧'],()=>{
    const e=n(1,4), N=n(3,6); const ans=`约${e*N}%`;
    return R(`若每个因子约${e}%误差，${N}次方总误差大致可能接近？`,ans,[ans,`约${e}%`,`约${Math.round(e/N)}%`,`约${e*N*10}%`],'乘法误差近似相加。',`多因子相乘时，相对误差会近似累加，约${e}%×${N}=${e*N}%。`);
  });
  const close=Q('var_line_err_close','选项近时校验',['运用'],()=>{
    const a=n(80,120)/10, b=(a+n(1,3)/10).toFixed(1), c=(Number(b)+n(1,3)/10).toFixed(1);
    return R(`选项为${a.toFixed(1)}%、${b}%、${c}%时，划线估算后最该检查什么？`,'误差是否足以改变选项',['误差是否足以改变选项','哪个数字更顺眼','材料标题长短','年份是否偶数'],'选项太近怕误差。','选项差距很小时，必须看估算误差能否导致答案翻盘。');
  });
  const err=C('var_line_err','误差放大',['技巧'],[single,power,close],'sequence');

  const total=Q('var_line_big_total','总误差',['技巧'],()=>{
    const ratio=n(120,190)/100; const total=Math.round((ratio-1)*100);
    return R(`从1增长到约${ratio.toFixed(2)}，粗看总增长约多少？`,`${total}%`,[`${total}%`,`${Math.round(total/10)}%`,`${Math.round(ratio*100)}%`,`1.${total}%`],'相对1的增量。',`${ratio.toFixed(2)}比1多${(ratio-1).toFixed(2)}，即约${total}%总增长。`);
  });
  const divide=Q('var_line_big_divide','除以年份差',['技巧'],()=>{
    const total=n(24,72), N=n(3,8), ans=Math.round(total/N*10)/10;
    return R(`总增长约${total}%，${N}年大步估算年均约多少？`,`约${ans}%`,[`约${ans}%`,`约${total}%`,`约${Math.round(total*N)}%`,`约${Math.round(ans/2)}%`],'粗略平均分摊。',`大步估算先用总误差除以年份差，${total}%/${N}≈${ans}%。`);
  });
  const locate=Q('var_line_big_locate','只作定位',['运用'],()=>R('大步估算的结果最适合作为什么？','定位范围，再用划线校验',['定位范围，再用划线校验','唯一精确答案','替代所有公式','直接忽略选项'],'粗估不是精算。','大步估算用于快速定位，选项接近时仍需代入或划线校验。'));
  const big=C('var_line_big','大步估算',['技巧'],[total,divide,locate],'sequence');

  add(C('var_line_method','变量训练｜划线体系',['技巧'],[pos,neg,err,big],'all'));
})();
