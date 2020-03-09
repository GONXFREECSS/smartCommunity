//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    admin: null,
    userInfo: wx.getStorageSync('userInfo')
  },
  onLoad: function () {
    console.log('ddd')
    console.log(wx.getStorageSync('userInfo'))
  },
  onShow: function () {

  },
  
})
