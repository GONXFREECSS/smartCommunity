//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    admin: null,
    userInfo: '',
  },
  onLoad: function () {

  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(app.globalData.userInfo)
        console.log(res.data)
        if (!app.globalData.userInfo) {
          that.setData({
            userInfo: res.data
          })
        }else{
          that.setData({
            userInfo: app.globalData.userInfo
          })
        }
      },
      fail: function (res) {
        // app.login();
      }
    });
  },

})
