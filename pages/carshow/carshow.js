// pages/carshow/carshow.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { getDetial, setFooterCarId } from '../../utils/Biz/detail'
import { callPhone} from '../../utils/Biz/comBiz'
import { navData, gotoIndex, gotoMine, gotoOldGoods } from '../../utils/nav'

import { apiUrl, imagesUrl, press256pic, press512pic } from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carId:0,
    imagesUrls: [],
    current: 0,
    carInfo: '',
    imagesUrl: imagesUrl,
  },
  swiperChange: function (e) {
    console.log(e)
    this.data.current = e.detail.current;
    $digest(this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this);
   this.data.carId = options.id;
    setFooterCarId(this.data.carId)
   // this.data.carId = 25890;
    getDetial(this, this.data.carId);
  },

  previewImg: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index
    let imageUrl = [];
    for (var key in that.data.imagesUrls) {
      imageUrl.push(`${imagesUrl}//${that.data.imagesUrls[key]}`)
    }
    wx.previewImage({
      current: e.currentTarget.dataset.src, //当前图片地址
      urls: imageUrl, //所有要预览的图片的地址集合 数组形式
    })
  },
  callPhone:function(){
    callPhone();
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