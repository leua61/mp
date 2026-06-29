(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;
  const model=Q('four_model_ac_over_bd','四数归位',['基础'],()=>R('A÷B×C÷D 应先看成哪种结构？','(A×C)÷(B×D)',op('(A×C)÷(B×D)',['A÷(B×C×D)','(A×B)÷(C×D)','A+B+C+D','D÷C×B÷A']),'先分清分子侧和分母侧。','A、C在分子侧，B、D在分母侧；再分别按乘法合并误差。'),coverage());
  const sideMerge=Q('four_side_merge','两侧先合并',['技巧'],()=>{const a=n(2,5), c=n(2,5), b=n(2,5), d=n(2,5), num=a+c, den=b+d; const ans='先分子侧内部合并、分母侧内部合并，再两侧比较';return R(`A、C都划大共约${num}%，B、D都划大共约${den}%。四数题正确的合并顺序是什么？`,ans,op(ans,['把四个百分数直接全部相加','只看最后一个D','先做加减再看乘除','完全不用看误差']),'四数题不能乱合并。',`A、C同侧先按乘法合并；B、D同侧也先按乘法合并；最后把两侧当作一个分子和一个分母比较。`,parameter());});
  const firstCancel=Q('four_first_cancel','先找可抵消项',['技巧'],()=>R('A÷B×C÷D 中，如果C和D很接近，第一反应应是什么？','优先尝试让C和D抵消或近似抵消',op('优先尝试让C和D抵消或近似抵消',['先把四个数都精算','完全不看C和D','把C放进分母侧','把D放进分子侧']),'四数题先找能消掉的关系。','如果一上一下或相近项能抵消，就能快速降低运算量和误差。'),coverage());
  const onePlus=Q('four_one_plus_growth','一加增长率结构',['基础'],()=>R('资料分析中遇到1+增长率、1+13.5%这类数，应先意识到什么？','它是1.xxx结构，不能把加号里的百分号直接拿掉',op('它是1.xxx结构，不能把加号里的百分号直接拿掉',['它等于百分数本身','它可以直接写成136','它一定是整数','它必须和单位相加']),'这是三不看边界和四数题常见结构。','1+13.5%=1.135；只有还原成1.xxx后，才能进入乘除划线。'),coverage());
  const compareGrowth=Q('four_growth_compare','一加结构抵消',['技巧'],()=>{const p=n(8,18), q=p+n(2,8); const ans='把两个1+增长率当作接近1的数比较，优先看能否抵消';return R(`式子中出现(1+${p}%)÷(1+${q}%)，划线法第一步更应关注什么？`,ans,op(ans,['把加号直接删除','把两个百分号相加','只看较大的年份','改成两个整数相乘']),'一加结构常在比重、平均数中出现。',`(1+${p}%)和(1+${q}%)都是1.xxx，通常先看接近程度和误差方向，而不是把${p}%、${q}%直接相加。`,parameter());});
  const nearOne=C('four_near_one_module','一加结构',['基础'],[onePlus,compareGrowth],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const four=C('four_structure_module','四数结构',['技巧'],[model,sideMerge,firstCancel],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('four_number_card','四个数乘除｜两侧归位、一加结构与抵消',['技巧'],[four,nearOne],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
