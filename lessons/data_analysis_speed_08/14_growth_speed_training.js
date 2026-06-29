(function(){
  const {n,pct,op,R,Q,C,add,approx}=EX;
  const small=C('small_rate_route','小增长率估增长量',['技巧'],[
    Q('hundred_growth','100增长',['技巧'],()=>{ const r=n(2,9); return R(`100增长${pct(r)}，增长量约是多少？`,String(r),op(r,[r+1,r-1,r*10]),'100的1%就是1。',`100×${r}%=${r}。`); }),
    Q('thousand_growth','1000增长',['技巧'],()=>{ const r=n(2,9); return R(`1000增长${pct(r)}，增长量约是多少？`,String(r*10),op(r*10,[r,r*10+10,r*100]),'1000的1%是10。',`1000×${r}%=${r*10}。`); }),
    Q('many_blocks','百千组合',['技巧'],()=>{ const k=n(2,8), r=n(2,9); const ans=k*r; return R(`${k}个100增长${pct(r)}，增长量约是多少？`,String(ans),op(ans,[ans+r,ans-r,k*100*r]),'先看有几个100。',`每个100增长${r}，${k}个100约增长${ans}。`); })
  ],'sequence');
  const fraction=C('fraction_route','份数法',['技巧'],[
    Q('fraction_growth','现期除份数',['技巧'],()=>{ const den=EX.pk([5,6,7,8]); const cur=n(80,300)*den; const ans=Math.round(cur/(den+1)); return R(`若增长率约为1/${den}，现期量约${cur}，增长量约为多少？`,String(ans),op(ans,[Math.round(cur/den),Math.round(cur/(den+2)),ans+10]),'r=1/n时，增长量≈现期/(n+1)。',`增长率≈1/${den}，现期=基期×(1+1/${den})，增长量≈现期/(${den}+1)=${ans}。`); }),
    Q('reverse_adjust','反向微调',['技巧'],()=>R('为了把13.9%凑成14.2%≈1/7，增长率被调大了，现期量应如何微调？','反向调小',['反向调小','同向调大','不需要调整','改算比重'],'增长率调大，为抵消误差，现期应调小。','份数法估算中，一个因素调大，另一个因素通常反向调小以控制误差。'))
  ],'sequence');
  const grouped=C('option_group_route','增长量组选项',['运用'],[
    Q('group_first','先分组',['运用'],()=>R('增长量选项分成“约2000”和“约2400”两组时，应先做什么？','粗估落在哪一组',['直接代入中间值','粗估落在哪一组','任选一组','只看最大选项'],'组间差距大，先排除一组。','先用划线或份数法粗估，再在剩余组选项内精算。')),
    Q('within_group','组内代入',['技巧'],()=>{ const cur=14275, r=17, x=2070; const base=cur-x; const check=Math.round(base*r/100); const ans='接近，保留该组'; return R(`现期${cur}，增长率${pct(r)}。若试代增长量${x}，基期约${base}，基期×增长率约${check}。应如何判断？`,ans,op(ans,['接近，保留该组','差太远，排除该组','改用拉动增长','不能判断任何信息']), '代入后看增长量是否自洽。',`${base}×17%≈${check}，与${x}接近，说明该组合理。`); })
  ],'sequence');
  const assume=C('assumption_route','假设分配备选法｜备选技巧',['技巧'],[
    Q('assume_base_piece','假设基期块',['技巧'],()=>{ const r=EX.pk([12,15,18]); const base=n(3,9)*1000; const inc=Math.round(base*r/100); const cur=base+inc; return R(`若假设基期为${base}，增长率为${pct(r)}，对应现期是多少？`,String(cur),op(cur,[base,inc,cur+100]),'先由假设基期推出增长量，再合成现期。',`${base}×${r}%=${inc}，所以这一块对应现期${base}+${inc}=${cur}。`); }),
    Q('assume_when_use','驿站｜何时使用',['驿站'],()=>R('假设分配法适合什么同学作为备选？','乘除不顺但加减熟练的同学',['乘除不顺但加减熟练的同学','任何题都必须优先用','只适合比重变化','只适合翻番题'],'原文把它作为可用但不主推的方法。','它通过不断假设基期块、累加现期块逼近总现期；熟练后可用，但本课程主线仍优先代入和份数法。'))
  ],'all');
  add(C('growth_speed_training_card','增长量速算｜变量训练',['技巧'],[small,fraction,grouped,assume],'all'));
})();
