(function(){
  const {pk,op,R,Q,C,add,coverage,parameter}=EX;
  const common=[['1/2','5'],['1/3','333'],['1/4','25'],['1/5','2'],['1/6','167'],['1/8','125'],['1/9','111'],['1/11','09'],['7/9','777'],['5/9','555'],['1/7','142857'],['2/7','285714'],['3/7','428571'],['1/18','0555']];
  const fracForward=Q('frac_forward_common','分数到骨架',['技巧'],()=>{const [frac,shape]=pk(common);return R(`${frac} 常用骨架优先记成什么？`,shape,op(shape,common.map(x=>x[1]),6),'分数转化服务划线。',`${frac} 的骨架是 ${shape}，看到相关百分数或小数时可优先联想。`,parameter());});
  const fracReverse=Q('frac_reverse_common','骨架到分数',['技巧'],()=>{const [frac,shape]=pk(common);return R(`看到骨架 ${shape}，优先反识别成哪个分数？`,frac,op(frac,common.map(x=>x[0]),6),'考试里常先看到骨架。',`骨架${shape}对应${frac}，要训练从数字反推分数。`,parameter());});
  const sevenCycle=Q('frac_seven_cycle','七分数循环节',['技巧'],()=>R('1/7到6/7相关骨架的核心循环节是什么？','142857',op('142857',['111111','125000','333333','090909']),'七分数不是只记143。','1/7到6/7都来自142857的循环移位；只记前三位会丢掉起点判断。'),coverage());
  const sevenStart=Q('frac_seven_start','起点判断',['技巧'],()=>{const arr=[['1/7','142857'],['2/7','285714'],['3/7','428571'],['4/7','571428'],['5/7','714285'],['6/7','857142']]; const [frac,shape]=pk(arr); return R(`看到七分数骨架 ${shape.slice(0,3)}…，更可能是哪一个？`,frac,op(frac,arr.map(x=>x[0]),6),'看循环节起点。',`${frac}=0.${shape}…，所以开头${shape.slice(0,3)}对应${frac}。`,parameter());});
  const convertUse=Q('frac_convert_use','和划线结合',['运用'],()=>R('分数转化在本课中的定位是什么？','辅助划线法减少计算量',op('辅助划线法减少计算量',['替代所有误差方向','只用于背诵不做题','专门处理加法单位','让选项失效']),'分数转化不是孤立背表。','看到77、125、333、428等骨架能直接约分或判断范围，和划线误差一起使用。'),coverage());
  const commonModule=C('frac_common_module','常见骨架',['技巧'],[fracForward,fracReverse],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const sevenModule=C('frac_seven_module','七分数',['技巧'],[sevenCycle,sevenStart],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('fraction_conversion_card','分数转化｜常见骨架、反识别与七分数',['技巧'],[commonModule,sevenModule,convertUse],'all',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
