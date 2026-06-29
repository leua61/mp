(function(){
  const {n,op,R,Q,C,add,pk}=EX;

  const percent=C('speed_percent_random','百分数阈值变量',['技巧'],[
    Q('percent_threshold_random','A/B 大于 p% 随机',['技巧'],()=>{
      const p=pk([5,10,20,25]); const b=n(12000,88000); const threshold=Math.round(b*p/100); const a=threshold+n(100,3000);
      return R(
        `A=${a}，B=${b}。判断 A/B 是否大于 ${p}%，可先比较什么？`, `A 是否大于 ${threshold}`,
        op(`A 是否大于 ${threshold}`,[`A 是否大于 ${b+p}`,`B 是否大于 ${a*p}`,`A 是否小于 ${Math.round(b/p)}`]),
        `${p}%×B 是阈值。`,
        `A/B>${p}% 等价于 A>${p}%×B≈${threshold}。这里 ${a}>${threshold}，所以大于 ${p}%。`
      );
    }),
    Q('growth_chunk_random','小百分比增长量口算随机',['技巧'],()=>{
      const cur=n(5200,9800), p=pk([3,4,5,6]); const ans=`约 ${Math.round(cur*p/100/10)*10}`;
      return R(
        `现期约 ${cur}，同比下降约 ${p}%，选项差距较大。减少量可快速估为多少？`, ans,
        op(ans,[`约 ${Math.round(cur*p/1000/10)*10}`,`约 ${Math.round(cur*p/10/10)*10}`,`约 ${cur}`]),
        '每 100 对应 p，每 1000 对应 10p。',
        `${cur}×${p}%≈${Math.round(cur*p/100)}，选项差距大时估为 ${ans} 足够。`
      );
    })
  ],'all');

  const fraction=C('speed_fraction_random','常见分数变量',['技巧'],[
    Q('fraction_bank_reverse_random','分数反向敏感',['技巧'],()=>{
      const pairs=[['1/4','25%'],['1/5','20%'],['1/6','16.7%'],['1/7','14.3%'],['1/9','11.1%'],['4/7','57.1%'],['7/15','46.7%']];
      const [f,p]=pk(pairs);
      return R(
        `${f} 约等于多少百分数？`, p,
        op(p,pairs.map(x=>x[1]).filter(x=>x!==p)),
        '分数和百分数要双向敏感。',
        `${f}≈${p}。估算不是死背，而是为了快速判断选项。`
      );
    })
  ],'all');

  add(C('speed_random_enrichment','速算升华｜阈值、百分数与分数变量',['技巧'],[percent,fraction],'all'));
})();
