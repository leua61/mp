(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const b1=Q('ns_multiple_rule','倍数入口',['基础'],()=>R(
    '什么时候优先考虑倍数或次方，而不是先做差？',
    '多处相邻项超过三倍或倍数明显',
    op('多处相邻项超过三倍或倍数明显',['只有一个局部超过三倍','题干出现百分号','选项有零']),
    '个别超过三倍不一定改方向，多处才更像倍数次方。',
    '课程强调：只有个别超过三倍时仍可先和差；多处超过三倍才优先倍数或次方。'
  ));

  const b2=Q('ns_multiple_drill','倍数变化',['技巧'],()=>{
    const a=n(1,5);
    const ms=pk([[2,2,2,2],[4,3,2,1],[1,2,4,8]]);
    const arr=[a];
    ms.forEach(m=>arr.push(arr[arr.length-1]*m));
    const nextM=ms[0]===4?5:(ms[0]===1?16:2);
    const ans=String(arr[arr.length-1]*nextM);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String(arr[arr.length-1]+nextM),String(arr[arr.length-1]*2),String(arr[arr.length-1]*nextM+nextM)]),
      '先看相邻倍数是否有固定或变化规律。',
      `相邻倍数为 ${ms.join('、')}，下一倍数为 ${nextM}，答案 ${arr[arr.length-1]}×${nextM}=${ans}。`
    );
  });

  const p1=Q('ns_power_identify','次方识别',['基础'],()=>R(
    '数据本身或附近出现 8、27、64、125 等，应优先想到什么？',
    '次方数列',
    op('次方数列',['顺差逆差','削峰填谷','百分点']),
    '这些数是立方或平方的典型锚点。',
    '若数据是次方数±1，也可按次方数边上拆。'
  ));

  const p2=Q('ns_power_plus_one','次方数加一',['技巧'],()=>{
    const add=pk([-1,1]);
    const start=n(1,3);
    const arr=[];
    for(let i=start;i<start+4;i++) arr.push(i*i*i+add);
    const ans=String((start+4)*(start+4)*(start+4)+add);
    return R(
      `${arr.join('，')}，？`,
      ans,
      op(ans,[String((start+4)*(start+4)*(start+4)),String((start+5)*(start+5)*(start+5)+add),String(Number(ans)+2)]),
      `把每项看成连续立方数${add>0?'+1':'-1'}。`,
      `规律为 ${start}³${add>0?'+1':'-1'} 到 ${start+3}³${add>0?'+1':'-1'}，下一项是 ${start+4}³${add>0?'+1':'-1'}=${ans}。`
    );
  });

  const drill=C('ns_multiple_power_route','变量训练',['技巧'],[b2,p2],'sequence');
  add(C('ns_multiple_power_card','倍数次方｜强变化数列',['技巧'],[b1,p1,drill],'all'));
})();
