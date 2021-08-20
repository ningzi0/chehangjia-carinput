// pages/all/all.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { getDetial } from '../../utils/Biz/all'
import { callPhone } from '../../utils/Biz/comBiz'
import { navData, gotoIndex, gotoMine, gotoOldGoods } from '../../utils/nav'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   carInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let carId = options.id
    $init(this)
    getDetial(this, carId);
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

  }
})