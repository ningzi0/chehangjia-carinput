import { promisify } from '../promise.util'
import { $init, $digest } from '../common.util'
import { comSearch } from 'comBiz'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
const wxRequst = promisify(wx.request)
function getBrand($this) {
  wxRequst({
    url: `${apiUrl}/brandlist/brandlists.json`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    $this.data.brandLists = res.data
    $digest($this)

  }).catch(res => {
    wx.showToast({
      title: '网络异常',
    })
  })
}
export function getTotal($this) {
  getBrand($this)

}
export function getList($this) {
  wxRequst({
    data: $this.other.parameters,
    url: `${apiUrl}/recommend_car/list`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    if ($this.data.carList.length == 0) {
      for (let key in res.data.data.list) {
        let carAppearanceImgs = JSON.parse(res.data.data.list[key].carAppearanceImgs)
        res.data.data.list[key].carAppearanceImgs = carAppearanceImgs[0];
      }
      $this.data.carList = res.data.data.list;
    } else {
      for (let key in res.data.data.list) {
        let carAppearanceImgs = JSON.parse(res.data.data.list[key].carAppearanceImgs)
        res.data.data.list[key].carAppearanceImgs = carAppearanceImgs[0];
      }
      $this.data.carList = [...$this.data.carList, ...res.data.data.list]
    }
    console.log($this.data.carList)
    $this.data.totalPage = res.data.data.totalPage;
    $digest($this);
  }).catch(
    res => {
      console.log(res)
      wx.showToast({
        title: '网络异常',
      })
    });
}
