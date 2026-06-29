(function(){
  /*
    全局卡片绑定表：
    - 课程 JS 只负责题目内容。
    - 卡片属于哪个课程、展示顺序、图片路径等绑定信息统一放在这里。
    - 每张卡牌图片放到顶层 cards/<课程id> 文件夹，例如：
      cards/data_analysis_speed_01/*.png
  */
  Game.addCardBindings({
    data_analysis_speed_01:[
    {
      id:'das01_sig_kand_sr',
      lessonId:'data_analysis_speed_01',
      title:'西格尼菲・坎德',
      subtitle:'驿站店主 / 有效数',
      cn:'有效数',
      rarity:'SR',
      image:'cards/data_analysis_speed_01/sig_kand_sr.png',
      debut:'03月14日',
      camp:'术语边界',
      role:'驿站店主',
      quote:'我只负责 a×10ⁿ 里的 a。',
      fields:{
        '稀有度':'SR',
        '阵营':'术语边界',
        '职业':'驿站店主',
        '亮相日期':'03月14日',
        '教学地位':'学术圈熟客，中文教学里偏冷门',
        '关系':'与“西格・菲格”“斯凯拉・迪吉特”为表亲',
        '代表台词':'『我只负责 a×10ⁿ 里的 a。』',
        '能力':'术语导航 / 系数招待 / 边界提醒'
      },
      story:'西格尼菲・坎德驿站的店主，住在科学记数法街区。性格温和，有些书卷气，擅长把正式术语翻成玩家能听懂的话。和“西格・菲格”“斯凯拉・迪吉特”有亲缘关系，但总会认真提醒：像，不等于就是。'
    },
    {
      id:'das01_sig_fig_ur',
      lessonId:'data_analysis_speed_01',
      title:'西格・菲格',
      subtitle:'精度判官 / 有效数字',
      cn:'有效数字',
      rarity:'UR',
      image:'cards/data_analysis_speed_01/sig_fig_ur.png',
      debut:'09月01日',
      camp:'教材主线',
      role:'精度判官',
      quote:'先说精度，再说答案。',
      fields:{
        '稀有度':'UR',
        '阵营':'教材主线',
        '职业':'精度判官',
        '亮相日期':'09月01日',
        '教学地位':'义务教育常驻明星，考试高频出现',
        '关系':'与“西格尼菲・坎德”“斯凯拉・迪吉特”为表亲',
        '代表台词':'『先说精度，再说答案。』',
        '能力':'精度裁定 / 位数监察 / 实验室巡课'
      },
      story:'国内课堂里的超级常驻角色，知名度高，登场稳定，常在测量、近似值和实验题里出面主持公道。和“西格尼菲・坎德”以及“斯凯拉・迪吉特”长得像，但负责的事情完全不同。'
    },
    {
      id:'das01_skeleton_digit_r',
      lessonId:'data_analysis_speed_01',
      title:'斯凯拉・迪吉特',
      subtitle:'速算跑者 / 数字骨架',
      cn:'数字骨架',
      rarity:'R',
      image:'cards/data_analysis_speed_01/skeleton_digit_r.png',
      debut:'01月23日',
      camp:'速算前线',
      role:'数字跑者',
      quote:'零和小数点先靠边，我先认人。',
      fields:{
        '稀有度':'R',
        '阵营':'速算前线',
        '职业':'数字跑者',
        '亮相日期':'01月23日',
        '教学地位':'非学术标准，但在速算里极好用',
        '关系':'与“西格尼菲・坎德”“西格・菲格”为表亲',
        '代表台词':'『零和小数点先靠边，我先认人。』',
        '能力':'剥离尺度 / 抓取数字串 / 秒认近亲'
      },
      story:'出身民间速算街区的灵巧少女，最擅长在 23、230、2.3、0.23 之间一眼认出同一副数字骨架。不是正式学术术语，却是做题时最先冲到前线的那一个。'
    }
    ],
    placeholder_math:[]
  });
})();
