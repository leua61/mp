(function(){
  const {n,op,R,Q,C,add}=EX;
  const q1=Q('precision_var_first_digit','首位判断',['技巧'],()=>{
    const d=n(120,780); const k=n(2,8); const rem=n(0,Math.floor(d*0.35)); const a=d*k+rem;
    const ans=`${k}开头`;
    return R(`${a} ÷ ${d} 的选项首位分别不同，结果首位大约是？`,ans,op(ans,[`${k-1}开头`,`${k+1}开头`,`${Math.max(1,k-2)}开头`]),'先看 d×几最接近 a。',`${d}×${k}=${d*k}，且余量不大，所以商是 ${k} 开头。`);
  });
  const q2=Q('precision_var_line_pick','划线选择',['技巧'],()=>{
    const base=n(230,760); const pct=n(3,8); const changed=Math.round(base*(1+pct/100));
    return R(`${base} 被看成 ${changed}，大约相当于上升多少？`,`${pct}%`,op(`${pct}%`,[`${pct+2}%`,`${Math.max(1,pct-2)}%`,`-${pct}%`]),'用变化量除以原数。',`${changed}-${base}≈${Math.round(base*pct/100)}，约为原数的 ${pct}%，所以是上升 ${pct}%。`);
  });
  const q3=Q('precision_var_reverse_use','反代场景',['技巧'],()=>{
    const start=n(260,690); const opts=[start,start+1,start+2,start+3].map(x=>`${x}.${n(1,8)}`);
    return R(`四个选项为 ${opts.join('、')}，前三位高度接近。此时最稳的估算策略是？`,'选中间方便值反代',op('选中间方便值反代',['只看首位','随便四舍五入','把分母看成 100']), '选项差距越小，越要反向验证。','选项已经接近千分级，普通划线法精度可能不够，应选夹在选项之间且方便做差的值反代。');
  });
  const q4=Q('precision_var_magnitude','数量级',['技巧'],()=>{
    const days=n(28,31); const p=(n(35,68)/10).toFixed(1); const val=days*Number(p)/100;
    const ans=val<10?'一位数':'两位数';
    return R(`${days} × ${p}% 的结果数量级最接近哪一种？`,ans,op(ans,['两位数','一位数','三位数','小于 0.1']), '百分号要变成两位小数。',`${p}%=${Number(p)/100}，${days}×${Number(p)/100}≈${val.toFixed(2)}，所以是${ans}。`);
  });
  const q5=Q('precision_var_boundary','临界验证',['技巧'],()=>{
    const d=n(103,129); const target=n(3,8); const a=d*target+n(1,9); const crit=target+1;
    const ans=a>=d*crit?`能到 ${crit}`:`到不了 ${crit}`;
    return R(`${a} ÷ ${d} 的估算值卡在 ${target} 与 ${crit} 附近。验证 ${d}×${crit}=${d*crit} 后，应判断？`,ans,op(ans,[`能到 ${target}`,`到不了 ${target}`,`必须反代全部选项`]),'把临界值移到另一边相乘。',`${a} ${a>=d*crit?'≥':'<'} ${d*crit}，所以真实商${a>=d*crit?'已经':'还没有'}达到 ${crit}。`);
  });
  const routeA=C('precision_var_route_a','方法选择｜顺序',['技巧'],[q1,q2,q3],'sequence');
  const routeB=C('precision_var_route_b','边界处理｜顺序',['技巧'],[q4,q5],'sequence');
  add(C('precision_variable_card','选项精度｜变量训练',['技巧'],[routeA,routeB],'all'));
})();
