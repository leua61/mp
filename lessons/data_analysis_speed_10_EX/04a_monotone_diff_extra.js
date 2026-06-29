(function(){
  const {n,op,R,Q,C,add}=EX;

  const direct=[
    Q('mono_sum_diff_meaning','和差分析含义',['基础'],()=>R(
      '课程说“和差分析”时，最常用、最先试的一步是什么？','做差',
      ['做差','画地图','看单位','查表头'],
      '和差里做差出现更频繁。',
      '单调且三倍以内，优先做差；做和可作为备选，但不要一开始乱试很多路。'
    )),
    Q('mono_sum_later_boundary','做和顺序边界',['技巧'],()=>R(
      '做差后能构造网络时，还需要马上改去做和吗？','不需要',
      ['不需要','必须马上做和','必须做到四级差','直接奇偶猜'],
      '按节能顺序来。',
      '课程强调：第一步通常做差；做差后若构造网络能出答案，就不必再做和。构造不出时，做和可以作为备选。'
    )),
    Q('mono_diff_not_forever','不要无限做差',['基础'],()=>R(
      '一级差、二级差都不顺时，是否应该一路做到四级、五级差？','不应该',
      ['不应该','应该','必须做到十级','只要选项多就继续'],
      '差到后面数据太少，容易硬造。',
      '课程边界是最多三级差；无规律就转构造网络。'
    ))
  ];

  const chain=C('mono_diff_chain_training','差值倍数链',['技巧'],[
    Q('mono_diff_multiplier_chain','一级差倍数链',['技巧'],()=>{
      const a=n(3,9), d=n(2,5); const diffs=[d,d*2,d*3,d*4];
      const arr=[a]; for(const x of diffs){arr.push(arr[arr.length-1]+x);} const next=arr[arr.length-1]+d*5;
      return R(
        `数列 ${arr.join('，')}，若一级差为 ${diffs.join('，')}，下一项是多少？`, String(next),
        op(next,[next+d,next-d,arr[arr.length-1]*2]),
        '先看一级差本身。',
        `一级差是 ${d}×1，${d}×2，${d}×3，${d}×4，下一差为 ${d}×5=${d*5}，所以下一项是 ${next}。`
      );
    }),
    Q('mono_diff_power_after','差值转次方',['技巧'],()=>{
      const a=n(1,5), k=n(2,4); const diffs=[1,4,9].map(x=>x*k); const arr=[a]; for(const x of diffs) arr.push(arr[arr.length-1]+x); const next=arr[3]+16*k;
      return R(
        `数列 ${arr.join('，')}，一级差为 ${diffs.join('，')}，下一项最可能是多少？`, String(next),
        op(next,[next+k,next-3*k,arr[3]+25*k]),
        '差值本身可能是平方结构。',
        `差值为 ${k}×1²，${k}×2²，${k}×3²，下一差为 ${k}×4²=${16*k}，下一项 ${next}。`
      );
    })
  ],'sequence');

  add(C('monotone_diff_extra','单调数列补全｜和差与差值链',['技巧'],[...direct,chain],'all'));
})();
