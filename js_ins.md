# 新课程 JS 生成规范
全局要求：必须完美覆盖所有笔记内容。
1、硬性知识点课程应该只会用到二级题卡，即题卡→子题，二级。
2、可以变量锻炼知识点，一定会用到至少三级，子题→孙子分支。
如果没满足这两点，说明你偷工减料。
生成js前，请先文字输出全部知识点分级清单，再生成js一箩筐zip。看看最深有没有突破三级。不要为了深度而乱深入，有必要才深入分级。

新课程使用“根目录全局 catalog.js + 课程文件夹 + 新增单题卡 JS”。
输出时请给 `catalog.js` 和 `lessons/` 文件夹的 zip。
`catalog.js` 放在压缩包根目录，用作 ctl 配置入口。
```text
catalog.js
lessons/
  course_id/
    _common.js
    00_section_xxx.js
    01_xxx.js
    02_xxx.js
    ...
    _finish.js
```

`_common.js` 只放公共工具、共享常量、注册函数。
具体题目、分支、题卡内容放在各自单题卡 JS 内。

## ctl / 选课题卡配置

选课题卡的分级组、组标题、编号，不写进课程 `_common.js`。
统一写在根目录 `catalog.js` 的 `Game.ctl` 里。

`catalog.js` 至少可以包含：

```js
// catalog.js
(function(){
  Game.ctl={
    selectorGroups:[
      {title:'资料分析',items:[
        {id:'data_analysis_speed_01',no:'1'},
        {id:'data_analysis_speed_02',no:'2'}
      ]}
    ]
  };
})();
```

规则：

```text
selectorGroups：选课题卡内部的分级组列表
title：分级栏标题，例如“资料分析”
items：进入该分级组的课程
id：课程 id，必须等于课程文件夹名和 cid
no：按钮上显示的短编号，例如 1、2、3
```

进入 `selectorGroups` 的课程，在选课题卡内部显示为编号按钮。
没有进入 `selectorGroups` 的课程，保持原来的正常课程按钮样式。

课程文件内不要写这些字段：

```js
selectorGroup:'资料分析'
selectorNo:'1'
group:'资料分析'
no:'1'
```

也就是说，课程文件只负责课程内容；选课题卡的展示层级由 ctl 统一控制。

## 结构

课程结构是递归树：

```text
题卡
  小题
    小题内部分支
      更下级分支
        ...
```

路线允许无限嵌套。
每一层都用 `subs` 表示下级。
同一层可以同时存在叶子题和带 `subs` 的父节点。

`subs` 不等于顺序解锁。
每一层是否顺序解锁，只看本节点自己的 `unlockMode`。

```text
unlockMode: all
```

本层任选通关。
用于简单认知、规则问答、考情结构、理念说明、驿站、同主题松散分支。

```text
unlockMode: sequence
```

本层按顺序解锁。
用于必须依次经历的技能流程、固定推导链、固定训练路径。

## 随机

假随机、路线型随机、覆盖式随机，用 `subs`。
真随机、参数型随机，放进题目函数里生成。

能变量化的数字都要变量化。
题干、选项、答案、提示、解析里的具体数字都尽量由变量生成。

可以固定：

```text
概念名称
公式结构
判断规则
固定循环节
核心结论
```

应变量化：

```text
具体数值
百分数
分母分子
倍数
年份差
选项干扰项
估算对象
误差比例
```

## 标题

顶层题卡标题：

```text
大主题｜本卡范围
```

子级标题要短，不重复父级主题词。

例如父级：

```text
三不看原则｜实战与边界
```

子级：

```text
实战
百分号实战
适用范围
底层逻辑
```

## 标签

`tags` 只能使用四种：

```text
基础
技巧
运用
驿站
```

不要写其他标签。
不要把知识点名、结构名、题型名写进 `tags`。

四类含义：

```text
基础：考情、概念、规则、识别、简单认知
技巧：计算方法、推导步骤、误差处理、固定技能
运用：综合判断、选项意识、实战策略、训练理念
驿站：休息、翻译、术语解释、轻量补充
```

有 `subs` 的父节点，也必须按内容归入四类之一。
不要使用 `同卡子级别` 作为标签。

## 驿站

驿站是特殊轻节点。
用于休息、翻译、术语解释、学习提示、节奏缓冲。
驿站不承担主训练，通常不需要 `subs`，通常不需要顺序解锁。

驿站标题格式：

```text
驿站｜翻译
驿站｜术语说明
驿站｜学习提示
```

驿站标签固定：

```text
tags: ['驿站']
```

## 示例 JS

```js
// catalog.js
(function(){
  Game.ctl={
    selectorGroups:[
      {title:'资料分析',items:[
        {id:'example_course',no:'1'}
      ]}
    ]
  };
})();
```

```js
// lessons/example_course/_common.js
(function(){
  const pk=a=>a[Math.floor(Math.random()*a.length)];
  const n=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  const uq=a=>[...new Set(a)];
  const sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const op=(a,b,l=5)=>sh([a,...sh(uq(b).filter(x=>x!==a)).slice(0,l-1)]);
  const R=(q,a,pool,hint,solution,extra={})=>Object.assign({q,a,pool,hint,solution},extra);

  const cid='example_course';
  const Q=(id,title,tags,mk,type)=>({id,title,t:title,type:type||tags[0],tags,mk,makeQuestion:mk});
  const C=(id,title,tags,subs,unlockMode='all')=>({
    id,title,t:title,type:tags[0],tags,unlockMode,subs
  });
  const sec=title=>Game.addLessonTopic(cid,{k:'s',t:title});
  const add=t=>Game.addLessonTopic(cid,t);
  const done=title=>Game.finishLesson(cid,title);

  // 不在 beginLesson / finishLesson 里写 selectorGroup、selectorNo。
  // 选课分级统一由根目录 catalog.js 的 Game.ctl.selectorGroups 控制。
  Game.beginLesson(cid);
  window.EX={pk,n,op,R,Q,C,sec,add,done};
})();
```

