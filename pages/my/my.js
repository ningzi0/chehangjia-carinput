// pages/my/my.js
import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'
import { callPhone } from '../../utils/Biz/comBiz'
import { navData, gotoIndex, gotoMine, gotoOldGoods } from '../../utils/nav'
import { apiUrl, imagesUrl, press256pic, press512pic } from '../../utils/config'
const wxRequst = promisify(wx.request)
const wxLogin = promisify(wx.login)
const wxStorge = promisify(wx.setStorage)
const getStorge = promisify(wx.getStorage);
const app = getApp()
navData[0].current = 0;
navData[1].current = 0;
navData[2].current = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: navData,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $init(this);
    getStorge({ key: 'weixinInfo' }).then(res => {
      app.globalData.userInfo = res.data
      console.log(app.globalData.userInfo);
      if (typeof (app.globalData.userInfo) != null) {
        this.data.userInfo = app.globalData.userInfo;
        this.data.hasUserInfo = true;
        $digest(this);
      } else if (this.data.canIUse && app.globalData.userInfo) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          getStorge({ key: 'weixinInfo' }).then(res => {
            this.data.userInfo = res.userInfo;
            this.data.hasUserInfo = true;
            $digest(this);
          }).catch(res => { });
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            getStorge({ key: 'weixinInfo' }).then(res => {
              this.data.userInfo = res.userInfo;
              this.data.hasUserInfo = true;
              $digest(this);
            }).catch(res => { });
          }
        })
      }
    }).catch(res => { });
  },
  gotoIndex: gotoIndex,
  gotoOldGoods: gotoOldGoods,
  gotoMine: gotoMine,
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
  callPhone: function () {
    callPhone();
  },
  getUserInfo: function (e) {
    var dataEncrptInfo = e.detail.encryptedData;
    var iv = e.detail.iv;
    wxLogin().then(res => {
      wxRequst({
        data: {
          "encryptedData": dataEncrptInfo,
          "iv": iv,
          "code": res.code,
        }, method: 'post',
        url: `${apiUrl}/weixin/decode`
      }).then(res => {
        let weixinInfo = JSON.parse(res.data.data);
        wxStorge({ 'key': 'weixinInfo', data: weixinInfo });
        this.onLoad();
      }).catch(res => {
        console.log(res)
        wx.showToast({
          title: '网络异常',
        })
      })
    }).catch(res => { console.log(res) });
  }
})