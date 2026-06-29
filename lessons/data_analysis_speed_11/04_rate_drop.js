(function(){
  const {pk,n,op,R,Q,C,add}=EX;

  const r1=Q('da_rate_word','增幅含义',['基础'],()=>R(
    '资料分析中“增幅”通常等价于什么？',
    '增长率',
    op('增长率',['增长量','比重','平均数']),
    '“幅”在这里是增长的幅度，不是具体增加量。',
    '增幅就是增长率；若材料说高出多少个百分点，就对增长率做加减。'
  ));

  const r2=Q('da_decline_abs','降幅比较',['基础'],()=>R(
    '增长率 -3.2% 和 -5.6%，如果问“降幅更大”，应选哪个？',
    '-5.6%',
    op('-5.6%',['-3.2%','两者一样','无法判断']),
    '问增长率大小看正负号，问降幅大小看下降绝对值。',
    '-3.2% 的增长率更大，但 -5.6% 的下降幅度更大。'
  ));

  const r3=Q('da_point_change','百分点修正',['技巧'],()=>{
    const now=n(6,18);
    const diff=n(1,5);
    const mode=pk(['高出','低于']);
    const ans=mode==='高出'?`${now-diff}%`:`${now+diff}%`;
    return R(
      `某部分同比增长 ${now}%，${mode}整体增幅 ${diff} 个百分点。整体增幅是多少？`,
      ans,
      op(ans,[`${now+diff}%`,`${diff}%`,`${now}%`]),
      '高出整体，就用部分减百分点；低于整体，就用部分加百分点。',
      `${mode==='高出'?`${now}-${diff}`:`${now}+${diff}`}=${ans.replace('%','')}，整体增幅为 ${ans}。`
    );
  });

  const r4=Q('da_decline_widen','降幅扩大收窄',['技巧'],()=>{
    const now=n(8,30);
    const d=n(1,4);
    const mode=pk(['扩大','收窄']);
    const prev=mode==='扩大'?now-d:now+d;
    const ans=`-${prev}%`;
    return R(
      `今年同比下降 ${now}%，降幅比上年${mode} ${d} 个百分点。上年增长率是多少？`,
      ans,
      op(ans,[`-${now+d}%`,`-${now-d}%`,`+${prev}%`]),
      '扩大：今年降得更多；收窄：今年降得更少。',
      `${mode==='扩大'?'今年更负，所以上年少降':'今年少降，所以上年多降'}，上年为 -${prev}%。`
    );
  });

  const drill=C('da_rate_variable_route','变量训练',['技巧'],[r3,r4],'sequence');
  add(C('da_rate_card','增幅降幅｜百分点与正负',['基础'],[r1,r2,drill],'all'));
})();
