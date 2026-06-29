(function(){
  const {op,R,Q,C,add,coverage}=EX;
  const lineMain=Q('choice_line_main','划线法主线',['运用'],()=>R('普通A÷B、A÷B×C、A÷B×C÷D连乘连除，优先用什么？','划线法',op('划线法',['两个分数做差专项','完整竖式','只背公式','材料定位法']),'本课主线是乘除速算。','普通乘除结构中，划线法不限两数三数四数，是本课第一优先级。'),coverage());
  const splitAux=Q('choice_split_aux','拆分法辅助',['运用'],()=>R('拆分法在本课方法体系中的位置是什么？','A÷B时可辅助，三数以上不做主线',op('A÷B时可辅助，三数以上不做主线',['所有题第一优先','专门解决两个分数做差','完全不能用','只适合文字理解题']),'拆分法适合单分数。','拆分法处理A÷B很顺手；多个数连乘连除时会变复杂。'),coverage());
  const dislocBackup=Q('choice_disloc_backup','错位法备选',['运用'],()=>R('错位加减法在本课方法体系中的位置是什么？','划线法不熟时的备选工具',op('划线法不熟时的备选工具',['永远替代划线法','完全不能使用','只用于三不看','只用于单位换算']),'它能用，但不是最终主线。','错位法适合习惯写步骤的人；三数四数普通乘除中，熟练划线通常更快。'),coverage());
  const fractionDiff=Q('boundary_fraction_diff','两个分数和差',['基础'],()=>R('遇到A÷B - C÷D这类两个分数做差，为什么不能无脑大幅划线？','做差会放大误差，要用后续专项方法或精修',op('做差会放大误差，要用后续专项方法或精修',['因为这是纯乘法','因为选项永远很远','因为百分号可直接删','因为分母不能改']),'差值小时误差尤其敏感。','两个分数做和差不是本课普通乘除主场，误差可能被放大，后续比重差、混合原理等会处理。'),coverage());
  const plusBoundary=Q('boundary_plus_structure','加减结构',['基础'],()=>R('遇到含有1+增长率、两个量相减等加减结构时，正确态度是什么？','先处理加减结构，再对纯乘除部分使用划线法',op('先处理加减结构，再对纯乘除部分使用划线法',['所有符号直接三不看','完全不能估算','只看最大数','直接把加号当乘号']),'边界在于加减不是占位。','小数点、百分号能暂不看是乘除内部的规则；有加减时必须先还原结构。'),coverage());
  const laterTopics=Q('boundary_later_topics','后续专项边界',['基础'],()=>R('比重差、平均数变化、增长量极小等题，为什么不能只靠本节普通划线法？','它们常含加减或差值放大，需要后续专项技巧',op('它们常含加减或差值放大，需要后续专项技巧',['它们都没有数字','它们只考常识','它们永远选最大','它们不属于资料分析']),'本节讲纯乘除主线，不包打天下。','后续增长、比重、平均数会继续用乘除基础，但遇到差值、混合、加减结构时要切换专项方法。'),coverage());
  const closeOption=Q('boundary_close_option','选项极近',['运用'],()=>R('选项极近时，本课速算还要额外注意什么？','不能只看粗范围，要补方向和小误差',op('不能只看粗范围，要补方向和小误差',['永远只看首位','永远选最大','直接不做','误差越大越好']),'选项决定精度。','选项远则粗，选项近则精；极近时要补“多”、方向，必要时换更精细方法。'),coverage());
  const finalFlow=Q('choice_final_flow','四步总流程',['运用'],()=>R('第二课普通乘除速算的总流程是什么？','分清结构 → 划舒服数 → 合并误差 → 结合选项',op('分清结构 → 划舒服数 → 合并误差 → 结合选项',['先背例题 → 照抄数字 → 放弃误差 → 选最大','先精算 → 再看结构 → 再看选项 → 再划线','只看材料 → 不看式子 → 不看选项 → 盲选','先错位 → 再拆分 → 再竖式 → 再计算器']),'这是本课主线闭环。','先判断A÷B、A÷B×C还是四数结构；再把不舒服数据划成舒服数；合并误差方向；最后根据选项决定精度。'),coverage());
  const priority=C('choice_priority_module','方法优先级',['运用'],[lineMain,splitAux,dislocBackup],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const boundaries=C('choice_boundaries_module','不适用边界',['基础'],[fractionDiff,plusBoundary,laterTopics,closeOption],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('method_choice_card','方法取舍与边界｜主线、备选、禁区',['运用'],[priority,boundaries,finalFlow],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
