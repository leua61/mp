(function(){
  const {pk,op,R,Q,C,add}=EX;

  const cycles=C('parity_random_cycles','奇偶周期变量',['运用'],[
    Q('parity_cycle_random','奇偶周期随机',['运用'],()=>{
      const patterns=[['奇','偶'],['奇','奇','偶'],['偶','偶','奇'],['奇','偶','偶']];
      const pat=pk(patterns); const shown=[...pat,...pat].slice(0,5); const ans=pat[5%pat.length];
      return R(
        `已知数列奇偶读起来为：${shown.join('、')}，按周期感猜下一项奇偶，应为？`, ans,
        op(ans,['奇','偶'].filter(x=>x!==ans)),
        '奇偶猜题法看的是能否读出周期，不限于奇偶交替。',
        `周期为 ${pat.join('、')}，第 6 项应为 ${ans}。这是没时间时的过滤法，不替代正常推理。`
      );
    }),
    Q('parity_filter_random','奇偶选项过滤随机',['运用'],()=>{
      const ansParity=pk(['奇数','偶数']); const nums=ansParity==='奇数'?[21,34,48,56]:[20,31,47,59]; const ans=String(nums[0]);
      return R(
        `若奇偶周期判断答案应为${ansParity}，选项为 ${nums.join('、')}，优先保留哪一个？`, ans,
        op(ans,nums.slice(1).map(String)),
        '先用奇偶过滤选项。',
        `${nums[0]} 是${ansParity}，其余选项奇偶不合，可先排除。`
      );
    })
  ],'all');

  add(C('parity_random_enrichment','奇偶猜题升华｜周期随机与选项过滤',['运用'],[cycles],'all'));
})();
