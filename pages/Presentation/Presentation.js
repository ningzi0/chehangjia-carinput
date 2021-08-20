// pages/Presentation/Presentation.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { getReport } from '../../utils/Biz/report'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reports:{},
    index:0,
    tag:'frame',
    reportItems:[
      { 'tag': 'frame', 'text': '车辆骨架', 'src':'../../images/baogao/gujia.png'},
      { 'tag': 'body', 'text': '车辆外观', 'src': '../../images/baogao/waiguan.png'},
      { 'tag': 'parts', 'text': '功能部件', 'src': '../../images/baogao/bujian.png'},
      { 'tag': 'start', 'text': '启动检查', 'src': '../../images/baogao/fangxiangpan.png'},
      { 'tag': 'bottom', 'text': '底盘检查', 'src': '../../images/baogao/dipan.png'},
      { 'tag': 'road', 'text': '路试检查', 'src': '../../images/baogao/lushi.png'},
      { 'tag': 'cab', 'text': '驾驶舱', 'src': '../../images/baogao/jiashicang.png'},
      { 'tag': 'engine', 'text': '发动机', 'src': '../../images/baogao/fadongji.png'},
    ]
  },
  getReportInfo:function(e){
    this.data.index = e.currentTarget.dataset.index;
    this.data.tag = e.currentTarget.dataset.tag;
    $digest(this);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    $init(this);
    let carId = options.id;
    this.data.index =+options.index;
    this.data.tag = options.tag;
    getReport(this, carId)
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