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
    var that = this;
      wx.showLoading({
         title: '加载中',
      })
     setTimeout(function () {
       console.log(wx.getStorageSync('userInfo'))
        that.setData({
           userInfo : wx.getStorageSync('userInfo')
        })
       wx.hideLoading()
     }, 1000)
  },
  onShow: function () {
    
  },
  
})
