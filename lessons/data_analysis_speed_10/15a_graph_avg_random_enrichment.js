(function(){
  const {n,op,R,Q,C,add}=EX;
  const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);

  const graph=C('graph_random','图形变量训练',['技巧'],[
    Q('graph_extreme_random','折线极值随机',['技巧'],()=>{
      const vals=[n(200,500),n(600,900),n(300,700),n(100,400),n(450,800)];
      const years=['2011','2012','2013','2014','2015'];
      const maxIdx=vals.indexOf(Math.max(...vals)); const ans=years[maxIdx];
      return R(
        `五年数据依次为 ${years.map((y,i)=>y+':'+vals[i]).join('，')}。折线图中最高点应是哪一年？`, ans,
        op(ans,years.filter(y=>y!==ans)),
        '折线图看点的高低，不看线段长度。',
        `${ans} 的数值最大，所以图上最高点应对应 ${ans}。`
      );
    })
  ],'all');

  const avg=C('avg_random','阈值排序变量训练',['技巧'],[
    Q('avg_topk_random','高于阈值对象随机',['技巧'],()=>{
      const names=['甲','乙','丙','丁','戊','己','庚'];
      const vals=sh([n(100,180),n(190,260),n(270,340),n(350,420),n(430,500),n(510,580),n(590,660)]);
      const pairs=names.map((name,i)=>({name,val:vals[i]})).sort((a,b)=>b.val-a.val);
      const ans=pairs.slice(0,4).map(x=>x.name).join('、');
      return R(
        `七个对象数值为：${names.map((name,i)=>name+vals[i]).join('，')}。若题目问“高于表中平均值的四个对象”，优先锁定哪四个？`, ans,
        op(ans,[pairs.slice(1,5).map(x=>x.name).join('、'),pairs.slice(3,7).map(x=>x.name).join('、'),pairs.slice(0,3).map(x=>x.name).join('、')]),
        '若答案确定有四个，高于平均者必从最大四个里找。',
        `先排序，不硬算平均值。最大的四个是 ${ans}。`
      );
    }),
    Q('avg_lowk_random','低于阈值对象随机',['技巧'],()=>{
      const vals=[n(80,140),n(150,210),n(220,280),n(290,350)]; const names=['甲','乙','丙','丁'];
      const ans=names[0];
      return R(
        `四个对象已按从小到大排列：${names.map((x,i)=>x+vals[i]).join('，')}。若问“低于某阈值的对象”，必先从谁开始？`, ans,
        op(ans,['丁','乙','丙']),
        '低于阈值的一定先包含最小者。',
        `若最小的 ${ans} 都不低于，其他更不可能低于；所以从最小者开始判断。`
      );
    })
  ],'all');

  add(C('graph_avg_random_enrichment','图形均值升华｜极值与排序变量',['技巧'],[graph,avg],'all'));
})();
