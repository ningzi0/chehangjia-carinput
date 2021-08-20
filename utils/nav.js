export const navData = [
  {
    name: "首页",  //文本
    current: 1,    //是否是当前页，0不是  1是
    image: '../../images/b1.png',  //不同图标
    actvie_image: '../../images/b1-active.png',
    fn: 'gotoIndex'   //对应处理函数
  }, {
    name: "卖车",
    current: 0,
    image: '../../images/b2.png',
    actvie_image: '../../images/b2-active.png',
    fn: 'gotoOldGoods'
  }, {
    name: "我的",
    current: 0,
    image: '../../images/b3.png',
    actvie_image: '../../images/b3-active.png',
    fn: 'gotoMine'
  },
];
export function gotoIndex() {
  wx.redirectTo({
    url: '/pages/index/index',
  });
}
export function gotoMine() {
  wx.redirectTo({
    url: '/pages/my/my',
  });
}
export function gotoOldGoods() {
  wx.redirectTo({
    url: '/pages/buycars/buycars',
  });
}