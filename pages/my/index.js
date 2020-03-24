//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    admin: null,
    userInfo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
        } else {
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
  login(e) {
    var that = this
    var userInfo = e.detail.userInfo
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'http://xhgzf8.natappfree.cc/api/sqwuye/app/weChat/login',
            data: {
              code: res.code,
              weChatUser: e.detail.userInfo,
            },
            success: function (res) {
              if (res.data.code == 0) {
                console.log(res)
                wx.setStorage({
                  key:"token",
                  data:res.data.token
                })
                app.setUserInfo(res.data.rep)
                that.setData({
                  userInfo: res.data.rep
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
