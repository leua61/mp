(function(){
  const {pk,R,Q,C,add,op}=EX;

  const guess=C('composite_random_guess','综合题变量策略',['运用'],[
    Q('composite_balance_random','均衡性猜题随机',['运用'],()=>{
      const patterns=[['A','B','B','C','D'],['A','C','D','D','B'],['B','C','A','C','D'],['A','B','C','D','C']];
      const row=pk(patterns); const missing=['A','B','C','D'].find(x=>!row.slice(0,4).includes(x)) || 'C';
      return R(
        `一篇资料分析前四题答案为 ${row.slice(0,4).join('、')}，第 5 题是综合题且没时间做。按选项均衡性优先猜什么？`, missing,
        op(missing,['A','B','C','D'].filter(x=>x!==missing)),
        '均衡性只在前四题尽量做对时才有价值。',
        `前四题缺 ${missing}，综合题没时间时可优先猜 ${missing}。若有时间，还要结合 C/D 验证。`
      );
    }),
    Q('composite_reverse_random','倒序验证随机',['运用'],()=>{
      const ans=pk(['先验 C/D','前三项排除后直接选 D','没证据不推出趋势']);
      return R(
        `综合题还有一点时间，但不想四个选项全算。下列哪种做法符合课程策略？`, ans,
        op(ans,['A 到 D 全部精算两遍','先看线段长短','只凭题干年份猜答案']),
        '综合题是耗时题，要用验证顺序节能。',
        `课程建议综合题可先看 C/D；若 A/B/C 已排除，直接选 D，不再重复验 D；材料没给的信息不能推出。`
      );
    })
  ],'all');

  add(C('composite_random_enrichment','综合题升华｜均衡与倒验变量',['运用'],[guess],'all'));
})();
