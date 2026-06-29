(function(){
  const {n,op,R,Q,C,gcd,lcm,add}=EX;

  const a=Q('parts_common_unit','配同',['技巧'],()=>{
    const multiple=4, num=2, den=3;
    return R(
      `同一个对象在两句话里分别表现为“${multiple}的倍数”和“${num}份”，最节能的处理是？`,
      `把${num}份配成${multiple}份`,
      op(`把${num}份配成${multiple}份`,['直接相加','忽略其中一句','改成小数硬算']),
      '同一对象要统一份数。',
      `比如李某年龄既是工龄${multiple}倍，又是张某年龄的${num}/${den}，应把李某从${num}份统一成${multiple}份，写成${multiple}/${multiple*den/num}。`
    );
  });

  const a2=Q('linear_parity','方程与奇偶',['基础'],()=>{
    const x=n(8,20)*2;
    return R(
      `某人数经过“减少一半”后成为${x/2}人。原人数必须具备什么特征？`,
      '必须是偶数',
      ['必须是偶数','必须是奇数','必须是3的倍数','无法判断'],
      '减少一半要求能整除。',
      `原人数为${x}，能被2整除。课程中“增加一倍、减少一半”除了列一元一次方程，也可用奇偶性快速筛选。`
    );
  });



  const a2b=Q('linear_equation_entry','一元一次方程入口',['基础'],()=>R(
    '人数题里出现“增加一倍、减少一半、最后相差若干”时，除奇偶性外，最稳的通用方法是什么？',
    '设未知数列一元一次方程',
    ['设未知数列一元一次方程','直接取最小公倍数','只看图形','必须用概率'],
    '奇偶性适合快速筛，方程适合完整还原。',
    '原课提到这类题“列一元一次方程也行，或者根据奇偶性”。遇到条件更复杂时，设原人数为x，把增加、减少过程翻译成方程最稳。'
  ));

  const a3=Q('ratio_supply_increase','比例补量',['运用'],()=>{
    const doctor=n(15,26)*10; const r10=n(4,8); const r=r10/10; const current=doctor*r10/10;
    let bed=n(8,13)*100, br10=n(2,4), target=bed*br10/10;
    while(target<=current){ bed=n(9,15)*100; br10=n(2,5); target=bed*br10/10; }
    const br=br10/10; const ans=String(target-current);
    return R(
      `某院医生${doctor}人，护士数按医生的${r.toFixed(1)}倍配备；后床位增至${bed}张，需按床位数的${br.toFixed(1)}倍配护士。护士需增加多少人？`,
      ans,
      op(ans,[String(target),String(current),String(target-current+10)]),
      '先算现有护士，再算目标护士。',
      `现有护士=${doctor}×${r.toFixed(1)}=${current}人；目标护士=${bed}×${br.toFixed(1)}=${target}人；需增加${target}-${current}=${ans}人。`
    );
  });

  const a3b=Q('single_time_not_enough','单个时间不足',['基础'],()=>R(
    '题目只告诉“某产品按某模式需要20天卖完”，但没有总量和效率。仅凭这个时间能同时确定总量和效率吗？',
    '不能，只能知道总量=效率×时间',
    ['不能，只能知道总量=效率×时间','能，总量一定是20','能，效率一定是1','能，直接取最小公倍数'],
    '一个方程不能确定两个未知量。',
    '原课强调：只知道T时，S和V都未知；若题干未禁止，可以用特值设效率为1，但那是为了简化比例关系，不是说真实效率一定为1。'
  ));

  const b=Q('parts_lcm_boundary','最小公倍数边界',['基础'],()=>{
    const x=n(16,24), y=n(25,35);
    return R(
      `“甲做A事${x}天，乙做B事${y}天”，能否直接把工作总量设为${x}和${y}的最小公倍数？`,
      '不能，必须是同一份工作才适用',
      ['不能，必须是同一份工作才适用','能，看到天数就可以','只能用两数乘积','只能列方程'],
      '公倍数设总量有前提。',
      '只有同一份工作由不同主体完成，才适合用最小公倍数设总量；不同产品、不同任务不能机械套。'
    );
  });



  const b0=Q('parts_lcm_compute','最小公倍数求法',['技巧'],()=>{
    const a=n(8,30), b=n(8,35); const g=gcd(a,b); const ans=String(lcm(a,b));
    return R(
      `求${a}和${b}的最小公倍数，最稳的计算结果是多少？`,
      ans,
      op(ans,[String(a*b),String(Math.max(a,b)),String(g),String(Math.floor(a*b/Math.max(1,g))+1)]),
      '不要一看到两个数就直接相乘；有公共因子时要先处理。',
      `${a}和${b}的最大公因数是${g}，最小公倍数=${a}×${b}÷${g}=${ans}。原课纠正20和25时，本质就是不能机械相乘，要按公共因子求最小公倍数。`
    );
  });

  const c=Q('parts_special_value','特值设效率',['技巧'],()=>{
    const x=n(16,24), y=x+n(4,9);
    return R(
      `同一传统销售模式下，鸡蛋${x}天卖完，桃子${y}天卖完。若题干未说明传统效率不同，最节能的设法是？`,
      `设传统效率为1，总量为${x}份和${y}份`,
      op(`设传统效率为1，总量为${x}份和${y}份`,[`设总量都为${x*y}份`,`设鸡蛋效率${y}、桃子效率${x}`,`无法设特值`]),
      '题干没禁止的，可用特值。',
      `同一种模式可设单位效率为1，则总量=时间×效率，分别为${x}份、${y}份。`
    );
  });

  const d=Q('parts_diff_fixed','差定值',['运用'],()=>{
    const gap=n(1,4), t=n(3,8), delta=gap*t, x=n(18,30), y=x+delta, e1=n(2,5), e2=e1+gap;
    const ans=String(t);
    return R(
      `传统效率相同，A货总量${x}份、B货总量${y}份。直播时A效率${e1}份/天、B效率${e2}份/天；直播后剩余部分仍用相同传统效率且同时卖完。直播几天？`,
      ans,
      op(ans,[String(t+1),String(Math.max(1,t-1)),String(delta)]),
      '剩余同时用相同效率完成，说明剩余相同、剩余量相同。',
      `总量差${delta}份，直播阶段卖出的量也必须差${delta}份。直播效率差${gap}份/天，所以直播${delta}/${gap}=${ans}天。`
    );
  });

  const e=Q('process_reverse','倒推入口',['技巧'],()=>{
    const boxes=n(3,4), total=boxes*n(30,60), each=total/boxes;
    return R(
      `${boxes}筐物品反复“取出与某筐现有一样多的量给另一筐”，最后${boxes}筐一样重且总量${total}。应优先确定什么？`,
      `最后每筐${each}`, 
      op(`最后每筐${each}`,[`最初每筐${each}`,`直接顺推`,`无法倒推`]),
      '关键条件在最后。',
      `最后相等且总量确定，所以最后每筐=${total}/${boxes}=${each}，再按每一步反向还原。`
    );
  });



  const e2=Q('process_forward_reverse_boundary','顺推倒推边界',['技巧'],()=>R(
    '“什么时候顺推、什么时候倒推”的判断核心是什么？',
    '关键条件在哪里，就从哪里突破',
    ['关键条件在哪里，就从哪里突破','所有过程题都顺推','所有过程题都倒推','只看数字大小'],
    '过程可逆且最后条件强，就倒推；开头条件强且过程单向，就顺推。',
    '原课讲枸杞倒推题时说，顺推还是倒推主要看关键条件在哪里；最后相等、最后总量确定，就先定最后状态再往回推。'
  ));

  const f=Q('half_fuzzy','半模糊倍数',['技巧'],()=>{
    const base=n(4,8)*10; const div=n(7,15); let val=Math.ceil((base+1)/div)*div;
    while(val<base+10) val+=div;
    const ans=String(val);
    return R(
      `某单位有${Math.floor(base/10)}0多名人员，平均分到${div}个基层单位。若只有一个符合条件的数，最可能先锁定为多少？`,
      ans,
      op(ans,[String(base),String(base+1),String(val+div)]),
      '“几十多”+“平均分配”=范围内的倍数。',
      `${base}多且必须是${div}的倍数，先在${base+1}到${base+9}之间找${div}的倍数，得到${ans}。`
    );
  });

  const f2=Q('any_six_male','任意N人必有某类',['技巧'],()=>{
    const k=n(4,8);
    return R(
      `支援人员中“任意${k}人必有男医生”，可直接推出女医生人数满足什么？`,
      `少于${k}人`,
      op(`少于${k}人`,[`至少${k}人`,`正好${k}人`,`与女医生人数无关`]),
      `若女医生有${k}人，就能选出${k}个全女，矛盾。`,
      `任意${k}人必有男，说明不可能存在${k}个女医生，所以女医生人数<${k}，即小于N。`
    );
  });

  add(C('parts_process_card','份数过程｜特值差定值倒推',['技巧'],[a,a2,a2b,a3,a3b,b,b0,c,d,e,e2,f,f2],'all'));
})();
