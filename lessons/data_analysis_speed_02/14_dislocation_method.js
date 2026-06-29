(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;
  const names=Q('disloc_names','名称识别',['基础'],()=>R('化一法、划一法、盐水法等在本课里本质上指向哪类方法？','错位加减法',op('错位加减法',['三不看原则','分数循环节','混合增长率','材料定位法']),'课程把这些名称统一到错位加减法。','不同机构叫法不同，但本质都是围绕比例做错位加减。'),coverage());
  const relation=Q('disloc_relation_line','和划线法关系',['基础'],()=>R('错位加减法和划线法的关系是什么？','划线法以其思想为基础，但目标是少写过程、靠心算划数据',op('划线法以其思想为基础，但目标是少写过程、靠心算划数据',['二者完全无关','错位法永远更快','划线法必须写完整错位过程','错位法只能处理加法']),'不要混成一套写法。','错位法是化一、划一等方法的本质；划线法吸收比例思想，但训练目标是直接划数和心算误差。'),coverage());
  const notMix=Q('disloc_not_mix','不要混写',['基础'],()=>R('练划线法时，为什么不建议一边划线一边写错位步骤？','会把两套方法混在一起，失去划线法速度优势',op('会把两套方法混在一起，失去划线法速度优势',['因为错位法完全错误','因为不能动笔划线','因为所有题都要计算器','因为选项不能看']),'划线法的笔主要用来划数据。','如果每步都写错位，容易回到机械计算；划线法要把误差训练到心算。'),coverage());
  const proportion=Q('disloc_proportion','同比例不是同数值',['技巧'],()=>R('错位加减法中，分母减32时，为什么分子不是也简单减32？','分子分母要做相同比例变化，不是减同一个绝对数',op('分子分母要做相同比例变化，不是减同一个绝对数',['因为分子永远不变','因为分母不能变','因为必须把32平方','因为要改成加法']),'核心是比例。','除法中保持商的近似关系，要让分子分母按相同比例变化；错位只是用前几位近似这个比例。'),coverage());
  const align=Q('disloc_digit_align','位数对齐',['技巧'],()=>R('错位加减法里，分母某一位发生加减时，分子同步变化为什么要注意位数？','因为要按对应数量级错位对齐',op('因为要按对应数量级错位对齐',['因为位数越多越好','因为可以随便写','因为第一位必须加减','因为答案一定为整数']),'错位的“位”就是数量级。','分母在哪一位上调整，分子按比例同步变化时也要落在对应数量级上，不能乱摆位置。'),coverage());
  const firstDigit=Q('disloc_first_digit_forbidden','第一位不能乱动',['技巧'],()=>{const first=n(2,8), ans='不能在第一位上直接加减，误差会很大';return R(`用错位法处理分母${first}${n(200,899)}，若直接动第一位${first}来化一，问题是什么？`,ans,op(ans,['第一位最适合随便动','只要选项远就一定能动','必须扩大10倍','没有任何误差']),'第一位权重太大。','错位加减法不能在第一位上直接加减；首位不舒服应先等价缩放，再处理后面位数。',parameter());});
  const unequalFirst=Q('disloc_equalize_first','首位不同先等价化',['技巧'],()=>R('三数错位中两个要抵消的数首位不同，常见处理是什么？','先通过等价乘除把首位化到同一层级再抵消',op('先通过等价乘除把首位化到同一层级再抵消',['直接在第一位硬减','把两个数相加','完全不看首位','只看单位']),'首位不同不能硬错位。','错位依赖相近骨架；首位差太大时先等价缩放，避免第一位直接加减造成大误差。'),coverage());
  const diagonal=Q('disloc_three_diagonal','三数斜向抵消',['技巧'],()=>R('A÷B×C三数模型中，错位加减法常见目标是什么？','让斜着的两个数先抵消',op('让斜着的两个数先抵消',['把A和B相加','把四个数都化成1','只处理单位','完全不看C']),'三数错位不只是A÷B化一。','A÷B×C中常通过错位让B与C或A与B的相对关系抵消，减少剩余计算。'),coverage());
  const fourStep=Q('disloc_four_two_steps','四数两步处理',['技巧'],()=>R('A÷B×C÷D四数模型用错位法时，常见处理思路是什么？','先干掉其中一个分数，再对剩余单分数化一',op('先干掉其中一个分数，再对剩余单分数化一',['四个数一起加','只处理最后一个D','完全不用看结构','先把所有数平方']),'四数错位步骤会更重。','四数题若用错位，常先消掉一组比例，让式子变简单，再对剩余部分错位化一；通常不如熟练划线法快。'),coverage());
  const precision=Q('disloc_precision_choice','精度定位',['运用'],()=>R('错位加减法在本课中的定位是什么？','能用但偏机械，是划线法不熟时的备选',op('能用但偏机械，是划线法不熟时的备选',['永远第一选择','完全不能用','只适合加法','会自动消除所有误差']),'不是否定错位法，而是摆正优先级。','错位法有价值，但动笔多、结构重；三数四数普通乘除熟练后优先划线法。'),coverage());
  const position=C('disloc_position_module','定位与关系',['基础'],[names,relation,notMix],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const ab=C('disloc_ab_module','A÷B化一',['技巧'],[proportion,align,firstDigit],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const multi=C('disloc_multi_module','三数四数错位',['技巧'],[unequalFirst,diagonal,fourStep],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('dislocation_card','错位加减法｜定位、模型与边界',['技巧'],[position,ab,multi,precision],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
