import { promisify } from '../promise.util'
const wxRequst = promisify(wx.request)
import { $init, $digest } from '../common.util'
export function comSearch($this, value, list) {
  wxRequst({
    data: { keywords: value, loc: 1, max: 10, begin: page, total: totalPage },
    url: `${apiUrl}/jishou/get_cars_json`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    $this.data.currentPage = info.data.begin;
    list = res.data.list;
    console.log(list);
    $digest($this);
  }).catch(
    res => {
      wx.showToast({
        title: '网络异常',
      })
    });
}
export function callPhone() {
  wx.makePhoneCall({
    phoneNumber: '4006161677',
  })
}
export function backTop() {
  // 控制滚动
  wx.pageScrollTo({
    scrollTop: 0
  })
}
export function getNodeInfo($this) {
  let query = wx.createSelectorQuery($this);
  
  for (let i in $this.data.brandAlphabets) {
    query.select('#' + $this.data.brandAlphabets[i].alphabet).boundingClientRect();
  }
  query.exec(function (res) {
    $this.other.node = res
    
  })
  
}
export function goToNode (e,$this) {
  $this.data.intoindex = e.currentTarget.dataset.index 
  console.log($this.data.intoindex)
  $digest($this)
}
export function start_fn(e,$this) {
  let self = $this;
  let touch_down = e.touches[0].clientY;
  $this.data.touch_down = touch_down;
  // 获取 inner-wrap 的高度
  wx.createSelectorQuery().select('.content-view').boundingClientRect(function (rect) {
    self.data.inner_height = rect.height;
  }).exec();

  // 获取 scroll-wrap 的高度和当前的 scrollTop 位置
  wx.createSelectorQuery().select('.scroll-view-container').fields({
    scrollOffset: true,
    size: true
  }, function (rect) {
    self.data.start_scroll = rect.scrollTop;
    self.data.height = rect.height;
  }).exec();
}
export function end_fn(e,$this) {
  let current_y = e.changedTouches[0].clientY;
  let self = $this;
  let { start_scroll, inner_height, height, touch_down } = $this.data;
  /**
  * 1、下拉刷新
  * 2、上拉加载
  */

  if (current_y > touch_down && current_y - touch_down > 20 && start_scroll == 0) {
    $this.upper();
    // 下拉刷新 的请求和逻辑处理等
  } else if (current_y < touch_down && touch_down - current_y >= 20) {
    // 上拉加载 的请求和逻辑处理等
    $this.onPullDownRefresh();
  }
}