```js
// lessons/example_course/00_section_basic.js
EX.sec('章节标题示例');
```

```js
// lessons/example_course/01_simple_random_card.js
(function(){
  const {n,op,R,Q,add}=EX;

  add(Q('basic_change','简单随机题卡｜变量数字训练',['基础'],()=>{
    const a=n(120,980);
    const p=n(2,9);
    const b=a+p;
    const ans=`增加 ${p}`;
    return R(
      `${a} 增加到 ${b}，变化量是多少？`,
      ans,
      op(ans,[`增加 ${p+1}`,`减少 ${p}`,`增加 ${p+2}`]),
      '先看两个数的差。',
      `${b}-${a}=${p}，所以变化量是 ${p}。`
    );
  }));
})();
```

```js
// lessons/example_course/02_loose_branch_card.js
(function(){
  const {n,op,R,Q,C,add}=EX;

  const a=Q('loose_rule','规则理解',['基础'],()=>{
    return R(
      '这个分支是否必须第一个完成？',
      '不需要',
      ['需要','不需要','必须最后完成','不能练习'],
      '简单认知分支可以任选。',
      'unlockMode: all 表示本层任选通关。'
    );
  });

  const b=Q('loose_practice','实战判断',['技巧'],()=>{
    const x=n(20,90);
    const y=x*10;
    const ans=String(x);
    return R(
      `${x}、${y} 去掉多余 0 后共同骨架是什么？`,
      ans,
      op(ans,[String(y),String(x+1),String(x-1)]),
      '忽略数量级，只看核心数字串。',
      `${y} 去掉末尾 0 后是 ${x}，共同骨架是 ${x}。`
    );
  });

  add(C('loose_card','同主题分支｜任选通关',['基础'],[a,b],'all'));
})();
```

```js
// lessons/example_course/03_sequence_branch_card.js
(function(){
  const {n,op,R,Q,C,add}=EX;

  const a=Q('seq_step_1','第一步',['技巧'],()=>{
    return R(
      '固定流程训练中，第一步应该先做什么？',
      '识别对象',
      ['识别对象','直接计算','跳过题目','只看选项'],
      '流程题需要先建立顺序。',
      '必须先识别对象，再进入后续计算或判断。'
    );
  });

  const b=Q('seq_step_2','第二步',['技巧'],()=>{
    const x=n(100,900);
    const y=x+n(5,30);
    const ans=String(y-x);
    return R(
      `${x} 到 ${y} 的差是多少？`,
      ans,
      op(ans,[String(y-x+1),String(y-x-1),String(y+x)]),
      '第二步开始处理数字。',
      `${y}-${x}=${y-x}。`
    );
  });

  add(C('seq_card','固定流程｜按顺序解锁',['技巧'],[a,b],'sequence'));
})();
```

```js
// lessons/example_course/04_nested_branch_card.js
(function(){
  const {n,op,R,Q,C,add}=EX;

  const a1=Q('inner_rule','局部规则',['基础'],()=>{
    return R(
      '二级分支是否可以自己决定解锁方式？',
      '可以',
      ['可以','不可以','只能继承上级','只能顺序'],
      '每一层只看自己的 unlockMode。',
      '上级是否顺序，不影响下级自己的解锁模式。'
    );
  });

  const a2=Q('inner_practice','局部练习',['技巧'],()=>{
    const x=n(2,9);
    const ans=String(x*11);
    return R(
      `${x} × 11 = ?`,
      ans,
      op(ans,[String(x*10),String(x*12),String(x+11)]),
      '乘 11 是固定骨架练习。',
      `${x}×11=${x*11}。`
    );
  });

  const deep=C('deep_route','更下级路线｜顺序',['技巧'],[a1,a2],'sequence');
  const mid=C('inner_route','内部路线｜任选',['基础'],[deep],'all');

  const b=Q('outer_leaf','外部叶子',['基础'],()=>{
    return R(
      '同一层可以混合叶子题和父节点吗？',
      '可以',
      ['可以','不可以','只能全是叶子','只能全是父节点'],
      '路线树允许混合节点。',
      '一层里可以同时有普通题和继续展开的下级节点。'
    );
  });

  add(C('nested_card','递归路线｜无限嵌套示例',['基础'],[mid,b],'all'));
})();
```

```js
// lessons/example_course/05_station.js
(function(){
  const {R,Q,add}=EX;

  add(Q('station_note','驿站｜术语说明',['驿站'],()=>{
    return R(
      '欢迎来到驿站。驿站节点主要承担什么作用？',
      '休息、解释、补充说明',
      ['休息、解释、补充说明','强制刷题','替代主线课程','隐藏考试答案'],
      '驿站不是主训练关卡。',
      '驿站用于节奏缓冲、术语说明或轻量补充，不承担主训练。'
    );
  }));
})();
```

```js
// lessons/example_course/_finish.js
EX.done('示例课程');
```
