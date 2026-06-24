(function(){
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const R=(q,a,pool,hint,solution)=>({q,a,pool,hint,solution});
  const topics=[
    {title:'占位｜加法',makeQuestion(){
      const a=1+Math.floor(Math.random()*9),b=1+Math.floor(Math.random()*9),ans=a+b;
      return R(`${a} + ${b} = ?`,String(ans),
        [String(ans),String(ans+1),String(ans-1),String(ans+2),String(ans+3)],
        '加法题先看两个加数，再直接合并。',
        `${a} + ${b} = ${ans}，所以选 ${ans}。`);
    }},
    {title:'占位｜乘法',makeQuestion(){
      const a=2+Math.floor(Math.random()*8),b=2+Math.floor(Math.random()*8),ans=a*b;
      return R(`${a} × ${b} = ?`,String(ans),
        [String(ans),String(ans+a),String(ans-b),String(ans+1),String(ans-1)],
        '乘法题先识别乘数，再按乘法口诀计算。',
        `${a} × ${b} = ${ans}，所以选 ${ans}。`);
    }}
  ];
  Game.addLesson({id:'placeholder_math',title:'占位符课程',topics});
})();
