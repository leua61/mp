(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const c1=Q('da_count_from_share','占比换人数',['技巧'],()=>{
    const total=pk([1000,1500,2000,3000]);
    const diff=pk([6.5,10.5,15.3,22.4]);
    const ans=`约 ${Math.round(total*diff/100)}`;
    return R(
      `总人数 ${total}，两个选择的占比相差 ${diff} 个百分点。实际人数相差约多少？`,
      ans,
      op(ans,[`约 ${diff}`,`约 ${Math.round(total/diff)}`,`约 ${Math.round(total*(100-diff)/100)}`]),
      '占比差要乘总人数，不能把百分点当人数。',
      `${total}×${diff}%≈${Math.round(total*diff/100)}，所以人数差约为 ${Math.round(total*diff/100)}。`
    );
  });

  const c2=Q('da_denominator_shift','分母换范围',['技巧'],()=>{
    const plane=n(30,50);
    const factor=n(4,12);
    const ans=`${Math.round(factor/plane*100)}%`;
    return R(
      `总人群中，飞机用户占 ${plane}%，考虑积分奖励的人占 ${factor}%。且只有飞机有积分奖励。在飞机用户中，考虑积分奖励者占比约为？`,
      ans,
      op(ans,[`${factor}%`,`${plane}%`,`${Math.round((plane-factor)/plane*100)}%`]),
      '题目问“在飞机用户中”，分母要换成飞机用户。',
      `占比=${factor}%÷${plane}%≈${Math.round(factor/plane*100)}%。`
    );
  });

  const c3=Q('da_containment','包含关系',['基础'],()=>R(
    '题干说“火车包含高铁、动车、普通列车”，求火车总占比时应怎么做？',
    '三项占比相加',
    op('三项占比相加',['只看高铁','只看普通列车','用飞机占比替代']),
    '包含关系常藏在文字里。',
    '火车不是单独一栏时，要把其包含的交通方式合并。'
  ));

  const d1=Q('da_plane_train_reverse','反向占比',['技巧'],()=>{
    const total=2000;
    const people=pk([600,750,840,920]);
    const plane=Math.round(people/total*1000)/10;
    const rail=Math.round((100-plane)*10)/10;
    const ans=`约 ${rail}%`;
    return R(
      `共有 ${total} 人，只能选飞机或高铁。若选飞机约 ${people} 人，则选高铁占比约多少？`,
      ans,
      op(ans,[`约 ${plane}%`,`约 ${Math.round(people/20)}%`,`约 ${Math.round((people/total)*100)}%`]),
      '先人数转占比，再用 100% 减。',
      `飞机占比=${people}÷${total}=${plane}%，高铁占比≈100%-${plane}%=${rail}%。`
    );
  });

  const d2=Q('da_not_in_range','范围内不考虑',['技巧'],()=>{
    const inRange=pk([62,68,75,80]);
    const consider=n(35,inRange-5);
    const ans=`约 ${Math.round((inRange-consider)/inRange*100)}%`;
    return R(
      `总人群中，飞机或高铁用户占 ${inRange}%，考虑行程总耗时的人占 ${consider}%，且这些考虑者均在飞机或高铁用户中。问在飞机或高铁用户中“不考虑”的占比。`,
      ans,
      op(ans,[`${100-consider}%`,`${inRange-consider}%`,`${consider}%`]),
      '先限定分母，再在这个范围内做差。',
      `范围内不考虑占比=(${inRange}%-${consider}%)÷${inRange}%≈${Math.round((inRange-consider)/inRange*100)}%。`
    );
  });

  const inner=C('da_range_complex_inner','范围陷阱',['运用'],[d1,d2],'sequence');
  const outer=C('da_range_scenarios','变量场景',['技巧'],[c1,c2,inner],'sequence');
  add(C('da_range_card','范围一致｜占比人数与包含',['运用'],[c3,outer],'all'));
})();
