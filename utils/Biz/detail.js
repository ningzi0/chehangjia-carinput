import { promisify } from '../promise.util'
import { $init, $digest } from '../common.util'
import { comSearch } from '../comUit'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
const wxRequst = promisify(wx.request)
const wxStorge = promisify(wx.setStorage)
const getStorge = promisify(wx.getStorage);
export function getDetial($this, id) {
  wxRequst({
    url: `${apiUrl}/jishou/get_car_base_info?carid=${id}`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    $this.data.carInfo = res.data.data;
    for (let key in res.data.data.pictures) {
      $this.data.imagesUrls.push(res.data.data.pictures[key][1])
    }
    $digest($this);
  }).catch(
    res => {
      wx.showToast({
        title: '网络异常',
      })
    });
}
export function setFooterCarId(id) {

  getStorge({ key: 'footerCarList' }).then(res => {
    let list = res.data;
    if (list.length == 10) {
      console.log(list);
      list.pop();
    }
    if (list.includes(id) > 0) {
      return true;
    } else {
      list.unshift(id);
      wxStorge({ 'key': 'footerCarList', data: list });
    }

  }).catch(res => {
    console.log(res)
    let list = [];
    list.push(id);
    wxStorge({ 'key': 'footerCarList', data: list });
  })
}