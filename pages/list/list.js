// pages/list/list.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { getArea } from '../../utils/Biz/index'
import { getList, getTotal } from '../../utils/Biz/list'
import { start_fn, end_fn } from '../../utils/Biz/comBiz'
import { goToNode, getNodeInfo } from '../../utils/Biz/comBiz'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../../utils/config'
const wxRequst = promisify(wx.request)
const getStorge = promisify(wx.getStorage);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: '奥迪|奔驰|宝马|丰田|本田',
    change: false, // 当两个slider在最右端重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
    max: 100, // 两个slider所能达到的最大值
    min: 0, // 两个slider所能取的最小值
    rate: 1, // slider的最大最小值之差和100（或1000）之间的比率
    scale: 1, // 比例系数。页面显示值的时候，需要将slider1Value(slider2Value)乘以比例系数scale
    slider1Max: 100, // slider1的最大取值
    slider1Value: 0, // slider1的值
    slider2Value: 100, // slider2的值
    slider2Min: 0, // slider2的最小取值
    slider1W: 100, // slider1的宽度
    slider2W: 0, // slider2的宽度
    leftSliderPriceWidthX: '-1.5%',
    rightSliderPriceWidthX: '-3%',
    totalPage: 0,
    currentPage: 0,
    chooseSize: false,
    animationData: {},
    array: ['最近发布', '价格最高', '价格最低', '里程最短', '车龄排序', '排量排序'],
    indexpx: 0,
    areaName: ["全国"],
    locationIndex: 0,
    carList: [],
    brandNumLists: {},
    hotBrandLists: [],
    press256pic: press256pic,
    priceList: [{ 'scope': '', 'text': '不限' },
    { 'scope': '0-3', 'text': '3万以下' },
    { 'scope': '3-5', 'text': '3-5万' },
    { 'scope': '5-7', 'text': '5-7万' },
    { 'scope': '7-9', 'text': '7-9万' },
    { 'scope': '7-9', 'text': '9-12万' },
    { 'scope': '7-9', 'text': '12-16万' },
    { 'scope': '16-20', 'text': '16-20万' },
    { 'scope': '20-1000', 'text': '20万以上' },
    ],
    seriesList: [
      { 'kind': '轿车', 'text': '轿车', 'src': '../../images/jc.png', "active": 0 },
      { 'kind': 'SUV', 'text': 'SUV', 'src': '../../images/suv.png', "active": 0 },
      { 'kind': 'MPV', 'text': 'MPV', 'src': '../../images/mpv.png', "active": 0 },
      { 'kind': '跑车', 'text': '跑车', 'src': '../../images/pc.png', "active": 0 },
      { 'kind': '皮卡', 'text': '皮卡', 'src': '../../images/pk.png', "active": 0 },
      { 'kind': '微面', 'text': '微面', 'src': '../../images/wm.png', "active": 0 },
      { 'kind': '微卡', 'text': '微卡', 'src': '../../images/wk.png', "active": 0 },
      { 'kind': '轻客', 'text': '轻客', 'src': '../../images/qk.png', "active": 0 },
    ],
    gearList: [
      { 'geartype': '', 'text': '不限', 'active': 0 },
      { 'geartype': '手动', 'text': '手动', 'active': 0 },
      { 'geartype': '自动', 'text': '自动', 'active': 0 },
    ],
    yearList: [
      { 'year': 2, 'text': '2年以下', 'active': 0 },
      { 'year': 4, 'text': '4年以下', 'active': 0 },
      { 'year': 6, 'text': '6年以下', 'active': 0 },
      { 'year': 8, 'text': '8年以下', 'active': 0 },
      { 'year': 10, 'text': '10年以下', 'active': 0 },
      { 'year': '', 'text': '不限', 'active': 0 },
    ],
    meterList: [
      { 'meter': '0-3', 'text': '0-3万公里', 'active': 0 },
      { 'meter': '3-6', 'text': '3-6万公里以下', 'active': 0 },
      { 'meter': '6-9', 'text': '6-9万公里以下', 'active': 0 },
      { 'meter': '9-12', 'text': '9-12万公里以下', 'active': 0 },
      { 'meter': '', 'text': '不限', 'active': 0 },
    ],
    dp: [
      { 'dp': '0-1', 'text': '1.0', 'active': 0 },
      { 'dp': '1-3', 'text': '1-3', 'active': 0 },
      { 'dp': '3-5', 'text': '3-5', 'active': 0 },
      { 'dp': '5-7', 'text': '5L以上', 'active': 0 },
    ],
    emission: [
      { "text": "国二", "active": 0, 'emission': "国二" },
      { "text": "国三", "active": 0, 'emission': "国三" },
      { "text": "国四", "active": 0, 'emission': "国四" },
      { "text": "国五", "active": 0, 'emission': "国五" },
      { "text": "国六", "active": 0, 'emission': "国六" },
    ],
    dirmodel: [
      { "text": "两驱", "active": 0, 'dirmodel': "两驱" },
      { "text": "四驱", "active": 0, 'dirmodel': "四驱" },
    ],
    vehicleorigin: [
      { "text": '进口', 'active': 0, 'vehicleorigin': '进口' },
      { "text": '国产', 'active': 0, 'vehicleorigin': '国产' },
      { "text": '合资', 'active': 0, 'vehicleorigin': '合资' },
    ],
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
  other: {
    brandLists: [],
    hotBrandList: [
      { 'brandName': '奥迪' },
      { 'brandName': '奔驰' },
      { 'brandName': '本田' },
      { 'brandName': '长城' },
      { 'brandName': '大众' },
      { 'brandName': '宝马' },
      { 'brandName': '丰田' },
      { 'brandName': '福特' },
      { 'brandName': '日产' },
      { 'brandName': '雪佛兰' },
    ],
    areaList: [{ "areaid": 0, "areaname": "全国" }],
    objectArray: [
      {
        ordertype: 0,
        name: '最近发布',
        orderby: 'ASC',
      },
      {
        ordertype: 1,
        name: '价格最高',
        orderby: 'DESC',
      },
      {
        ordertype: 1,
        name: '价格最低',
        orderby: 'ASC',
      },
      {
        ordertype: 3,
        name: '里程最短',
        orderby: 'ASC',
      },
      {
        ordertype: 4,
        name: '车龄排序',
        orderby: 'DESC',
      },
      {
        ordertype: 5,
        name: '排量排序',
        orderby: 'ASC',
      }
    ],
    parameters: '',
  },
  select: function (e) {
    let index = e.currentTarget.dataset.index;
    let dataType = e.currentTarget.dataset.type;
    let dataKey = e.currentTarget.dataset.key;

    for (var key in this.data[dataType]) {
      if (this.data[dataType][key].active == 1) {
        this.data[dataType][key].active = 0;
      }
      if (key == index) {
        this.data[dataType][key].active = 1;
        if (dataKey == 'year') {
          let date = new Date();
          let year = date.getFullYear()
          this.other.parameters[dataKey] = +year - this.data[dataType][key][dataKey];
        } else {
          this.other.parameters[dataKey] = this.data[dataType][key][dataKey];
        }

      }
    }
    console.log(this.other.parameters)
    $digest(this);
  },
  query: function (e) {
    this.hideModal(e)
    this.data.carList.length = 0;
    getList(this);
  },
  reset: function () {
    for (var key in this.data.seriesList) {
      this.data.seriesList[key].active = 0;
      this.other.parameters['kind'] == ''
    }
    for (var key in this.data.gearList) {
      this.data.gearList[key].active = 0;
      this.other.parameters['geartype'] == ''
    }
    for (var key in this.data.yearList) {
      this.data.yearList[key].active = 0;
      this.other.parameters['year'] == ''
    }
    for (var key in this.data.meterList) {
      this.data.meterList[key].active = 0;
      this.other.parameters['meter'] == ''
    }
    for (var key in this.data.dp) {
      this.data.dp[key].active = 0;
      this.other.parameters['dp'] == ''
    }
    for (var key in this.data.emission) {
      this.data.emission[key].active = 0;
      this.other.parameters['emission'] == ''
    }
    for (var key in this.data.dirmodel) {
      this.data.dirmodel[key].active = 0;
      this.other.parameters['dirmodel'] == ''
    }
    for (var key in this.data.vehicleorigin) {
      this.data.vehicleorigin[key].active = 0;
      this.other.parameters['vehicleorigin'] == ''
    }
    console.log(this.data)
    $digest(this);
  },
  bindSortChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.indexpx = e.detail.value;
    console.log(this.data.indexpx)
    $digest(this);
    this.other.parameters['orderby'] = this.other.objectArray[this.data.indexpx].orderby;
    this.other.parameters['ordertype'] = this.other.objectArray[this.data.indexpx].ordertype;
    this.data.carList.length = 0;
    getList(this);
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.locationIndex = e.detail.value;
    $digest(this);
    this.other.parameters['loc'] = this.data.locationIndex
    console.log(this.other.parameters)
    this.data.carList.length = 0;
    getList(this);
  },
  getPrcice: function (e) {
    this.hideModal(e);
    let scope = e.currentTarget.dataset.scope
    this.other.parameters['price'] = scope;
    this.data.carList.length = 0;
    getList(this);
  },
  diyPrice(e) {
    this.hideModal(e);
    this.other.parameters['price'] = `${this.data.slider1Value}-${this.data.slider2Value}`;
    console.log(this.other.parameters)
    this.data.carList.length = 0;
    getList(this);
  },
  getBrand(e){
    console.log(e)
    this.hideModal(e);
    this.other.parameters['brand'] = e.currentTarget.dataset.brand;
    this.data.carList.length = 0;
    getList(this);
  },
  // 品牌筛选
  chooseSezi: function (e) {
    var that = this;
    console.log(e);
    let index = e.currentTarget.dataset.index;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    animation.translateY(200).step()
    this.data.animationData = animation.export();
    this.data.chooseSize = true;
    this.data.index = index;
    $digest(this);

    setTimeout(function () {
      animation.translateY(0).step()
      that.data.animationData = animation.export();
      $digest(that)
      // that.setData({
      //   animationData: animation.export()
      // })
    }, 50)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    animation.translateY(200).step()
    this.data.animationData = animation.export();
    $digest(this)
    // that.setData({
    //   animationData:animation.export()

    // })
    setTimeout(function () {
      animation.translateY(0).step()
      that.data.animationData = animation.export();
      that.data.chooseSize = false;
      that.data.index = 0;
      $digest(that);
    }, 50)
  },

  // 开始滑动
  changeStart: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx)
    if (idx === 1) {
      // dW是当前操作的slider所能占据的最大宽度百分数
      var dW = (this.data.slider2Value - this.data.min) / this.data.rate
      this.data.slider1W = dW;
      this.data.slider2W = 100 - dW;
      this.data.slider1Max = this.data.slider2Value;
      this.data.slider2Min = this.data.slider2Value;
      this.data.change = false;
      $digest(this);
    } else if (idx === 2) {
      var dw = (this.data.max - this.data.slider1Value) / this.data.rate
      this.data.slider2W = dw;
      this.data.slider1W = 100 - dw;
      this.data.slider1Max = this.data.slider1Value;
      this.data.slider2Min = this.data.slider1Value;
      $digest(this);
    }
  },

  // 正在滑动
  changing: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx)
    var value = e.detail.value
    let rightSliderPriceWidthX = (this.data.max - value) / 116 - 5
    let leftSliderPriceWidthX = value / 116
    if (idx === 1) {
      this.data.slider1Value = value;
      this.data.leftSliderPriceWidthX = leftSliderPriceWidthX + '%'
      $digest(this);
    } else if (idx === 2) {
      this.data.slider2Value = value;
      this.data.rightSliderPriceWidthX = rightSliderPriceWidthX + '%';
      $digest(this);
    }
  },
  changed: function (e) {
    if (this.data.slider1Value === this.data.slider2Value && this.data.slider2Value === this.data.max) {
      this.data.change = true;
      $digest(this);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this)
    let keywords = '';
    if (typeof (options.val) != 'undefined') {
      keywords = options.val;
      this.data.val = keywords;
    }
    getArea(this)
    getTotal(this);

    this.other.parameters = { keywords: keywords, loc: this.data.locationIndex, max: 10, begin: this.data.currentPage, total: this.data.totalPage };
    getList(this);
  },
  searchSumbit: function (e) {
    this.other.parameters['keywords'] = e.detail.value;
    this.data.carList.length = 0;
    getList(this);
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

  start_fn(e) {
    start_fn(e, this)
  },
  end_fn(e) {
    end_fn(e, this)
  },
  upper() {

  },
  onPullDownRefresh() {
    var $ = this;
    wx.showNavigationBarLoading()
    if (this.data.currentPage == this.data.totalPage) {
      return false
    } else {
      this.data.totalPage = this.data.currentPage;
      let page = this.data.currentPage;
      this.other.parameters['begin'] = page;
      this.other.parameters['total'] = this.data.totalPage;
      getList(this);
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  },
  goToNode: function (e) {
    console.log(e);
    goToNode(e, this)
  },
})