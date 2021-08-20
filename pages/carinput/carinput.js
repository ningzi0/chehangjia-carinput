// pages/carinput/carinput.js
import {useList as useList} from '../../utils/const/const'
// pages/buycars/buycars.js
import { $init, $digest } from '../../utils/common.util'
import { buyCar, getBrand, getSeries, getModel } from '../../utils/Biz/sold'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    array: ['合资', '进口', '国产'],
    array2: useList,
    index: 0,
    index2: 0,
    date: '请选择日期',
    date2: '请选择日期',
    date3: '请选择日期',
    date4: '请选择日期',
    date5: '请选择日期',
    // 车辆归属地
    region: ["贵州省", "贵阳市", "南明区"],
    // 商家所在地
    region2: ["贵州省", "贵阳市", "南明区"],
    
    showDialog: false,
    two: false,
    three: false,
    
    brandAlphabets: [
      { alphabet: "hot" },
      { alphabet: "A" },
      { alphabet: "B" },
      { alphabet: "C" },
      { alphabet: "D" },
      { alphabet: "F" },
      { alphabet: "G" },
      { alphabet: "H" },
      { alphabet: "I" },
      { alphabet: "J" },
      { alphabet: "K" },
      { alphabet: "L" },
      { alphabet: "M" },
      { alphabet: "N" },
      { alphabet: "O" },
      { alphabet: "Q" },
      { alphabet: "p" },
      { alphabet: "R" },
      { alphabet: "S" },
      { alphabet: "T" },
      { alphabet: "W" },
      { alphabet: "X" },
      { alphabet: "Y" },
      { alphabet: "Z" },
    ],
  },
  
  // 车辆归属地
  changeRegin(e){
    this.setData({ region: e.detail.value });
  },
  // 商家所在地
  changeRegin2(e){
    this.setData({ region2: e.detail.value });
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    this.setData({
      date2: e.detail.value
    })
  },
  bindDateChange3: function(e) {
    this.setData({
      date3: e.detail.value
    })
  },
  bindDateChange4: function(e) {
    this.setData({
      date4: e.detail.value
    })
  },
  bindDateChange5: function(e) {
    this.setData({
      date5: e.detail.value
    })
  },
  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 1) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 1) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
 
  oneDialog() {
    this.data.showDialog = !this.data.showDialog
    $digest(this);
  },
  twoDialog(e) {

    let brandname = e.currentTarget.dataset.brandname;
    this.data.brandInfo = brandname;
    this.data.two = !this.data.two
    getSeries(brandname, this);
    $digest(this);
  },
  two() {
    this.data.two = !this.data.two
    $digest(this);
  },
  threeDialog(e) {
    let seriesname = e.currentTarget.dataset.serise;
    this.data.carSerise = seriesname;
    this.data.three = !this.data.three
    getModel(seriesname, this);
    $digest(this);
  },
  three() {
    this.data.three = !this.data.three
    $digest(this);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //牌照光标在文字后面显示
  sendText: function (e) {
    var _This = this;
    _This.setData({
      send_val: e.detail.value,
    })
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