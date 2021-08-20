import { promisify } from '../promise.util'
import { $init, $digest,formatDate} from '../common.util'
import { comSearch } from '../comUit'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
const wxRequst = promisify(wx.request)
const wxStorge = promisify(wx.setStorage)
const getStorge = promisify(wx.getStorage);
export function getDetial($this, id) {
  wxRequst({
    url: `${apiUrl}/recommend_car/detail?id=${id}`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    res.data.data.createdtime = formatDate(new Date(res.data.data.createdtime))
    $this.data.carInfo = res.data.data;
    console.log($this.data.carInfo)
      let carsAppearanceImgs = JSON.parse(res.data.data.carAppearanceImgs)
      console.log(carsAppearanceImgs);
    $this.data.imagesUrls  =carsAppearanceImgs
    
    
    $digest($this);
  }).catch(
    res => {
      wx.showToast({
        title: '网络异常',
      })
    });
}
