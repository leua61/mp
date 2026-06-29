(function(){
  const {n,r1,op,R,Q,C,add,pk}=EX;

  const common=[
    {label:'1/5',pct:20},
    {label:'2/9',pct:22.2},
    {label:'1/4',pct:25},
    {label:'1/6',pct:16.7},
    {label:'1/8',pct:12.5},
    {label:'1/3',pct:33.3}
  ];

  const q1=Q('var_frac_think_pick','分数近似变量',['技巧'],()=>{
    const target=r1(pk([18.8,19.6,21.4,23.1,24.2,12.8,16.1,32.6]));
    const best=common.reduce((a,b)=>Math.abs(b.pct-target)<Math.abs(a.pct-target)?b:a, common[0]);
    return R(
      `${target}% 最接近下列哪个常用分数？`,
      best.label,
      op(best.label, common.map(x=>x.label)),
      '把常用分数先转成百分数，再比距离。',
      `${best.label}≈${best.pct}%，它离 ${target}% 最近。`
    );
  });

  const q2=Q('var_frac_think_relative_gap','相对误差变量',['技巧'],()=>{
    const raw=pk([21.4,18.8,24.2,32.6]);
    const approx=pk(raw>25?[33.3,25]:[20,22.2,25]);
    const dir=approx<raw?'下降':'上升';
    const gap=r1(Math.abs(approx-raw)/raw*100);
    const ans=`${dir}约${gap}%`;
    return R(
      `把 ${raw}% 近似为 ${approx}%，近似因子相对原百分数大约怎样变化？`,
      ans,
      op(ans,[`下降约${r1(gap+2)}%`,`上升约${r1(gap+2)}%`,`只差${r1(Math.abs(approx-raw))}个百分点`]),
      '这里要算相对变化，不是只看百分点差。',
      `相对变化≈|${approx}-${raw}|/${raw}≈${gap}%，方向为${dir}。`
    );
  });

  const q3=Q('var_frac_think_compensate','补偿方向变量',['技巧'],()=>{
    const raw=pk([21.4,24.2,18.8,32.6]);
    const approx=raw>25?33.3:(raw>22?25:20);
    const ans=approx<raw?'相关量应上调补偿':'相关量应下调补偿';
    return R(
      `为了心算，把 ${raw} 近似为 ${approx}。若该近似把关键因子改${approx<raw?'小':'大'}了，补偿方向应是什么？`,
      ans,
      op(ans,['相关量应上调补偿','相关量应下调补偿','直接加百分点','不用看方向']),
      '因子改小就反向上调；因子改大就反向下调。',
      `近似改变了因子大小，补偿必须反向，不能把百分点差直接加到最终答案。`
    );
  });

  const routeA=C('route_var_fraction_approx','百分数转分数',['技巧'],[q1,q2,q3],'sequence');

  add(C('var_fraction_thinking_card','变量训练｜分数思维近似',['运用'],[routeA],'all'));
})();
