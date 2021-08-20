// pages/carinput3/carinput3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    flag:true,
    arr:[
      {
        title:"前挡风玻璃",
        radio:"正常",
        radio2:"异常",
      },{
        title:"发动机舱盖表面",
        radio:"正常",
        radio2:"异常"
      },{
        title:"前大灯",
        radio:"正常",
        radio2:"异常"
      },{
        title:"中网格栅",
        radio:"正常",
        radio2:"异常"
      },{
        title:"前保险杠",
        radio:"正常",
        radio2:"异常"
      },{
        title:"雾灯(左)",
        radio:"正常",
        radio2:"异常"
      },{
        title:"雾灯(右)",
        radio:"正常",
        radio2:"异常"
      },{
        title:"右前翼子板",
        radio:"正常",
        radio2:"异常"
      },{
        title:"右后视镜",
        radio:"正常",
        radio2:"异常"
      },{
        title:"右前轮",
        radio:"正常",
        radio2:"异常"
      },{
        title:"右前车门",
        radio:"正常",
        radio2:"异常"
      },{
        title:"右后车门",
        radio:"正常",
        radio2:"异常"
      },{
        title:"右后翼子板",
        radio:"正常",
        radio2:"异常"
      },{
        title:"右后轮",
        radio:"正常",
        radio2:"异常"
      },{
        title:"后挡风玻璃",
        radio:"正常",
        radio2:"异常"
      },{
        title:"行李箱盖",
        radio:"正常",
        radio2:"异常"
      },{
        title:"行李箱盖附件",
        radio:"正常",
        radio2:"异常"
      },{
        title:"行李箱内侧",
        radio:"正常",
        radio2:"异常"
      },{
        title:"后尾灯",
        radio:"正常",
        radio2:"异常"
      },{
        title:"后保险杠",
        radio:"正常",
        radio2:"异常"
      },{
        title:"后保险杠附件",
        radio:"正常",
        radio2:"异常"
      },{
        title:"左后翼子板",
        radio:"正常",
        radio2:"异常"
      },{
        title:"左后轮",
        radio:"正常",
        radio2:"异常"
      },{
        title:"左后车门",
        radio:"正常",
        radio2:"异常"
      },{
        title:"左前车门",
        radio:"正常",
        radio2:"异常"
      },{
        title:"左后视镜",
        radio:"正常",
        radio2:"异常"
      },{
        title:"左前翼子板",
        radio:"正常",
        radio2:"异常"
      },{
        title:"左前轮",
        radio:"正常",
        radio2:"异常"
      },{
        title:"车顶",
        radio:"正常",
        radio2:"异常"
      },{
        title:"车顶附件",
        radio:"正常",
        radio2:"异常"
      },{
        title:"四门风窗玻璃",
        radio:"正常",
        radio2:"异常"
      },{
        title:"四门附件",
        radio:"正常",
        radio2:"异常"
      },{
        title:"挡泥板罩及内衬",
        radio:"正常",
        radio2:"异常"
      },{
        title:"轮胎(右前)",
        radio:"正常",
        radio2:"异常"
      },{
        title:"轮胎(右前)",
        radio:"正常",
        radio2:"异常"
      },{
        title:"轮胎(右后)",
        radio:"正常",
        radio2:"异常"
      },{
        title:"轮胎(右前)",
        radio:"正常",
        radio2:"异常"
      },{
        title:"轮胎(左前)",
        radio:"正常",
        radio2:"异常"
      },{
        title:"轮胎(左前)",
        radio:"正常",
        radio2:"异常"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  },
  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
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
      //count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
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