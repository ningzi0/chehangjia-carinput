import { promisify } from '../promise.util'
import { $init, $digest } from '../common.util'
import { comSearch } from '../comUit'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
const wxRequst = promisify(wx.request)
const getStorge = promisify(wx.getStorage);
export function footerReport($this) {
  getStorge({ key: 'footerCarList' }).then(res => {
    wxRequst({
      data: { footer: res.data.join('-') },
      url: `${apiUrl}/footer/list`,
      enableCache: true,
      timeout: 3000
    }).then(res => {
      $this.data.carList = res.data.data.list;
      console.log($this.data)
      $digest($this)
    }).catch(res => {
      console.log(res)
      wx.showToast({
        title: '网络异常',
      })
    })
  }).catch(res => {
    console.log(res);
  })

}