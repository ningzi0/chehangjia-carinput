// pages/carshow/carshow.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { getArea, getHotCarList, getTopImg,getRecomend } from '../../utils/Biz/index'
import { navData, gotoIndex, gotoMine, gotoOldGoods } from '../../utils/nav'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../../utils/config'
const wxRequst = promisify(wx.request)
const wxStorge = promisify(wx.setStorage)
const getStorge = promisify(wx.getStorage);
navData[0].current = 1;
navData[1].current = 0;
navData[2].current = 0;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: navData,
    areaName: ["全国"],
    index: 0,
    imgUrls: [
    ],
    scrollText: [
      '欢迎进入车行家小程序'
    ],
    hotCarList: [],
    recomendList:[],
    press256pic: press256pic,
    imagesUrl: imagesUrl
  },
  other: {
    areaList: [{ "areaid": 0, "areaname": "全国" }],
  },

  gotoIndex: gotoIndex,
  gotoOldGoods: gotoOldGoods,
  gotoMine: gotoMine,

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.index = e.detail.value;
    $digest(this);
    getHotCarList(this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this);
    this.initData();
  },
  initData: function () {
    getArea(this)
    getHotCarList(this)
    getTopImg(this)
    getRecomend(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  moreCar: function () {
    wx.navigateTo({
      url: `/pages/list/list`,
    })
  },
  getDetail: function (e) {
    let carid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/carshow/carshow?id=${carid}`,
    })
  },
  searchSumbit: function (e) {
    let keyword = e.detail.value;
    wx.navigateTo({
      url: `/pages/list/list?val=${keyword}`,
    })
  },
  getArticle: function (e) {
    console.log(e);
    let url = e.currentTarget.dataset.url;
    wxStorge({ 'key': 'url', data: url });
    wx.navigateTo({
      url: `/pages/out/out`,
    })
  },
  cancel:function(e){
    wx.showToast({
      title: '功能暂未开发',
    })
  }
})