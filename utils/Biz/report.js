import { promisify } from '../promise.util'
import { $init, $digest } from '../common.util'
import { comSearch } from '../comUit'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
const wxRequst = promisify(wx.request)
export function getReport($this, id) {
  console.log(id)
  wxRequst({
    url: `${apiUrl}/jishou/get_car_attr?carid=${id}`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    let reportItem = {};
    for (let key in res.data.data) {
      let item = res.data.data[key].attrs;
      let reportItems = [];
      for (let twoKey in item) {
        reportItem = { 'reportText': item[twoKey][1], 'reportValue': item[twoKey][0] }
        reportItems.push (reportItem);
       // $this.data.reports = reportItems 
      }
      $this.data.reports [key] = reportItems
    }
    $digest($this);
  }).catch(
    res => {
      wx.showToast({
        title: '网络异常',
      })
    });
}