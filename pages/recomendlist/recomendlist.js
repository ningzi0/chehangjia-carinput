// pages/list/list.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { getArea } from '../../utils/Biz/index'
import { getList, getTotal } from '../../utils/Biz/recomendlist'
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
    currentPage: 1,
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
    brandAlphabets: [
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
    aliasBrandList: [
      { 'brandName': '标致', 'aliasName': 'peugeot' },
      { 'brandName': '奥迪', 'aliasName': 'audi' },
      { 'brandName': '本田', 'aliasName': 'honda' },
      { 'brandName': '宝马', 'aliasName': 'bwm' },
      { 'brandName': '奔驰', 'aliasName': 'benz' },
      { 'brandName': '别克', 'aliasName': 'buick' },
      { 'brandName': '宾利', 'aliasName': 'bentley' },
      { 'brandName': '保时捷', 'aliasName': 'porsche' },
      { 'brandName': '长城', 'aliasName': 'changcheng' },
      { 'brandName': '大众', 'aliasName': 'volkswagen' },
      { 'brandName': '丰田', 'aliasName': 'toyota' },
      { 'brandName': '福特', 'aliasName': 'ford' },
      { 'brandName': '吉利', 'aliasName': 'geely' },
      { 'brandName': 'JEEP', 'aliasName': 'jeep' },
      { 'brandName': '凯迪拉克', 'aliasName': 'cadillac' },
      { 'brandName': '兰博基尼', 'aliasName': 'lamborghini' },
      { 'brandName': '路虎', 'aliasName': 'landrover' },
      { 'brandName': '雷克萨斯', 'aliasName': 'lexus' },
      { 'brandName': '铃木', 'aliasName': 'suzuki' },
      { 'brandName': '马自达', 'aliasName': 'mazda' },
      { 'brandName': '玛莎拉蒂', 'aliasName': 'maserati' },
      { 'brandName': 'MINI', 'aliasName': 'mini' },
      { 'brandName': '日产', 'aliasName': 'nissan' },
      { 'brandName': '斯柯达', 'aliasName': 'skoda' },
      { 'brandName': 'Smart', 'aliasName': 'smart' },
      { 'brandName': '沃尔沃', 'aliasName': 'volvo' },
      { 'brandName': '现代', 'aliasName': 'hyundai' },
      { 'brandName': '雪佛兰', 'aliasName': 'chevrolet' },
      { 'brandName': '雪铁龙', 'aliasName': 'citroen' },
      { 'brandName': '英菲尼迪', 'aliasName': 'infiniti' },
      { 'brandName': '其他', 'aliasName': 'other' },
    ],
    aliasName: '',
    areaList: [{ "areaid": 0, "areaname": "全国" }],
    objectArray: [
      {
        ordertype: 0,
        name: '最近发布',
        orderType:'',
        orderby: 'ASC',
      },
      {
        ordertype: 1,
        name: '价格最高',
        orderType:'priceOrder',
        orderby: 'DESC',
      },
      {
        ordertype: 1,
        name: '价格最低',
        orderType: 'priceOrder',
        orderby: 'ASC',
      },
      {
        ordertype: 3,
        name: '里程最短',
        orderType: 'mileageOrder',
        orderby: 'ASC',
      },
      {
        ordertype: 4,
        name: '车龄排序',
        orderType: 'ageOrder',
        orderby: 'ASC',
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
    this.other.parameters[this.other.objectArray[this.data.indexpx].orderType] = this.other.objectArray[this.data.indexpx].orderby;
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
    this.other.parameters['minPrice'] = this.data.slider1Value;
     this.other.parameters['maxPrice'] = this.data.slider2Value;
    console.log(this.other.parameters)
    this.data.carList.length = 0;
    getList(this);
  },
  getBrand(e) {
    console.log(e)
    this.hideModal(e);
    this.getAliasBrand(e.currentTarget.dataset.brand);
  },
  getAliasBrand(name) {
    for (var key in this.other.aliasBrandList) {
      if (name == this.other.aliasBrandList[key].brandName) {
        console.log(this.other.aliasBrandList[key].aliasName)
        this.other.parameters['carBrand']= this.other.aliasBrandList[key].aliasName
        break;
      } else {
        this.other.parameters['carBrand'] =''
      }
    }
    console.log(this.other.parameters['carBrand'])
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
    getTotal(this);
    this.other.parameters = { type: 'NORMAL', page: this.data.currentPage, pageSize: 10, sellStatus: 'IN_SALE' };
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
    wx.showNavigationBarLoading()
    if (this.data.currentPage == this.data.totalPage) {
      return false
    } else {
      this.data.totalPage = this.data.currentPage;
      let page = ++this.data.currentPage;
      this.other.parameters['page'] = page;
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