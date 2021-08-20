import { promisify } from '../promise.util'
import { $init, $digest } from '../common.util'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../config'
import { wxComUlit as wxUlit, formData as carFormData} from '../comUit'
const wxRequst = promisify(wx.request)
export function buyCar(e, $this) {
  wxUlit.regexTest(/^\S{1,100}$/g, $this.other.locname, '请选择位置');
  wxUlit.regexTest(/^[\S\u4E00-\u9FA5]{1,100}$/g, $this.data.brandInfo, '请选择品牌');
  wxUlit.regexTest(/^[\S\u4E00-\u9FA5]{1,100}$/g, $this.data.carSerise, '请选择车型');
  wxUlit.regexTest(/^[\S\s\u4E00-\u9FA5]{1,5000}$/g, $this.data.carModel, '请选择车型');
  wxUlit.regexTest(/^\S{1,100}$/g, $this.data.date, '请选择日期');
  wxUlit.regexTest(/^[\u4E00-\u9FA5]{2,5}$/g, e.detail.value.concat, '姓名不正确');
  wxUlit.regexTest(/^\d{1,11}$/g, +e.detail.value.phone, '电话不正确');
  console.log(wxUlit.validation)
  if (wxUlit.validation.includes(false) > 0) {
    wxUlit.validation.length =0;
    return false
  }
  carFormData.setData(e);
  let carInfo = carFormData.getData();
  carInfo['loc'] = $this.other.locname;
  carInfo['date'] = $this.data.date;
  carInfo['brandName'] = $this.data.brandInfo;
  carInfo['CarSeries'] = $this.data.carSerise;
  carInfo['carModel'] = $this.data.carModel;
  wxRequst({
    data: carInfo,
    method: 'POST',
    url: `${apiUrl}/sell/sellcarinfo`
  }).then(res => {
    if (res.data.status == 1) {
      wx.showToast({
        title: '添加成功',
      })
    }
  }).catch(
    res => {
      wx.showToast({
        title: '网络异常',
      })
    });
}
export function getBrand($this) {
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
export function getSeries(brandname, $this) {
  wxRequst({
    data: { val: brandname },
    url: `${apiUrl}/car/comm/get_car_series_by_brand`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    $this.data.serises = res.data.data;
    $digest($this)
  }).catch(res => {
    wx.showToast({
      title: '网络异常',
    })
  })
}
export function getModel(serisesname, $this) {
  wxRequst({
    data: { val: serisesname },
    url: `${apiUrl}/car/comm/get_car_model_by_set`,
    enableCache: true,
    timeout: 3000
  }).then(res => {
    $this.data.models = res.data.data;
    $digest($this)
  }).catch(res => {
    wx.showToast({
      title: '网络异常',
    })
  })
}