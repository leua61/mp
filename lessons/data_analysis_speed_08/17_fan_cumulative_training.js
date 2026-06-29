(function(){
  const {n,op,R,Q,C,add}=EX;
  const fan=C('fan_route','翻N番',['技巧'],[
    Q('fan_to_times','番数转倍数',['技巧'],()=>{ const k=n(1,6), ans=2**k; return R(`翻${k}番等于原来的多少倍？（翻了一番就是2倍）`,`${ans}倍`,op(`${ans}倍`,[`${ans-1}倍`,`${ans+1}倍`,`${k*2}倍`]),'翻N番就是2^N倍。',`通式：翻N番=2^N倍；本题2^${k}=${ans}，所以是${ans}倍。`); }),
    Q('times_to_range','倍数夹逼',['技巧'],()=>{ const k=n(3,6); const val=2**k+n(1,2**k-1); const ans=`介于${k}番和${k+1}番之间`; return R(`${val}倍介于几番和几番之间？`,ans,op(ans,[`介于${k-1}番和${k}番之间`,`刚好${k}番`,`刚好${k+1}番`]),'比较2的幂。',`2^${k}=${2**k}，2^${k+1}=${2**(k+1)}，${val}在二者之间。`); }),
    Q('close_fan','接近几番',['技巧'],()=>{ const k=5, val=56, ans='接近6番'; return R('56倍接近几番？',ans,op(ans,['接近5番','接近6番','刚好5番','刚好6番']),'56大于32，小于64。','56已超过5番对应的32倍，且未达到6番对应的64倍，可说接近6番。'); })
  ],'sequence');
  const cum=C('cumulative_route','累计量转当年量',['技巧'],[
    Q('current_year','当年量',['技巧'],()=>{ const prev=n(100,300), addv=n(20,80), cur=prev+addv; return R(`某指标上年累计${prev}，本年累计${cur}，本年当年量是多少？`,String(addv),op(addv,[cur,prev,addv+10]),'当年量=本年累计-上年累计。',`${cur}-${prev}=${addv}。`); }),
    Q('header_cumulative','表头陷阱',['基础'],()=>R('表头写“累计”时，题目问“当年量”，能直接用本年累计值吗？','不能',['能','不能','只在增长率题能','只在倍数题能'],'累计值不是当年新增。','应先用本年累计-上年累计得到当年量。'))
  ],'sequence');
  add(C('fan_cumulative_training_card','翻番与累计｜变量训练',['技巧'],[fan,cum],'all'));
})();
