(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;

  const mainModel=Q('map_main_model','主线模型',['基础'],()=>R(
    '第二课是在 A÷B 基础上，主要扩展到哪些乘除结构？',
    'A÷B×C 和 A÷B×C÷D',
    op('A÷B×C 和 A÷B×C÷D',['只讲加减法','只讲几何图形','只讲概率排列','只讲材料阅读']),
    '本课仍围绕纯乘除速算。',
    '第一课的A÷B是基础，第二课把它扩展为三个数、四个数的连乘连除，并继续用划线法合并误差。'
  ),coverage());

  const dataNotCompute=Q('line_data_not_compute','理念｜数据不是死算',['基础'],()=>R(
    '划线法的核心态度是什么？',
    '数据不是拿来死算，而是拿来改造成舒服数',
    op('数据不是拿来死算，而是拿来改造成舒服数',['所有原数都必须完整竖式','只要背例题答案','只看材料标题','不能改变任何数字']),
    '划线法强调主动改造数据。',
    '看到不舒服的数据，先把它划成好算数，再记录误差方向；不是被题目数字牵着走。'
  ),coverage());

  const penUsage=Q('line_pen_usage','理念｜笔的作用',['基础'],()=>R(
    '练划线法时，笔最主要用来做什么？',
    '划数据，不是写一堆计算过程',
    op('划数据，不是写一堆计算过程',['写完整竖式','抄材料原文','画图装饰','把每步错位都列出来']),
    '速度来自少写过程。',
    '划线法的笔是用来标记数据改造；误差多少靠心算训练，而不是把错位加减全过程写满。'
  ),coverage());

  const noDigitLimit=Q('line_no_digit_limit','理念｜不拘位数',['基础'],()=>R(
    '划线法为什么不需要纠结“两位数、三位数、四位数分别怎么做”？',
    '因为核心是改造骨架和误差，不受原数位数限制',
    op('因为核心是改造骨架和误差，不受原数位数限制',['因为所有数都要保留三位','因为只能处理两位数','因为不看分子分母','因为必须先背位数表']),
    '几位数不是方法边界。',
    '三位数可以划成一位数，四位数也可以只留有效骨架；只要误差方向能控，就可以服务选项。'
  ),coverage());

  const uncomfortable=Q('line_uncomfortable_first','第一反应｜哪个不爽划哪个',['技巧'],()=>{
    const x=n(720,789), ans='先把不舒服的数据划成好算骨架，并保留误差方向';
    return R(
      `遇到 ${x} 这种看着不舒服的数据，划线法第一反应是什么？`,
      ans,
      op(ans,['必须完整保留三位','先找十分钟倍数','直接放弃本题','只能四舍五入到个位']),
      '主动权在你手里。',
      `${x} 可以按题目需要划成 7、75、8 等好算骨架；关键是知道它变大还是变小、误差大约多少。`,
      parameter()
    );
  });

  const thinkSpeed=Q('line_think_speed','训练｜误差三秒反应',['运用'],()=>{
    const x=n(230,269), target=250;
    const ans='快速判断变化方向和大致百分比';
    return R(
      `平时看到 ${x} 变成 ${target} 这类训练，核心不是算最终值，而是训练什么？`,
      ans,
      op(ans,['把题目抄三遍','只背固定例题','忽略方向只看大小','每次都用计算器']),
      '课程强调随手练误差。',
      `例如 ${x}→${target}，要快速知道是上升还是下降、约几个点；这种能力决定划线法能否提速。`,
      parameter()
    );
  });

  const idea=C('line_idea_module','划线理念',['基础'],[dataNotCompute,penUsage,noDigitLimit],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const reaction=C('line_reaction_module','划线第一反应',['技巧'],[uncomfortable,thinkSpeed],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('course_map_card','课程主线与划线法｜模型、理念、训练入口',['基础'],[mainModel,idea,reaction],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
