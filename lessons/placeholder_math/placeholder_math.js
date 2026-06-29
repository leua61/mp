(function(){
  const n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const pick=arr=>arr[n(0,arr.length-1)];
  const shuffle=arr=>arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  const opts=(answer,items,count=4)=>shuffle([answer,...items.filter(x=>x!==answer)]).slice(0,count).map(String);
  const R=(stem,answer,options,hint,solution)=>({
    stem,
    q:stem,
    answer:String(answer),
    a:String(answer),
    options:options.map(String),
    pool:options.map(String),
    hint,
    solution
  });

  const routeNode=(id,title,tags,makeQuestion,extra={})=>{
    const node={
      id,
      title,
      t:title,
      tags,
      type:Array.isArray(tags)?tags[0]:tags
    };
    if(makeQuestion){
      node.makeQuestion=makeQuestion;
      node.mk=makeQuestion;
    }
    return Object.assign(node,extra);
  };

  const sequence=extra=>Object.assign({levelType:'sequence',unlockMode:'sequence'},extra);
  const coverage=extra=>Object.assign({randomMode:'coverage',randomLabel:'路线型随机'},extra);
  const parameter=extra=>Object.assign({randomMode:'parameter',randomLabel:'参数型随机'},extra);

  const basicFractions=[
    ['1/2','0.5','5'],['1/3','0.333…','333'],['1/4','0.25','25'],['1/5','0.2','2'],
    ['1/6','0.167…','167'],['1/8','0.125','125'],['1/9','0.111…','111'],['1/11','0.0909…','09']
  ];
  const sevenFractions=[
    ['1/7','142857'],['2/7','285714'],['3/7','428571'],['4/7','571428'],['5/7','714285'],['6/7','857142']
  ];

  const parameterRandomQuestion=()=>{
    const a=n(2,9)*10;
    const b=n(2,9);
    const answer=a*b;
    return R(
      `${a} × ${b} = ?`,
      answer,
      opts(String(answer),[answer+a,answer-a,answer+10,answer-10,answer+b]),
      '这是参数型随机：题型结构不变，只随机替换数值，用来练熟练度，不要求遍历所有数字。',
      `${a} × ${b} 可以先算 ${a/10} × ${b} = ${(a/10)*b}，再补 1 个 0，得到 ${answer}。`
    );
  };

  const fractionBasic=()=>{
    const [frac,decimal,shape]=pick(basicFractions);
    return R(
      `${frac} 常用小数/骨架优先记成什么？`,
      decimal,
      opts(decimal,basicFractions.map(x=>x[1]),5),
      '基础百化分属于记忆边界内的叶子训练，重点是形成稳定反应。',
      `${frac} = ${decimal}，速算时可以先抓骨架 ${shape}，再结合选项处理位数。`
    );
  };

  const memoryBoundary=()=>R(
    '分数转化的常用记忆边界，通常背到哪里就够用？',
    '1/11',
    ['1/7','1/9','1/11','1/19','1/99'],
    '这不是无限背表，而是把高频基础分数先稳定掌握。',
    '常用分数转化掌握到 1/11 基本够用；更大的分母通常通过三不看、拆分、补 0、除以 7/9 等方法推导。'
  );

  const skeletonIntro=()=>R(
    '9 和 11 骨架互逆这类题，为什么不能只靠普通随机碰到？',
    '它内部有必须覆盖的固定分支',
    ['它内部有必须覆盖的固定分支','所有分支都只是数值变化','不需要记录进度','只适合完全乱序','不能设置局部掌握'],
    '这类随机是路线型随机：看起来随机，但本质是保证关键分支都经历。',
    '例如除以 11、乘 9、除以 9、乘 7 分别是不同分支；系统应记录局部掌握度，而不是完全交给普通随机。'
  );

  const divideBy11=()=>R(
    '按骨架判断，除以 11 大致相当于什么骨架？',
    '乘 9 的骨架',
    ['乘 9 的骨架','除以 9 的骨架','乘 7 的骨架','除以 7 的骨架'],
    '1/11 ≈ 0.0909…，抓骨架时常先看成 09。',
    '一个数除以 11，相当于乘 1/11；1/11 的骨架是 09，所以粗看就是“乘 9 的骨架”，再根据选项处理尺度。'
  );

  const multiplyBy9=()=>{
    const a=n(12,98);
    const answer=a*9;
    return R(
      `只看骨架，${a} × 9 的结果骨架更接近哪一个？`,
      answer,
      opts(String(answer),[answer+a,answer-9,answer+90,answer-90,answer+1]),
      '乘 9 骨架是 9/11 互逆关系中的一个固定分支，应作为小题内局部分支记录。',
      `${a} × 9 = ${answer}。这里随机的是 ${a} 的数值，但训练分支本身是“乘 9 骨架”。`
    );
  };

  const divideBy9=()=>R(
    '按骨架判断，除以 9 最容易联想到哪个循环骨架？',
    '111…',
    ['111…','09','142857','125','167'],
    '1/9 = 0.111…，所以除以 9 要优先想到 1 循环骨架。',
    '除以 9 相当于乘 1/9；1/9 的小数是 0.111…，骨架就是 111… 。'
  );

  const multiplyBy7=()=>{
    const [frac,cycle]=pick(sevenFractions);
    return R(
      `七分数循环节里，${frac} 对应的六位循环骨架是哪一个？`,
      cycle,
      opts(cycle,sevenFractions.map(x=>x[1]),6),
      '乘 7/除以 7 相关训练应进入七分数路线，而不是混在完全随机里。',
      `${frac} = 0.${cycle}…，它来自 142857 的循环移位。`
    );
  };

  const reverseIdentify=()=>{
    const [frac,decimal,shape]=pick(basicFractions);
    return R(
      `看到骨架 ${shape}，优先反识别成哪个基础分数？`,
      frac,
      opts(frac,basicFractions.map(x=>x[0]),5),
      '反识别训练是由骨架想到分数，和“分数想到小数”方向相反。',
      `${frac} = ${decimal}，所以看到骨架 ${shape} 时，先联想到 ${frac}。`
    );
  };

  const sevenBasic=()=>{
    const [frac,cycle]=pick(sevenFractions);
    return R(
      `${frac} 的循环节从哪组六位骨架开始？`,
      cycle,
      opts(cycle,sevenFractions.map(x=>x[1]),6),
      '1/7 到 6/7 都来自 142857 的循环移位。',
      `${frac} = 0.${cycle}…，记住完整循环节才能快速判断不同起点。`
    );
  };

  const fullCycle=()=>R(
    '七分数训练为什么不建议只把 1/7 记成 0.143？',
    '需要用完整循环节 142857 推导 1/7 到 6/7',
    ['需要用完整循环节 142857 推导 1/7 到 6/7','0.143 完全错误','1/7 不会出题','143 不能粗估','只记 1/7 就够了'],
    '143 可以用于粗估，但路线训练要掌握完整循环节。',
    '1/7 到 6/7 都由 142857 循环移位得到；只记 143 会丢掉 285714、428571、571428 等起点判断能力。'
  );

  const startJudge=()=>{
    const [frac,cycle]=pick(sevenFractions);
    const head=cycle.slice(0,3);
    return R(
      `看到七分数骨架 ${head}…，更可能是哪一个分数？`,
      frac,
      opts(frac,sevenFractions.map(x=>x[0]),6),
      '起点判断是七分数内部的固定分支，应该被局部路线覆盖。',
      `${frac} = 0.${cycle}…，所以骨架 ${head}… 对应 ${frac}。`
    );
  };

  const derivationRule=()=>R(
    '从 1/7 推到 2/7、3/7 等七分数时，核心规则是什么？',
    '围绕 142857 做循环移位',
    ['围绕 142857 做循环移位','每个都重新长除法','只看前三位 143','全部按 1/9 推','直接乘 11'],
    '七分数的规律核心是完整循环节，而不是孤立背六个小数。',
    '1/7 是 142857，2/7 是 285714，3/7 是 428571，本质是同一循环节在不同起点上旋转。'
  );

  const topics=[
    routeNode('random_policy_demo','占位｜随机机制分型',['系统样板','随机机制'],()=>R(
      '哪一种随机应该显式进入路线分支，而不是完全交给普通随机？',
      '必须覆盖固定分支的路线型随机',
      ['必须覆盖固定分支的路线型随机','只改变数字大小的参数型随机','纯熟练度乱数训练','同一道题无限换数值'],
      '路线型随机的目标是覆盖经历；参数型随机的目标是熟练练手。',
      '如果每个分支都是必须经历的考点，就应做成路线树节点；如果只是同一题型换数值，则用参数随机即可。'
    ),coverage({
      routeSchema:'recursive_route_tree_v1',
      progressRule:'题卡掌握 = 直属小题通关数 / 直属小题总数；局部掌握 = 当前小题内直属分支通关数 / 直属分支总数。'
    })),

    routeNode('parameter_random_drill','占位｜参数随机熟练度',['技巧','参数随机'],parameterRandomQuestion,parameter({
      routeSchema:'leaf_drill_v1',
      progressRule:'叶子题只记录自身 5/5 熟练度，不要求遍历所有随机数值。'
    })),

    {
      k:'s',
      x:'二级路线样板：题卡 → 小题们 → 小题内部分支'
    },

    routeNode('fraction_recursive_route','07｜分数转化｜基础百化分、9/11互逆与七分数',['系统样板','递归路线','分数转化'],null,sequence(coverage({
      routeSchema:'recursive_route_tree_v1',
      routeDepth:'unlimited',
      progressScope:'card_children',
      progressLabel:'题卡掌握',
      localProgressLabel:'局部掌握',
      subs:[
        routeNode('fraction_basic_percent','25｜基础分数转化',['基础','分数转化'],fractionBasic,parameter({
          progressScope:'leaf_mastery'
        })),
        routeNode('fraction_memory_boundary','26｜分数记忆边界｜背到 1/11',['基础','分数转化','记忆边界'],memoryBoundary,coverage({
          progressScope:'leaf_mastery'
        })),
        routeNode('fraction_9_11_inverse','27｜9 和 11 骨架互逆',['技巧','分数转化','骨架互逆'],skeletonIntro,sequence(coverage({
          progressScope:'node_children',
          progressLabel:'局部掌握',
          subs:[
            routeNode('fraction_9_11_divide_by_11','27-1｜除以 11 → 乘 9 骨架',['技巧','骨架互逆'],divideBy11,coverage()),
            routeNode('fraction_9_11_multiply_by_9','27-2｜乘 9 骨架',['技巧','骨架互逆'],multiplyBy9,parameter()),
            routeNode('fraction_9_11_divide_by_9','27-3｜除以 9 → 111 骨架',['技巧','骨架互逆'],divideBy9,coverage()),
            routeNode('fraction_9_11_multiply_by_7','27-4｜乘 7 / 七分数入口',['技巧','骨架互逆','七分数'],multiplyBy7,coverage())
          ]
        }))),
        routeNode('fraction_reverse_identify','28｜分数反识别｜骨架想到分数',['基础','分数转化','反向识别'],reverseIdentify,parameter({
          progressScope:'leaf_mastery'
        })),
        routeNode('fraction_seven_basic','29｜1/7 到 6/7',['基础','分数转化','七分数'],sevenBasic,coverage({
          progressScope:'leaf_mastery'
        })),
        routeNode('fraction_seven_cycle','30｜七分数记忆｜完整循环节',['基础','分数转化','七分数'],fullCycle,sequence(coverage({
          progressScope:'node_children',
          progressLabel:'局部掌握',
          subs:[
            routeNode('fraction_seven_full_cycle','30-1｜完整循环节 142857',['基础','七分数'],fullCycle,coverage()),
            routeNode('fraction_seven_start_judge','31｜142857 起点判断',['技巧','七分数'],startJudge,coverage()),
            routeNode('fraction_seven_derivation_rule','32｜循环节推导规则',['技巧','七分数'],derivationRule,coverage())
          ]
        })))
      ]
    })))
  ];

  Game.addLesson({
    id:'placeholder_math',
    title:'占位符课程',
    topics
  });
})();
