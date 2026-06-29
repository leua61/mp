(function(){
  const {n,op,R,Q,C,add}=EX;

  const a=Q('eng_svt','S=VT',['基础'],()=>R(
    '工程、销售效率、排查人数这类题的共同底层式是什么？',
    '总量 = 效率 × 时间',
    ['总量 = 效率 × 时间','总量 = 时间 ÷ 效率','效率 = 总量 × 时间','只看人数'],
    '效率题先回到S=VT。',
    '人数、工程队、销售速度都可看作效率；但总量是否同一、效率是否相同，要由题干决定。'
  ));

  const b=Q('eng_remove_same','去同存异',['技巧'],()=>{
    let alone=n(24,40), together=n(12,alone-6);
    while(alone===2*together) together=n(12,alone-6);
    const g=(x,y)=>y?g(y,x%y):x;
    const x=together, y=alone-together, d=g(x,y);
    const ans=`${x/d}:${y/d}`;
    return R(
      `甲单独完成同一工程需${alone}天，甲乙合作需${together}天。甲乙效率比是多少？`,
      ans,
      op(ans,[`${y/d}:${x/d}`,'1:1',`${alone}:${together}`,`${together}:${alone}`],4),
      '主体分割/去同存异：把合作时间拆成“甲做了若干天+乙做了若干天”。',
      `甲乙合作${together}天=甲${together}天+乙${together}天；甲单独${alone}天完成，所以乙${together}天等价于甲${alone-together}天。这里也可叫主体分割、求同存异/去同存异，核心是去掉共同的甲${together}天。效率比甲:乙=${together}:${alone-together}=${ans}。`
    );
  });

  const c=Q('eng_round_up','不足一天取整',['基础'],()=>{
    const work=n(145,190), eff=n(5,8); const exact=work/eff; const ans=Math.ceil(exact);
    return R(
      `总工作量${work}份，每天完成${eff}份，问至少需要多少整天？`,
      String(ans),
      op(String(ans),[String(Math.floor(exact)),String(ans+1),String(Math.max(1,ans-1))]),
      '天数出现小数时，要向上取整。',
      `${work}/${eff}=${exact.toFixed(2)}天，不足一天也要按一天算，所以至少${ans}天。`
    );
  });

  const c2=Q('eng_two_project_route','AB工程总量路线',['运用'],()=>{
    const va=2, vb=1, ta=n(24,36), tb=n(16,24);
    const SA=(va+vb)*ta, SB=(va+vb)*tb;
    const ans=`先由同一工程推出效率比，再分别求A、B总量：${SA}和${SB}`;
    return R(
      `甲乙效率比已由去同存异得出为2:1。若甲乙合作完成A工程需${ta}天、完成B工程需${tb}天，下一步应怎样处理？`,
      ans,
      op(ans,[`直接把A和B当同一总量`,`只算A工程，不管B工程`,`先把${ta}和${tb}相乘取公倍数`]),
      '问两个工程合做时，效率比之后要把两个工程的总量分别求出来。',
      `甲乙合作效率为3，所以SA=3×${ta}=${SA}，SB=3×${tb}=${SB}。原课AB工程题不是停在效率比，还要回到总量再合并。`
    );
  });

  const s1=Q('special_equal_sum','和相等',['技巧'],()=>{
    const total=n(6,10); const a=n(2,total-2); const b=total-a; const c=n(2,total-2); const d=total-c;
    return R(
      `两种安排分别是${a}人做甲+${b}人做乙、${c}人做甲+${d}人做乙，且每人效率相同。首先能看出什么？`,
      '两种安排总效率相同',
      ['两种安排总效率相同','甲乙总量相同','完成时间相同','乙一定更快'],
      `${a}+${b}=${c}+${d}=${total}。`,
      `人数和都为${total}，每人效率相同，所以每天总完成量相同。`
    );
  });

  const s2=Q('special_double_time','倍数反比',['技巧'],()=>{
    const p=n(2,5), mult=n(2,3);
    return R(
      `同一乙社区，第一次${p}人负责，第二次${p*mult}人负责。只看乙的完成时间，两次时间比应为？`,
      `${mult}:1`,
      op(`${mult}:1`,[`1:${mult}`,'1:1',`${p}:${p*mult}`]),
      '同一总量下，时间与效率成反比。',
      `人数从${p}到${p*mult}，效率变为${mult}倍，所以完成时间变为1/${mult}，第一次:第二次=${mult}:1。`
    );
  });

  const s3=Q('special_extra_lack','补量欠量',['运用'],()=>{
    const workers=n(3,7), days=n(3,6), more=workers*days;
    return R(
      `以乙完成时间为参照，甲提前${days}天完成且原本${workers}人做甲，应如何转化这${days}天？`,
      `视作甲多做${more}份`,
      op(`视作甲多做${more}份`,[`视作甲少做${more}份`,`直接忽略`,`视作乙多做${more}份`]),
      '参照时间内不让甲休息；提前完成转为多做，未完成转为欠做。',
      `若甲提前${days}天完成，假设它继续做到乙完成时，就会多做${workers}人×${days}天=${more}份；若参照时还有剩余，则转为欠做量。`
    );
  });

  const s4=Q('special_reference_total','参照总量差',['运用'],()=>{
    const more=n(20,35), lack=n(18,30), diff=more+lack;
    return R(
      `同一总量S下，过程1按参照时间看“比S多${more}份”，过程2按参照时间看“比S少${lack}份”。两个参照总量相差多少？`,
      String(diff),
      op(String(diff),[String(Math.abs(more-lack)),String(more),String(lack)]),
      '一个在S上方，一个在S下方。',
      `过程1是S+${more}，过程2是S-${lack}，二者相差${more}+${lack}=${diff}份。原课的25和24就是这样合成49。`
    );
  });

  const route=C('special_data_route','特殊数据｜和相等倍数与参照',['运用'],[s1,s2,s3,s4],'sequence');
  add(C('engineering_card','工程效率｜同量去同与参照',['技巧'],[a,b,c,c2,route],'all'));
})();
