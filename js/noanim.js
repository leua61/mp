// 禁用动画参数检测：只在显式 ?anim=0 或 ?noanim 时关闭动画；测试/完美视图不再自动关动画。
const _p=new URLSearchParams(location.search);
if(_p.get('anim')==='0'||_p.has('noanim'))document.documentElement.classList.add('na');
