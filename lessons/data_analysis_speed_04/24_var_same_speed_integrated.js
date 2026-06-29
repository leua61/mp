(function(){
  const {n,R,Q,C,add,choose}=EX;
  const b2a=Q('var_same_b2a','B²/A',['技巧'],()=>{
    const A=n(80,200), factor=n(12,18)/10; const B=Math.round(A*factor); const D=Math.round(B*B/A); const ans=String(D);
    return R(`已知某指标从${A}增长到${B}。若下一等长区间保持相同年均增速，且以${B}为初期，末期约为多少？`,ans,choose(ans,[D+10,D-10,B+A,Math.round(B/A)]),'相同区间总因子相同。',`已知总因子=${B}/${A}，下一段末期D=${B}×${B}/${A}=${D}，即B²/A。`);
  });
  const targetDiff=Q('var_same_target_diff','目标初期不同',['技巧'],()=>{
    const A=100, B=140, T=200, D=280;
    return R(`已知相同年数内100变140。若另一个对象初期为200，保持相同年均增速，末期为？`,'280',['280','196','140','240'],'用相同总因子。','总因子=140/100=1.4，目标末期=200×1.4=280。');
  });
  const noR=Q('var_same_no_r','不先求r',['技巧'],()=>R('相同年均增速且年份差相同，求未来量时最佳做法是？','直接连接总比例',['直接连接总比例','先精确开方求r','先算增长量平均','直接选最大选项'],'求量不必求率。','两个等长区间年均增速相同，意味着总增长因子相同，直接连比例最快。'));
  const connect=C('var_same_connect','首尾连接',['技巧'],[b2a,targetDiff,noR],'sequence');

  const notSquare=Q('var_same_not_square','不是除以初期平方',['运用'],()=>R('由B/A = D/B推出D等于什么？','B²/A',['B²/A','B/A²','A²/B','A×B²'],'两边乘B。','B/A=D/B，两边乘B，得D=B²/A。分母是A，不是A²。'));
  const derive=Q('var_same_derive','等式推导',['运用'],()=>R('为什么“末期平方除以初期”成立？','因为两个等长区间总增长因子相同',['因为两个等长区间总增长因子相同','因为增长量相同','因为年份相加','因为选项都很大'],'相同年均增速+等长=相同总因子。','已知段因子B/A，目标段以B为初期，D/B=B/A，所以D=B²/A。'));
  const fix=C('var_same_fix','公式口误纠正',['运用'],[notSquare,derive],'sequence');

  const identify=Q('var_same_integrated_identify','先识别问法',['运用'],()=>R('综合增长题第一步仍然是什么？','识别问题时间、单位和问法',['识别问题时间、单位和问法','直接套72法则','先算所有增长量','先选中间项'],'先判断题型。','先看问的是量还是率、时间在前还是后，再决定用公式、比较、估算或连接法。'));
  const chooseFormula=Q('var_same_integrated_formula','再选公式',['运用'],()=>R('识别后发现问年均增长率，且末期约为初期2倍，选项分散，可优先考虑什么？','72法则',['72法则','增长量/现期','B²/A','差分法'],'倍增近似可用72。','接近翻倍且选项分散时，72/N可快速定位年均增长率。'));
  const optionErr=Q('var_same_integrated_error','最后看选项误差',['运用'],()=>R('估算得到约10%，选项为9.9%和10.1%，最后必须做什么？','检查估算误差',['检查估算误差','直接选10.1%','直接选9.9%','忽略小数'],'选项太近。','当选项非常接近时，估算误差可能改变答案，必须用划线或代入校验。'));
  const integrated=C('var_same_integrated','综合判断',['运用'],[identify,chooseFormula,optionErr],'sequence');

  add(C('var_same_speed_integrated','变量训练｜相同年均增速与综合陷阱',['运用'],[connect,fix,integrated],'all'));
})();
