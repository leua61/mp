(function(){
  const {R,Q,C,add,op,n,pk,r1}=EX;

  const line1=Q('var_line_base_choice','好数改写变量',['技巧'],()=>{
    const raw=pk([n(2600,2899),n(3700,3899),n(4400,4599),n(1380,1460)]);
    const bases=[Math.round(raw/100)*100, Math.round(raw/50)*50, Math.round(raw/10)*10].filter(x=>x>0);
    const base=pk(bases);
    const pct=r1(Math.abs(base-raw)/raw*100);
    const dir=base>raw?'上调':'下调';
    const ans=`${dir}到 ${base}，误差约 ${pct}%`;
    return R(
      `把 ${raw} 改成好算数时，若选 ${base}，应记录什么？`,
      ans,
      op(ans,[`只写 ${base} 不记录误差`,`误差约 ${r1(Math.abs(base-raw)/base*100)}%，方向不用管`,`直接把答案乘 100`]),
      '变量训练不固定一个好数，核心是“好算 + 误差方向”。',
      `${raw} 到 ${base} 是${dir}，相对原数约 ${pct}%。记录方向后才能判断最终答案上调还是下调。`
    );
  });

  const line2=Q('var_line_net_direction','误差合成变量',['技巧'],()=>{
    const numDir=pk(['上调','下调']);
    const denDir=pk(['上调','下调']);
    const ans=(numDir===denDir)?'大体抵消':'大体叠加';
    return R(
      `估算 A/B 时，分子被${numDir}，分母也被${denDir}。这两个误差对结果通常怎样？`,
      ans,
      op(ans,['大体抵消','大体叠加','一定完全没有误差','一定无法判断方向']),
      '分子和分母同向改动，比例影响会抵消；反向改动，比例影响会叠加。',
      `本题分子${numDir}、分母${denDir}，所以误差${ans}。这就是划线法里判断“上多少/下多少”的底层。`
    );
  });

  const opt1=Q('var_one_digit_round','一位选项陷阱变量',['运用'],()=>{
    const val=r1(n(255,344)/100);
    const rounded=String(Math.round(val));
    const ans=`应选 ${rounded}`;
    return R(
      `某式估出约 ${val}。若选项只有 2、3、4、5 这种一位数，应该按什么结果选？`,
      ans,
      op(ans,[`应选 ${Math.floor(val)}`,`应选 ${Math.ceil(val)+1}`,`应选 ${String(Math.max(1,Math.round(val)-1))}`]),
      '一位数选项往往是四舍五入后的整数，不是“几开头”。',
      `${val} 四舍五入为 ${rounded}，所以应选 ${rounded}，不能只按首位或整数部分机械判断。`
    );
  });

  const opt2=Q('var_close_option_expand','近选项放大变量',['技巧'],()=>{
    const tail=n(180,360); const a=tail, b=tail+n(5,12), c=b+n(5,14);
    const ans=`减去共同的 1，比较 ${a}、${b}、${c}`;
    return R(
      `选项形如 1.${String(a).padStart(3,'0')}、1.${String(b).padStart(3,'0')}、1.${String(c).padStart(3,'0')}。更清楚的比较方式是？`,
      ans,
      op(ans,['全部看成 1，不比较','直接只看最后一位','把三个选项相加再平均']),
      '共同部分越大，越要把差异部分放大出来。',
      `同步减去 1 后，真正区分选项的是 ${a}、${b}、${c} 这些尾部差异。`
    );
  });

  const trade1=Q('var_trade_base_surplus','基期顺差变量',['技巧'],()=>{
    const ex=n(430,760), im=ex-n(15,75), re=n(6,16), ri=re+n(4,16);
    const ans=`${ex}/(1+${re}%)-${im}/(1+${ri}%)`;
    return R(
      `出口 ${ex} 增长 ${re}%，进口 ${im} 增长 ${ri}%。求上一期顺差，列式是？`,
      ans,
      op(ans,[`${ex}-${im}`,`${im}/(1+${ri}%)-${ex}/(1+${re}%)`,`${ex}/(1+${ri}%)-${im}/(1+${re}%)`]),
      '基期顺差=基期出口-基期进口。',
      `先分别回基期，再相减，所以为 ${ans}。`
    );
  });

  const trade2=Q('var_trade_boundary_choice','极端边界变量',['运用'],()=>{
    const ans='不用混合近似，改用分别估算再相减';
    return R(
      '顺差题中，出口和进口现期量很接近、差额很小，而两者增长率差距很大。最稳的策略是？',
      ans,
      op(ans,['不用混合近似，改用分别估算再相减','直接把两个增长率平均','只看出口增长率','把差额当整体量套普通混合到底']),
      '两个大数相减会放大增长率差异，混合等价增长率可能极端。',
      '这类题若强行混合，可能出现很大的负增长率，原文明确说不要硬用。'
    );
  });

  const routeA=C('route_var_line','划线误差',['技巧'],[line1,line2],'sequence');
  const routeB=C('route_var_options','选项陷阱',['运用'],[opt1,opt2],'sequence');
  const routeC=C('route_var_trade','顺差边界',['技巧'],[trade1,trade2],'sequence');
  add(C('var_line_trade_option_card','变量训练｜划线顺差选项',['运用'],[routeA,routeB,routeC],'all'));
})();
