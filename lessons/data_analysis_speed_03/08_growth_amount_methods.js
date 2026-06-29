(function(){
  const {n,pk,op,R,Q,C,add,fmt,numOps,fracPool}=DA3;
  const smallRule=Q('gam_small_rule','小增长率近似',['技巧'],()=>{
    const ans='选项差距大且增长率小于10%时，可先用现期×增长率估；真实值略小';
    return R('增长量=现期÷(1+r)×r。当 r 小于10%且选项差距很大时，可以怎样快速估？',ans,op(ans,['任何时候都直接忽略分母','真实值一定比现期×r大','必须反带，不能估算']),'分母1+r大于1。','若暂时拿掉分母，得到现期×r；因为原式还要除以1+r，所以真实增长量比现期×r略小。前提是选项差距足够大。');
  });
  const ratioRule=Q('gam_ratio_rule','比例法规则',['技巧'],()=>{
    const ans='增长率化成分数：基期是分母份，增长量是分子份，现期是分母+分子份';
    return R('增长量比例法的份数逻辑是？',ans,op(ans,['现期永远是分母份','增长量永远是分母+分子份','减少量不能用份数法']),'例如增长1/7。','若增长率是1/7，则基期7份、增长1份、现期8份；已知现期就用现期对应8份求1份。');
  });
  const convertRule=Q('gam_convert_rule','非契合分数转化',['技巧'],()=>{
    const ans='增长率上调多少，现期反向下调多少；增长率下调多少，现期反向上调多少';
    return R('增长率不完全契合分数时，想把增长率划线成附近分数，现期应如何配合？',ans,op(ans,['增长率上调，现期也上调','只改增长率，不管现期','现期变化方向永远与分母一致']),'乘除估算要抵消误差。','增长量公式可看成“现期×增长率÷(1+r)”。当增长率改大，为保持整体接近，现期要反向改小；反之亦然。');
  });
  const fractionSense=Q('gam_fraction_sense','常用分数数感',['技巧'],()=>{
    const ans='2/9≈22.2%，4/9≈44.4%，2/7≈28.6%';
    return R('增长量比例法和估算中，哪组常用分数数感是正确的？',ans,op(ans,['2/9≈28.6%，4/9≈40%，2/7≈22.2%','1/8≈14.3%，1/7=12.5%，2/3=60%','1/4≈20%，1/3≈25%，2/3≈33.3%']),'常用循环节要能快速反应。','常用数感包括：2/9≈22.2%，4/9≈44.4%，2/7≈28.6%，1/7≈14.3%，1/8=12.5%，1/4=25%，1/3≈33.3%，2/3≈66.7%。');
  });
  const smallTrain=Q('gam_small_train','小增长率变量',['技巧'],()=>{
    const cur=n(1800,5200), r=n(3,9); const approx=cur*r/100; const truev=approx/(1+r/100);
    const ans=fmt(truev,1);
    return R(`现期 ${cur}，增长率 ${r}%。若选项差距很大，增长量约是多少？`,ans,numOps(truev,[approx,approx*1.12,truev*0.8],'',1),'先算现期×r，再记真实值偏小。',`${cur}×${r}%=${fmt(approx,1)}；原式还要÷(1+${r}%)，所以约为 ${ans}，略小于 ${fmt(approx,1)}。`);
  });
  const ratioGrowth=Q('gam_ratio_growth','增长份数变量',['技巧'],()=>{
    const f=pk(fracPool.filter(x=>x.p<=2 && x.q<=8));
    const one=n(80,260); const cur=one*(f.q+f.p); const growth=one*f.p;
    const ans=fmt(growth,1);
    return R(`某现期量为 ${cur}，增长率约为 ${f.name}。增长量约是多少？`,ans,numOps(growth,[one,cur/f.q,cur*f.p/f.q,growth*1.2],'',1),`增长率${f.name}表示基期${f.q}份，增长${f.p}份。`,`现期=${f.q}+${f.p}=${f.q+f.p}份，对应${cur}；一份=${fmt(one,1)}，增长${f.p}份，所以增长量=${fmt(growth,1)}。`);
  });
  const ratioDecrease=Q('gam_ratio_decrease','减少份数变量',['技巧'],()=>{
    const f=pk(fracPool.filter(x=>x.p<x.q && ['1/5','1/4','1/3','1/2','2/3'].includes(x.name)));
    const one=n(120,360); const cur=one*(f.q-f.p); const dec=one*f.p;
    const ans=fmt(dec,1);
    return R(`某现期量为 ${cur}，比基期减少约 ${f.name}。减少量约是多少？`,ans,numOps(dec,[one,cur/f.q,cur*f.p/f.q,dec*0.75],'',1),`减少${f.name}：基期${f.q}份，减少${f.p}份，现期${f.q-f.p}份。`,`基期${f.q}份，减少${f.p}份，现期剩${f.q-f.p}份。现期${cur}=${f.q-f.p}份，所以减少量=${f.p}份=${fmt(dec,1)}。`);
  });
  const convertTrain=Q('gam_convert_train','转化变量',['运用'],()=>{
    const cases=[{r:13.5,name:'1/7',target:14.3,down:true,parts:8},{r:24.0,name:'1/4',target:25.0,down:true,parts:5},{r:16.0,name:'1/6',target:16.7,down:true,parts:7},{r:15.0,name:'1/7',target:14.3,down:false,parts:8}];
    const c=pk(cases); const cur=n(1000,2600);
    const adj=c.down?'下调':'上调';
    const badAdj=c.down?'上调':'下调';
    const ans=`把 ${c.r}% 看成约 ${c.name}，同时把现期约${adj}后再除以${c.parts}`;
    return R(`现期 ${cur}，增长率 ${c.r}%。若想用 ${c.name} 比例法，正确思路是？`,ans,op(ans,[`直接用 ${cur}÷${c.parts}，不调整`,`把现期约${badAdj}后除以${c.parts}`,`把 ${c.r}% 看成1/8后除以9`]),`增长率划到${c.name}，现期要反向调整。`,`${c.r}%${c.down?'小于':'大于'}${c.name}≈${c.target}%。增长率${c.down?'上调':'下调'}到目标分数，现期就要反向${adj}，再按现期份数估算。`);
  });
  const ratioRoute=C('gam_ratio_route','比例法变量',['技巧'],[ratioGrowth,ratioDecrease],'all');
  const train=C('gam_variable','变量训练',['技巧'],[smallTrain,ratioRoute,convertTrain],'all');
  add(C('growth_amount_methods','增长量速算｜小率、比例法与转化',['技巧'],[smallRule,ratioRule,convertRule,fractionSense,train],'sequence'));
})();
