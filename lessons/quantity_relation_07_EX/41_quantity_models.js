(function(){
  const {n,op,R,Q,C,add}=EX;
  const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);

  const q1=Q('profit_vertex','利润极值变量',['技巧'],()=>{
    const cost=n(20,60), margin=n(3,12), basePrice=cost+margin, loss=n(5,20);
    const x=n(4,16); const zero2=margin+2*x; const sales=loss*zero2;
    const ans=String(basePrice+x);
    return R(
      `某商品进价${cost}元，售价${basePrice}元时每天卖${sales}个；售价每涨1元，销量减少${loss}个。利润最大时售价多少？`,
      ans,
      op(ans,[String(basePrice+x-1),String(basePrice+x+1),String(basePrice)]),
      '设涨价x，利润=(原利润+x)(原销量-每元减少量×x)，两个零点取中点。',
      `原利润${margin}元，利润函数为(${margin}+x)(${sales}-${loss}x)。两个零点为x=-${margin}和x=${sales/loss}，中点x=(${sales/loss}-${margin})/2=${x}，售价=${basePrice}+${x}=${ans}。`
    );
  });

  const q2=Q('arithmetic_middle','等差中项变量',['技巧'],()=>{
    const terms=[11,13,15,17][n(0,3)], midIndex=(terms+1)/2, mid=n(terms,terms+8), target=n(midIndex+1,terms);
    const ans=String(mid-(target-midIndex));
    const total=terms*mid;
    return R(
      `某等差递减序列公差为-1，总和为${total}，共${terms}项。第${target}项是多少？`,
      ans,
      op(ans,[String(Number(ans)+1),String(Number(ans)-1),String(mid)]),
      '等差数列总和=中项×项数。',
      `${terms}项的中间项是第${midIndex}项，值为${mid}；每往后一项少1，所以第${target}项=${mid}-(${target}-${midIndex})=${ans}。`
    );
  });

  const q2b=Q('arithmetic_surface_trap','题面干扰',['基础'],()=>R(
    '题干出现“近似等边三角形”，但核心条件是“第一次N架、第二次N-1架、以此类推”，应识别为什么？',
    '等差数列',
    ['等差数列','等边三角形面积','圆柱展开','概率分配'],
    '不要被背景图形骗走。',
    '真正有效条件是每次减少1，属于等差数列；图形背景通常只是包装。'
  ));

  const q2c=Q('arithmetic_factor_limit','因子拆分边界',['技巧'],()=>{
    const target=n(8,12);
    return R(
      `等差总和拆成“中项×项数”时，题目问第${target}项，项数至少应满足什么？`,
      `项数不少于${target}`,
      op(`项数不少于${target}`,[`项数必须小于${target}`,'项数必须为偶数','只看总和因子即可']),
      `问到第${target}次，序列必须有第${target}项。`,
      '因子拆分不能只看乘积，还要结合题目问第几项、选项是否存在等限制。'
    );
  });



  const q2d=Q('arithmetic_option_feedback','因子拆分与选项反馈',['运用'],()=>{
    const sum=[105,135,165,195][n(0,3)];
    const target=n(9,12);
    const fakeTerms=target+n(7,11), fakeMid=Math.floor(sum/fakeTerms);
    return R(
      `等差总和为${sum}，问第${target}项。若先拆成“中项${fakeMid}×项数${fakeTerms}”，推出的目标项选项中没有，下一步应优先怎么做？`,
      '换另一组因子拆分并结合项数限制再判断',
      ['换另一组因子拆分并结合项数限制再判断','说明题目必错','直接选最接近的','改用奇偶性排除'],
      '因子拆分不是只试一组；还要看题目问第几项、选项是否承接。',
      `总和=${sum}=中项×项数。第一组拆分若导出的第${target}项不在选项里，不是题坏了，而是要换因子组合，并保证项数不少于${target}。原课105先试21项不行，再换15项。`
    );
  });

  const q3=Q('age_work','年龄工龄变量',['运用'],()=>{
    const k=n(8,14); const unit=k-2; const ans=String(3*unit);
    return R(
      `2020年李某年龄是自己工龄的4倍，且是张某年龄的2/3。到2024年张某年龄是自己工龄的2倍。若张某参加工作时李某${k}岁，则李某参加工作时年龄是多少？`,
      ans,
      op(ans,[String(4*unit),String(unit),String(ans+4)]),
      '先配同：李:张=4:6；年龄差不变。',
      `李某年龄配成4份，张某6份。2024年张某年龄=6份+4，工龄=(6份+4)/2=3份+2，参加工作年龄也是3份+2。此时李某${k}岁，所以年龄差=3份+2-${k}；而张李年龄差=2份，得1份=${k}-2=${unit}。李某2020年年龄4份、工龄1份，参加工作年龄3份=${ans}岁。`
    );
  });

  const q3b=Q('age_difference_constant','年龄差不变',['技巧'],()=>R(
    '两个人年龄题中，跨年份推理最稳定的不变量是什么？',
    '年龄差不变',
    ['年龄差不变','年龄和不变','工龄差一定不变','年龄比例不变'],
    '两人同时长岁数。',
    '年龄都会随年份同步增加，所以两人的年龄差保持不变；比例通常会变。'
  ));

  const q4=Q('geometry_area_special','面积特值变量',['技巧'],()=>{
    const total=350, a=50, b=70;
    return R(
      `长方形蛋糕总共可供${total}人享用，其中两块分别可供${a}人和${b}人享用。这里“人数”最适合转化为什么？`,
      '面积份数',
      ['面积份数','边长数值','周长比例','不能转化'],
      '人数按份数分配，本质是面积比例。',
      `同一蛋糕按面积供人享用，可把${a}、${b}看成对应块的面积份数，再用长方形和三角形面积关系做特值。`
    );
  });



  const q4b=Q('geometry_remainder_area','面积剩余法',['运用'],()=>{
    const total=n(280,520), known1=n(40,90), known2=n(50,100), tri=n(30,90);
    const ans=String(total-known1-known2-tri);
    return R(
      `长方形蛋糕总面积按人数折算为${total}份，已知两块分别为${known1}份、${known2}份，另一个三角形块为${tri}份。剩余中间块是多少份？`,
      ans,
      op(ans,[String(total-known1-known2),String(known1+known2+tri),String(total-tri)]),
      '总量减已知块。',
      `人数可视为面积份数；中间未知块=${total}-${known1}-${known2}-${tri}=${ans}份。原题最后也是用总面积减掉已知块和三角形块。`
    );
  });

  const q5=Q('cylinder_surface','圆柱展开与体积',['基础'],()=>R(
    '圆柱侧面展开后是什么图形？圆柱体积又如何表达？',
    '侧面为长方形；体积=底面积×高',
    ['侧面为长方形；体积=底面积×高','侧面为三角形；体积=周长×高','侧面为圆形；体积=半径×高','侧面为正方形；体积=直径×高'],
    '侧面沿高剪开，体积按柱体统一公式。',
    '圆柱侧面展开为长方形，长为底面周长，宽为高；圆柱体积=底面积×高。'
  ));

  const route=C('models_variable_route','变量训练｜极值等差与年龄',['运用'],[q1,q2,q2b,q2c,q2d,q3],'all');
  add(C('models_card','模型杂项｜极值数列年龄几何',['技巧'],[route,q3b,q4,q4b,q5],'all'));
})();
