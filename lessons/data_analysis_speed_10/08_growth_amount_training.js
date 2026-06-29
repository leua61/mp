(function(){
  const {n,op,R,Q,C,add}=EX;

  const normal=C('growth_amt_normal','常规增长量',['技巧'],[
    Q('growth_amt_formula_var','现期求增长量',['技巧'],()=>{
      const base=n(4200,9600), r=n(5,12); const cur=Math.round(base*(100+r)/100); const ans=String(cur-base);
      return R(
        `某指标现期为 ${cur}，同比增长约 ${r}%。增长量最接近多少？`, ans,
        op(ans,[String(Math.round(cur*r/100)),String(cur-base+n(30,80)),String(Math.max(1,cur-base-n(30,80)))]),
        '增长量 = 现期×r÷(1+r)，或现期-基期。',
        `基期约 ${base}，增长量为 ${cur}-${base}=${cur-base}。`
      );
    }),
    Q('growth_amt_down_sign','下降方向',['基础'],()=>{
      const cur=n(6000,9800), p=n(3,8); const ans='负增长量';
      return R(
        `现期为 ${cur}，同比下降 ${p}%。若用“增长量”表示，它的符号应是什么？`, ans,
        ['正增长量','负增长量','一定为 0','无法判断'],
        '下降说明现期少于基期。',
        '同比下降时，增长率为负，增长量也应为负。'
      );
    })
  ],'all');

  const fraction=C('growth_amt_fraction','分数思维',['技巧'],[
    Q('growth_amt_fraction_var','r 近似 1/n',['技巧'],()=>{
      const nden=EX.pk([8,9,10,12]); const r=Math.round(1000/nden)/10; const cur=nden*EX.n(180,420);
      const ans=String(Math.round(cur/(nden+1)));
      return R(
        `某量现期约 ${cur}，增长率约 ${r}%，接近 1/${nden}。增长量约是多少？`, ans,
        op(ans,[String(Math.round(cur/nden)),String(Math.round(cur/(nden+2))),String(Math.round(cur*r/100))]),
        `若 r≈1/${nden}，增长量≈现期÷(${nden}+1)。`,
        `增长量≈${cur}÷${nden+1}≈${ans}。`
      );
    }),
    Q('growth_amt_hundred','百分点口算',['技巧'],()=>{
      const cur=n(8500,9800), p=5; const ans='约 500 左右';
      return R(
        `现期约 ${cur}，下降约 ${p}%。若选项差距较大，应怎样估？`, ans,
        ['约 500 左右','约 50 左右','约 5000 左右','无法估算'],
        '每 100 约少 5，每 1000 约少 50。',
        `${cur} 约有 9 个千，每千少 50，再加零头，约 500 左右。`
      );
    })
  ],'all');

  const error=C('growth_amt_error','误差方向',['技巧'],[
    Q('growth_amt_error_up','调大增长率',['运用'],()=>R(
      '把 10.5% 近似成 11.1% 来做增长量，若其他处理相同，估算值通常偏大还是偏小？','偏小',
      ['偏小','偏大','必然相等','无法判断'],
      '增长率调大，公式分母 1+r 也被调大。',
      '分母变大，增长量估算值会偏小；选项很近时要回补。'
    )),
    Q('growth_amt_error_down','调小增长率',['运用'],()=>R(
      '把增长率调小来凑分数时，增长量估算值通常怎样？','偏大',
      ['偏大','偏小','不变','必为负'],
      '分母 1+r 也随之变小。',
      '分母变小会使估算增长量偏大。'
    )),
    Q('growth_amt_close_options','近选项处理',['运用'],()=>R(
      '分数思维估出 217，但两个选项是 216 和 219，下一步最该做什么？','判断误差方向',
      ['判断误差方向','随便选一个','只选字母靠后','重新全文读材料'],
      '选项很近时，估算值本身不够。',
      '应回到近似过程，判断自己把结果算大了还是算小了。'
    ))
  ],'sequence');

  add(C('growth_amount_training','增长量变量训练｜分数与误差',['技巧'],[normal,fraction,error],'all'));
})();
