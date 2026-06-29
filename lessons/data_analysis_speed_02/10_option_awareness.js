(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;
  const firstDigit=Q('option_first_digit_direct','首位不同',['运用'],()=>R('如果四个选项首位分别是7、8、6、5，最快策略通常是什么？','直接直除看首位',op('直接直除看首位',['完整划线补所有误差','先背所有分数','直接选最大','放弃选项']),'选项已经给了低精度入口。','首位不同不用精修，直接看结果开头最省时。'),coverage());
  const farOptions=Q('option_far_range','差距大',['运用'],()=>{const base=n(520,760), p=n(2,5), delta=Math.round(base*p/100), ans='只需判断大致范围，不必把每个小误差都补完';return R(`基准${base}下降约${p}%，约少${delta}。若选项差距很大，应怎样处理？`,ans,op(ans,['必须精确到小数点后三位','直接无视下降方向','每题都补千分位','只看最大选项']),'选项远就粗。',`下降${p}%只影响${delta}左右，若选项相差几十甚至上百，锁定范围即可。`,parameter());});
  const nearOptions=Q('option_near_direction','选项接近',['运用'],()=>R('两个选项非常接近时，划线法还要补什么？','补误差方向和“多”的稍大稍小',op('补误差方向和“多”的稍大稍小',['只看首位','永远选中间','完全忽略多','把选项相加']),'选项近就精。','选项接近时，一两个百分点甚至“六多”的千分级都会影响选择。'),coverage());
  const hundredBase=Q('option_hundred_base','整百基准',['运用'],()=>{const base=100, p=n(1,2), ans='100附近即使1%到2%也可能影响选项';return R(`基准值${base}附近，误差约${p}%。为什么不能完全忽略？`,ans,op(ans,['100附近即使1%到2%也可能影响选项','100没有误差','选项一定差很远','必须改成1000再算']),'整百基准看起来稳，但选项可能近。',`100的${p}%就是${p}，若选项是100和105，方向就很关键。`,parameter());});
  const notNeedMatch=Q('option_not_match_back','不必配回真实值',['运用'],()=>R('训练时要求补真实值，考场上是否每题都要配回真实值？','不需要，能由范围和选项判断就直接选',op('不需要，能由范围和选项判断就直接选',['必须每题配回计算器值','只能等老师讲','不能看选项','先写完整错位步骤']),'速度来自选项意识。','练习时补误差是为了能力；考场上只要选项能区分，就不必算到真实值。'),coverage());
  const rough=C('option_rough_module','粗估入口',['运用'],[firstDigit,farOptions,notNeedMatch],'all',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const fine=C('option_fine_module','精修入口',['运用'],[nearOptions,hundredBase],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('option_awareness_card','选项意识｜首位、远近与精度取舍',['运用'],[rough,fine],'all',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
