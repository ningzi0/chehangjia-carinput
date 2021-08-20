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
    console.log(res)
    $this.data.carInfo = res.data.data;
    $digest($this);
  }).catch(
    res => {
      wx.showToast({
        title: '网络异常',
      })
    });
}