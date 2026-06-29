(function(){
  const {n,op,R,Q,C,add,coverage,parameter}=EX;
  const numUp=Q('dir_num_up','分子划大',['技巧'],()=>{const p=n(2,8), ans=`最终下降${p}%`;return R(`A÷B中，分子A被划大${p}%，只看这一处，最终怎样修正？`,ans,op(ans,[`最终上升${p}%`,`不修正`,`最终下降${p+2}%`,`方向与分母相同`]),'分子划大，临时商偏大。',`分子划大使临时结果偏大，所以最终反向：下降${p}%。`,parameter());});
  const numDown=Q('dir_num_down','分子划小',['技巧'],()=>{const p=n(2,8), ans=`最终上升${p}%`;return R(`A÷B中，分子A被划小${p}%，只看这一处，最终怎样修正？`,ans,op(ans,[`最终下降${p}%`,`不修正`,`最终上升${p+2}%`,`方向与分母相同`]),'分子划小，临时商偏小。',`分子划小使临时结果偏小，所以最终反向：上升${p}%。`,parameter());});
  const denUp=Q('dir_den_up','分母划大',['技巧'],()=>{const p=n(2,8), ans=`最终上升${p}%`;return R(`A÷B中，分母B被划大${p}%，只看这一处，最终怎样修正？`,ans,op(ans,[`最终下降${p}%`,`不修正`,`最终上升${p+2}%`,`方向与分子相同`]),'分母划大，临时商偏小。',`分母划大使临时商偏小，所以最终上升${p}%。分母方向与自身变化同向。`,parameter());});
  const denDown=Q('dir_den_down','分母划小',['技巧'],()=>{const p=n(2,8), ans=`最终下降${p}%`;return R(`A÷B中，分母B被划小${p}%，只看这一处，最终怎样修正？`,ans,op(ans,[`最终上升${p}%`,`不修正`,`最终下降${p+2}%`,`方向与分子相同`]),'分母划小，临时商偏大。',`分母划小使临时商偏大，所以最终下降${p}%。分母方向与自身变化同向。`,parameter());});
  const divSameNum=Q('div_same_num_bigger','同向抵消｜分子剩余',['技巧'],()=>{const a=n(5,9), b=n(1,a-1), d=a-b, ans=`下降${d}%`;return R(`A÷B中，A划大${a}%，B划大${b}%。合并后最终怎样修正？`,ans,op(ans,[`上升${d}%`,`下降${a+b}%`,`上升${a+b}%`,`基本不变`]),'除法同向先抵消，大减小。',`同向抵消：${a}%-${b}%=${d}%。剩余在分子侧，分子反向，所以下降${d}%。`,parameter());});
  const divSameDen=Q('div_same_den_bigger','同向抵消｜分母剩余',['技巧'],()=>{const b=n(5,9), a=n(1,b-1), d=b-a, ans=`上升${d}%`;return R(`A÷B中，A划大${a}%，B划大${b}%。合并后最终怎样修正？`,ans,op(ans,[`下降${d}%`,`下降${a+b}%`,`上升${a+b}%`,`基本不变`]),'抵消后看剩余在哪侧。',`同向抵消后剩余${d}%在分母侧，分母同向，所以最终上升${d}%。`,parameter());});
  const divOppDown=Q('div_opposite_down','异向叠加｜商偏大',['技巧'],()=>{const a=n(2,6), b=n(2,6), s=a+b, ans=`下降${s}%`;return R(`A÷B中，A划大${a}%，B划小${b}%。最终怎样修正？`,ans,op(ans,[`上升${s}%`,`下降${Math.abs(a-b)}%`,`上升${Math.abs(a-b)}%`,`基本不变`]),'分子大、分母小都会让商偏大。',`两处误差叠加为${s}%，临时商偏大，最终下降${s}%。`,parameter());});
  const divOppUp=Q('div_opposite_up','异向叠加｜商偏小',['技巧'],()=>{const a=n(2,6), b=n(2,6), s=a+b, ans=`上升${s}%`;return R(`A÷B中，A划小${a}%，B划大${b}%。最终怎样修正？`,ans,op(ans,[`下降${s}%`,`下降${Math.abs(a-b)}%`,`上升${Math.abs(a-b)}%`,`基本不变`]),'分子小、分母大都会让商偏小。',`两处误差叠加为${s}%，临时商偏小，最终上升${s}%。`,parameter());});
  const mulOpp=Q('mul_opposite_cancel','异向抵消',['技巧'],()=>{const a=n(5,9), b=n(1,a-1), d=a-b, ans=`下降${d}%`;return R(`A×B中，A划大${a}%，B划小${b}%。合并后最终怎样修正？`,ans,op(ans,[`上升${d}%`,`下降${a+b}%`,`上升${a+b}%`,`基本不变`]),'乘法中一升一降先抵消。',`乘法异向抵消：${a}%-${b}%=${d}%。临时乘积仍偏大${d}%，最终下降${d}%。`,parameter());});

  const mulOppReverse=Q('mul_opposite_cancel_reverse','异向抵消｜划小剩余',['技巧'],()=>{
    const b=n(5,9), a=n(1,b-1), d=b-a, ans=`上升${d}%`;
    return R(`A×B中，A划大${a}%，B划小${b}%。合并后最终怎样修正？`,ans,op(ans,[`下降${d}%`,`下降${a+b}%`,`上升${a+b}%`,`基本不变`]),'乘法异向抵消后，看剩余偏大还是偏小。',`乘法一升一降先抵消：${b}%-${a}%=${d}%。剩余是“划小”更多，临时乘积偏小，所以最终上升${d}%。`,parameter());
  });
  const mulSameUp=Q('mul_same_up_add','同向叠加｜都划大',['技巧'],()=>{const a=n(2,6), b=n(2,6), s=a+b, ans=`下降${s}%`;return R(`A×B中，A划大${a}%，B划大${b}%。最终怎样修正？`,ans,op(ans,[`上升${s}%`,`下降${Math.abs(a-b)}%`,`上升${Math.abs(a-b)}%`,`基本不变`]),'两个因子都划大，乘积偏大。',`乘法同向叠加：${a}%+${b}%=${s}%，最终下降${s}%。`,parameter());});
  const mulSameDown=Q('mul_same_down_add','同向叠加｜都划小',['技巧'],()=>{const a=n(2,6), b=n(2,6), s=a+b, ans=`上升${s}%`;return R(`A×B中，A划小${a}%，B划小${b}%。最终怎样修正？`,ans,op(ans,[`下降${s}%`,`下降${Math.abs(a-b)}%`,`上升${Math.abs(a-b)}%`,`基本不变`]),'两个因子都划小，乘积偏小。',`乘法同向叠加：临时乘积偏小${s}%，最终上升${s}%。`,parameter());});
  const single=C('direction_single_module','单项方向',['技巧'],[numUp,numDown,denUp,denDown],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const div=C('direction_divide_module','除法合并',['技巧'],[divSameNum,divSameDen,divOppDown,divOppUp],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  const mul=C('direction_multiply_module','乘法合并',['技巧'],[mulOpp,mulOppReverse,mulSameUp,mulSameDown],'sequence',coverage({progressScope:'node_children',progressLabel:'局部掌握'}));
  add(C('error_direction_card','误差方向｜单项、除法与乘法合并',['技巧'],[single,div,mul],'sequence',coverage({routeSchema:'recursive_route_tree_v1',routeDepth:'3',progressScope:'card_children',progressLabel:'题卡掌握',localProgressLabel:'局部掌握'})));
})();
