// pages/buycars/buycars.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { getArea } from '../../utils/Biz/index'
import { buyCar, getBrand, getSeries, getModel } from '../../utils/Biz/sold'
import { goToNode, getNodeInfo } from '../../utils/Biz/comBiz'
import { navData, gotoIndex, gotoMine, gotoOldGoods } from '../../utils/nav'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../../utils/config'
const wxRequst = promisify(wx.request)
const getStorge = promisify(wx.getStorage);
navData[0].current = 0;
navData[1].current = 1;
navData[2].current = 0;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: navData,
    areaName: [],
    brandLists: [],
    index: 0,
   
    intoindex: '',
    showDialog: false,
    two: false,
    three: false,
    multiIndex: [0, 0],
    date: '',
    brandInfo: '',
    carSerise: '',
    carModel: '',
    serises: [],
    models: [],
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
    areaList: [],
    node: [],
    selectIndex: 2,
    locname: '贵阳',
  },
  addCarList(){
    let index = ++this.other.selectIndex <= this.data.brandAlphabets.length ? this.other.selectIndex:this.data.brandAlphabets.length;
    this.data.alphabetSelect.push(this.data.brandAlphabets[this.other.selectIndex]);
    $digest(this)
  },
  oneDialog() {
    this.data.showDialog = !this.data.showDialog
    $digest(this);
  },
  close() {
    this.data.showDialog = !this.data.showDialog
    $digest(this);
  },
  gotoIndex: gotoIndex,
  gotoOldGoods: gotoOldGoods,
  gotoMine: gotoMine,
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
  compelete(e) {
    let modelname = e.currentTarget.dataset.model;
    this.data.carModel = modelname
    this.data.showDialog = !this.data.showDialog;
    this.data.two = !this.data.two
    this.data.three = !this.data.three
    $digest(this)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.index = e.detail.value;
    this.other.locname = this.other.areaList[e.detail.value].areaname
    $digest(this);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.date = e.detail.value;
    $digest(this);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this)
    getArea(this);
    getBrand(this);
  },
  goToNode: function (e) {
    console.log(e);
    goToNode(e, this)
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
  formSubmit(e) {
    buyCar(e, this);
  }

})