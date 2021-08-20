import { promisify } from '../promise.util'
import { $init, $digest } from '../common.util'
import { comSearch } from 'comBiz'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
const wxRequst = promisify(wx.request)
export function getArea($this) {
  wxRequst({
    url: `${apiUrl}/area/areainfo`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    for (var key in res.data.areaList) {
      $this.data.areaName.push(res.data.areaList[key].areaname)
      $this.other.areaList.push(res.data.areaList[key])
    }
    $digest($this)
  }).catch(res => {
    console.log(res)
    wx.showToast({
      title: '网络异常',
    })
  })
}
export function getHotCarList($this) {
  wxRequst({
    data: { loc: $this.data.index },
    url: `${apiUrl}/car/comm/m/get_hot_cars`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    $this.data.hotCarList = res.data.data.list;
    $digest($this)
  })
}
export function getTopImg($this) {
  wxRequst({
    url: `${apiUrl}/recommend_car/list?type=BANNER&pageSize=100`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    $this.data.imgUrls = res.data.data.list
    console.log($this.data.imgUrls)
    $digest($this)
  })
}
export function search($this) {
  $this.data.keywords = e.detail.value;
  comSearch($this.data.keywords, $this.data.currentPage, $this.data.totalPage);
}

export function getRecomend($this) {
  wxRequst({
    url: `${apiUrl}/recommend_car/list?type=NORMAL&page=1&pageSize=10&sellStatus=IN_SALE`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    for (let key in res.data.data.list){
      let carAppearanceImgs = JSON.parse(res.data.data.list[key].carAppearanceImgs)
      res.data.data.list[key].carAppearanceImgs = carAppearanceImgs[0];
    }
    $this.data.recomendList = res.data.data.list;
    $digest($this)
    console.log($this.data.recomendList)
  }).catch(res=>console.log(res))
}
