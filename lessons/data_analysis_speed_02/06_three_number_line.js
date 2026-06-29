(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;
  const model=Q('three_model_ac_over_b','三数归位',['基础'],()=>R('A÷B×C应先看成哪种结构？','(A×C)÷B',op('(A×C)÷B',['A÷(B×C)','(A×B)÷C','A+B+C','C÷B÷A']),'乘号后的C仍在分子侧。','A÷B×C=(A×C)÷B，所以A、C是分子侧，B是分母侧。'),coverage());
  const numeratorMerge=Q('three_numerator_merge','分子侧先合并',['技巧'],()=>{const a=n(2,6), c=n(2,6), s=a+c, ans=`分子侧先按乘法叠加为划大${s}%`;return R(`A÷B×C中，A划大${a}%，C划大${c}%。和B比较前应先怎样处理？`,ans,op(ans,[`直接和B相减`,`分子侧抵消为${Math.abs(a-c)}%`,`完全不用管C`,`把A和C放到分母侧`]),'A和C在同一侧，相当于相乘。',`A、C同在分子侧，先按乘法合并；都划大时分子侧偏大${s}%。`,parameter());});
  const firstMultiple=Q('three_first_multiple','倍数关系',['技巧'],()=>R('三个数乘除题第一眼看到6和12这类关系，应优先想到什么？','先用倍数关系约分或抵消',op('先用倍数关系约分或抵消',['停下来完整直除','故意避开倍数','先把全部数平方','只看单位不看数']),'倍数关系是第一反应之一。','划线法第一反应先看倍数、分数、可抵消关系；能约就先约，能抵消就先抵消。'),coverage());
  const firstFraction=Q('three_first_fraction','熟悉分数',['技巧'],()=>R('看到77.7%、777、0.777这类骨架，第一反应应联想到什么？','7/9',op('7/9',['1/8','1/6','3/7','1/11']),'这是分数转化辅助划线。','0.777...对应7/9；熟悉分数可以直接减少计算量。'),coverage());
  const dontForce=Q('three_dont_force','看不出不硬凑',['技巧'],()=>R('如果第一眼看不出三个数之间的倍数关系，最符合本课的方法是什么？','不要硬凑，直接把不舒服的数据划成好算数',op('不要硬凑，直接把不舒服的数据划成好算数',['继续盯着倍数直到想出来','必须保留原数','直接放弃本题','只能使用错位加减法']),'本课强调主动改造数据。','看不出倍数就别浪费时间硬凑；哪个不爽划哪个，先得到好算基准，再合并误差。'),coverage());
  const chooseBase=Q('three_base_value','先出基准',['运用'],()=>{const x=n(82,96), y=n(104,116), z=n(68,78); const ans='先把三个数改成好算骨架，得到基准值，再看误差方向';return R(`${x/10}÷${y}×${z/10}这类题，最符合划线法的实战顺序是什么？`,ans,op(ans,['把原式完整精算到个位','只删小数点不看误差','直接选最小选项','先把它改成加法题']),'三数题先构造好算基准。',`可以把${x/10}、${y}、${z/10}改成好算骨架，先得到基准，再把分子侧和分母侧误差合并。`,parameter());});
  const split215=Q('three_split_215','拆出21和5',['技巧'],()=>R('看到21.5这类数时，“数据分拆能力”指什么？','可以按需要拆出21和5等部分配合约分或抵消',op('可以按需要拆出21和5等部分配合约分或抵消',['必须永远当成215整体','只能四舍五入成22','必须用竖式除法','只能放弃拆分']),'数据服务于结构。','21.5不必看死为整体，题目需要时可拆出21、5等部分，与7、3、12等关系配合。'),coverage());
  const splitKeepDrop=Q('three_split_keep_drop','该留该扔',['技巧'],()=>R('划线法中“数据可以随意拆分”的实战含义是什么？','需要的部分保留，不需要的部分划掉，并记录误差',op('需要的部分保留，不需要的部分划掉，并记录误差',['所有位数都必须保留','所有位数都必须丢掉','只能从左到右精算','不能结合选项']),'不是乱扔数字，而是服务抵消和误差。','能约的留下，不影响选择的划掉，再用误差方向兜底。'),coverage());
  const structure=C('three_structure_module','三数结构',['基础'],[model,numeratorMerge],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const reaction=C('three_reaction_module','三数第一反应',['技巧'],[firstMultiple,firstFraction,dontForce],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const split=C('three_split_module','三数数据拆分',['技巧'],[split215,splitKeepDrop],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('three_number_card','三个数乘除｜结构、第一反应与拆分',['技巧'],[structure,reaction,chooseBase,split],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
