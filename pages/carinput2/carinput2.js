// pages/carinput/carinput.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '银色', '深色', '香槟色', '棕色', '其他'],
    array2: ['92号汽油', '95号汽油', '98号汽油', '90号汽油', '93号汽油', '97号汽油', '0号柴油','5号柴油','10号柴油','-10号柴油','-20号柴油','-35号柴油','-50号柴油'],
    array3: ['国五', '国四', '国三', '国二', '国一'],
    array4: ['AT', 'MT', '双离合'],
    array5: ['无', '1个', '2个', '3个', '4个', '5个', '6个', '7个', '8个', '8个以上'],
    array6: ['前驱', '后驱', '适时四驱', '全时四驱'],
    array7: ['合金', '钢材'],
    index: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    index5: 0,
    index6: 0,
    index7: 0,
  },


  listItemTap:function(e){
    var that = this
    app.navroter.navigateTo({url:"/pages/carinput3/carinput3"})
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
  bindPickerChange3: function(e) {
    this.setData({
      index3: e.detail.value
    })
  },
  bindPickerChange4: function(e) {
    this.setData({
      index4: e.detail.value
    })
  },
  bindPickerChange5: function(e) {
    this.setData({
      index5: e.detail.value
    })
  },
  bindPickerChange6: function(e) {
    this.setData({
      index6: e.detail.value
    })
  },
  bindPickerChange7: function(e) {
    this.setData({
      index7: e.detail.value
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