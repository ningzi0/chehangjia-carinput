import { promisify } from '../promise.util'
import { $init, $digest } from '../common.util'
import { comSearch } from 'comBiz'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
const wxRequst = promisify(wx.request)
function getBrand($this) {
  wxRequst({
    url: `${apiUrl}/brandlist/brandlists.json`,
    enableCache: true,
    timeout: 5000
  }).then(res => {
    $this.other.brandLists = res.data
    wxRequst({
      url: `${apiUrl}/car/getcartotal`,
      enableCache: true,
      timeout: 5000
    }).then(res => {
      for (let key in $this.other.brandLists) {
        let brandList = $this.other.brandLists[key]
        let itemList = [];
        for (let twoKey in brandList) {
          for (let threeKey in res.data.data) {
            if (brandList[twoKey].brandName == res.data.data[threeKey]['carbrand']) {
              let item = { 'brandName': brandList[twoKey].brandName, 'brandLogo': brandList[twoKey].brandLogo, 'brandTotal': res.data.data[threeKey]['carNum'] }
              itemList.push(item)
            }
          }
        }
        $this.data.brandNumLists[key] = itemList
      }
      for (let key in $this.other.hotBrandList) {
        let item = "";
        for (let twoKey in $this.data.brandNumLists) {
          let brandList = $this.data.brandNumLists[twoKey]
          for (let threeKey in brandList) {
            if ($this.other.hotBrandList[key].brandName == brandList[threeKey]['brandName']) {
              item = {
                'brandName': brandList[threeKey].brandName, 'brandLogo': brandList[threeKey].brandLogo,
                'brandTotal': brandList[threeKey].brandTotal
              }
            }
          }
        }
        $this.data.hotBrandLists.push(item);
      }
      $digest($this);
    }).catch(
      res => {
        console.log(res)
        wx.showToast({
          title: '网络异常',
        })
      }
    )
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
    url: `${apiUrl}/jishou/get_cars_json`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    if ($this.data.carList.length == 0) {
      $this.data.carList = res.data.data.list;
    } else {
      $this.data.carList = [...$this.data.carList, ...res.data.data.list]
    }
    $this.data.currentPage = res.data.data.begin;
    $this.data.totalPage = res.data.data.total;
    $digest($this);
  }).catch(
    res => {
      console.log(res)
      wx.showToast({
        title: '网络异常',
      })
    });
}
