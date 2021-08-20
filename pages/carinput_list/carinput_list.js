// pages/carinput_list/carinput_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeItem:0,
    flag:true,
    conditionList:[
      {name:'注册登记',id:0},
      {name:'转移登记',id:1},
      {name:'车辆转入',id:2},
      {name:'车辆转出',id:3},
    ],
    date: '选择预约日期',

  },

  //隐藏弹框
  hidePopup: function () {
    this.setData({
      flag: !this.data.flag
    })
  },
  //展示弹框
  showPopup () {
    this.setData({
      flag: !this.data.flag
    })
  },
  /*
  * 内部私有方法建议以下划线开头
  * triggerEvent 用于触发事件
  */
  _error () {
    //触发取消回调
    this.triggerEvent("error");
    this.setData({
      flag: !this.data.flag
    })
  },
  _success () {
    //触发成功回调
    this.triggerEvent("success");
    this.setData({
      flag: !this.data.flag
      
    })
    wx.showToast({
      title: '预约成功',
      duration: 2000,
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
    SyntheSize : function(e){
      let id = e.currentTarget.dataset.item;
      this.setData({
        activeItem:id
      })
    },
    showToast:function(){
      wx.showToast({
        title: 'title',
        duration: 0,
        icon: icon,
        image: 'image',
        mask: true,
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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